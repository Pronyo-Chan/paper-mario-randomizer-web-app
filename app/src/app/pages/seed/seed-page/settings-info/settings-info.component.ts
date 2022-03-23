import { CoinColor } from './../../../../entities/enum/coinColor';
import { Badges } from './../../../../entities/enum/badges';
import { KeyItems } from './../../../../entities/enum/keyItems';
import { Items } from './../../../../entities/enum/items';
import { StartingMap } from './../../../../entities/enum/startingMaps';
import { SettingsResponse } from './../../../../entities/settingsResponse';
import { Component, Input, OnInit } from '@angular/core';
import { HiddenBlockMode } from 'src/app/entities/enum/hiddenBlockMode';
import { pascalToVerboseString } from 'src/app/utilities/stringFunctions';
import { SpriteSetting } from 'src/app/entities/enum/spriteSetting';
import { Constants } from 'src/app/utilities/constants';

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

  @Input() public seedInfo: SettingsResponse

  public settingRows: SettingRow[] = [];
  expirationDate: Date;
  
  public constructor() { }

  public ngOnInit(): void {
    this.expirationDate = new Date(this.seedInfo.CreationDate)
    this.expirationDate.setDate(this.expirationDate.getDate() + 30)
    this.initSettingRows();
  }

  public initSettingRows() {
    this.addColorSettings(); //Custom treatment for colors because there are 2settings in DB for one user setting
    for (var key in this.seedInfo) {
      var cleanSettingName = pascalToVerboseString(key)
      switch(key){
        case 'StartWithPartners': 
          var startingPartners = Object.keys(this.seedInfo["StartWithPartners"]).filter(partner => this.seedInfo["StartWithPartners"][partner] == true)
          this.settingRows.push({name: cleanSettingName, value: startingPartners.join(', ')} as SettingRow)
          break;
        case 'HiddenBlockMode':
          this.settingRows.push({name: cleanSettingName, value: HiddenBlockMode[this.seedInfo[key]]})
          break;
        case 'AllowPhysicsGlitches':
          this.settingRows.push({name: 'Prevent Physics Glitches', value: this.inverseStringBoolean(this.seedInfo[key])} as SettingRow)
          break;
        case 'PartnersInDefaultLocations':
          this.settingRows.push({name: 'Shuffle Partners', value: this.inverseStringBoolean(this.seedInfo[key])} as SettingRow)
          break;
        case 'StartingMap':
          this.settingRows.push({name: cleanSettingName, value: StartingMap[this.seedInfo[key]]} as SettingRow)
          break;
        case String(key.match(/.*StartingItem.*/)):
          if(this.seedInfo[key])
            this.settingRows.push({name: cleanSettingName, value: this.getStartingItemName(this.seedInfo[key])} as SettingRow)
          break;
        case 'SeedID':
        case 'CreationDate': 
        case 'StarRodModVersion':
        case 'SettingsName':
        case 'SettingsVersion':
        case 'PlacementLogic':
        case 'PlacementAlgorithm':
        case 'PrettySpoilerlog':
        case 'RomanNumerals':
        case 'IncludeFavors':
        case 'IncludeLetterChain':
        case 'PeachCastleReturnPipe':
        case 'ChallengeMode':
        case String(key.match(/.*Color.*/)):
        case String(key.match(/.*Sprite.*/)):
        case String(key.match(/.*Setting.*/)): //GoombarioSetting, KooperSetting, etc. Handle colors manually
          break;

        default: {
          this.settingRows.push({name: cleanSettingName, value: this.seedInfo[key]} as SettingRow)
        }
      }
    }
    this.settingRows.sort((a, b) => a.name.localeCompare(b.name))
  }

  private inverseStringBoolean(value: boolean) {
    return String(!value);
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

  private addColorSettings() {
    this.settingRows.push({name: 'Boss Colors', value: pascalToVerboseString(SpriteSetting[this.seedInfo['BossesSetting']])} as SettingRow);
    this.settingRows.push({name: 'NPC Colors', value: pascalToVerboseString(SpriteSetting[this.seedInfo['NPCSetting']])} as SettingRow);
    this.settingRows.push({name: 'Coin Color', value: pascalToVerboseString(CoinColor[this.seedInfo['CoinColor']])} as SettingRow);
    this.settingRows.push({name: 'Status Menu Color', value: this.getBoxColorName(this.seedInfo.Box5ColorA, this.seedInfo.Box5ColorB)} as SettingRow);

    this.settingRows.push({name: 'Bow Color', value: this.getSpriteSettingName('Bow', this.seedInfo.BowSetting, this.seedInfo.BowSprite)} as SettingRow);
    this.settingRows.push({name: 'Goombario Color', value: this.getSpriteSettingName('Goombario', this.seedInfo.GoombarioSetting, this.seedInfo.GoombarioSprite)} as SettingRow);
    this.settingRows.push({name: 'Kooper Color', value: this.getSpriteSettingName('Kooper', this.seedInfo.KooperSetting, this.seedInfo.KooperSprite)} as SettingRow);
    this.settingRows.push({name: 'Mario Color', value: this.getSpriteSettingName('Mario', this.seedInfo.MarioSetting, this.seedInfo.MarioSprite)} as SettingRow);
  }

  private getSpriteSettingName(entityName: string, settingValue: SpriteSetting, pickedSpriteValue: number): string {
    switch (entityName) {
      case 'Bow':
        return Constants.BOW_OPTIONS.find(option => option.setting == settingValue && option.paletteSelection == pickedSpriteValue).optionDisplay;
      case 'Goombario':
        return Constants.GOOMBARIO_OPTIONS.find(option => option.setting == settingValue && option.paletteSelection == pickedSpriteValue).optionDisplay;  
      case 'Kooper':
        return Constants.KOOPER_OPTIONS.find(option => option.setting == settingValue && option.paletteSelection == pickedSpriteValue).optionDisplay;        
      case 'Mario':
        return Constants.MARIO_OPTIONS.find(option => option.setting == settingValue && option.paletteSelection == pickedSpriteValue).optionDisplay;                     
      default:
        return '';
    }
  }
  private getBoxColorName(colorA: number, colorB: number): string {
      return Constants.MENU_COLORS.find(menuColor => menuColor.colorA == colorA && menuColor.colorB == colorB)?.colorName;
  }
}
