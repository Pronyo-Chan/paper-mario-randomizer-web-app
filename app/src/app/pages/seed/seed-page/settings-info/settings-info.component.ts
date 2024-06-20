import { MerlowRewardPricing } from './../../../../entities/enum/merlowRewardPricing';
import { Boots } from './../../../../entities/enum/boots';
import { BowsersCastleMode } from './../../../../entities/enum/bowsersCastleMode';
import { KootFavorsMode } from './../../../../entities/enum/kootFavorsMode';
import { LettersMode } from './../../../../entities/enum/lettersMode';
import { ItemTrapMode } from './../../../../entities/enum/itemTrapMode';
import { AbilityCostMode } from './../../../../entities/enum/abilityCostMode';
import { Badges } from './../../../../entities/enum/badges';
import { KeyItems } from './../../../../entities/enum/keyItems';
import { Items } from './../../../../entities/enum/items';
import { Component, Input, OnInit } from '@angular/core';
import { HiddenBlockMode } from 'src/app/entities/enum/hiddenBlockMode';
import { pascalToVerboseString } from 'src/app/utilities/stringFunctions';
import { Hammer } from 'src/app/entities/enum/hammer';
import glitchesJson from '../../../../utilities/glitches.json'
import { LogicGlitch } from 'src/app/entities/logicGlitch';
import { GearShuffleMode } from 'src/app/entities/enum/gearShuffleMode';
import { RandomConsumableMode } from 'src/app/entities/enum/randomConsumableMode';
import { SeedViewModel } from 'src/app/entities/seed-view-model/seedViewModel';
import { MysteryMode } from 'src/app/entities/enum/mysteryMode';
import { PartnerUpgradeShuffleMode } from 'src/app/entities/enum/partnerUpgradeShuffleMode';
import { CustceneMode } from 'src/app/entities/enum/cutsceneMode';
import { MirrorMode } from 'src/app/entities/enum/mirrorMode';
import { SeedGoal } from 'src/app/entities/enum/seedGoal';

interface SettingRow {
  name: string;
  value: string | number | boolean;
}

@Component({
  selector: 'app-settings-info',
  templateUrl: './settings-info.component.html',
  styleUrls: ['./settings-info.component.scss']
})
export class SettingsInfoComponent implements OnInit {

  @Input() public seedModel: SeedViewModel

  public displayedRows: SettingRow[] = [];
  public selectedCategory: {name: string, rows: SettingRow[]};

  public itemRows: SettingRow[] = [];
  public partnerRows: SettingRow[] = [];
  public gameplayRows: SettingRow[] = [];
  public cosmeticsRows: SettingRow[] = [];
  public difficultyRows: SettingRow[] = [];
  public goalsRows: SettingRow[] = [];
  public itemPoolRows: SettingRow[] = [];
  public statsAndGearRows: SettingRow[] = [];
  public worldRows: SettingRow[] = [];
  public qolRows: SettingRow[] = [];
  public spoilerRows: SettingRow[] = [];
  public enabledGlitchesRows: SettingRow[];
  public allRows: SettingRow[] = [];

  public glitchesList: LogicGlitch[];

  public expirationDate: Date;

  public copiedToClipboard = false;


  public settingCategories = []

  public constructor() { }

  public ngOnInit(): void {
    this.expirationDate = new Date(this.seedModel.SeedInfo.CreationDate)
    this.expirationDate.setDate(this.expirationDate.getDate() + 30)

    this.glitchesList = glitchesJson;
    this.enabledGlitchesRows = [{
       name: "Enabled Glitches / Tricks",
       value: this.seedModel.Glitches.map(enabledGlitchSetting => this.glitchesList.find(g => g.settingName == enabledGlitchSetting).name)?.join(",\n")
    }]

    if(this.enabledGlitchesRows[0].value == "") {
      this.enabledGlitchesRows[0].value = "None"
    }

    this.initRows();
  }

  public updateDisplayedRows() {
    this.displayedRows = this.selectedCategory.rows;
    this.displayedRows = this.displayedRows.filter(sr => sr.value != null)
  }

