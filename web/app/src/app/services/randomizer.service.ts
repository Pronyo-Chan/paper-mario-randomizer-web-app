import { Observable } from 'rxjs';
import { RandomizerRepository } from './../repositories/randomizer-repository/randomizer.repository';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SettingsRequest, StartingPartners } from '../entities/settingsRequest';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {

  public constructor(private _randomizerRepo: RandomizerRepository) 
  { 
  }

  public createSeedWithSettings(settingsForm: FormGroup): Observable<Blob> 
  {
    var request =
    {
      AlwaysSpeedySpin: settingsForm.get('qualityOfLife').get('alwaysSpeedySpin').value,
      AlwaysISpy: settingsForm.get('qualityOfLife').get('alwaysISpy').value,
      AlwaysPeekaboo: settingsForm.get('qualityOfLife').get('alwaysPeekaboo').value,
      HiddenBlockMode: settingsForm.get('qualityOfLife').get('hiddenBlockMode').value,
      AllowPhysicsGlitches: settingsForm.get('qualityOfLife').get('allowPhysicsGlitches').value,
      InitialCoins: settingsForm.get('difficulty').get('initialCoins').value,
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
      ShuffleChapterDifficulty: settingsForm.get('misc').get('shuffleChapterDifficulty').value,
      RandomFormations: settingsForm.get('misc').get('randomFormations').value,
      ShuffleItems: settingsForm.get('items').get('shuffleItems').value,
      IncludeCoins: settingsForm.get('items').get('includeCoins').value,
      IncludeShops: settingsForm.get('items').get('includeShops').value,
      IncludePanels: settingsForm.get('items').get('includePanels').value,
      IncludeFavors: settingsForm.get('items').get('includeFavors').value,
      IncludeLetterChain: false, //TODO: Not yet implemented
      KeyitemsOutsideDungeon: settingsForm.get('items').get('keyitemsOutsideDungeon').value,
      ShuffleBadgesBP: settingsForm.get('badgesAndMoves').get('shuffleBadgesBP').value,
      ShuffleBadgesFP: settingsForm.get('badgesAndMoves').get('shuffleBadgesFP').value,
      ShufflePartnerFP: settingsForm.get('badgesAndMoves').get('shufflePartnerFP').value,
      ShuffleStarpowerSP: settingsForm.get('badgesAndMoves').get('shuffleStarpowerSP').value,
      RandomQuiz: settingsForm.get('misc').get('randomQuiz').value,
      SkipQuiz: settingsForm.get('qualityOfLife').get('skipQuiz').value,
      PartnersInDefaultLocations: settingsForm.get('partners').get('partnersInDefaultLocations').value,
      PartnersAlwaysUsable: settingsForm.get('partners').get('partnersAlwaysUsable').value,
      StartWithRandomPartners: settingsForm.get('partners').get('startWithRandomPartners').value,
      RandomPartnersMin: settingsForm.get('partners').get('randomPartnersMin').value,
      RandomPartnersMax: settingsForm.get('partners').get('randomPartnersMax').value,
      StartWithPartners: {
        Goombario: settingsForm.get('partners').get('startWithPartners').get('goombario').value,
        Kooper: settingsForm.get('partners').get('startWithPartners').get('kooper').value,
        Bombette: settingsForm.get('partners').get('startWithPartners').get('bombette').value,
        Parakarry: settingsForm.get('partners').get('startWithPartners').get('parakarry').value,
        Bow: settingsForm.get('partners').get('startWithPartners').get('bow').value,
        Watt: settingsForm.get('partners').get('startWithPartners').get('watt').value,
        Sushie: settingsForm.get('partners').get('startWithPartners').get('sushie').value,
        Lakilester: settingsForm.get('partners').get('startWithPartners').get('lakilester').value,
      } as StartingPartners,
      WriteSpoilerLog: settingsForm.get('qualityOfLife').get('writeSpoilerLog').value,
      RandomCoinPalette: settingsForm.get('misc').get('randomCoinPalette').value,
      TurnOffMusic: settingsForm.get('qualityOfLife').get('turnOffMusic').value,
      IncludeDojo: settingsForm.get('items').get('includeDojo').value
    } as SettingsRequest

    return this._randomizerRepo.sendRandoSettings(request);
  }
}
