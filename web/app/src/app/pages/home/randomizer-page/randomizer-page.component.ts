import { RandomizerService } from './../../../services/randomizer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import {tap, take} from 'rxjs/operators'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../utilities/custom.validators'

@Component({
  selector: 'app-randomizer-page',
  templateUrl: './randomizer-page.component.html',
  styleUrls: ['./randomizer-page.component.scss']
})
export class RandomizerPageComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup
  randomPartnersMinSubscription: Subscription;

  public constructor(private _randomizerService: RandomizerService) { 

  }

  public ngOnInit(): void {
    this.initFormGroup();
    console.log(this.formGroup)
  }

  public ngOnDestroy(): void {
    this.randomPartnersMinSubscription.unsubscribe();
  }
  public onSubmit(): void {
    console.log(this.formGroup)
  }

  public initFormGroup() {
    this.formGroup = new FormGroup({
      items: new FormGroup({
        shuffleItems: new FormControl(false),
        includeCoins: new FormControl(false),
        includeShops: new FormControl(false),
        includePanels: new FormControl(false),
        includeFavors: new FormControl(false),
        keyitemsOutsideDungeon: new FormControl(false),
        includeDojo: new FormControl(false)
      }),
      badgesAndMoves: new FormGroup({
        shuffleBadgesBP: new FormControl(false),
        shuffleBadgesFP: new FormControl(false),
        shufflePartnerFP: new FormControl(false),
        shuffleStarpowerSP: new FormControl(false)
      }),
      partners: new FormGroup({
        partnersInDefaultLocations: new FormControl(false),
        partnersAlwaysUsable: new FormControl(false),
        startWithRandomPartners: new FormControl(false),
        randomPartnersMin: new FormControl(1, [Validators.min(0), Validators.max(8)]),
        randomPartnersMax: new FormControl(8, [Validators.min(0), Validators.max(8), CustomValidators.greaterOrEqualTo('randomPartnersMin')]),
        startWithPartners: new FormGroup({
          goombario: new FormControl(false),
          kooper: new FormControl(false),
          bombette: new FormControl(false),
          parakarry: new FormControl(false),
          bow: new FormControl(false),
          watt: new FormControl(false),
          sushie: new FormControl(false),
          lakilester: new FormControl(false)
        }, CustomValidators.atLeastOneTrueControl())
      }),
      misc: new FormGroup({
        shuffleChapterDifficulty: new FormControl(false),
        randomFormations: new FormControl(false),
        randomQuiz: new FormControl(false),
        randomCoinPalette: new FormControl(false)
      }),
      qualityOfLife: new FormGroup({   
        hiddenBlockMode: new FormControl(0),           
        alwaysSpeedySpin: new FormControl(false),      
        alwaysISpy: new FormControl(false),      
        alwaysPeekaboo: new FormControl(false),        
        skipQuiz: new FormControl(false),      
        allowPhysicsGlitches: new FormControl(false), 
        writeSpoilerLog: new FormControl(true),        
        turnOffMusic: new FormControl(false),        
      }),
      difficulty: new FormGroup({
        initialCoins: new FormControl(0, [Validators.min(0), Validators.max(999)]),
        capEnemyXP: new FormControl(false),
        noXP: new FormControl(false),
        damageMultiplier: new FormControl(1),
        oneHitKO: new FormControl(false),
        noSaveBlocks: new FormControl(false),
        noHeartBlock: new FormControl(false)      
      }),
      openLocations: new FormGroup({
        flowerGateOpen: new FormControl(false),
        blueHouseOpen : new FormControl(false),
        toyboxOpen: new FormControl(false),
        whaleOpen: new FormControl(false)
      }),
    });

    this.randomPartnersMinSubscription = this.formGroup.get('partners').get('randomPartnersMin').valueChanges.pipe(
      tap(() => this.formGroup.get('partners').get('randomPartnersMax').updateValueAndValidity())
      ).subscribe();
  }
}
