import { MerlowRewardPricing } from './../../../../entities/enum/merlowRewardPricing';
import { Boots } from './../../../../entities/enum/boots';
import { BowsersCastleMode } from './../../../../entities/enum/bowsersCastleMode';
import { KootFavorsMode } from './../../../../entities/enum/kootFavorsMode';
import { LettersMode } from './../../../../entities/enum/lettersMode';
import { ItemTrapMode } from './../../../../entities/enum/itemTrapMode';
import { AbilityCostMode } from './../../../../entities/enum/abilityCostMode';
import { CoinColor } from './../../../../entities/enum/coinColor';
import { Badges } from './../../../../entities/enum/badges';
import { KeyItems } from './../../../../entities/enum/keyItems';
import { Items } from './../../../../entities/enum/items';
import { StartingMap } from './../../../../entities/enum/startingMaps';
import { Component, Input, OnInit } from '@angular/core';
import { HiddenBlockMode } from 'src/app/entities/enum/hiddenBlockMode';
import { pascalToVerboseString } from 'src/app/utilities/stringFunctions';
import { SpriteSetting } from 'src/app/entities/enum/spriteSetting';
import { Constants } from 'src/app/utilities/constants';
import { Hammer } from 'src/app/entities/enum/hammer';
import glitchesJson from '../../../../utilities/glitches.json'
import { LogicGlitch } from 'src/app/entities/logicGlitch';
import { HiddenPanelVisibilityMode } from 'src/app/entities/enum/hiddenPanelVisibilityMode';
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
  public itemRows: SettingRow[] = [];
  public partnerRows: SettingRow[] = [];
  public gameplayRows: SettingRow[] = [];
  public cosmeticsRows: SettingRow[] = [];
  public glitchesRows: SettingRow[] = [];
  public difficultyRows: SettingRow[] = [];
  public statsAndGearRows: SettingRow[] = [];
  public openWorldRows: SettingRow[] = [];
  public qolRows: SettingRow[] = [];
  public spoilerRows: SettingRow[] = [];

  public expirationDate: Date;

  public copiedToClipboard = false;

  public glitchesList: LogicGlitch[];
  public enabledGlitches: string[];
  
  public constructor() { }

  public ngOnInit(): void {
    this.expirationDate = new Date(this.seedModel.SeedInfo.CreationDate)
    this.expirationDate.setDate(this.expirationDate.getDate() + 30)

    this.initRows();

  }

  private initRows(): void {
    this.initItemRows();
    this.initPartnerRows();
    this.initGameplayRows();
    this.initCosmeticsRows();

    const emptyRow = {name: "", value: ""}
    this.displayedRows = [
      ...this.itemRows, emptyRow,
      ...this.partnerRows, emptyRow,
      ...this.gameplayRows, emptyRow,
      ...this.cosmeticsRows
    ]
  }

  private initItemRows(): void {
    this.itemRows =  [
      {name: "Add Item Pouches", value: this.seedModel.Items.AddItemPouches},
      {name: "Coinsanity", value: this.seedModel.Items.Coinsanity},
      {name: "Gear Shuffle", value: GearShuffleMode[this.seedModel.Items.GearShuffle]},
      {name: "Include Dojo Rewards", value: this.seedModel.Items.IncludeDojoRewards},
      {name: "Include Hidden Panels", value: this.seedModel.Items.IncludeHiddenPanels},
      {name: "Include Trading Event Rewards", value: this.seedModel.Items.IncludeTradingEventRewards},
      {name: "Keysanity", value: this.seedModel.Items.Keysanity},
      {name: "Koopa Koot Favors", value: KootFavorsMode[this.seedModel.Items.KoopaKootFavors]},
      {name: "Letter Delivery Rewards", value: LettersMode[this.seedModel.Items.LetterDeliveryRewards]},
      {name: "Rip Cheato Items In Logic", value: this.seedModel.Items.RipCheatoItemsInLogic},
      {name: "Shopsanity", value: this.seedModel.Items.Shopsanity},
      {name: "Shuffle Items", value: this.seedModel.Items.ShuffleItems},
      {name: "Shuffle Super/Multicoin Blocks", value: this.seedModel.Items.ShuffleSuperAndMulticoinBlocks},
    ] as SettingRow[];
  }

  private initPartnerRows(): void {
    this.partnerRows =  [
      {name: "Max Number Of Starting Partners", value: this.seedModel.Partners.MaxNumberOfStartingPartners},
      {name: "Min Number Of Starting Partners", value: this.seedModel.Partners.MinNumberOfStartingPartners},
      {name: "Partners Always Usable", value: this.seedModel.Partners.PartnersAlwaysUsable},
      {name: "Shuffle Partners", value: this.seedModel.Partners.ShufflePartners},
      {name: "Start With Partners", value: this.seedModel.Partners.StartWithPartners?.join(", ")},
      {name: "Start With Random Partners", value: this.seedModel.Partners.StartWithRandomPartners}
    ] as SettingRow[];

    this.partnerRows = this.partnerRows.filter(sr => sr.value != null)
  }

  private initGameplayRows(): void {
    this.gameplayRows = [
      {name: "Badges BP", value: this.seedModel.Gameplay.BadgesBP},
      {name: "Badges FP", value: this.seedModel.Gameplay.BadgesFP},
      {name: "Mystery", value: MysteryMode[this.seedModel.Gameplay.MysteryMode]},
      {name: "Partners FP", value: this.seedModel.Gameplay.PartnersFP},
      {name: "Shuffle Battle Formations", value: this.seedModel.Gameplay.ShuffleBattleFormations},
      {name: "Star Power SP", value: this.seedModel.Gameplay.StarPowerSP},
    ] as SettingRow[]
  }

  private initCosmeticsRows(): void {
    this.gameplayRows = [
      {name: "Bombette", value: this.seedModel.Cosmetics.Bombette},
      {name: "Bosses", value: pascalToVerboseString(SpriteSetting[this.seedModel.Cosmetics.Bosses])},
      {name: "Bow", value: this.seedModel.Cosmetics.Bow},
      {name: "Coin Color", value: this.seedModel.Cosmetics.CoinColor},
      {name: "Enemies", value: this.seedModel.Cosmetics.Enemies},
      {name: "Goombario", value: this.seedModel.Cosmetics.Goombario},
      {name: "Kooper", value: this.seedModel.Cosmetics.Kooper},
      {name: "Mario", value: this.seedModel.Cosmetics.Mario},
      {name: "NPC", value: this.seedModel.Cosmetics.NPC},
      {name: "Parakarry", value: this.seedModel.Cosmetics.Parakarry},
      {name: "Status Menu", value: this.seedModel.Cosmetics.StatusMenu},
      {name: "Sushie", value: this.seedModel.Cosmetics.Sushie},
      {name: "Watt", value: this.seedModel.Cosmetics.Watt},
    ] as SettingRow[]
  }

  private getStartingItemName(itemNumber: string) {
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