  private initRows(): void {
    this.initItemRows();
    this.initPartnerRows();
    this.initGameplayRows();
    this.initCosmeticsRows();
    this.initDifficultyRows();
    this.initGoalsRows();
    this.initItemPoolRows();
    this.initStatsRows();
    this.initWorldRows();
    this.initQolRows();
    this.initSpoilerRows();

    const emptyRow = {name: "", value: ""}
    this.allRows = [
      ...this.itemRows, emptyRow,
      ...this.partnerRows, emptyRow,
      ...this.gameplayRows, emptyRow,
      ...this.cosmeticsRows, emptyRow,
      ...this.difficultyRows, emptyRow,
      ...this.goalsRows, emptyRow,
      ...this.statsAndGearRows, emptyRow,
      ...this.itemPoolRows, emptyRow,
      ...this.worldRows, emptyRow,
      ...this.qolRows, emptyRow,
      ...this.spoilerRows, emptyRow
    ];

    this.settingCategories = [
      {name: "All", rows: this.allRows},
      {name: "Items", rows: this.itemRows},
      {name: "Partners", rows: this.partnerRows},
      {name: "Gameplay", rows: this.gameplayRows},
      {name: "Cosmetics", rows: this.cosmeticsRows},
      {name: "Difficulty", rows: this.difficultyRows},
      {name: "Goals", rows: this.goalsRows},
      {name: "Item Pool", rows: this.itemPoolRows},
      {name: "Stats & Gear", rows: this.statsAndGearRows},
      {name: "World", rows: this.worldRows},
      {name: "Quality Of Life", rows: this.qolRows},
      {name: "Spoiler", rows: this.spoilerRows},
      {name: "Glitches & Tricks", rows: this.enabledGlitchesRows},
    ]

    this.selectedCategory = this.settingCategories[0];
    this.updateDisplayedRows();
  }

  private initItemRows(): void {
    this.itemRows =  [
      {name: "Shuffle Items", value: this.seedModel.Items.ShuffleItems},
      {name: "Shuffle Overworld Coins", value: this.seedModel.Items.IncludeCoinsOverworld},
      {name: "Shuffle Coin Blocks", value: this.seedModel.Items.IncludeCoinsBlocks},
      {name: "Shuffle Favor Coins", value: this.seedModel.Items.IncludeCoinsFavors},
      {name: "Shuffle Foliage Coins", value: this.seedModel.Items.IncludeCoinsFoliage},
      {name: "Keysanity", value: this.seedModel.Items.Keysanity},
      {name: "Gear Shuffle", value: GearShuffleMode[this.seedModel.Items.GearShuffle]},
      {name: "Include Dojo Rewards", value: this.seedModel.Items.IncludeDojoRewards},
      {name: "Include Hidden Panels", value: this.seedModel.Items.IncludeHiddenPanels},
      {name: "Include Trading Event Rewards", value: this.seedModel.Items.IncludeTradingEventRewards},
      {name: "Koopa Koot Favors", value: KootFavorsMode[this.seedModel.Items.KoopaKootFavors]},
      {name: "Letter Delivery Rewards", value: LettersMode[this.seedModel.Items.LetterDeliveryRewards]},
      {name: "Rip Cheato Items In Logic", value: this.seedModel.Items.RipCheatoItemsInLogic},
      {name: "Partner Upgrade Shuffle", value: PartnerUpgradeShuffleMode[this.seedModel.Items.PartnerUpgradeShuffle]},
      {name: "Shuffle Super/Multicoin Blocks", value: this.seedModel.Items.ShuffleSuperAndMulticoinBlocks},
      {name: "Shopsanity", value: this.seedModel.Items.Shopsanity},
      {name: "Rowf Items in Logic", value: this.seedModel.Items.ProgressionOnRowf},
      {name: "Merlow Items in Logic", value: this.seedModel.Items.ProgressionOnMerlow},
    ] as SettingRow[];
  }

