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

interface SettingRow {
  name: string;
  value: string;
}

@Component({
  selector: 'app-settings-info',
  templateUrl: './settings-info.component.html',
  styleUrls: ['./settings-info.component.scss']
})
export class SettingsInfoComponent implements OnInit {

  @Input() public seedModel: SeedViewModel

  public settingRows: SettingRow[] = [];
  public expirationDate: Date;

  public copiedToClipboard = false;

  public glitchesList: LogicGlitch[];
  public enabledGlitches: string[];
  
  public constructor() { }

  public ngOnInit(): void {
    this.expirationDate = new Date(this.seedModel.SeedInfo.CreationDate)
    this.expirationDate.setDate(this.expirationDate.getDate() + 30)

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
