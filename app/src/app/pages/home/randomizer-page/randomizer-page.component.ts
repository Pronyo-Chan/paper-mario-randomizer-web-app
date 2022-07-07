import { Hammer } from './../../../entities/enum/hammer';
import { BowsersCastleMode } from './../../../entities/enum/bowsersCastleMode';
import { LettersMode } from './../../../entities/enum/lettersMode';
import { KootFavorsMode } from './../../../entities/enum/kootFavorsMode';
import { ItemTrapMode } from './../../../entities/enum/itemTrapMode';
import { MysteryMode } from './../../../entities/enum/mysteryMode';
import { LocalStorageService } from './../../../services/localStorage/localStorage.service';

import { SpriteSetting } from './../../../entities/enum/spriteSetting';
import { RandomizerService } from './../../../services/randomizer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import {tap, catchError} from 'rxjs/operators'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../utilities/custom.validators'
import { DifficultySetting } from 'src/app/entities/enum/difficultySetting';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CoinColor } from 'src/app/entities/enum/coinColor';
import { Boots } from 'src/app/entities/enum/boots';

@Component({
  selector: 'app-randomizer-page',
  templateUrl: './randomizer-page.component.html',
  styleUrls: ['./randomizer-page.component.scss']
})
export class RandomizerPageComponent implements OnInit, OnDestroy {

  public homepageLink;
  public formGroup: FormGroup
  randomPartnersMinSubscription: Subscription;

  public isRandomizing = false;
  public seedGenError: string;
  private _createSeedSubscription: Subscription;

  public constructor(private _randomizerService: RandomizerService, private _localStorage: LocalStorageService, private _router: Router){}

  public ngOnInit(): void {
    this.homepageLink = environment.homepage;
    this.initFormGroup();
  }

  public ngOnDestroy(): void {
    if(this.randomPartnersMinSubscription) {
      this.randomPartnersMinSubscription.unsubscribe();
    }    

    if(this._createSeedSubscription) {
      this._createSeedSubscription.unsubscribe();
    }   
  }

  public onSubmit() {
    this.seedGenError = null;
    this.isRandomizing = true;

    this._createSeedSubscription = this._randomizerService.createSeedWithSettings(this.formGroup).pipe(
      tap(seedId => {
        this._localStorage.set("latestSeedId", seedId)
        this.navigateToSeedPage(seedId);
      }),
      catchError(err => {
        if(typeof err.error === 'string' && (err.error as string)?.includes("StarRodModVersion")) {
          this.seedGenError = "Server version mismatch. Please refresh the page and try again."
        }
        else {
          this.seedGenError = 'A server error has occured';
        }
        
        this.isRandomizing = false;
        return of(err)
      })
    ).subscribe()
  }

  public navigateToSeedPage(seedId: string): void {
    this._router.navigate(['/seed'], {queryParams: {id: seedId}})
  }