  private initPartnerRows(): void {
    this.partnerRows =  [
      {name: "Shuffle Partners", value: this.seedModel.Partners.ShufflePartners},
      {name: "Partners Always Usable", value: this.seedModel.Partners.PartnersAlwaysUsable},
      {name: "Min Number Of Starting Partners", value: this.seedModel.Partners.MinNumberOfStartingPartners},
      {name: "Max Number Of Starting Partners", value: this.seedModel.Partners.MaxNumberOfStartingPartners},
      {name: "Start With Partners", value: this.seedModel.Partners.StartWithPartners?.join(", ")},
      {name: "Start With Random Partners", value: this.seedModel.Partners.StartWithRandomPartners}
    ] as SettingRow[];
  }

  private initGameplayRows(): void {
    this.gameplayRows = [
      {name: "Badges BP", value: AbilityCostMode[this.seedModel.Gameplay.BadgesBP]},
      {name: "Badges FP", value: AbilityCostMode[this.seedModel.Gameplay.BadgesFP]},
      {name: "Partners FP", value: AbilityCostMode[this.seedModel.Gameplay.PartnersFP]},
      {name: "Star Power SP", value: AbilityCostMode[this.seedModel.Gameplay.StarPowerSP]},
      {name: "Shuffle Battle Formations", value: this.seedModel.Gameplay.ShuffleBattleFormations},
      {name: "Mystery", value: MysteryMode[this.seedModel.Gameplay.MysteryMode]},
      {name: "Randomize Puzzles", value: this.seedModel.Gameplay.RandomizePuzzles},
    ] as SettingRow[]
  }

  private initCosmeticsRows(): void {
    this.cosmeticsRows = [
      {name: "Mario", value: this.seedModel.Cosmetics.Mario},
      {name: "Goombario", value: this.seedModel.Cosmetics.Goombario},
      {name: "Kooper", value: this.seedModel.Cosmetics.Kooper},
      {name: "Bombette", value: this.seedModel.Cosmetics.Bombette},
      {name: "Parakarry", value: this.seedModel.Cosmetics.Parakarry},
      {name: "Bow", value: this.seedModel.Cosmetics.Bow},
      {name: "Watt", value: this.seedModel.Cosmetics.Watt},
      {name: "Sushie", value: this.seedModel.Cosmetics.Sushie},
      {name: "Lakilester", value: this.seedModel.Cosmetics.Lakilester},
      {name: "Bosses", value: this.seedModel.Cosmetics.Bosses},
      {name: "Enemies", value: this.seedModel.Cosmetics.Enemies},
      {name: "Hammer", value: this.seedModel.Cosmetics.Hammer},
      {name: "NPC", value: this.seedModel.Cosmetics.NPC},
      {name: "Coin Color", value: this.seedModel.Cosmetics.CoinColor},
      {name: "Status Menu", value: this.seedModel.Cosmetics.StatusMenu},
      {name: "Roman Numerals", value: this.seedModel.Cosmetics.RomanNumerals},
      {name: "Random Text", value: this.seedModel.Cosmetics.RandomText},
      {name: "Shuffle Music", value: this.seedModel.Cosmetics.ShuffleMusic},
      {name: "Shuffle Jingles", value: this.seedModel.Cosmetics.ShuffleJingles},
      {name: "Random Pitch", value: this.seedModel.Cosmetics.RandomPitch},
      {name: "Mute Danger Beeps", value: this.seedModel.Cosmetics.MuteDangerBeeps},
    ] as SettingRow[]
  }

  private initDifficultyRows(): void {
    this.difficultyRows = [
      {name: "Enemy Difficulty", value: this.seedModel.GeneralDifficulty.EnemyDifficulty},
      {name: "XP Multiplier", value: this.seedModel.GeneralDifficulty.XPMultiplier ? `${this.seedModel.GeneralDifficulty.XPMultiplier}x` : null},
      {name: "Cap Enemy XP", value: this.seedModel.GeneralDifficulty.CapEnemyXP},
      {name: "Enemy Damage", value: this.seedModel.GeneralDifficulty.EnemyDamage},
      {name: "Merlow Rewards Pricing", value: MerlowRewardPricing[this.seedModel.GeneralDifficulty.MerlowRewardsPricing]},
      {name: "No Healing Items", value: this.seedModel.GeneralDifficulty.NoHealingItems},
      {name: "No Heart Blocks", value: this.seedModel.GeneralDifficulty.NoHeartBlocks},
      {name: "No Save Blocks", value: this.seedModel.GeneralDifficulty.NoSaveBlocks},
      {name: "One Hit KO", value: this.seedModel.GeneralDifficulty.OneHitKO},
      {name: "Badge Synergy", value: this.seedModel.GeneralDifficulty.BadgeSynergy},
      {name: "Drop Star Points", value: this.seedModel.GeneralDifficulty.DropStarPoints},
    ] as SettingRow[]
  }

