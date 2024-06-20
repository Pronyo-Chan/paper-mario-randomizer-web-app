import { MerlowRewardPricing } from './../../../entities/enum/merlowRewardPricing';
import { StartingMap } from './../../../entities/enum/startingMaps';
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
import { GearShuffleMode } from 'src/app/entities/enum/gearShuffleMode';
import { RandomConsumableMode } from 'src/app/entities/enum/randomConsumableMode';
import { PartnerUpgradeShuffleMode } from 'src/app/entities/enum/partnerUpgradeShuffleMode';
import { MirrorMode } from 'src/app/entities/enum/mirrorMode';
import { SeedGoal } from 'src/app/entities/enum/seedGoal';

@Component({
  selector: 'app-randomizer-page',
  templateUrl: './randomizer-page.component.html',
  styleUrls: ['./randomizer-page.component.scss']
})
export class RandomizerPageComponent implements OnInit, OnDestroy {
  public readonly LACKING_SHUFFLE_HAMMERLESS_START_ERROR = 'toadTownHammerlessStart';
  public readonly LACKING_SHUFFLE_JUMPLESS_START_ERROR = 'jumplessStartNoShuffle';
  public readonly LACKING_SHUFFLE_STAR_HUNT_ERROR = 'starHuntNoShuffle';
  public readonly SHUFFLED_ENTRANCES_NO_ITEMS_ERROR = 'entranceRandoNoShuffle';
  public readonly LIMIT_CHAPTERS_NO_KEYSANITY_ERROR = 'limitChaptersNoKeysanity';

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
    const errors = this.validateSettings();
    if(errors.length) {
      if (errors.some(e => e == this.LACKING_SHUFFLE_HAMMERLESS_START_ERROR)) {
        this.seedGenError = "Hammerless Start is impossible without shuffled partners or full gear shuffle."
        return;
      } else if (errors.some(e => e == this.LACKING_SHUFFLE_JUMPLESS_START_ERROR)) {
        this.seedGenError = "Jumpless Start is impossible without Item Shuffle enabled."
        return;
      } else if (errors.some(e => e == this.SHUFFLED_ENTRANCES_NO_ITEMS_ERROR)) {
        this.seedGenError = "Shuffling entrances is impossible without Item and Partner Shuffle enabled."
        return;
      } else if (errors.some(e => e == this.LACKING_SHUFFLE_STAR_HUNT_ERROR)) {
        this.seedGenError = "Star Hunt is impossible without item shuffle enabled."
        return;
      } else if (errors.some(e => e == this.LIMIT_CHAPTERS_NO_KEYSANITY_ERROR)) {
        this.seedGenError = "Limiting chapter logic is impossible without Keysanity."
        return;
      }
    }
    this.seedGenError = null;
    this.isRandomizing = true;

