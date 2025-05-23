import { LakilesterSprite } from './../entities/enum/lakilesterSprite';
import { SeedViewModel } from './../entities/seed-view-model/seedViewModel';

import { CosmeticsRequest } from './../entities/cosmeticsRequest';
import { LocalStorageService } from './localStorage/localStorage.service';
import { SettingStringMappingService } from './setting-string-mapping/setting-string-mapping.service';
import { Constants } from './../utilities/constants';
import { environment } from 'src/environments/environment';
import { forkJoin, map, Observable, Subscriber, switchMap, tap } from 'rxjs';
import { RandomizerRepository } from './../repositories/randomizer-repository/randomizer.repository';
import { FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SettingsRequest, StartingPartners } from '../entities/settingsRequest';
import { DifficultySetting } from '../entities/enum/difficultySetting';
import { getMarcFileFromSource } from '../utilities/RomPatcher/MarcFile';
import { applyPatch } from '../utilities/RomPatcher/RomPatcher';
import { parseBPSFile } from '../utilities/RomPatcher/bps';
import { parseRandoPatchFile, RandoPatch } from '../utilities/RomPatcher/randopatch';
import { CharacterSpriteSetting } from '../entities/characterSpriteSetting';
import { CoinColor } from '../entities/enum/coinColor';
import { MysteryMode } from '../entities/enum/mysteryMode';
import { MirrorMode } from '../entities/enum/mirrorMode';
import { SeedGoal } from '../entities/enum/seedGoal';
import { SeedGenerationRequest } from '../entities/seedGenerationRequest';


