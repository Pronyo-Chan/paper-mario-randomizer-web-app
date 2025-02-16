import { ToastrService } from 'ngx-toastr';
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
import { tap, catchError } from 'rxjs/operators'
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
import { DungeonEntranceShuffleMode } from 'src/app/entities/enum/DungeonEntranceShuffleMode';
import { PartnerShuffleMode } from 'src/app/entities/enum/partnerShuffleMode';
import { BossShuffleMode } from 'src/app/entities/enum/BossShuffleMode';
import { SettingStringMappingService } from 'src/app/services/setting-string-mapping/setting-string-mapping.service';
import { CheckType, DUNEGON_KEYS, GEAR_LOCATIONS, KEY_TO_DUNGEON, LETTER_CHAIN_CHECKS, LOCATIONS_LIST, PARTNERS, PROGRESSIVE_BADGES, SUPER_BLOCK_LOCATIONS } from "../../plando-page/plando-constants";

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
  public readonly SHUFFLED_ENTRANCES_WITH_BOWSER_7_SPIRITS_ERROR = 'entranceRandoWitBowserAnd7Spirits';
  public readonly LIMIT_CHAPTERS_NO_KEYSANITY_ERROR = 'limitChaptersNoKeysanity';

  public homepageLink;
  public formGroup: FormGroup
  public plandomizerFormControl: FormControl;
  public plandoAssignedControls: FormControl<Set<string>>;
  private _plandoSubscription: Subscription;
  randomPartnersMinSubscription: Subscription;

  public isRandomizing = false;
  public seedGenError: string;
  public seedGenErrorDetails: string;
  private _createSeedSubscription: Subscription;

  public constructor(private _randomizerService: RandomizerService, private _localStorage: LocalStorageService, private _router: Router, private _toast: ToastrService, private _settingsStringService: SettingStringMappingService){}

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

    if (this._plandoSubscription) {
      this._plandoSubscription.unsubscribe();
    }

    try {
      var settingsString = this._settingsStringService.compressFormGroup(this.formGroup, this._settingsStringService.settingsMap);
      this._localStorage.set('latestSettingsString', settingsString);
    } catch {}
  }

  public onSubmit() {
    const errors = this.validateSettings();
    if(errors.length) {
      if (errors.some(e => e == this.LACKING_SHUFFLE_HAMMERLESS_START_ERROR)) {
        this._toast.error("Hammerless Start is impossible without shuffled partners or full gear shuffle.")
        return;
      } else if (errors.some(e => e == this.LACKING_SHUFFLE_JUMPLESS_START_ERROR)) {
        this._toast.error("Jumpless Start is impossible without Item Shuffle enabled.")
        return;
      } else if (errors.some(e => e == this.SHUFFLED_ENTRANCES_NO_ITEMS_ERROR)) {
        this._toast.error("Shuffling entrances is impossible without Item and Partner Shuffle enabled.")
        return;
      } else if (errors.some(e => e == this.LACKING_SHUFFLE_STAR_HUNT_ERROR)) {
        this._toast.error("Star Hunt is impossible without item shuffle enabled.")
        return;
      } else if (errors.some(e => e == this.LIMIT_CHAPTERS_NO_KEYSANITY_ERROR)) {
        this._toast.error("Limiting chapter logic is impossible without Keysanity.")
        return;
      } else if (errors.some(e => e == this.SHUFFLED_ENTRANCES_WITH_BOWSER_7_SPIRITS_ERROR)) {
        this._toast.error("Shuffling the entrance to Bowser's Castle is impossible with 7 star spirits required.")
        return;
      }
    }
    this.seedGenError = null;
    this.seedGenErrorDetails = null;
    this.isRandomizing = true;

    this._createSeedSubscription = this._randomizerService.createSeedWithSettings(this.formGroup, this.plandomizerFormControl).pipe(
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
        else if(typeof err.error === 'string' && (err.error as string).includes("Plandomizer error")) {
          this.seedGenError = "Could not generate a beatable seed with the selected settings and plandomizer config.";
          this.seedGenErrorDetails = err.error;
        }
        else if(typeof err.error === 'string' && (err.error as string).includes("Invalid plandomizer config")) {
          this.seedGenError = "The selected plandomizer config is invalid.";
          this.seedGenErrorDetails = err.error;
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
        includeDojo: new FormControl(0),
        includeLetters: new FormControl(LettersMode.Vanilla),
        includeRadioTradeEvent: new FormControl(false),
        shuffleBlocks: new FormControl(false),
        gearShuffleMode: new FormControl(GearShuffleMode.Vanilla),
        partnerUpgradeShuffle: new FormControl(PartnerUpgradeShuffleMode.Vanilla),
        ripCheatoItemsInLogic: new FormControl(6),
        progressionOnRowf: new FormControl(0),
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
        bossShuffle: new FormControl(BossShuffleMode.Off)
      }),
      partners: new FormGroup({
        shufflePartners: new FormControl(PartnerShuffleMode.Off),
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
        randomStartingStatsLevel: new FormControl(1),
        startWithRandomStats: new FormControl(false),
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
        shuffleDungeonEntrances: new FormControl(DungeonEntranceShuffleMode.Off),
        mirrorMode: new FormControl(MirrorMode.Off),
      }),
      goals: new FormGroup({
        starWaySpiritsNeeded: new FormControl(7),
        requireSpecificSpirits: new FormControl(false),
        shuffleStarBeam: new FormControl(false),
        starBeamSpiritsNeeded: new FormControl(0),
        limitChapterLogic: new FormControl(false),
        starWayPowerStarsNeeded: new FormControl(0),
        starHuntTotal: new FormControl(0, [CustomValidators.greaterOrEqualToWhenNotRandom('starWayPowerStarsNeeded'), CustomValidators.greaterOrEqualToWhenNotRandom('starBeamPowerStarsNeeded')]),
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
      glitches: new FormControl([]),
    });
    this.plandomizerFormControl = new FormControl();
    this.plandoAssignedControls = new FormControl(new Set([]));

    this.randomPartnersMinSubscription = this.formGroup.get('partners').get('randomPartnersMin').valueChanges.pipe(
      tap(() => this.formGroup.get('partners').get('randomPartnersMax').updateValueAndValidity())
      ).subscribe();

    this._plandoSubscription = this.plandomizerFormControl.valueChanges.pipe(
      tap(plando => {
        const assignedControls: Set<string> = new Set();
        if (plando && Object.keys(plando).length) {
          let ripCheatoChecks: number = 0;
          let dojoChecks: number = 0;
          let kootFavors: number = 0;
          let powerStars: number = 0;
          let traps: number = 0;
          let gearShuffle: number = 0;
          let partnerShuffle: number = 0;
          let partnerUpgradeShuffle: number = 0;
          let letterShuffle: number = 0;
          const rowfSets: Set<string> = new Set();
          if (plando['items']) {
            const plandoCheckTypes: Set<CheckType> = new Set();
            const plandoLocations = plando['items'];
            for (const loc of LOCATIONS_LIST) {
              if (plandoLocations[loc.name]) {
                const plandoChecks = plandoLocations[loc.name];
                for (const check of loc.checks) {
                  if (plandoChecks[check.name]) {
                    const plandoItem = check.type === CheckType.SHOP ? plandoChecks[check.name].item : plandoChecks[check.name];
                    plandoCheckTypes.add(check.type);

                    if (DUNEGON_KEYS.has(plandoItem)
                      && (KEY_TO_DUNGEON[plandoItem] !== loc.name)) {
                      this.formGroup.get('items').get('keyitemsOutsideDungeon').setValue(true);
                      assignedControls.add('keyitemsOutsideDungeon');
                    }

                    if (plandoItem === 'ProgressiveHammer' || plandoItem === 'ProgressiveBoots') {
                      if (!GEAR_LOCATIONS.has(check.name)) {
                        gearShuffle = 2;
                      } else {
                        gearShuffle = Math.max(gearShuffle, 1);
                      }
                    }

                    if (PARTNERS.has(plandoItem)) {
                      if (!check.name.endsWith(' Partner')) {
                        partnerShuffle = 2;
                      } else {
                        partnerShuffle = Math.max(partnerShuffle, 1);
                      }
                    }

                    if (PROGRESSIVE_BADGES.has(plandoItem)) {
                      this.formGroup.get('itemPool').get('progressiveBadges').setValue(true);
                      assignedControls.add('progressiveBadges');
                    }

                    if (check.type === CheckType.LETTER_REWARD) {
                      if (LETTER_CHAIN_CHECKS.has(check.name)) {
                        letterShuffle = 3;
                      } else if (check.name === 'Goomba Village - Goompapa Letter Reward 2') {
                        letterShuffle = Math.max(letterShuffle, 2);
                      } else {
                        letterShuffle = Math.max(letterShuffle, 1);
                      }
                    }

                    if (plandoItem === 'StarBeam'
                      && check.name !== 'Star Sanctuary - Gift of the Stars') {
                      this.formGroup.get('goals').get('shuffleStarBeam').setValue(true);
                      assignedControls.add('shuffleStarBeam');
                    }

                    if (plandoItem === 'PowerStar') {
                      this.formGroup.get('goals').get('includePowerStars').setValue(true);
                      assignedControls.add('includePowerStars');
                      powerStars++;
                    }

                    if (plandoItem === 'ItemPouch') {
                      this.formGroup.get('itemPool').get('itemPouches').setValue(true);
                      assignedControls.add('itemPouches');
                    }

                    if (plandoItem.includes('Upgrade')) {
                      if (!SUPER_BLOCK_LOCATIONS.has(check.name)) {
                        partnerUpgradeShuffle = 2;
                      } else {
                        partnerUpgradeShuffle = Math.max(partnerUpgradeShuffle, 1);
                      }
                    }

                    if (plandoItem.includes('TRAP')) {
                      traps++;
                    }

                    if (check.name.includes('Rip Cheato Offer')) {
                      ripCheatoChecks++;
                    }

                    if (check.name.includes('Dojo')) {
                      dojoChecks++;
                    }

                    if (check.name.includes('Rowfs Shop Set')) {
                      const setNumber = check.name.substring(check.name.length - 5, check.name.length - 4);
                      rowfSets.add(setNumber);
                    }

                    if (check.name.includes('Merlows Rewards')) {
                      this.formGroup.get('items').get('progressionOnMerlow').setValue(true);
                      assignedControls.add('progressionOnMerlow');
                    }
                  }
                }
              }
            }
            if (plandoCheckTypes.has(CheckType.HIDDEN_PANEL)) {
              this.formGroup.get('items').get('includePanels').setValue(true);
              assignedControls.add('includePanels');
            }
            if (plandoCheckTypes.has(CheckType.SHOP)) {
              this.formGroup.get('items').get('includeShops').setValue(true);
              assignedControls.add('includeShops');
            }
            if (plandoCheckTypes.has(CheckType.COIN_BLOCK)) {
              this.formGroup.get('items').get('includeCoinsBlocks').setValue(true);
              assignedControls.add('includeCoinsBlocks');
            }
            if (plandoCheckTypes.has(CheckType.OVERWORLD_COIN)) {
              this.formGroup.get('items').get('includeCoinsOverworld').setValue(true);
              assignedControls.add('includeCoinsOverworld');
            }
            if (plandoCheckTypes.has(CheckType.TRADE_EVENT)) {
              this.formGroup.get('items').get('includeRadioTradeEvent').setValue(true);
              assignedControls.add('includeRadioTradeEvent');
            }
            if (plandoCheckTypes.has(CheckType.FOLIAGE)) {
              this.formGroup.get('items').get('includeCoinsFoliage').setValue(true);
              assignedControls.add('includeCoinsFoliage');
            }
            if (plandoCheckTypes.has(CheckType.KOOT_FAVOR_REWARD)) {
              kootFavors = 1;
            }
            if (plandoCheckTypes.has(CheckType.KOOT_FAVOR_ITEM)) {
              kootFavors = 2;
            }
            if (kootFavors) {
              this.formGroup.get('items').get('includeFavors').setValue(kootFavors);
              assignedControls.add('includeFavors');
            }
            if (plandoCheckTypes.has(CheckType.KOOT_FAVOR_COIN)) {
              this.formGroup.get('items').get('includeCoinsFavors').setValue(true);
              assignedControls.add('includeCoinsFavors');
            }
            if (dojoChecks) {
              this.formGroup.get('items').get('includeDojo').setValue(dojoChecks);
              assignedControls.add('includeDojo');
            }
            if (rowfSets.size) {
              this.formGroup.get('items').get('progressionOnRowf').setValue(rowfSets.size);
              assignedControls.add('progressionOnRowf');
            }
            if (ripCheatoChecks) {
              this.formGroup.get('items').get('ripCheatoItemsInLogic').setValue(ripCheatoChecks);
              assignedControls.add('ripCheatoItemsInLogic');
            }
            if (gearShuffle) {
              this.formGroup.get('items').get('gearShuffleMode').setValue(gearShuffle);
              assignedControls.add('gearShuffleMode');
            }
            if (partnerShuffle) {
              this.formGroup.get('partners').get('shufflePartners').setValue(partnerShuffle);
              assignedControls.add('shufflePartners');
            }
            if (letterShuffle) {
              this.formGroup.get('items').get('includeLetters').setValue(letterShuffle);
              assignedControls.add('includeLetters');
            }
            if (partnerUpgradeShuffle) {
              this.formGroup.get('items').get('partnerUpgradeShuffle').setValue(partnerUpgradeShuffle);
              assignedControls.add('partnerUpgradeShuffle');
            }
            if (traps) {
              if (traps > 40) {
                this.formGroup.get('itemPool').get('itemTrapMode').setValue(3);
              } else if (traps > 20) {
                this.formGroup.get('itemPool').get('itemTrapMode').setValue(2);
              } else {
                this.formGroup.get('itemPool').get('itemTrapMode').setValue(1);
              }
              assignedControls.add('itemTrapMode');
            }
          }
          if (Array.isArray(plando['required_spirits']) && plando['required_spirits'].length) {
            assignedControls.add('starWaySpiritsNeeded');
            const selectedSpiritCount = plando['required_spirits'].length;
            if (selectedSpiritCount > 0 && selectedSpiritCount < 7) {
              this.formGroup.get('goals').get('requireSpecificSpirits').setValue(true);
              assignedControls.add('requireSpecificSpirits');
            } else {
              this.formGroup.get('goals').get('requireSpecificSpirits').setValue(false);
            }
          }
        }
        this.plandoAssignedControls.setValue(assignedControls);
      })
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
    const isEntranceRandoWithBowserEnabled = this.formGroup.get('openLocations').get('shuffleDungeonEntrances').value == DungeonEntranceShuffleMode['Include Bowsers Castle'];
    const isStarHuntEnabled = this.formGroup.get('goals').get('includePowerStars').value;
    const isLimitChapterLogicEnabled = this.formGroup.get('goals').get('limitChapterLogic').value;
    const isKeysanityEnabled = this.formGroup.get('items').get('keyitemsOutsideDungeon').value
    const requiredStarwaySpiritsCount = this.formGroup.get('goals').get('starWaySpiritsNeeded').value

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

    if (isEntranceRandoWithBowserEnabled && requiredStarwaySpiritsCount === 7) {
      errors.push(this.SHUFFLED_ENTRANCES_WITH_BOWSER_7_SPIRITS_ERROR)
    }

    if (isLimitChapterLogicEnabled && !isKeysanityEnabled) {
      errors.push(this.LIMIT_CHAPTERS_NO_KEYSANITY_ERROR)
    }

    return errors;
  }
}
