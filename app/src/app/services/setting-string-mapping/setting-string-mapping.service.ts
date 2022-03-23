import { Badges } from './../../entities/enum/badges';
import { KeyItems } from './../../entities/enum/keyItems';
import { Constants } from './../../utilities/constants';
import { StartingItem } from './../../entities/startingItem';
import { CharacterSpriteSetting } from './../../entities/characterSpriteSetting';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Items } from 'src/app/entities/enum/items';

interface SettingModel {compressedString: string, key: string, type: string, map?: SettingModel[]};

@Injectable({
  providedIn: 'root'
})
export class SettingStringMappingService {

  public readonly colorPalettesMap: SettingModel[] = [
    { compressedString: "x", key: "bossesSetting", type: "number"},
    { compressedString: "b", key: "bowSprite", type: "sprite"},
    { compressedString: "c", key: "coinColor", type: "number"},
    { compressedString: "g", key: "goombarioSprite", type: "sprite"},
    { compressedString: "k", key: "kooperSprite", type: "sprite"},
    { compressedString: "m", key: "menu", type: "number"},
    { compressedString: "p", key: "marioSprite", type: "sprite"},
    { compressedString: "n", key: "npcSetting", type: "number"},
    { compressedString: "t", key: "randomText", type: "bool"},
  ]

  public readonly difficultyMap: SettingModel [] = [
    { compressedString: "c", key: "capEnemyXP", type: "bool"},
    { compressedString: "m", key: "damageMultiplier", type: "number"},
    { compressedString: "d", key: "difficultyMode", type: "number"},
    { compressedString: "i", key: "itemScarcity", type: "number"},
    { compressedString: "h", key: "noHeartBlocks", type: "bool"},
    { compressedString: "s", key: "noSaveBlocks", type: "bool"},
    { compressedString: "x", key: "noXP", type: "bool"},
    { compressedString: "k", key: "oneHitKO", type: "bool"},
    { compressedString: "w", key: "starWaySpiritsNeeded", type: "number"},
    { compressedString: "l", key: "noHealingItems", type: "bool"},
  ]

  public readonly gameplayMap: SettingModel [] = [
    { compressedString: "r", key: "randomFormations", type: "bool"},
    { compressedString: "b", key: "shuffleBadgesBP", type: "bool"},
    { compressedString: "f", key: "shuffleBadgesFP", type: "bool"},
    { compressedString: "p", key: "shufflePartnerFP", type: "bool"},
    { compressedString: "s", key: "shuffleStarpowerSP", type: "bool"},
  ]

  public readonly itemsMap: SettingModel [] = [
    { compressedString: "c", key: "includeCoins", type: "bool"},
    { compressedString: "d", key: "includeDojo", type: "bool"},
    { compressedString: "f", key: "includeFavors", type: "bool"},
    { compressedString: "p", key: "includePanels", type: "bool"},
    { compressedString: "s", key: "includeShops", type: "bool"},
    { compressedString: "k", key: "keyitemsOutsideDungeon", type: "bool"},
    { compressedString: "i", key: "shuffleItems", type: "bool"}
  ]

  public readonly marioStatsMap: SettingModel [] = [
    { compressedString: "c", key: "startingCoins", type: "number"},
    { compressedString: "i", key: "startingItems", type: "items"},
    { compressedString: "b", key: "startingMaxBP", type: "number"},
    { compressedString: "f", key: "startingMaxFP", type: "number"},
    { compressedString: "h", key: "startingMaxHP", type: "number"},
    { compressedString: "s", key: "startingStarPower", type: "number"},
    { compressedString: "r", key: "startWithRandomItems", type: "bool"},
    { compressedString: "n", key: "randomItemsMin", type: "number"},
    { compressedString: "x", key: "randomItemsMax", type: "number"},
  ]

  public readonly openLocationsMap: SettingModel [] = [
    { compressedString: "b", key: "blueHouseOpen", type: "bool"},
    { compressedString: "f", key: "flowerGateOpen", type: "bool"},
    { compressedString: "h", key: "homewardShroom", type: "bool"},
    { compressedString: "s", key: "startingMap", type: "number"},
    { compressedString: "t", key: "toyboxOpen", type: "bool"},
    { compressedString: "w", key: "whaleOpen", type: "bool"},
  ]

