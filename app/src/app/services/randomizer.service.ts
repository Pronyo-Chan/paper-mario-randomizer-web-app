import { MarcFile } from './../utilities/RomPatcher/MarcFile';
import { CosmeticsRequest } from './../entities/cosmeticsRequest';
import { LocalStorageService } from './localStorage/localStorage.service';
import { SettingStringMappingService } from './setting-string-mapping/setting-string-mapping.service';
import { KeyItems } from './../entities/enum/keyItems';
import { Constants } from './../utilities/constants';
import { environment } from 'src/environments/environment';
import { SettingsResponse } from './../entities/settingsResponse';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { RandomizerRepository } from './../repositories/randomizer-repository/randomizer.repository';
import { FormGroup } from '@angular/forms';
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


@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  public constructor(private _randomizerRepo: RandomizerRepository, private _settingsStringService: SettingStringMappingService, private _localStorage: LocalStorageService) 
  { 
  }

  public getSeedInfo(seedId: string): Observable<SettingsResponse> 
  {
    return this._randomizerRepo.getSeedInfo(seedId);
  }

  public downloadPatchedRom(userRom: any, seedId: string, modVersion: number, cosmeticsFormGroup?: FormGroup): Observable<Blob> 
  {
    var starRodRom$ = this._randomizerRepo.getStarRodPatch(modVersion).pipe(
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

  public createSeedWithSettings(settingsForm: FormGroup): Observable<string> {
    var request = this.prepareRequestObject(settingsForm);
    return this._randomizerRepo.sendRandoSettings(request)
  }

  private saveCosmeticsSettings(formGroup: FormGroup) {
    const cosmeticsSettings = this._settingsStringService.compressFormGroup(formGroup, this._settingsStringService.cosmeticsMap)
    this._localStorage.set('cosmeticsSettings', cosmeticsSettings);
  }

  private prepareCosmeticsRequest(seedID: string, cosmeticsFormGroup: FormGroup): CosmeticsRequest {
    var menuColor = cosmeticsFormGroup.get('menu').value
    if(menuColor == 7) { // If random pick
      menuColor = Math.floor(Math.random() * 7);
    } 

    var request = {
      SeedID: seedID,
      BossesSetting: cosmeticsFormGroup.get("bossesSetting").value,
      BowSetting: (cosmeticsFormGroup.get('bowSprite').value as CharacterSpriteSetting).setting,
      BowSprite: (cosmeticsFormGroup.get('bowSprite').value as CharacterSpriteSetting).paletteSelection,
      Box5ColorA: Constants.MENU_COLORS[menuColor].colorA,
      Box5ColorB: Constants.MENU_COLORS[menuColor].colorB,
      CoinColor: cosmeticsFormGroup.get('coinColor').value != CoinColor.Random ? cosmeticsFormGroup.get('coinColor').value : 0, // Is ignored if random
      GoombarioSetting: (cosmeticsFormGroup.get('goombarioSprite').value as CharacterSpriteSetting).setting,
      GoombarioSprite: (cosmeticsFormGroup.get('goombarioSprite').value as CharacterSpriteSetting).paletteSelection,
      KooperSetting: (cosmeticsFormGroup.get('kooperSprite').value as CharacterSpriteSetting).setting,
      KooperSprite: (cosmeticsFormGroup.get('kooperSprite').value as CharacterSpriteSetting).paletteSelection,
      MarioSetting: (cosmeticsFormGroup.get('marioSprite').value as CharacterSpriteSetting).setting,
      MarioSprite: (cosmeticsFormGroup.get('marioSprite').value as CharacterSpriteSetting).paletteSelection,
      NPCSetting: cosmeticsFormGroup.get("npcSetting").value,
      ParakarrySetting: (cosmeticsFormGroup.get('parakarrySprite').value as CharacterSpriteSetting).setting,
      ParakarrySprite: (cosmeticsFormGroup.get('parakarrySprite').value as CharacterSpriteSetting).paletteSelection,
      RandomCoinColor: cosmeticsFormGroup.get('coinColor').value == CoinColor.Random,
      RandomText: cosmeticsFormGroup.get("randomText").value,
      RomanNumerals: cosmeticsFormGroup.get("romanNumerals").value,
      SushieSetting: (cosmeticsFormGroup.get('sushieSprite').value as CharacterSpriteSetting).setting,
      SushieSprite: (cosmeticsFormGroup.get('sushieSprite').value as CharacterSpriteSetting).paletteSelection,
      WattSetting: (cosmeticsFormGroup.get('wattSprite').value as CharacterSpriteSetting).setting,
      WattSprite: (cosmeticsFormGroup.get('wattSprite').value as CharacterSpriteSetting).paletteSelection,
    } as CosmeticsRequest

    return request;
  }

  private prepareRequestObject(settingsForm: FormGroup) {
    var menuColor = settingsForm.get('cosmetics').get('menu').value
    if(menuColor == 7) { // If random pick
      menuColor = Math.floor(Math.random() * 7);
    } 

    var settingsString = this._settingsStringService.compressFormGroup(settingsForm, this._settingsStringService.settingsMap);
    this._localStorage.set('latestSettingsString', settingsString);

    var request =  {
      StarRodModVersion: environment.currentModVersion,
      SettingsString: settingsString,
      AlwaysSpeedySpin: settingsForm.get('qualityOfLife').get('alwaysSpeedySpin').value,
      AlwaysISpy: settingsForm.get('qualityOfLife').get('alwaysISpy').value,
      AlwaysPeekaboo: settingsForm.get('qualityOfLife').get('alwaysPeekaboo').value,
      HiddenBlockMode: settingsForm.get('qualityOfLife').get('hiddenBlockMode').value,
      AllowPhysicsGlitches: !settingsForm.get('qualityOfLife').get('preventPhysicsGlitches').value,
      StartingCoins: settingsForm.get('marioStats').get('startingCoins').value,
      CapEnemyXP: settingsForm.get('difficulty').get('capEnemyXP').value,
      NoXP: settingsForm.get('difficulty').get('noXP').value,
      DoubleDamage: settingsForm.get('difficulty').get('damageMultiplier').value == 2,
      QuadrupleDamage: settingsForm.get('difficulty').get('damageMultiplier').value == 4,
      OHKO: settingsForm.get('difficulty').get('oneHitKO').value,
      NoSaveBlocks: settingsForm.get('difficulty').get('noSaveBlocks').value,
      NoHeartBlocks: settingsForm.get('difficulty').get('noHeartBlocks').value,
      BlueHouseOpen: settingsForm.get('openLocations').get('blueHouseOpen').value,
      ToyboxOpen: settingsForm.get('openLocations').get('toyboxOpen').value,
      MagicalSeedsRequired: settingsForm.get('openLocations').get('magicalSeedsRequired').value,
      WhaleOpen: settingsForm.get('openLocations').get('whaleOpen').value,
      StartingMap: settingsForm.get('openLocations').get('startingMap').value,
      ShuffleChapterDifficulty: settingsForm.get('difficulty').get('difficultyMode').value == DifficultySetting.RandomChapterDifficulty,
      ProgressiveScaling: settingsForm.get('difficulty').get('difficultyMode').value == DifficultySetting.ProgressiveScaling,
      RandomFormations: settingsForm.get('gameplay').get('randomFormations').value,
      ShuffleItems: settingsForm.get('items').get('shuffleItems').value,
      IncludeCoins: settingsForm.get('items').get('includeCoins').value,
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
      PartnersInDefaultLocations: !settingsForm.get('partners').get('shufflePartners').value,
      PartnersAlwaysUsable: settingsForm.get('partners').get('partnersAlwaysUsable').value,
      StartWithRandomPartners: settingsForm.get('partners').get('startWithRandomPartners').value,
      WriteSpoilerLog: settingsForm.get('qualityOfLife').get('writeSpoilerLog').value,
      RevealLogInHours: settingsForm.get('qualityOfLife').get('revealLogInHours').value,
      RomanNumerals: settingsForm.get('cosmetics').get('romanNumerals').value,
      IncludeDojo: settingsForm.get('items').get('includeDojo').value,
      BowsersCastleMode: settingsForm.get('qualityOfLife').get('bowsersCastleMode').value,
      ShortenCutscenes: settingsForm.get('qualityOfLife').get('shortenCutscenes').value,
      SkipEpilogue: settingsForm.get('qualityOfLife').get('skipEpilogue').value,
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
      ParakarrySetting: (settingsForm.get('cosmetics').get('parakarrySprite').value as CharacterSpriteSetting).setting,
      ParakarrySprite: (settingsForm.get('cosmetics').get('parakarrySprite').value as CharacterSpriteSetting).paletteSelection,
      BowSetting: (settingsForm.get('cosmetics').get('bowSprite').value as CharacterSpriteSetting).setting,
      BowSprite: (settingsForm.get('cosmetics').get('bowSprite').value as CharacterSpriteSetting).paletteSelection,
      WattSetting: (settingsForm.get('cosmetics').get('wattSprite').value as CharacterSpriteSetting).setting,
      WattSprite: (settingsForm.get('cosmetics').get('wattSprite').value as CharacterSpriteSetting).paletteSelection,
      SushieSetting: (settingsForm.get('cosmetics').get('sushieSprite').value as CharacterSpriteSetting).setting,
      SushieSprite: (settingsForm.get('cosmetics').get('sushieSprite').value as CharacterSpriteSetting).paletteSelection,
      BossesSetting: settingsForm.get('cosmetics').get('bossesSetting').value,
      NPCSetting: settingsForm.get('cosmetics').get('npcSetting').value,
      StartingMaxHP: settingsForm.get('marioStats').get('startingMaxHP').value,
      StartingMaxFP: settingsForm.get('marioStats').get('startingMaxFP').value,
      StartingMaxBP: settingsForm.get('marioStats').get('startingMaxBP').value,
      StartingStarPower: settingsForm.get('marioStats').get('startingStarPower').value,
      StartingBoots: settingsForm.get('marioStats').get('startingBoots').value,
      StartingHammer: settingsForm.get('marioStats').get('startingHammer').value,
      StartingItem0: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[0]?.value,
      StartingItem1: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[1]?.value,
      StartingItem2: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[2]?.value,
      StartingItem3: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[3]?.value,
      StartingItem4: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[4]?.value,
      StartingItem5: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[5]?.value,
      StartingItem6: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[6]?.value,
      StartingItem7: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[7]?.value,
      StartingItem8: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[8]?.value,
      StartingItem9: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[9]?.value,
      StartingItemA: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[10]?.value,
      StartingItemB: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[11]?.value,
      StartingItemC: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[12]?.value,
      StartingItemD: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[13]?.value,
      StartingItemE: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[14]?.value,
      StartingItemF: settingsForm.get('marioStats').get('startWithRandomItems').value ? 0: settingsForm.get('marioStats').get('startingItems').value[15]?.value,
      ItemScarcity: settingsForm.get('difficulty').get('itemScarcity').value,
      StarWaySpiritsNeeded: settingsForm.get('difficulty').get('starWaySpiritsNeeded').value,
      FoliageItemHints: settingsForm.get('qualityOfLife').get('foliageItemHints').value,
      RandomText: settingsForm.get('cosmetics').get('randomText').value,
      NoHealingItems: settingsForm.get('difficulty').get('noHealingItems').value,
      StartWithRandomItems: settingsForm.get('marioStats').get('startWithRandomItems').value,
      RandomItemsMin: settingsForm.get('marioStats').get('randomItemsMin').value,
      RandomItemsMax: settingsForm.get('marioStats').get('randomItemsMax').value,
      AddItemPouches: settingsForm.get('items').get('itemPouches').value,
      RandomChoice: settingsForm.get('gameplay').get('mysteryMode').value == MysteryMode.RandomOnEveryUse,
      MysteryRandomPick: settingsForm.get('gameplay').get('mysteryMode').value == MysteryMode.RandomPick,
      ItemTrapMode: settingsForm.get('difficulty').get('itemTrapMode').value,
      AllowItemHints: settingsForm.get('difficulty').get('allowItemHints').value,
      IncludeRadioTradeEvent: settingsForm.get('items').get('includeRadioTradeEvent').value

      
    } as SettingsRequest;

    if(request.StartWithRandomPartners) {
      request.RandomPartnersMin = settingsForm.get('partners').get('randomPartnersMin').value;
      request.RandomPartnersMax = settingsForm.get('partners').get('randomPartnersMax').value;
      
    }else {
      request.StartWithPartners = {
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
    return request;
  }
}
