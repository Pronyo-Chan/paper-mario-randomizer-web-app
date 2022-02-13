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
      StartingCoins: settingsForm.get('difficulty').get('startingCoins').value,
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
      ShuffleChapterDifficulty: settingsForm.get('difficulty').get('difficultyMode').value == DifficultySetting.RandomChapterDifficulty,
      ProgressiveScaling: settingsForm.get('difficulty').get('difficultyMode').value == DifficultySetting.ProgressiveScaling,
      RandomFormations: settingsForm.get('misc').get('randomFormations').value,
      ShuffleItems: settingsForm.get('items').get('shuffleItems').value,
      IncludeCoins: settingsForm.get('items').get('includeCoins').value,
      IncludeShops: settingsForm.get('items').get('includeShops').value,
      IncludePanels: settingsForm.get('items').get('includePanels').value,
      IncludeFavors: false,
      IncludeLetterChain: false,
      KeyitemsOutsideDungeon: settingsForm.get('items').get('keyitemsOutsideDungeon').value,
      ShuffleBadgesBP: settingsForm.get('badgesAndMoves').get('shuffleBadgesBP').value,
      ShuffleBadgesFP: settingsForm.get('badgesAndMoves').get('shuffleBadgesFP').value,
      ShufflePartnerFP: settingsForm.get('badgesAndMoves').get('shufflePartnerFP').value,
      ShuffleStarpowerSP: settingsForm.get('badgesAndMoves').get('shuffleStarpowerSP').value,
      RandomQuiz: settingsForm.get('misc').get('randomQuiz').value,
      SkipQuiz: settingsForm.get('qualityOfLife').get('skipQuiz').value,
      QuizmoAlwaysAppears: false,
      PartnersInDefaultLocations: !settingsForm.get('partners').get('shufflePartners').value,
      PartnersAlwaysUsable: settingsForm.get('partners').get('partnersAlwaysUsable').value,
      StartWithRandomPartners: settingsForm.get('partners').get('startWithRandomPartners').value,
      WriteSpoilerLog: settingsForm.get('qualityOfLife').get('writeSpoilerLog').value,
      RandomCoinPalette: settingsForm.get('misc').get('randomCoinPalette').value,
      RomanNumerals: false,
      TurnOffMusic: settingsForm.get('qualityOfLife').get('turnOffMusic').value,
      IncludeDojo: settingsForm.get('items').get('includeDojo').value,
      ShortenBowsersCastle: settingsForm.get('qualityOfLife').get('shortenBowsersCastle').value
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
