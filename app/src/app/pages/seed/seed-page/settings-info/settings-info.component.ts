import { LakilesterSprite } from './../../../../entities/enum/lakilesterSprite';
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
import { SpriteSetting } from 'src/app/entities/enum/spriteSetting';
import { Hammer } from 'src/app/entities/enum/hammer';
import glitchesJson from '../../../../utilities/glitches.json'
import { LogicGlitch } from 'src/app/entities/logicGlitch';
import { GearShuffleMode } from 'src/app/entities/enum/gearShuffleMode';
import { RandomConsumableMode } from 'src/app/entities/enum/randomConsumableMode';
import { SeedViewModel } from 'src/app/entities/seed-view-model/seedViewModel';
import { MysteryMode } from 'src/app/entities/enum/mysteryMode';

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
  public statsAndGearRows: SettingRow[] = [];
  public openWorldRows: SettingRow[] = [];
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
    this.initStatsRows();
    this.initOpenWorldRows();
    this.initQolRows();
    this.initSpoilerRows();

    const emptyRow = {name: "", value: ""}
    this.allRows = [
      ...this.itemRows, emptyRow,
      ...this.partnerRows, emptyRow,
      ...this.gameplayRows, emptyRow,
      ...this.cosmeticsRows, emptyRow,
      ...this.difficultyRows, emptyRow,
      ...this.statsAndGearRows, emptyRow,
      ...this.openWorldRows, emptyRow,
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
      {name: "Stats & Gear", rows: this.statsAndGearRows},
      {name: "Open World", rows: this.openWorldRows},
      {name: "Quality Of Life", rows: this.qolRows},
      {name: "Spoiler", rows: this.spoilerRows}
    ]

    if(this.enabledGlitchesRows[0].value != "") {
      this.allRows.push(...this.enabledGlitchesRows)
      this.settingCategories.push({name: "Glitches & Tricks", rows: this.enabledGlitchesRows})
    }

    this.selectedCategory = this.settingCategories[0];
    this.updateDisplayedRows();
  }

  private initItemRows(): void {
    this.itemRows =  [
      {name: "Shuffle Items", value: this.seedModel.Items.ShuffleItems},
      {name: "Coinsanity", value: this.seedModel.Items.Coinsanity},
      {name: "Shopsanity", value: this.seedModel.Items.Shopsanity},
      {name: "Keysanity", value: this.seedModel.Items.Keysanity},
      {name: "Gear Shuffle", value: GearShuffleMode[this.seedModel.Items.GearShuffle]},
      {name: "Include Dojo Rewards", value: this.seedModel.Items.IncludeDojoRewards},
      {name: "Include Hidden Panels", value: this.seedModel.Items.IncludeHiddenPanels},
      {name: "Include Trading Event Rewards", value: this.seedModel.Items.IncludeTradingEventRewards},
      {name: "Koopa Koot Favors", value: KootFavorsMode[this.seedModel.Items.KoopaKootFavors]},
      {name: "Letter Delivery Rewards", value: LettersMode[this.seedModel.Items.LetterDeliveryRewards]},
      {name: "Rip Cheato Items In Logic", value: this.seedModel.Items.RipCheatoItemsInLogic},
      {name: "Shuffle Super/Multicoin Blocks", value: this.seedModel.Items.ShuffleSuperAndMulticoinBlocks},
      {name: "Add Item Pouches", value: this.seedModel.Items.AddItemPouches},
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
      {name: "Bosses", value: pascalToVerboseString(SpriteSetting[this.seedModel.Cosmetics.Bosses])},
      {name: "Enemies", value: pascalToVerboseString(SpriteSetting[this.seedModel.Cosmetics.Enemies])},
      {name: "Hammer", value: pascalToVerboseString(SpriteSetting[this.seedModel.Cosmetics.Hammer])},
      {name: "NPC", value: pascalToVerboseString(SpriteSetting[this.seedModel.Cosmetics.NPC])},
      {name: "Coin Color", value: this.seedModel.Cosmetics.CoinColor},
      {name: "Status Menu", value: this.seedModel.Cosmetics.StatusMenu},
      {name: "Roman Numerals", value: this.seedModel.Cosmetics.RomanNumerals},
      {name: "Random Text", value: this.seedModel.Cosmetics.RandomText},
      {name: "Random Pitch", value: this.seedModel.Cosmetics.RandomPitch},
    ] as SettingRow[]
  }

  private initDifficultyRows(): void {
    this.difficultyRows = [
      {name: "Enemy Difficulty", value: this.seedModel.GeneralDifficulty.EnemyDifficulty},
      {name: "Cap Enemy XP", value: this.seedModel.GeneralDifficulty.CapEnemyXP},
      {name: "Enemy Damage", value: this.seedModel.GeneralDifficulty.EnemyDamage},
      {name: "Consumable Item Pool", value: RandomConsumableMode[this.seedModel.GeneralDifficulty.ConsumableItemPool]},
      {name: "Item Traps", value: ItemTrapMode[this.seedModel.GeneralDifficulty.ItemTraps]},
      {name: "Item Quality", value: this.seedModel.GeneralDifficulty.ItemQuality + "%"},
      {name: "Merlow Rewards Pricing", value: MerlowRewardPricing[this.seedModel.GeneralDifficulty.MerlowRewardsPricing]},
      {name: "Random Number of Required Star Spirits", value: this.seedModel.GeneralDifficulty.RandomNumberOfRrequiredStarSpirits},
      {name: "Star Spirits Required", value: this.seedModel.GeneralDifficulty.StarSpiritsRequired},
      {name: "No Healing Items", value: this.seedModel.GeneralDifficulty.NoHealingItems},
      {name: "No Heart Blocks", value: this.seedModel.GeneralDifficulty.NoHeartBlocks},
      {name: "No Save Blocks", value: this.seedModel.GeneralDifficulty.NoSaveBlocks},
      {name: "No XP", value: this.seedModel.GeneralDifficulty.NoXP},
      {name: "One Hit KO", value: this.seedModel.GeneralDifficulty.OneHitKO}
    ] as SettingRow[]
  }

  private initStatsRows(): void {
    const startingItems = this.seedModel.StatsAndGear.StartingItems.map(i => this.getStartingItemName(i))
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

  private initOpenWorldRows(): void {
    this.openWorldRows = [
      {name: "Starting Location", value: this.seedModel.OpenWorld.StartingLocation},
      {name: "Magical Seeds Required", value: this.seedModel.OpenWorld.MagicalSeedsRequired},
      {name: "Open Blue House", value: this.seedModel.OpenWorld.OpenBlueHouse},
      {name: "Open Prologue", value: this.seedModel.OpenWorld.OpenPrologue},
      {name: "Open Toy Box", value: this.seedModel.OpenWorld.OpenToyBox},
      {name: "Open Whale", value: this.seedModel.OpenWorld.OpenWhale},
    ] as SettingRow[]
  }

  private initQolRows(): void {
    this.qolRows = [
      {name: "Always I Spy", value: this.seedModel.QualityOfLife.AlwaysISpy},
      {name: "Always Peekaboo", value: this.seedModel.QualityOfLife.AlwaysPeekaboo},
      {name: "Always Speedy Spin", value: this.seedModel.QualityOfLife.AlwaysSpeedySpin},
      {name: "Bowser's Castle Mode", value: BowsersCastleMode[this.seedModel.QualityOfLife.BowsersCastleMode]},
      {name: "Cook Without Frying Pan", value: this.seedModel.QualityOfLife.CookWithoutFryingPan},
      {name: "Foliage Item Hints", value: this.seedModel.QualityOfLife.FoliageItemHints},
      {name: "Hidden Block Mode", value: HiddenBlockMode[this.seedModel.QualityOfLife.HiddenBlockMode]},
      {name: "Prevent Physics Glitches", value: this.seedModel.QualityOfLife.PreventPhysicsGlitches},
      {name: "Quizmo Always Appear", value: this.seedModel.QualityOfLife.QuizmoAlwaysAppear},
      {name: "Shorten Cutscenes", value: this.seedModel.QualityOfLife.ShortenCutscenes},
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