  public readonly startWithPartnersMap: SettingModel [] = [
    { compressedString: "g", key: "goombario", type: "bool"},
    { compressedString: "k", key: "kooper", type: "bool"},
    { compressedString: "t", key: "bombette", type: "bool"},
    { compressedString: "p", key: "parakarry", type: "bool"},
    { compressedString: "b", key: "bow", type: "bool"},
    { compressedString: "w", key: "watt", type: "bool"},
    { compressedString: "s", key: "sushie", type: "bool"},
    { compressedString: "l", key: "lakilester", type: "bool"},
  ]

  public readonly partnersMap: SettingModel [] = [
    { compressedString: "a", key: "partnersAlwaysUsable", type: "bool"},
    { compressedString: "x", key: "randomPartnersMax", type: "number"},
    { compressedString: "n", key: "randomPartnersMin", type: "number"},
    { compressedString: "s", key: "shufflePartners", type: "bool"},
    { compressedString: "/p", key: "startWithPartners", type: "formGroup", map: this.startWithPartnersMap},
    { compressedString: "r", key: "startWithRandomPartners", type: "bool"},
  ]

  public readonly qualityOfLifeMap: SettingModel [] = [
    { compressedString: "i", key: "alwaysISpy", type: "bool"},
    { compressedString: "p", key: "alwaysPeekaboo", type: "bool"},
    { compressedString: "s", key: "alwaysSpeedySpin", type: "bool"},
    { compressedString: "h", key: "hiddenBlockMode", type: "number"},
    { compressedString: "g", key: "preventPhysicsGlitches", type: "bool"},
    { compressedString: "q", key: "quizmoAlwaysAppears", type: "bool"},
    { compressedString: "r", key: "romanNumerals", type: "bool"},
    { compressedString: "b", key: "shortenBowsersCastle", type: "bool"},
    { compressedString: "c", key: "shortenCutscenes", type: "bool"},
    { compressedString: "e", key: "skipEpilogue", type: "bool"},
    { compressedString: "z", key: "skipQuiz", type: "bool"},
    { compressedString: "m", key: "turnOffMusic", type: "bool"},
    { compressedString: "l", key: "writeSpoilerLog", type: "bool"},
    { compressedString: "f", key: "foliageItemHints", type: "bool"},
  ]

  public readonly settingsMap: SettingModel[] = [
    { compressedString: "/c", key: "colorPalettes", type: "formGroup", map: this.colorPalettesMap},
    { compressedString: "/d", key: "difficulty", type: "formGroup", map: this.difficultyMap},
    { compressedString: "/g", key: "gameplay", type: "formGroup", map: this.gameplayMap},
    { compressedString: "/i", key: "items", type: "formGroup", map: this.itemsMap},
    { compressedString: "/m", key: "marioStats", type: "formGroup", map: this.marioStatsMap},
    { compressedString: "/o", key: "openLocations", type: "formGroup", map: this.openLocationsMap},
    { compressedString: "/p", key: "partners", type: "formGroup", map: this.partnersMap},
    { compressedString: "/q", key: "qualityOfLife", type: "formGroup", map: this.qualityOfLifeMap},
  ];

  constructor() { }

  public compressFormGroup(formElement: FormGroup, settingsMap: SettingModel[]): string {
    var compressedString: string = '';
    Object.keys(formElement.controls).forEach(controlName => {
      var nestedFormElement = formElement.controls[controlName] as FormGroup
      if(nestedFormElement?.controls) {
        var nestedSettingMap = settingsMap.find(m => m.key == controlName).map;
        compressedString += settingsMap.find(m => m.key == controlName).compressedString;
        compressedString += this.compressFormGroup(nestedFormElement, nestedSettingMap)
      }
      else {
        var settingModel = settingsMap.find(m => m.key == controlName)
        switch (settingModel.type) {
          case "bool":
            compressedString += this.encodeBoolean(nestedFormElement.value, settingModel);
            break;
          case "number":
            compressedString += this.encodeNumber(nestedFormElement.value, settingModel);
            break;

          case "sprite":
            compressedString += this.encodeSprite(nestedFormElement.value, settingModel);
            break;
          case "items":
            compressedString += this.encodeItems(nestedFormElement.value, settingModel)
            break;
        
          default:
            throw new Error("Unimplemented setting string mapping type: " + settingModel.type);
            break;
        }
      }
    })
    compressedString += "\\"
    return compressedString
  }