  private initGoalsRows(): void {
    const isStarHuntEnabled = this.seedModel.Goals.StarHuntTotal > 0;
    const isStarBeamReachable = this.seedModel.Goals.SeedGoal == SeedGoal.DefeatBowser;

    this.goalsRows = [
      {name: "Seed Goal", value: pascalToVerboseString(SeedGoal[this.seedModel.Goals.SeedGoal])},
      {name: "Star Way Spirits Required", value: this.seedModel.Goals.StarWaySpiritsNeeded},
      {name: "Require Specific Spirits", value: this.seedModel.Goals.StarWaySpiritsNeeded == 7 || this.seedModel.Goals.StarWaySpiritsNeeded == 0 ? null : this.seedModel.Goals.RequireSpecificSpirits},
      {name: "Limit Chapter Logic", value: this.seedModel.Goals.RequireSpecificSpirits ? this.seedModel.Goals.LimitChapterLogic : null},
      {name: "Shuffle Star Beam", value: isStarBeamReachable ? this.seedModel.Goals.ShuffleStarBeam : null},
      {name: "Star Beam Spirits Rquired", value: isStarBeamReachable ? this.seedModel.Goals.StarBeamSpiritsNeeded : null},
      {name: "Total Power Stars", value: isStarHuntEnabled ? this.seedModel.Goals.StarHuntTotal : null},
      {name: "Star Way - Power Stars Required", value: isStarHuntEnabled ? this.seedModel.Goals.StarWayPowerStarsNeeded : null},
      {name: "Star Beam - Power Stars Required", value: isStarBeamReachable && isStarHuntEnabled ? this.seedModel.Goals.StarBeamPowerStarsNeeded : null}
    ] as SettingRow[]
  }

  private initItemPoolRows(): void {
    this.itemPoolRows = [
      {name: "Consumable Item Pool", value: RandomConsumableMode[this.seedModel.ItemPool.ConsumableItemPool]},
      {name: "Item Traps", value: ItemTrapMode[this.seedModel.ItemPool.ItemTraps]},
      {name: "Item Quality", value: this.seedModel.ItemPool.ItemQuality + "%"},
      {name: "Add Item Pouches", value: this.seedModel.ItemPool.AddItemPouches},
      {name: "Add Unused Badge Duplicates", value: this.seedModel.ItemPool.AddUnusedBadgeDuplicates},
      {name: "Add Beta Items", value: this.seedModel.ItemPool.AddBetaItems},
      {name: "Progressive Badges", value: this.seedModel.ItemPool.ProgressiveBadges},
      {name: "Badge Pool Limit", value: this.seedModel.ItemPool.BadgePoolLimit},
    ] as SettingRow[]
  }

  private initStatsRows(): void {
    let startingItems = this.seedModel.StatsAndGear.StartingItems.map(i => this.getStartingItemName(i))
    if(!startingItems.length) {
      startingItems = ["None"];
    }

    this.statsAndGearRows = [
      {name: "HP", value: this.seedModel.StatsAndGear.HP},
      {name: "FP", value: this.seedModel.StatsAndGear.FP},
      {name: "BP", value: this.seedModel.StatsAndGear.BP},
      {name: "Star Power", value: this.seedModel.StatsAndGear.StarPower},
      {name: "Boots", value: Boots[this.seedModel.StatsAndGear.Boots]},
      {name: "Hammer", value: Hammer[this.seedModel.StatsAndGear.Hammer]},
      {name: "Coins", value: this.seedModel.StatsAndGear.Coins},
      {name: "Min Number of Starting Items", value: this.seedModel.StatsAndGear.MinNumberOfStartingItems},
      {name: "Max Number of Starting Items", value: this.seedModel.StatsAndGear.MaxNumberOfStartingItems},
      {name: "Starting Items", value: startingItems?.join(", ")}
    ] as SettingRow[]
  }