@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  public constructor(private _randomizerRepo: RandomizerRepository, private _settingsStringService: SettingStringMappingService, private _localStorage: LocalStorageService)
  {
  }

  public getSeedInfo(seedId: string): Observable<SeedViewModel>
  {
    return this._randomizerRepo.getSeedInfo(seedId);
  }

  public downloadPatchedRom(userRom: any, seedId: string, modVersion: number, useProdPatch: boolean, cosmeticsFormGroup?: FormGroup): Observable<Blob>
  {
    var starRodRom$ = this._randomizerRepo.getStarRodPatch(modVersion, useProdPatch).pipe(
      switchMap(starRodPatchFile => getMarcFileFromSource(new File([starRodPatchFile], 'patch'))),
      map(starRodMarcFile => {
        var bpsPatch = parseBPSFile(starRodMarcFile);
        var starRodRomBlob = applyPatch(bpsPatch, userRom);
        return starRodRomBlob;
      })
    );
    var randoPatch$ = this._randomizerRepo.getRandoPatch(seedId).pipe(
      switchMap(randoPatchFile => getMarcFileFromSource(new File([randoPatchFile], 'patch'))),
      map(randoPatchFile => {
        var randoPatch = parseRandoPatchFile(randoPatchFile);
        return randoPatch;
      })
    );

    var cosmeticsPatch$: Observable<RandoPatch>;

    if(cosmeticsFormGroup) {
      this.saveCosmeticsSettings(cosmeticsFormGroup)
      var request = this.prepareCosmeticsRequest(seedId, cosmeticsFormGroup);
      cosmeticsPatch$ = this._randomizerRepo.getCosmeticsPatch(request).pipe(
        switchMap(cosmeticsPatchFile => getMarcFileFromSource(new File([cosmeticsPatchFile], 'cosmeticsPatch'))),
        map(cosmeticsPatchFile => {
          var cosmeticsPatch = parseRandoPatchFile(cosmeticsPatchFile);
          return cosmeticsPatch;
        })
      );
    }

    if(cosmeticsPatch$) {
      return forkJoin([starRodRom$, randoPatch$, cosmeticsPatch$]).pipe(
        map(results => {
          // If we did cosmetics patch, apply it first, then rando patch

          var randoPatchedFile = applyPatch(results[1], results[0]); // Apply rando patch
          var cosmeticPatchedFile = applyPatch(results[2], randoPatchedFile) // Cosmetics patch on modded rom
          return cosmeticPatchedFile.save();
        })
      );
    } else {
      return forkJoin([starRodRom$, randoPatch$]).pipe(
        map(results => {
          var finalRomMarcFile = applyPatch(results[1], results[0]); // Apply rando patch
          return finalRomMarcFile.save();
        })
      );
    }

  }

  public downloadSpoilerLog(seedId: string): Observable<Blob>
  {
    return this._randomizerRepo.getSpoilerLog(seedId);
  }

  public createSeedWithSettings(settingsForm: FormGroup, plandoForm: FormControl): Observable<string> {
    const request = this.prepareRequestObject(settingsForm, plandoForm);
    return this._randomizerRepo.sendRandoSettings(request);
  }

  public validatePlandomizer(plandoObj: Object): Observable<string | Object> {
    return this._randomizerRepo.validatePlandomizer(plandoObj);
  }

  private saveCosmeticsSettings(formGroup: FormGroup) {
    const cosmeticsSettings = this._settingsStringService.compressFormGroup(formGroup, this._settingsStringService.cosmeticsMap)
    this._localStorage.set('cosmeticsSettings', cosmeticsSettings);
  }

  private prepareCosmeticsRequest(seedID: string, cosmeticsFormGroup: FormGroup): CosmeticsRequest {
    var menuColor = cosmeticsFormGroup.get('menu').value

    var request = {
      SeedID: seedID,
      BossesSetting: cosmeticsFormGroup.get("bossesSetting").value,
      BowSetting: (cosmeticsFormGroup.get('bowSprite').value as CharacterSpriteSetting).setting,
      BowSprite: (cosmeticsFormGroup.get('bowSprite').value as CharacterSpriteSetting).paletteSelection,
      ColorMode: Constants.MENU_COLORS[menuColor].colorMode,
      Box5ColorA: Constants.MENU_COLORS[menuColor].colorA,
      Box5ColorB: Constants.MENU_COLORS[menuColor].colorB,
      CoinColor: cosmeticsFormGroup.get('coinColor').value != CoinColor.Random ? cosmeticsFormGroup.get('coinColor').value : 0, // Is ignored if random
      GoombarioSetting: (cosmeticsFormGroup.get('goombarioSprite').value as CharacterSpriteSetting).setting,
      GoombarioSprite: (cosmeticsFormGroup.get('goombarioSprite').value as CharacterSpriteSetting).paletteSelection,
      KooperSetting: (cosmeticsFormGroup.get('kooperSprite').value as CharacterSpriteSetting).setting,
      KooperSprite: (cosmeticsFormGroup.get('kooperSprite').value as CharacterSpriteSetting).paletteSelection,
      BombetteSetting: (cosmeticsFormGroup.get('bombetteSprite').value as CharacterSpriteSetting).setting,
      BombetteSprite: (cosmeticsFormGroup.get('bombetteSprite').value as CharacterSpriteSetting).paletteSelection,
      MarioSetting: (cosmeticsFormGroup.get('marioSprite').value as CharacterSpriteSetting).setting,
      MarioSprite: (cosmeticsFormGroup.get('marioSprite').value as CharacterSpriteSetting).paletteSelection,
      NPCSetting: cosmeticsFormGroup.get("npcSetting").value,
      EnemiesSetting: cosmeticsFormGroup.get("enemiesSetting").value,
      HammerSetting: cosmeticsFormGroup.get("hammerSetting").value,
      ParakarrySetting: (cosmeticsFormGroup.get('parakarrySprite').value as CharacterSpriteSetting).setting,
      ParakarrySprite: (cosmeticsFormGroup.get('parakarrySprite').value as CharacterSpriteSetting).paletteSelection,
      RandomCoinColor: cosmeticsFormGroup.get('coinColor').value == CoinColor.Random,
      RandomText: cosmeticsFormGroup.get("randomText").value,
      RomanNumerals: cosmeticsFormGroup.get("romanNumerals").value,
      RandomPitch: cosmeticsFormGroup.get("randomPitch").value,
      MuteDangerBeeps: cosmeticsFormGroup.get("muteDangerBeeps").value,
      ShuffleMusic: cosmeticsFormGroup.get("shuffleMusic").value != -1,
      ShuffleMusicMode: cosmeticsFormGroup.get("shuffleMusic").value != -1 ? cosmeticsFormGroup.get("shuffleMusic").value : 0,
      ShuffleJingles: cosmeticsFormGroup.get("shuffleJingles").value,
      SushieSetting: (cosmeticsFormGroup.get('sushieSprite').value as CharacterSpriteSetting).setting,
      SushieSprite: (cosmeticsFormGroup.get('sushieSprite').value as CharacterSpriteSetting).paletteSelection,
      WattSetting: (cosmeticsFormGroup.get('wattSprite').value as CharacterSpriteSetting).setting,
      WattSprite: (cosmeticsFormGroup.get('wattSprite').value as CharacterSpriteSetting).paletteSelection,
      LakilesterSetting: (cosmeticsFormGroup.get('lakilesterSprite').value as CharacterSpriteSetting).setting,
      LakilesterSprite: (cosmeticsFormGroup.get('lakilesterSprite').value as CharacterSpriteSetting).paletteSelection,
    } as CosmeticsRequest

    return request;
  }

  private prepareRequestObject(settingsForm: FormGroup, plandoForm: FormControl): SeedGenerationRequest {
    var menuColor = settingsForm.get('cosmetics').get('menu').value
    const isStarHuntEnabled = settingsForm.get('goals').get('includePowerStars').value;
    const isStarBeamReachable = settingsForm.get('goals').get('seedGoal').value == SeedGoal.DefeatBowser;

    if (settingsForm.get('openLocations').get('magicalSeedsRequired').value === 5) {
      settingsForm.get('openLocations').get('magicalSeedsRequired').setValue(-1);
    }

    var settingsString = this._settingsStringService.compressFormGroup(settingsForm, this._settingsStringService.settingsMap);
    this._localStorage.set('latestSettingsString', settingsString);

    var settingsRequest =  {
      StarRodModVersion: environment.currentModVersion,
      SettingsString: settingsString,
      AlwaysSpeedySpin: settingsForm.get('qualityOfLife').get('alwaysSpeedySpin').value,
      AlwaysISpy: settingsForm.get('qualityOfLife').get('alwaysISpy').value,
      AlwaysPeekaboo: settingsForm.get('qualityOfLife').get('alwaysPeekaboo').value,
      HiddenBlockMode: settingsForm.get('qualityOfLife').get('hiddenBlockMode').value,
      AllowPhysicsGlitches: !settingsForm.get('qualityOfLife').get('preventPhysicsGlitches').value,
      StartingCoins: settingsForm.get('marioStats').get('startingCoins').value,
      CapEnemyXP: settingsForm.get('difficulty').get('capEnemyXP').value,
      XPMultiplier: settingsForm.get('difficulty').get('xpMultiplier').value,
      DoubleDamage: settingsForm.get('difficulty').get('damageMultiplier').value == 2,
      QuadrupleDamage: settingsForm.get('difficulty').get('damageMultiplier').value == 4,
      OHKO: settingsForm.get('difficulty').get('oneHitKO').value,
      NoSaveBlocks: settingsForm.get('difficulty').get('noSaveBlocks').value,
      NoHeartBlocks: settingsForm.get('difficulty').get('noHeartBlocks').value,
      BowserDoorQuiz: settingsForm.get('difficulty').get('bowserDoorQuiz').value,
      KentCKoopa: settingsForm.get('difficulty').get('kentCKoopa').value,
      BlueHouseOpen: settingsForm.get('openLocations').get('blueHouseOpen').value,
      ToyboxOpen: settingsForm.get('openLocations').get('toyboxOpen').value,
      MagicalSeedsRequired: settingsForm.get('openLocations').get('magicalSeedsRequired').value,
      WhaleOpen: settingsForm.get('openLocations').get('whaleOpen').value,
      Ch7BridgeVisible: settingsForm.get('openLocations').get('ch7BridgeVisible').value,
      MtRuggedOpen: settingsForm.get('openLocations').get('mtRuggedOpen').value,
      ForeverForestOpen: settingsForm.get('openLocations').get('foreverForestOpen').value,
      PrologueOpen: settingsForm.get('openLocations').get('prologueOpen').value,
      StartingMap: settingsForm.get('openLocations').get('startingMap').value,
      BowsersCastleMode: settingsForm.get('openLocations').get('bowsersCastleMode').value,
      ShuffleDungeonEntrances: settingsForm.get('openLocations').get('shuffleDungeonEntrances').value,
      MirrorMode: settingsForm.get('openLocations').get('mirrorMode').value == MirrorMode['Static Random'] ? 0: settingsForm.get('openLocations').get('mirrorMode').value,
      StaticMapMirroring: settingsForm.get('openLocations').get('mirrorMode').value == MirrorMode['Static Random'],
      ShuffleChapterDifficulty: settingsForm.get('difficulty').get('difficultyMode').value == DifficultySetting.RandomChapterDifficulty,
      ProgressiveScaling: settingsForm.get('difficulty').get('difficultyMode').value == DifficultySetting.ProgressiveScaling,
      RandomFormations: settingsForm.get('gameplay').get('randomFormations').value,
      RandomizePuzzles: settingsForm.get('gameplay').get('randomizePuzzles').value,
      BossShuffleMode: Number(settingsForm.get('gameplay').get('bossShuffle').value),
      ShuffleItems: settingsForm.get('items').get('shuffleItems').value,
      IncludeCoinsOverworld: settingsForm.get('items').get('includeCoinsOverworld').value,
      IncludeCoinsBlocks: settingsForm.get('items').get('includeCoinsBlocks').value,
      IncludeCoinsFavors: settingsForm.get('items').get('includeCoinsFavors').value,
      IncludeCoinsFoliage: settingsForm.get('items').get('includeCoinsFoliage').value,
      IncludeShops: settingsForm.get('items').get('includeShops').value,
      IncludePanels: settingsForm.get('items').get('includePanels').value,
      IncludeFavorsMode: settingsForm.get('items').get('includeFavors').value,
      IncludeLettersMode: settingsForm.get('items').get('includeLetters').value,
      KeyitemsOutsideDungeon: settingsForm.get('items').get('keyitemsOutsideDungeon').value,
      RandomBadgesBP: settingsForm.get('gameplay').get('randomBadgesBP').value,
      RandomBadgesFP: settingsForm.get('gameplay').get('randomBadgesFP').value,
      RandomPartnerFP: settingsForm.get('gameplay').get('randomPartnerFP').value,
      RandomStarpowerSP: settingsForm.get('gameplay').get('randomStarpowerSP').value,
      RandomQuiz: true, // We're forcing it to true, at least for now
      SkipQuiz: settingsForm.get('qualityOfLife').get('skipQuiz').value,
      QuizmoAlwaysAppears: settingsForm.get('qualityOfLife').get('quizmoAlwaysAppears').value,
      PartnerShuffle: settingsForm.get('partners').get('shufflePartners').value,
      PartnersAlwaysUsable: settingsForm.get('partners').get('partnersAlwaysUsable').value,
      StartWithRandomPartners: settingsForm.get('partners').get('startWithRandomPartners').value,
      WriteSpoilerLog: settingsForm.get('qualityOfLife').get('writeSpoilerLog').value,
      RevealLogInHours: settingsForm.get('qualityOfLife').get('delaySpoilerLog').value ? settingsForm.get('qualityOfLife').get('revealLogInHours').value : 0,
      RomanNumerals: settingsForm.get('cosmetics').get('romanNumerals').value,
      IncludeDojo: settingsForm.get('items').get('includeDojo').value,
      CutsceneMode: Number(settingsForm.get('qualityOfLife').get('shortenCutscenes').value), // Cast to number due to breaking change where user might have an old preset with bool
      SkipEpilogue: settingsForm.get('qualityOfLife').get('skipEpilogue').value,
      ColorMode: Constants.MENU_COLORS[menuColor].colorMode,
      Box5ColorA: Constants.MENU_COLORS[menuColor].colorA,
      Box5ColorB: Constants.MENU_COLORS[menuColor].colorB,
      CoinColor: settingsForm.get('cosmetics').get('coinColor').value != CoinColor.Random ? settingsForm.get('cosmetics').get('coinColor').value : 0, // Is ignored if random
      RandomCoinColor: settingsForm.get('cosmetics').get('coinColor').value == CoinColor.Random,
      MarioSetting: (settingsForm.get('cosmetics').get('marioSprite').value as CharacterSpriteSetting).setting,
      MarioSprite: (settingsForm.get('cosmetics').get('marioSprite').value as CharacterSpriteSetting).paletteSelection,
      GoombarioSetting: (settingsForm.get('cosmetics').get('goombarioSprite').value as CharacterSpriteSetting).setting,
      GoombarioSprite: (settingsForm.get('cosmetics').get('goombarioSprite').value as CharacterSpriteSetting).paletteSelection,
      KooperSetting: (settingsForm.get('cosmetics').get('kooperSprite').value as CharacterSpriteSetting).setting,
      KooperSprite: (settingsForm.get('cosmetics').get('kooperSprite').value as CharacterSpriteSetting).paletteSelection,
      BombetteSetting: (settingsForm.get('cosmetics').get('bombetteSprite').value as CharacterSpriteSetting).setting,
      BombetteSprite: (settingsForm.get('cosmetics').get('bombetteSprite').value as CharacterSpriteSetting).paletteSelection,
      ParakarrySetting: (settingsForm.get('cosmetics').get('parakarrySprite').value as CharacterSpriteSetting).setting,
      ParakarrySprite: (settingsForm.get('cosmetics').get('parakarrySprite').value as CharacterSpriteSetting).paletteSelection,
      BowSetting: (settingsForm.get('cosmetics').get('bowSprite').value as CharacterSpriteSetting).setting,
      BowSprite: (settingsForm.get('cosmetics').get('bowSprite').value as CharacterSpriteSetting).paletteSelection,
      WattSetting: (settingsForm.get('cosmetics').get('wattSprite').value as CharacterSpriteSetting).setting,
      WattSprite: (settingsForm.get('cosmetics').get('wattSprite').value as CharacterSpriteSetting).paletteSelection,
      SushieSetting: (settingsForm.get('cosmetics').get('sushieSprite').value as CharacterSpriteSetting).setting,
      SushieSprite: (settingsForm.get('cosmetics').get('sushieSprite').value as CharacterSpriteSetting).paletteSelection,
      LakilesterSetting: (settingsForm.get('cosmetics').get('lakilesterSprite').value as CharacterSpriteSetting).setting,
      LakilesterSprite: (settingsForm.get('cosmetics').get('lakilesterSprite').value as CharacterSpriteSetting).paletteSelection,
      BossesSetting: settingsForm.get('cosmetics').get('bossesSetting').value,
      NPCSetting: settingsForm.get('cosmetics').get('npcSetting').value,
      EnemiesSetting: settingsForm.get('cosmetics').get('enemiesSetting').value,
      HammerSetting: settingsForm.get('cosmetics').get('hammerSetting').value,
      StartingMaxHP: settingsForm.get('marioStats').get('startingMaxHP').value,
      StartingMaxFP: settingsForm.get('marioStats').get('startingMaxFP').value,
      StartingMaxBP: settingsForm.get('marioStats').get('startingMaxBP').value,
      RandomStartingStatsLevel: settingsForm.get('marioStats').get('startWithRandomStats').value? settingsForm.get('marioStats').get('randomStartingStatsLevel').value : -1,
      StartingStarPower: settingsForm.get('marioStats').get('startingStarPower').value,
      StartingBoots: settingsForm.get('marioStats').get('startingBoots').value,
      StartingHammer: settingsForm.get('marioStats').get('startingHammer').value,
      StartingItem0: settingsForm.get('marioStats').get('startingItems').value[0]?.value ?? 0,
      StartingItem1: settingsForm.get('marioStats').get('startingItems').value[1]?.value ?? 0,
      StartingItem2: settingsForm.get('marioStats').get('startingItems').value[2]?.value ?? 0,
      StartingItem3: settingsForm.get('marioStats').get('startingItems').value[3]?.value ?? 0,
      StartingItem4: settingsForm.get('marioStats').get('startingItems').value[4]?.value ?? 0,
      StartingItem5: settingsForm.get('marioStats').get('startingItems').value[5]?.value ?? 0,
      StartingItem6: settingsForm.get('marioStats').get('startingItems').value[6]?.value ?? 0,
      StartingItem7: settingsForm.get('marioStats').get('startingItems').value[7]?.value ?? 0,
      StartingItem8: settingsForm.get('marioStats').get('startingItems').value[8]?.value ?? 0,
      StartingItem9: settingsForm.get('marioStats').get('startingItems').value[9]?.value ?? 0,
      StartingItemA: settingsForm.get('marioStats').get('startingItems').value[10]?.value ?? 0,
      StartingItemB: settingsForm.get('marioStats').get('startingItems').value[11]?.value ?? 0,
      StartingItemC: settingsForm.get('marioStats').get('startingItems').value[12]?.value ?? 0,
      StartingItemD: settingsForm.get('marioStats').get('startingItems').value[13]?.value ?? 0,
      StartingItemE: settingsForm.get('marioStats').get('startingItems').value[14]?.value ?? 0,
      StartingItemF: settingsForm.get('marioStats').get('startingItems').value[15]?.value ?? 0,
      ItemQuality: settingsForm.get('itemPool').get('itemQuality').value,
      RandomConsumableMode: settingsForm.get('itemPool').get('randomConsumableMode').value,
      ItemTrapMode: settingsForm.get('itemPool').get('itemTrapMode').value,
      AddItemPouches: settingsForm.get('itemPool').get('itemPouches').value,
      AddUnusedBadgeDuplicates: settingsForm.get('itemPool').get('addUnusedBadgeDuplicates').value,
      AddBetaItems: settingsForm.get('itemPool').get('addBetaItems').value,
      ProgressiveBadges: settingsForm.get('itemPool').get('progressiveBadges').value,
      BadgePoolLimit: settingsForm.get('itemPool').get('badgePoolLimit').value,
      BadgeSynergy: settingsForm.get('difficulty').get('badgeSynergy').value,
      FoliageItemHints: settingsForm.get('qualityOfLife').get('foliageItemHints').value,
      RandomText: settingsForm.get('cosmetics').get('randomText').value,
      NoHealingItems: settingsForm.get('difficulty').get('noHealingItems').value,
      DropStarPoints: settingsForm.get('difficulty').get('dropStarPoints').value,
      ChetRippoAvailable: settingsForm.get('difficulty').get('chetRippoAvailable').value,
      StartWithRandomItems: settingsForm.get('marioStats').get('startWithRandomItems').value,
      RandomItemsMin: settingsForm.get('marioStats').get('startWithRandomItems').value ? settingsForm.get('marioStats').get('randomItemsMin').value : 0,
      RandomItemsMax: settingsForm.get('marioStats').get('startWithRandomItems').value ? settingsForm.get('marioStats').get('randomItemsMax').value: 0,
      RandomChoice: settingsForm.get('gameplay').get('mysteryMode').value == MysteryMode['Random On Every Use'],
      MysteryRandomPick: settingsForm.get('gameplay').get('mysteryMode').value == MysteryMode['Random Pick'],
      AllowItemHints: settingsForm.get('difficulty').get('allowItemHints').value,
      IncludeRadioTradeEvent: settingsForm.get('items').get('includeRadioTradeEvent').value,
      MultiCoinBlockShuffle: settingsForm.get('items').get('multiCoinBlockShuffle').value,
      RandomPitch: settingsForm.get('cosmetics').get('randomPitch').value,
      MuteDangerBeeps: settingsForm.get('cosmetics').get('muteDangerBeeps').value,
      ShuffleMusic: settingsForm.get('cosmetics').get("shuffleMusic").value != -1,
      ShuffleMusicMode: settingsForm.get('cosmetics').get("shuffleMusic").value != -1 ? settingsForm.get('cosmetics').get("shuffleMusic").value : 0,
      ShuffleJingles: settingsForm.get('cosmetics').get("shuffleJingles").value,
      HiddenPanelVisibility: settingsForm.get('qualityOfLife').get('hiddenPanelVisibility').value ? 1 : 0,
      ISpyPanelHints: settingsForm.get('qualityOfLife').get('iSpyPanelHints').value,
      CookWithoutFryingPan: settingsForm.get('qualityOfLife').get('cookWithoutFryingPan').value,
      GearShuffleMode: settingsForm.get('items').get('gearShuffleMode').value,
      PartnerUpgradeShuffle: settingsForm.get('items').get('partnerUpgradeShuffle').value,
      RipCheatoItemsInLogic: settingsForm.get('items').get('ripCheatoItemsInLogic').value,
      MerlowRewardPricing: settingsForm.get('difficulty').get('merlowRewardPricing').value,
      ProgressionOnRowf: settingsForm.get('items').get('progressionOnRowf').value,
      ProgressionOnMerlow: settingsForm.get('items').get('progressionOnMerlow').value,
      SeedGoal: settingsForm.get('goals').get('seedGoal').value,
      StarWaySpiritsNeededCnt: settingsForm.get('goals').get('starWaySpiritsNeeded').value,
      RequiredSpirits: settingsForm.get('goals').get('requiredSpirits').value,
      ShuffleStarBeam: isStarBeamReachable ? settingsForm.get('goals').get('shuffleStarBeam').value : false,
      StarBeamSpiritsNeeded: isStarBeamReachable ? settingsForm.get('goals').get('starBeamSpiritsNeeded').value : 0,
      StarHuntTotal: isStarHuntEnabled ? settingsForm.get('goals').get('starHuntTotal').value : 0,
      StarWayPowerStarsNeeded: isStarHuntEnabled ? settingsForm.get('goals').get('starWayPowerStarsNeeded').value : 0,
      StarBeamPowerStarsNeeded: isStarHuntEnabled && isStarBeamReachable ? settingsForm.get('goals').get('starBeamPowerStarsNeeded').value: 0,

      // Glitches: Goomba Region
      PrologueGelEarly: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "PrologueGelEarly"),
      ReverseGoombaKingBridge: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ReverseGoombaKingBridge"),
      GoombaVillageEntryFenceClip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "GoombaVillageEntryFenceClip"),
      GoombaVillageNpcLureExit: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "GoombaVillageNpcLureExit"),
      ClippyLedgeStarPiece: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ClippyLedgeStarPiece"),
      JumplessFireFlower: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "JumplessFireFlower"),
      HammerlessJrPlaygroundLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "HammerlessJrPlaygroundLaki"),
      GoombaVillageLakiExit: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "GoombaVillageLakiExit"),
      PrologueSushieGlitchKsj: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "PrologueSushieGlitchKsj"),
      PrologueSushieGlitchUltraBootsLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "PrologueSushieGlitchUltraBootsLaki"),

      // Glitches: Toad Town
      OddKeyEarly: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "OddKeyEarly"),
      BlueHouseSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BlueHouseSkip"),
      BlueHouseSkipLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BlueHouseSkipLaki"),
      BlueHouseSkipToadLure: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BlueHouseSkipToadLure"),
      JumplessDaneTLetters: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "JumplessDaneTLetters"),
      BowlessToyBoxHammer: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == ("BowlessToyBoxHammer")),
      BowlessToyBoxHammerlessLure: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == ("BowlessToyBoxHammerlessLure")),
      EarlyStoreroomParakarry: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "EarlyStoreroomParakarry"),
      EarlyStoreroomHammer: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "EarlyStoreroomHammer"),
      EarlyStoreroomHammerlessLure: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "EarlyStoreroomHammerlessLure"),
      WhaleEarly: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "WhaleEarly"),
      SushielessToadTownStarPiece: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "SushielessToadTownStarPiece"),
      ToadTownSushieGlitchGearless: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ToadTownSushieGlitchGearless"),
      ToadTownSushieGlitchOneGear: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ToadTownSushieGlitchOneGear"),
      ToadTownSushieGlitchFullGear: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ToadTownSushieGlitchFullGear"),

      // Glitches: Shooting Star Summit
      JumplessSummitClimb: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "JumplessSummitClimb"),

      // Glitches: Toad Town Tunnels
      ClippyBootsStoneBlockSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ClippyBootsStoneBlockSkip"),
      ClippyBootsMetalBlockSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ClippyBootsMetalBlockSkip"),
      IslandPipeBlooperSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "IslandPipeBlooperSkip"),
      ParakarrylessSewerStarPiece: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessSewerStarPiece"),
      ClippySewersUpgradeBlock: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ClippySewersUpgradeBlock"),
      SewerBlocksWithoutUltraBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "SewerBlocksWithoutUltraBoots"),
      Chapter7BridgeWithSuperBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "Chapter7BridgeWithSuperBoots"),
      FirstBlockToShiverCityWithoutSuperBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "FirstBlockToShiverCityWithoutSuperBoots"),
      BlocksToShiverCityWithKooperShellItemThrow: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BlocksToShiverCityWithKooperShellItemThrow"),
      SewerYellowBlockWithUltraBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "SewerYellowBlockWithUltraBoots"),
      JumplessSewerShootingStar: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "JumplessSewerShootingStar"),

      // Glitches: Plesant Path
      KooperlessPleasantPathStarPiece: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "KooperlessPleasantPathStarPiece"),
      PleasantPathClippyTraversal: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "PleasantPathClippyTraversal"),
      HammerlessPleasantPathBridgeUltraBootsParakarry: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "HammerlessPleasantPathBridgeUltraBootsParakarry"),
      InvisibleBridgeClipLzs: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "InvisibleBridgeClipLzs"),
      InvisibleBridgeClipLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "InvisibleBridgeClipLaki"),
      KooperlessPleasantPathThunderBolt: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "KooperlessPleasantPathThunderBolt"),
      JumplessKoopaVillageBluePipe: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "JumplessKoopaVillageBluePipe"),

      // Glitches: Koopa Bros Fortress
      BombettelessKbfFpPlusLZS: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BombettelessKbfFpPlusLZS"),
      BombettelessKbfFpPlusLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BombettelessKbfFpPlusLaki"),
      LakiJailbreak: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "LakiJailbreak"),
      BombettelessRightFortressJailKey: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BombettelessRightFortressJailKey"),
      WaterStaircaseSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "WaterStaircaseSkip"),

      // Glitches: Mt. Rugged
      MtRuggedQuakeHammerAndLetterWithLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "MtRuggedQuakeHammerAndLetterWithLaki"),
      MtRuggedQuakeHammerRoomJumplessClippy: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "MtRuggedQuakeHammerRoomJumplessClippy"),
      ParakarrylessMtRuggedSeed: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessMtRuggedSeed"),
      ParakarrylessMtRuggedSeedClippy: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessMtRuggedSeedClippy"),
      BuzzarGapSkipClippy: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BuzzarGapSkipClippy"),
      ParakarrylessMtRuggedStarPiece: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessMtRuggedStarPiece"),
      ParakarrylessMtRuggedStarPieceClippy: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessMtRuggedStarPieceClippy"),
      MtRuggedCoinsWithKooper: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "MtRuggedCoinsWithKooper"),
      MtRuggedStationJumplessClimbBombette: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "MtRuggedStationJumplessClimbBombette"),
      MtRuggedStationJumplessClimbLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "MtRuggedStationJumplessClimbLaki"),
      MtRuggedStationJumplessClimbLakiBlockClip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "MtRuggedStationJumplessClimbLakiBlockClip"),
      JumplessMtRuggedTrainPlatformParakarry: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "JumplessMtRuggedTrainPlatformParakarry"),

      // Glitches: Dry Dry Desert
      DesertBrickBlockItemWithParakarry: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "DesertBrickBlockItemWithParakarry"),
      JumplessAttackFXC: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "JumplessAttackFXC"),
      EarlyRuinsLakiJump: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "EarlyRuinsLakiJump"),
      EarlyRuinsUltraBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "EarlyRuinsUltraBoots"),

      // Glitches: Dry Dry Ruins
      ArtifactJumpLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ArtifactJumpLaki"),
      ArtifactJumpUltraBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ArtifactJumpUltraBoots"),
      RuinsKeyLakiJump: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RuinsKeyLakiJump"),
      ParakarrylessSecondSandRoomUltraBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessSecondSandRoomUltraBoots"),
      ParakarrylessSecondSandRoomNormalBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessSecondSandRoomNormalBoots"),
      ParakarrylessSuperHammerRoomUltraBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessSuperHammerRoomUltraBoots"),
      ParakarrylessSuperHammerRoomNormalBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessSuperHammerRoomNormalBoots"),
      RuinsLocksSkipClippy: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RuinsLocksSkipClippy"),
      RuinsPuzzleSolutionEarly: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RuinsPuzzleSolutionEarly"),
      RuinsStoneSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RuinsStoneSkip"),

      // Glitches: Boo's Mansion
      JumplessMansionEntry: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "JumplessMansionEntry"),
      ForeverForestBackwards: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ForeverForestBackwards"),
      RecordSkipNoBombettePush: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RecordSkipNoBombettePush"),
      RecordSkipBombettePush: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RecordSkipBombettePush"),
      BoosPortraitWithKooper: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BoosPortraitWithKooper"),
      BoosPortraitWithLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BoosPortraitWithLaki"),

      // Glitches: Gusty Gulch
      GustyGulchGateSkipLZS: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "GustyGulchGateSkipLZS"),
      GustyGulchGateSkipLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "GustyGulchGateSkipLaki"),
      KooperlessGustyGulchDizzyDialJump: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "KooperlessGustyGulchDizzyDialJump"),
      KooperlessGustyGulchDizzyDialLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "KooperlessGustyGulchDizzyDialLaki"),
      KooperlessGustyGulchDizzyDialParakarry: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "KooperlessGustyGulchDizzyDialParakarry"),
      GustyGulchGapSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "GustyGulchGapSkip"),
      GustyGulchClippyTraversal: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "GustyGulchClippyTraversal"),

      // Glitches: Tubba's Castle
      BowlessTubbasCastle: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BowlessTubbasCastle"),
      TubbasTableLakiJumpClock: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "TubbasTableLakiJumpClock"),
      TubbasTableLakiJumpStudy: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "TubbasTableLakiJumpStudy"),
      TubbasTableUltraBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "TubbasTableUltraBoots"),
      TubbasCastleSuperBootsSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "TubbasCastleSuperBootsSkip"),
      JumplessMegaRush: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "JumplessMegaRush"),
      ParakarrylessMegaRush: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessMegaRush"),

      // Glitches: Toy Box
      ParakarrylessBlueBuildingStarPiece: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessBlueBuildingStarPiece"),
      GourmetGuySkipJump: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "GourmetGuySkipJump"),
      GourmetGuySkipLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "GourmetGuySkipLaki"),
      GourmetGuySkipParakarry: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "GourmetGuySkipParakarry"),
      BowlessGreenStation: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BowlessGreenStation"),
      ClippyGreenStationCoinBlock: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ClippyGreenStationCoinBlock"),
      KooperlessRedStationShootingStar: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "KooperlessRedStationShootingStar"),
      GearlessRedStationShootingStar: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "GearlessRedStationShootingStar"),
      ParakarrylessBlueBlockCityGap: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessBlueBlockCityGap"),
      BlueSwitchSkipLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BlueSwitchSkipLaki"),
      BlueSwitchSkipUltraBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BlueSwitchSkipUltraBoots"),
      RedBarricadeSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RedBarricadeSkip"),
      WattlessDarkRoom: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "WattlessDarkRoom"),
      HammerlessBlueStationLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "HammerlessBlueStationLaki"),
      HammerlessPinkStationLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "HammerlessPinkStationLaki"),

      // Glitches: Jade Jungle
      RaphSkipEnglish: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RaphSkipEnglish"),
      RaphSkipParakarry: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RaphSkipParakarry"),
      RaphSkipLakilester: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RaphSkipLakilester"),
      Ch5SushieGlitch: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "Ch5SushieGlitch"),
      SushielessJungleStarpieceAndLetter: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "SushielessJungleStarpieceAndLetter"),
      JumplessDeepJungleLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "JumplessDeepJungleLaki"),

      // Glitches: Mt. Lavalava
      KooperlessLavalavaPowBlockParakarry: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "KooperlessLavalavaPowBlockParakarry"),
      KooperlessLavalavaPowBlockSuperBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "KooperlessLavalavaPowBlockSuperBoots"),
      JumplessLavalavaPowBlock: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "JumplessLavalavaPowBlock"),
      UltraHammerSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "UltraHammerSkip"),
      UltraHammerSkipLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "UltraHammerSkipLaki"),
      UltraHammerSkipSushie: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "UltraHammerSkipSushie"),
      Flarakarry: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "Flarakarry"),
      ParakarrylessFlarakarryBombette: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessFlarakarryBombette"),
      ParakarrylessFlarakarryLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ParakarrylessFlarakarryLaki"),
      VolcanoSushieGlitch: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "VolcanoSushieGlitch"),
      VolcanoSushieGlitchGoombario: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "VolcanoSushieGlitchGoombario"),

      // Glitches: Flower Fields
      EarlyLakiLZS: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "EarlyLakiLZS"),
      EarlyLakiBombettePush: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "EarlyLakiBombettePush"),
      LakilessElevatorRoom: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "LakilessElevatorRoom"),
      BombettelessMegaSmash: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BombettelessMegaSmash"),
      SunTowerSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "SunTowerSkip"),
      YellowBerryGateSkipLZS: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "YellowBerryGateSkipLZS"),
      YellowBerryGateSkipLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "YellowBerryGateSkipLaki"),
      YellowBerryGateSkipBombettePush: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "YellowBerryGateSkipBombettePush"),
      RedBerryGateSkipBombettePush: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RedBerryGateSkipBombettePush"),
      RedBerryGateSkipLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "RedBerryGateSkipLaki"),
      BlueBerryGateSkipBombettePush: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BlueBerryGateSkipBombettePush"),
      BlueBerryGateSkipLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BlueBerryGateSkipLaki"),
      BubbleBerryTreeLakiJump: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BubbleBerryTreeLakiJump"),
      BubbleBerryTreeUltraBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BubbleBerryTreeUltraBoots"),

      // Glitches: Shiver Region
      MurderSolvedEarlyLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "MurderSolvedEarlyLaki"),
      MurderSolvedEarlyBombettePush: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "MurderSolvedEarlyBombettePush"),
      Ch7SushieGlitch: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "Ch7SushieGlitch"),
      StarStoneWithCh7SushieGlitch: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "StarStoneWithCh7SushieGlitch"),
      ShiverMountainHiddenBlockWithoutUltraBootsLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ShiverMountainHiddenBlockWithoutUltraBootsLaki"),
      ShiverMountainHiddenBlockWithoutUltraBootsNoLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ShiverMountainHiddenBlockWithoutUltraBootsNoLaki"),
      SnowmenSkipLaki: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "SnowmenSkipLaki"),
      ShiverMountainSwitchSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ShiverMountainSwitchSkip"),
      SushielessWarehouseKeyBombette: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "SushielessWarehouseKeyBombette"),
      SushielessWarehouseKeyKooper: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "SushielessWarehouseKeyKooper"),

      // Glitches: Crystal Palace
      MirrorClip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "MirrorClip"),
      BombettePuzzleSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BombettePuzzleSkip"),
      KooperPuzzleSkip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "KooperPuzzleSkip"),

      // Glitches: Bowser's Castle
      BowlessBowsersCastleBasement: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BowlessBowsersCastleBasement"),
      WattlessDarkBasement: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "WattlessDarkBasement"),
      BasementSkipParakarry: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BasementSkipParakarry"),
      BasementSkipLakilester: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BasementSkipLakilester"),
      BasementSkipHammer: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BasementSkipHammer"),
      BowsersCastleHub1StairClip: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BowsersCastleHub1StairClip"),
      FastFloodRoomKooper: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "FastFloodRoomKooper"),
      FastFloodRoomKooperless: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "FastFloodRoomKooperless"),
      FastFloodRoomBombetteUltraBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "FastFloodRoomBombetteUltraBoots"),
      Cannonless: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "Cannonless"),
      BombettelessBowsersCastleBasement: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BombettelessBowsersCastleBasement"),

      // Glitches: Global
      BreakStoneBlocksWithUltraBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BreakStoneBlocksWithUltraBoots"),
      BreakYellowBlocksWithSuperBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "BreakYellowBlocksWithSuperBoots"),
      KnowsPuzzleSolutions: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "KnowsPuzzleSolutions"),
      KnowsHiddenBlocks: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "KnowsHiddenBlocks"),
      ReachHighBlocksWithSuperBoots: settingsForm.get('glitches').value.some(enabledGlitch => enabledGlitch.settingName == "ReachHighBlocksWithSuperBoots")
    } as SettingsRequest;

    if(settingsRequest.StartWithRandomPartners) {
      settingsRequest.RandomPartnersMin = settingsForm.get('partners').get('randomPartnersMin').value;
      settingsRequest.RandomPartnersMax = settingsForm.get('partners').get('randomPartnersMax').value;

    }else {
      settingsRequest.RandomPartnersMin = 1
      settingsRequest.RandomPartnersMax = 1
      settingsRequest.StartWithPartners = {
        Goombario: settingsForm.get('partners').get('startWithPartners').get('goombario').value,
        Kooper: settingsForm.get('partners').get('startWithPartners').get('kooper').value,
        Bombette: settingsForm.get('partners').get('startWithPartners').get('bombette').value,
        Parakarry: settingsForm.get('partners').get('startWithPartners').get('parakarry').value,
        Bow: settingsForm.get('partners').get('startWithPartners').get('bow').value,
        Watt: settingsForm.get('partners').get('startWithPartners').get('watt').value,
        Sushie: settingsForm.get('partners').get('startWithPartners').get('sushie').value,
        Lakilester: settingsForm.get('partners').get('startWithPartners').get('lakilester').value
      } as StartingPartners;
    }
    return {
      settings: settingsRequest,
      plandomizer: plandoForm.value
    } as SeedGenerationRequest;
  }
}