  public decompressFormGroup(settingString: string, formGroup: FormGroup, settingsMap: SettingModel[]) {
    var i = 0
    while(i < settingString.length) {
      var isNestingKey = false;
      if(settingString[i] == '\/') {
        isNestingKey = true;
        i++;
      }
      else if(settingString[i] == '\\') {
        i++;
        return;
      }
      var currentSubstring = isNestingKey ? '\/' + settingString[i] : settingString[i];
      var settingModel = settingsMap.find(m => m.compressedString.toLowerCase() == currentSubstring.toLowerCase())

      switch (settingModel.type) {
        case "formGroup":
          i++;
          var nestingLevels = settingModel.map.filter(m => m.type == 'formGroup').length + 1;
          var formGroupEndIndex = this.indexOfNthOccurence(settingString.substring(i), '\\', nestingLevels) + i;
          var nestedGroupSubstring = settingString.substring(i, formGroupEndIndex + 1)
          i += nestedGroupSubstring.length;
          this.decompressFormGroup(nestedGroupSubstring, formGroup.controls[settingModel.key] as FormGroup, settingModel.map)
          break;

        case "bool":
            formGroup.controls[settingModel.key].setValue(this.decodeBoolean(settingString[i]));
            i++;
            break;

        case "number":
            i++;
            var numValue = ""
            while(!isNaN(Number(settingString[i]))) {
              numValue += settingString[i]
              i++;
            }
            formGroup.controls[settingModel.key].setValue(Number(numValue));
          break;

        case "sprite":
          var key = settingString[i];
          i++;
          var setting = settingString[i];
          i++;
          var texture = settingString[i];
          i++;

          formGroup.controls[settingModel.key].setValue(this.decodeSprite(key, setting, texture));
          break;
        case "items":
          i++;
          var itemsSubstring = '';
          while(!isNaN(Number(settingString[i]))) {
            itemsSubstring += settingString[i];
            i++;
          }
          formGroup.controls[settingModel.key].setValue(this.decodeItems(itemsSubstring))
          break;
      
        default:
          throw new Error("Unimplementent setting string mapping type: " + settingModel.type);
      }

    }
  }

  private encodeBoolean(value: boolean, settingModel: SettingModel): string {
    return value ? settingModel.compressedString.toUpperCase() : settingModel.compressedString.toLowerCase();
  }

  private decodeBoolean(compressedString: string): boolean {
    return compressedString == compressedString.toUpperCase() ? true : false;
  }

  private encodeNumber(value: number, settingModel: SettingModel): string {
    return settingModel.compressedString + value.toString();
  }

  private encodeSprite(value: CharacterSpriteSetting, settingModel: SettingModel): string {
    return settingModel.compressedString + value.setting.toString() + value.paletteSelection.toString();
  }

  private decodeSprite(compressedKey: string, compressedSetting: string, compressedPalette: string): CharacterSpriteSetting{
    switch (compressedKey) {
      case 'b':
        return Constants.BOW_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      case 'g':
        return Constants.GOOMBARIO_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      case 'k':
        return Constants.KOOPER_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      case 'p':
        return Constants.MARIO_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      default:
        throw Error('Unexpected key found while parsing sprite settings: ' + compressedKey)
    }

  }

  private encodeItems(value: StartingItem[], settingModel: SettingModel) {
    var allItemsString = '';
    for (const item of value) {
      var itemString = item.value.toString()
      while(itemString.length < 4) {
        itemString = '0'.concat(itemString);
      }
      allItemsString += itemString;
    }
    return settingModel.compressedString + allItemsString;
  }

  private decodeItems(itemValues: string): StartingItem[]{
    var i = 0;
    var items: StartingItem[] = [];
    while(i < itemValues.length) {
      var itemValue = Number(itemValues.substring(i, i+4))
      i += 4;
      if (Object.values(Items).includes(itemValue)) {
        items.push({name: Items[itemValue], value: itemValue, itemType: "Item"} as StartingItem)
      }
      else if (Object.values(KeyItems).includes(itemValue)) {
        items.push({name: KeyItems[itemValue], value: itemValue, itemType: "Key Item"} as StartingItem)
      }
      else if (Object.values(Badges).includes(itemValue)) {
        items.push({name: Badges[itemValue], value: itemValue, itemType: "Badge"} as StartingItem)
      }
    }
    return items;
  }

  private indexOfNthOccurence(string, subString, n) {
    return string.split(subString, n).join(subString).length;
  }
}