    this._createSeedSubscription = this._randomizerService.createSeedWithSettings(this.formGroup).pipe(
      tap(seedId => {
        this._localStorage.set("latestSeedId", seedId)
        this.navigateToSeedPage(seedId);
      }),
      catchError(err => {
        if(err.status === 429) {
          this.seedGenError = "Limit reached: Only 10 seeds per hour can be generated."
        }
        else if(typeof err.error === 'string' && (err.error as string)?.includes("StarRodModVersion")) {
          this.seedGenError = "Server version mismatch. Please refresh the page and try again."
        }
        else if(typeof err.error === 'string' && (err.error as string) == "item_pool_too_small") {
          this.seedGenError = "The amount of new items to place is greater than the item pool size. Try to shuffle more item sources, or disable options that add new items."
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
        includeCoinsOverworld: new FormControl(false),
        includeCoinsBlocks: new FormControl(false),
        includeCoinsFavors: new FormControl(false),
        includeCoinsFoliage: new FormControl(false),
        includeShops: new FormControl(false),
        includePanels: new FormControl(false),
        includeFavors: new FormControl(KootFavorsMode.Vanilla),
        keyitemsOutsideDungeon: new FormControl(false),
        includeDojo: new FormControl(false),
        includeLetters: new FormControl(LettersMode.Vanilla),
        includeRadioTradeEvent: new FormControl(false),
        shuffleBlocks: new FormControl(false),
        gearShuffleMode: new FormControl(GearShuffleMode.Vanilla),
        partnerUpgradeShuffle: new FormControl(PartnerUpgradeShuffleMode.Vanilla),
        ripCheatoItemsInLogic: new FormControl(6),
        progressionOnRowf: new FormControl(false),
        progressionOnMerlow: new FormControl(false),
      }),
      gameplay: new FormGroup({
        randomBadgesBP: new FormControl(0),
        randomBadgesFP: new FormControl(0),
        randomPartnerFP: new FormControl(0),
        randomStarpowerSP: new FormControl(0),
        randomFormations: new FormControl(false),
        randomizePuzzles: new FormControl(false),
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
        shortenCutscenes: new FormControl(0),
        skipEpilogue: new FormControl(false),
        writeSpoilerLog: new FormControl(true),
        revealLogInHours: new FormControl(0),
        delaySpoilerLog: new FormControl(false),
        quizmoAlwaysAppears: new FormControl(false),
        foliageItemHints: new FormControl(false),
        hiddenPanelVisibility: new FormControl(false),
        cookWithoutFryingPan: new FormControl(false),
      }),
      difficulty: new FormGroup({
        difficultyMode: new FormControl(DifficultySetting.Vanilla),
        capEnemyXP: new FormControl(false),
        xpMultiplier: new FormControl(1),
        damageMultiplier: new FormControl(1),
        oneHitKO: new FormControl(false),
        noSaveBlocks: new FormControl(false),
        noHeartBlocks: new FormControl(false),
        noHealingItems: new FormControl(false),
        dropStarPoints: new FormControl(true),
        allowItemHints: new FormControl(true),
        merlowRewardPricing: new FormControl(MerlowRewardPricing.Normal),
        badgeSynergy: new FormControl(false),
      }),
      itemPool: new FormGroup({
        itemQuality: new FormControl(100),
        randomConsumableMode: new FormControl(RandomConsumableMode.Vanilla),
        itemTrapMode: new FormControl(0),
        itemPouches: new FormControl(false),
        addUnusedBadgeDuplicates: new FormControl(false),
        addBetaItems: new FormControl(false),
        progressiveBadges: new FormControl(false),
        badgePoolLimit: new FormControl(128),
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
      }, CustomValidators.levelGreaterOrEqualZero()),
      openLocations: new FormGroup({
        magicalSeedsRequired: new FormControl(4),
        blueHouseOpen : new FormControl(false),
        toyboxOpen: new FormControl(false),
        whaleOpen: new FormControl(false),
        ch7BridgeVisible: new FormControl(true),
        mtRuggedOpen: new FormControl(false),
        foreverForestOpen: new FormControl(true),
        prologueOpen: new FormControl(false),
        startingMap: new FormControl(StartingMap.ToadTown),
        bowsersCastleMode: new FormControl(BowsersCastleMode.Vanilla),
        shuffleDungeonEntrances: new FormControl(false),
        mirrorMode: new FormControl(MirrorMode.Off),
      }),
      goals: new FormGroup({
        starWaySpiritsNeeded: new FormControl(7),
        requireSpecificSpirits: new FormControl(false),
        shuffleStarBeam: new FormControl(false),
        starBeamSpiritsNeeded: new FormControl(0),
        limitChapterLogic: new FormControl(false),
        starWayPowerStarsNeeded: new FormControl(0),
        starHuntTotal: new FormControl(0, [CustomValidators.greaterOrEqualTo('starWayPowerStarsNeeded'), CustomValidators.greaterOrEqualTo('starBeamPowerStarsNeeded')]),
        seedGoal: new FormControl(SeedGoal.DefeatBowser),
        starBeamPowerStarsNeeded: new FormControl(0),
        // Unsubmitted control
        includePowerStars: new FormControl(false)
      }),
      cosmetics: new FormGroup({
        menu: new FormControl(0),
        marioSprite : new FormControl(),
        goombarioSprite : new FormControl(),
        kooperSprite : new FormControl(),
        bombetteSprite : new FormControl(),
        parakarrySprite : new FormControl(),
        bowSprite : new FormControl(),
        wattSprite: new FormControl(),
        sushieSprite: new FormControl(),
        lakilesterSprite: new FormControl(),
        bossesSetting: new FormControl(SpriteSetting.Default),
        npcSetting: new FormControl(SpriteSetting.Default),
        enemiesSetting: new FormControl(SpriteSetting.Default),
        hammerSetting: new FormControl(SpriteSetting.Default),
        coinColor: new FormControl(CoinColor.Default),
        randomText: new FormControl(false),
        romanNumerals: new FormControl(false),
        randomPitch: new FormControl(false),
        muteDangerBeeps: new FormControl(false),
        shuffleMusic: new FormControl(-1),
        shuffleJingles: new FormControl(false),
      }),
      glitches: new FormControl([])
    });