  public initFormGroup() {
    this.formGroup = new FormGroup({
      items: new FormGroup({
        shuffleItems: new FormControl(false),
        includeCoins: new FormControl(false),
        includeShops: new FormControl(false),
        includePanels: new FormControl(false),
        includeFavors: new FormControl(KootFavorsMode.Vanilla),
        keyitemsOutsideDungeon: new FormControl(false),
        includeDojo: new FormControl(false),
        itemPouches: new FormControl(false),
        includeLetters: new FormControl(LettersMode.Vanilla),
        includeRadioTradeEvent: new FormControl(false)
      }),
      gameplay: new FormGroup({
        randomBadgesBP: new FormControl(0),
        randomBadgesFP: new FormControl(0),
        randomPartnerFP: new FormControl(0),
        randomStarpowerSP: new FormControl(0),
        randomFormations: new FormControl(false),
        mysteryMode: new FormControl(MysteryMode.Vanilla),
      }),
      partners: new FormGroup({
        shufflePartners: new FormControl(false),
        partnersAlwaysUsable: new FormControl(false),
        startWithRandomPartners: new FormControl(false),
        randomPartnersMin: new FormControl(1, [Validators.min(1), Validators.max(8)]),
        randomPartnersMax: new FormControl(8, [Validators.min(1), Validators.max(8), CustomValidators.greaterOrEqualTo('randomPartnersMin')]),
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
      qualityOfLife: new FormGroup({   
        hiddenBlockMode: new FormControl(0),           
        alwaysSpeedySpin: new FormControl(false),      
        alwaysISpy: new FormControl(false),      
        alwaysPeekaboo: new FormControl(false),        
        skipQuiz: new FormControl(false),      
        preventPhysicsGlitches: new FormControl(false), 
        bowsersCastleMode: new FormControl(BowsersCastleMode.Vanilla), 
        shortenCutscenes: new FormControl(false), 
        skipEpilogue: new FormControl(false), 
        writeSpoilerLog: new FormControl(true),
        revealLogInHours: new FormControl(0),
        quizmoAlwaysAppears: new FormControl(false),
        foliageItemHints: new FormControl(false),        
      }),
      difficulty: new FormGroup({
        difficultyMode: new FormControl(DifficultySetting.Vanilla),
        capEnemyXP: new FormControl(false),
        noXP: new FormControl(false),
        damageMultiplier: new FormControl(1),
        oneHitKO: new FormControl(false),
        noSaveBlocks: new FormControl(false),
        noHeartBlocks: new FormControl(false),
        itemScarcity: new FormControl(0),
        starWaySpiritsNeeded: new FormControl(7),
        noHealingItems: new FormControl(false),
        itemTrapMode: new FormControl(0),
        allowItemHints: new FormControl(true)
      }),
      marioStats: new FormGroup({
        startingCoins: new FormControl(0, [Validators.min(0), Validators.max(999)]), 
        startingMaxHP: new FormControl(10), 
        startingMaxFP: new FormControl(5), 
        startingMaxBP: new FormControl(3),
        startingStarPower: new FormControl(0),
        startingBoots: new FormControl(Boots.Default),
        startingHammer: new FormControl(Hammer.Default),
        startingItems: new FormControl([]),
        startWithRandomItems: new FormControl(false),
        randomItemsMin: new FormControl(0, [Validators.min(0), Validators.max(16)]),
        randomItemsMax: new FormControl(16, [Validators.min(0), Validators.max(16), CustomValidators.greaterOrEqualTo('randomItemsMin')]),
      }),
      openLocations: new FormGroup({
        flowerGateOpen: new FormControl(false),
        blueHouseOpen : new FormControl(false),
        toyboxOpen: new FormControl(false),
        whaleOpen: new FormControl(false),
        startingMap: new FormControl(0)
      }),
      cosmetics: new FormGroup({
        menu: new FormControl(0),
        marioSprite : new FormControl(),
        goombarioSprite : new FormControl(),
        kooperSprite : new FormControl(),
        parakarrySprite : new FormControl(),
        bowSprite : new FormControl(),
        wattSprite: new FormControl(),
        sushieSprite: new FormControl(),
        bossesSetting: new FormControl(SpriteSetting.DefaultPalette),
        npcSetting: new FormControl(SpriteSetting.DefaultPalette),
        coinColor: new FormControl(CoinColor.Default),
        randomText: new FormControl(false),
        romanNumerals: new FormControl(false),
      }),
      glitches: new FormControl([])
      /*glitches: new FormGroup({
        prologueGelEarly: new FormControl(false),
        oddKeyEarly: new FormControl(false),
        blueHouseSkip: new FormControl(false),
        bowlessToyBox: new FormControl(false),
        earlyStoreroomParakarry: new FormControl(false),
        earlyStoreroomHammer: new FormControl(false),
        whaleEarly: new FormControl(false),
        sushielessToadTownStarPiece: new FormControl(false),
        clippyBootsStoneBlockSkip: new FormControl(false),
        clippyBootsMetalBlockSkip: new FormControl(false),
        islandPipeBlooperSkip: new FormControl(false),
        parakarrylessSewerStarPiece: new FormControl(false),
        sewerBlocksWithoutUltraBoots: new FormControl(false),
        kooperlessPleasantPathStarPiece: new FormControl(false),
        invisibleBridgeClipLzs: new FormControl(false),
        invisibleBridgeClipLaki: new FormControl(false),
        kooperlessPleasantPathThunderBolt: new FormControl(false),
        bombettelessKbfFpPlus: new FormControl(false),
        lakiJailbreak: new FormControl(false),
        waterStaircaseSkip: new FormControl(false),
      })*/
    });

    this.randomPartnersMinSubscription = this.formGroup.get('partners').get('randomPartnersMin').valueChanges.pipe(
      tap(() => this.formGroup.get('partners').get('randomPartnersMax').updateValueAndValidity())
      ).subscribe();
  }
}
