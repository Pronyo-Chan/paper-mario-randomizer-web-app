import { Constants } from './../utilities/constants';
import { environment } from 'src/environments/environment';
import { SettingsResponse } from './../entities/settingsResponse';
import { combineLatest, combineLatestAll, combineLatestWith, forkJoin, map, merge, mergeMap, Observable, switchMap } from 'rxjs';
import { RandomizerRepository } from './../repositories/randomizer-repository/randomizer.repository';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SettingsRequest, StartingPartners } from '../entities/settingsRequest';
import { DifficultySetting } from '../entities/enum/difficultySetting';
import { getMarcFileFromSource } from '../utilities/RomPatcher/MarcFile';
import { applyPatch } from '../utilities/RomPatcher/RomPatcher';
import { parseBPSFile } from '../utilities/RomPatcher/bps';
import { parseRandoPatchFile } from '../utilities/RomPatcher/randopatch';
import { CharacterSpriteSetting } from '../entities/characterSpriteSetting';


@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  public constructor(private _randomizerRepo: RandomizerRepository) 
  { 
  }

  public getSeedInfo(seedId: string): Observable<SettingsResponse> 
  {
    return this._randomizerRepo.getSeedInfo(seedId);
  }

  public downloadPatchedRom(userRom: any, seedId: string, modVersion: number): Observable<Blob> 
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

    return forkJoin([starRodRom$, randoPatch$]).pipe(
      map(results => {
        //execute randopatch and change return
        var finalRomMarcFile = applyPatch(results[1], results[0]);
        return finalRomMarcFile.save();
      })
    ) 
  }

  public downloadSpoilerLog(seedId: string): Observable<Blob> 
  {
    return this._randomizerRepo.getSpoilerLog(seedId);
  }

  public createSeedWithSettings(settingsForm: FormGroup): Observable<string> {
    var request = this.prepareRequestObject(settingsForm);
    return this._randomizerRepo.sendRandoSettings(request)

  }

  private prepareRequestObject(settingsForm: FormGroup) {
    var request =  {
      StarRodModVersion: environment.currentModVersion,
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
      NoHeartBlock: settingsForm.get('difficulty').get('noHeartBlock').value,
      BlueHouseOpen: settingsForm.get('openLocations').get('blueHouseOpen').value,
      ToyboxOpen: settingsForm.get('openLocations').get('toyboxOpen').value,
      FlowerGateOpen: settingsForm.get('openLocations').get('flowerGateOpen').value,
      WhaleOpen: settingsForm.get('openLocations').get('whaleOpen').value,
      StartingMap: settingsForm.get('openLocations').get('startingMap').value,
      ShuffleChapterDifficulty: settingsForm.get('difficulty').get('difficultyMode').value == DifficultySetting.RandomChapterDifficulty,
      ProgressiveScaling: settingsForm.get('difficulty').get('difficultyMode').value == DifficultySetting.ProgressiveScaling,
      RandomFormations: settingsForm.get('gameplay').get('randomFormations').value,
      ShuffleItems: settingsForm.get('items').get('shuffleItems').value,
      IncludeCoins: settingsForm.get('items').get('includeCoins').value,
      IncludeShops: settingsForm.get('items').get('includeShops').value,
      IncludePanels: settingsForm.get('items').get('includePanels').value,
      IncludeFavors: false,
      IncludeLetterChain: false,
      KeyitemsOutsideDungeon: settingsForm.get('items').get('keyitemsOutsideDungeon').value,
      ShuffleBadgesBP: settingsForm.get('gameplay').get('shuffleBadgesBP').value,
      ShuffleBadgesFP: settingsForm.get('gameplay').get('shuffleBadgesFP').value,
      ShufflePartnerFP: settingsForm.get('gameplay').get('shufflePartnerFP').value,
      ShuffleStarpowerSP: settingsForm.get('gameplay').get('shuffleStarpowerSP').value,
      RandomQuiz: settingsForm.get('gameplay').get('randomQuiz').value,
      SkipQuiz: settingsForm.get('qualityOfLife').get('skipQuiz').value,
      QuizmoAlwaysAppears: settingsForm.get('qualityOfLife').get('quizmoAlwaysAppears').value,
      PartnersInDefaultLocations: !settingsForm.get('partners').get('shufflePartners').value,
      PartnersAlwaysUsable: settingsForm.get('partners').get('partnersAlwaysUsable').value,
      StartWithRandomPartners: settingsForm.get('partners').get('startWithRandomPartners').value,
      WriteSpoilerLog: settingsForm.get('qualityOfLife').get('writeSpoilerLog').value,
      RomanNumerals: settingsForm.get('qualityOfLife').get('romanNumerals').value,
      TurnOffMusic: settingsForm.get('qualityOfLife').get('turnOffMusic').value,
      IncludeDojo: settingsForm.get('items').get('includeDojo').value,
      ShortenBowsersCastle: settingsForm.get('qualityOfLife').get('shortenBowsersCastle').value,
      ShortenCutscenes: settingsForm.get('qualityOfLife').get('shortenCutscenes').value,
      SkipEpilogue: settingsForm.get('qualityOfLife').get('skipEpilogue').value,
      Box5ColorA: Constants.MENU_COLORS[settingsForm.get('colorPalettes').get('menu').value].colorA,
      Box5ColorB: Constants.MENU_COLORS[settingsForm.get('colorPalettes').get('menu').value].colorB,
      MarioSetting: (settingsForm.get('colorPalettes').get('marioSprite').value as CharacterSpriteSetting).setting,
      MarioSprite: (settingsForm.get('colorPalettes').get('marioSprite').value as CharacterSpriteSetting).paletteSelection,
      GoombarioSetting: (settingsForm.get('colorPalettes').get('goombarioSprite').value as CharacterSpriteSetting).setting,
      GoombarioSprite: (settingsForm.get('colorPalettes').get('goombarioSprite').value as CharacterSpriteSetting).paletteSelection,
      KooperSetting: (settingsForm.get('colorPalettes').get('kooperSprite').value as CharacterSpriteSetting).setting,
      KooperSprite: (settingsForm.get('colorPalettes').get('kooperSprite').value as CharacterSpriteSetting).paletteSelection,
      BowSetting: (settingsForm.get('colorPalettes').get('bowSprite').value as CharacterSpriteSetting).setting,
      BowSprite: (settingsForm.get('colorPalettes').get('bowSprite').value as CharacterSpriteSetting).paletteSelection,
      BossesSetting: settingsForm.get('colorPalettes').get('bossesSetting').value,
      NPCSetting: settingsForm.get('colorPalettes').get('npcSetting').value,
      RandomCoinPalette: settingsForm.get('colorPalettes').get('randomCoinPalette').value,
      StartingMaxHP: settingsForm.get('marioStats').get('startingMaxHP').value,
      StartingMaxFP: settingsForm.get('marioStats').get('startingMaxFP').value,
      StartingMaxBP: settingsForm.get('marioStats').get('startingMaxBP').value,
      StartingItem1: settingsForm.get('marioStats').get('startingItems').value[0]?.value,
      StartingItem2: settingsForm.get('marioStats').get('startingItems').value[1]?.value,
      StartingItem3: settingsForm.get('marioStats').get('startingItems').value[2]?.value,
      StartingItem4: settingsForm.get('marioStats').get('startingItems').value[3]?.value,
      StartingItem5: settingsForm.get('marioStats').get('startingItems').value[4]?.value,
      StartingItem6: settingsForm.get('marioStats').get('startingItems').value[5]?.value,
      StartingItem7: settingsForm.get('marioStats').get('startingItems').value[6]?.value,
      StartingItem8: settingsForm.get('marioStats').get('startingItems').value[7]?.value,
      StartingItem9: settingsForm.get('marioStats').get('startingItems').value[8]?.value,
      StartingItemA: settingsForm.get('marioStats').get('startingItems').value[9]?.value,
      StartingItemB: settingsForm.get('marioStats').get('startingItems').value[10]?.value,
      StartingItemC: settingsForm.get('marioStats').get('startingItems').value[11]?.value,
      StartingItemD: settingsForm.get('marioStats').get('startingItems').value[12]?.value,
      StartingItemE: settingsForm.get('marioStats').get('startingItems').value[13]?.value,
      StartingItemF: settingsForm.get('marioStats').get('startingItems').value[14]?.value,
      
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
