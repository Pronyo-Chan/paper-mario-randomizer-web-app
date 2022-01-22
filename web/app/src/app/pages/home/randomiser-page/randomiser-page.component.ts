import { PatcherRepository } from '../../../repositories/patcher-repository/patcher.repository';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import {tap, take} from 'rxjs/operators'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../utilities/custom.validators'

@Component({
  selector: 'app-patcher',
  templateUrl: './randomiser-page.component.html',
  styleUrls: ['./randomiser-page.component.scss']
})
export class RandomiserPageComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup
  randomPartnersMinSubscription: Subscription;
  public constructor(private _patcherRepo: PatcherRepository) { }

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
        keyitemsOutsideDungeon: new FormControl(false)
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
        })
      }),
      misc: new FormGroup({
        shuffleChapterDifficulty: new FormControl(false),
        randomFormations: new FormControl(false),
        randomQuiz: new FormControl(false),
        skipQuiz: new FormControl(false),
        colorA: new FormControl(false),
        colorB: new FormControl(false),
        randomCoinPalette: new FormControl(false),      
        blocksMatchContent: new FormControl(false),      
        alwaysSpeedySpin: new FormControl(false),      
        alwaysISpy: new FormControl(false),      
        alwaysPeekaboo: new FormControl(false),      
      }),
      difficulty: new FormGroup({
        capEnemyXP: new FormControl(false),
        noXP: new FormControl(false),
        damageMultiplier: new FormControl(1),
        oneHitKO: new FormControl(false),
        noSaveBlocks: new FormControl(false),
        noHeartBlocks: new FormControl(false)      
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