  private initWorldRows(): void {
    this.worldRows = [
      {name: "Starting Location", value: this.seedModel.World.StartingLocation},
      {name: "Magical Seeds Required", value: this.seedModel.World.MagicalSeedsRequired},
      {name: "Open Prologue", value: this.seedModel.World.OpenPrologue},
      {name: "Open Mt.Rugged", value: this.seedModel.World.OpenMtRugged},
      {name: "Open Forever Forest", value: this.seedModel.World.OpenForeverForest},
      {name: "Open Toy Box", value: this.seedModel.World.OpenToyBox},
      {name: "Open Whale", value: this.seedModel.World.OpenWhale},
      {name: "Open Blue House", value: this.seedModel.World.OpenBlueHouse},
      {name: "Ch.7 Bridge Visible", value: this.seedModel.World.Ch7BridgeVisible},
      {name: "Bowser's Castle Mode", value: BowsersCastleMode[this.seedModel.World.BowsersCastleMode]},
      {name: "Shuffle Dungeon Entrances", value: this.seedModel.World.ShuffleDungeonEntrances},
      {name: "Mirror Mode", value: MirrorMode[this.seedModel.World.MirrorMode]},
    ] as SettingRow[]
  }

  private initQolRows(): void {
    this.qolRows = [
      {name: "Always I Spy", value: this.seedModel.QualityOfLife.AlwaysISpy},
      {name: "Always Peekaboo", value: this.seedModel.QualityOfLife.AlwaysPeekaboo},
      {name: "Always Speedy Spin", value: this.seedModel.QualityOfLife.AlwaysSpeedySpin},
      {name: "Cook Without Frying Pan", value: this.seedModel.QualityOfLife.CookWithoutFryingPan},
      {name: "Foliage Item Hints", value: this.seedModel.QualityOfLife.FoliageItemHints},
      {name: "Hidden Block Mode", value: HiddenBlockMode[this.seedModel.QualityOfLife.HiddenBlockMode]},
      {name: "Prevent OOB / LZS tricks", value: this.seedModel.QualityOfLife.PreventPhysicsGlitches},
      {name: "Quizmo Always Appear", value: this.seedModel.QualityOfLife.QuizmoAlwaysAppear},
      {name: "Cutscene Mode", value: CustceneMode[this.seedModel.QualityOfLife.CutsceneMode]},
      {name: "Skip Epilogue", value: this.seedModel.QualityOfLife.SkipEpilogue},
      {name: "Skip Quiz", value: this.seedModel.QualityOfLife.SkipQuiz},
      {name: "Visible Hidden Panels", value: this.seedModel.QualityOfLife.VisibleHiddenPanels},
    ] as SettingRow[]
  }

  private initSpoilerRows(): void {
    this.spoilerRows = [
      {name: "Merluvlee Item Hints", value: this.seedModel.Spoiler.MerluvleeItemHints},
      {name: "Include Spoiler Log", value: this.seedModel.Spoiler.IncludeSpoilerLog}
    ] as SettingRow[]

    if (this.seedModel.Spoiler.IncludeSpoilerLog && this.seedModel.Spoiler.RevealLogAtTime) {
      this.spoilerRows.push({name: "Reveal Log At Time", value: new Date(this.seedModel.Spoiler.RevealLogAtTime).toString()})
    }
  }

  private getStartingItemName(itemNumber: string) {
    if(itemNumber == "Random") {
      return "Random"
    }

    var name = Items[itemNumber];
    if(!name) {
      name = KeyItems[itemNumber];
    }
    if(!name){
      name = Badges[itemNumber];
    }
    return pascalToVerboseString(name);
  }
}