    this.randomPartnersMinSubscription = this.formGroup.get('partners').get('randomPartnersMin').valueChanges.pipe(
      tap(() => this.formGroup.get('partners').get('randomPartnersMax').updateValueAndValidity())
      ).subscribe();
  }

  private validateSettings(): string[] {
    let errors = [];

    const startingMap = this.formGroup.get('openLocations').get('startingMap').value;
    const startingHammer = this.formGroup.get('marioStats').get('startingHammer').value;
    const startingBoots = this.formGroup.get('marioStats').get('startingBoots').value;
    const gearShuffleMode = this.formGroup.get('items').get('gearShuffleMode').value;
    const isGeneralShuffleEnabled = this.formGroup.get('items').get('shuffleItems').value;
    const isPartnerShuffleEnabled = this.formGroup.get('partners').get('shufflePartners').value;
    const isEntranceRandoEnabled = this.formGroup.get('openLocations').get('shuffleDungeonEntrances').value;
    const isStarHuntEnabled = this.formGroup.get('goals').get('includePowerStars').value;
    const isLimitChapterLogicEnabled = this.formGroup.get('goals').get('limitChapterLogic').value;
    const isKeysanityEnabled = this.formGroup.get('items').get('keyitemsOutsideDungeon').value

    const isVanillaStart = startingMap == StartingMap.GoombaVillage &&
      startingHammer == Hammer.Hammerless &&
      !isGeneralShuffleEnabled

    if (!isVanillaStart &&
       startingHammer == Hammer.Hammerless &&
       (!isGeneralShuffleEnabled || (!isPartnerShuffleEnabled && gearShuffleMode != GearShuffleMode['Full Shuffle']))) {
      errors.push(this.LACKING_SHUFFLE_HAMMERLESS_START_ERROR)
    }

    if (startingBoots == Boots.Jumpless && !isGeneralShuffleEnabled) {
      errors.push(this.LACKING_SHUFFLE_JUMPLESS_START_ERROR)
    }

    if (isStarHuntEnabled && !isGeneralShuffleEnabled) {
      errors.push(this.LACKING_SHUFFLE_STAR_HUNT_ERROR)
    }

    if (isEntranceRandoEnabled && (!isGeneralShuffleEnabled || !isPartnerShuffleEnabled)) {
      errors.push(this.SHUFFLED_ENTRANCES_NO_ITEMS_ERROR)
    }

    if (isLimitChapterLogicEnabled && !isKeysanityEnabled) {
      errors.push(this.LIMIT_CHAPTERS_NO_KEYSANITY_ERROR)
    }

    return errors;
  }
}
