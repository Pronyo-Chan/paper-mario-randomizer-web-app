import { LogicGlitch } from 'src/app/entities/logicGlitch';
import { Badges } from './../../entities/enum/badges';
import { KeyItems } from './../../entities/enum/keyItems';
import { Constants } from './../../utilities/constants';
import { StartingItem } from './../../entities/startingItem';
import { CharacterSpriteSetting } from './../../entities/characterSpriteSetting';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Items } from 'src/app/entities/enum/items';
import glitchesJson from '../../utilities/glitches.json'
import { pascalToVerboseString } from 'src/app/utilities/stringFunctions';

interface SettingModel {compressedString: string, key: string, type: string, map?: SettingModel[]};

@Injectable({
  providedIn: 'root'
})
export class SettingStringMappingService {

  public readonly cosmeticsMap: SettingModel[] = [
    { compressedString: "x", key: "bossesSetting", type: "number"},
    { compressedString: "b", key: "bowSprite", type: "sprite"},
    { compressedString: "c", key: "coinColor", type: "number"},
    { compressedString: "g", key: "goombarioSprite", type: "sprite"},
    { compressedString: "k", key: "kooperSprite", type: "sprite"},
    { compressedString: "o", key: "bombetteSprite", type: "sprite"},
    { compressedString: "m", key: "menu", type: "number"},
    { compressedString: "p", key: "marioSprite", type: "sprite"},
    { compressedString: "n", key: "npcSetting", type: "number"},
    { compressedString: "e", key: "enemiesSetting", type: "number"},
    { compressedString: "y", key: "hammerSetting", type: "number"},
    { compressedString: "t", key: "randomText", type: "bool"},
    { compressedString: "w", key: "wattSprite", type: "sprite"},
    { compressedString: "s", key: "sushieSprite", type: "sprite"},
    { compressedString: "l", key: "lakilesterSprite", type: "sprite"},
    { compressedString: "a", key: "parakarrySprite", type: "sprite"},
    { compressedString: "r", key: "romanNumerals", type: "bool"},
    { compressedString: "h", key: "randomPitch", type: "bool"},
    { compressedString: "d", key: "muteDangerBeeps", type: "bool"},
    { compressedString: "u", key: "shuffleMusic", type: "number"},
    { compressedString: "j", key: "shuffleJingles", type: "bool"}
  ]

  public readonly difficultyMap: SettingModel [] = [
    { compressedString: "c", key: "capEnemyXP", type: "bool"},
    { compressedString: "m", key: "damageMultiplier", type: "number"},
    { compressedString: "d", key: "difficultyMode", type: "number"},
    { compressedString: "i", key: "itemScarcity", type: "removed"},
    { compressedString: "q", key: "itemQuality", type: "removed"},
    { compressedString: "h", key: "noHeartBlocks", type: "bool"},
    { compressedString: "s", key: "noSaveBlocks", type: "bool"},
    { compressedString: "x", key: "noXP", type: "removed"},
    { compressedString: "a", key: "xpMultiplier", type: "number"},
    { compressedString: "k", key: "oneHitKO", type: "bool"},
    { compressedString: "l", key: "noHealingItems", type: "bool"},
    { compressedString: "t", key: "itemTrapMode", type: "removed"},
    { compressedString: "y", key: "allowItemHints", type: "bool"},
    { compressedString: "p", key: "merlowRewardPricing", type: "number"},
    { compressedString: "r", key: "randomConsumableMode", type: "removed"},
    { compressedString: "b", key: "badgeSynergy", type: "bool"},
    { compressedString: "v", key: "dropStarPoints", type: "bool"},
    { compressedString: "o", key: "chetRippoAvailable", type: "bool"},
    { compressedString: "!", key: "bowserDoorQuiz", type: "number"},
    { compressedString: "@", key: "kentCKoopa", type: "number"},
  ];

  public readonly goalsMap: SettingModel [] = [
    { compressedString: "w", key: "starWaySpiritsNeeded", type: "number"},
    { compressedString: "e", key: "requireSpecificSpirits", type: "removed"},
    { compressedString: "r", key: "requiredSpirits", type: "number"},
    { compressedString: "f", key: "limitChapterLogic", type: "removed"},
    { compressedString: "@", key: "starBeamSpiritsNeeded", type: "number"},
    { compressedString: "#", key: "starBeamPowerStarsNeeded", type: "number"},
    { compressedString: "s", key: "shuffleStarBeam", type: "bool"},
    { compressedString: "y", key: "seedGoal", type: "number"},
    { compressedString: "?", key: "starWayPowerStarsNeeded", type: "number"},
    { compressedString: "!", key: "starHuntTotal", type: "number"},
    { compressedString: "p", key: "includePowerStars", type: "bool"}
  ];

  public readonly itemPoolMap: SettingModel [] = [
    { compressedString: "t", key: "itemTrapMode", type: "number"},
    { compressedString: "q", key: "itemQuality", type: "number"},
    { compressedString: "r", key: "randomConsumableMode", type: "number"},
    { compressedString: "x", key: "itemPouches", type: "bool"},
    { compressedString: "u", key: "addUnusedBadgeDuplicates", type: "bool"},
    { compressedString: "b", key: "addBetaItems", type: "bool"},
    { compressedString: "p", key: "progressiveBadges", type: "bool"},
    { compressedString: "l", key: "badgePoolLimit", type: "number"},
  ]

  public readonly gameplayMap: SettingModel [] = [
    { compressedString: "r", key: "randomFormations", type: "bool"},
    { compressedString: "b", key: "randomBadgesBP", type: "number"},
    { compressedString: "f", key: "randomBadgesFP", type: "number"},
    { compressedString: "p", key: "randomPartnerFP", type: "number"},
    { compressedString: "s", key: "randomStarpowerSP", type: "number"},
    { compressedString: "m", key: "mysteryMode", type: "number"},
    { compressedString: "z", key: "randomizePuzzles", type: "bool"},
    { compressedString: "o", key: "bossShuffle", type: "bool"}
  ]

  public readonly itemsMap: SettingModel [] = [
    { compressedString: "c", key: "includeCoins", type: "removed"},
    { compressedString: "v", key: "includeCoinsOverworld", type: "bool"},
    { compressedString: "e", key: "includeCoinsBlocks", type: "bool"},
    { compressedString: "j", key: "includeCoinsFavors", type: "bool"},
    { compressedString: "n", key: "includeCoinsFoliage", type: "bool"},
    { compressedString: "d", key: "includeDojo", type: "number"},
    { compressedString: "f", key: "includeFavors", type: "number"},
    { compressedString: "p", key: "includePanels", type: "bool"},
    { compressedString: "s", key: "includeShops", type: "bool"},
    { compressedString: "k", key: "keyitemsOutsideDungeon", type: "bool"},
    { compressedString: "i", key: "shuffleItems", type: "bool"},
    { compressedString: "x", key: "itemPouches", type: "removed"},
    { compressedString: "l", key: "includeLetters", type: "number"},
    { compressedString: "r", key: "includeRadioTradeEvent", type: "bool"},
    { compressedString: "b", key: "shuffleBlocks", type: "removed"},
    { compressedString: "!", key: "multiCoinBlockShuffle", type: "number"},
    { compressedString: "h", key: "bigChestShuffle", type: "removed"},
    { compressedString: "g", key: "gearShuffleMode", type: "number"},
    { compressedString: "u", key: "partnerUpgradeShuffle", type: "number"},
    { compressedString: "a", key: "ripCheatoItemsInLogic", type: "number"},
    { compressedString: "o", key: "progressionOnRowf", type: "number"},
    { compressedString: "m", key: "progressionOnMerlow", type: "bool"}
  ]

  public readonly marioStatsMap: SettingModel [] = [
    { compressedString: "c", key: "startingCoins", type: "number"},
    { compressedString: "i", key: "startingItems", type: "items"},
    { compressedString: "b", key: "startingMaxBP", type: "number"},
    { compressedString: "f", key: "startingMaxFP", type: "number"},
    { compressedString: "h", key: "startingMaxHP", type: "number"},
    { compressedString: "w", key: "startWithRandomStats", type: "bool"},
    { compressedString: "l", key: "randomStartingStatsLevel", type: "number"},
    { compressedString: "s", key: "startingStarPower", type: "number"},
    { compressedString: "j", key: "startingBoots", type: "number"},
    { compressedString: "a", key: "startingHammer", type: "number"},
    { compressedString: "r", key: "startWithRandomItems", type: "bool"},
    { compressedString: "n", key: "randomItemsMin", type: "number"},
    { compressedString: "x", key: "randomItemsMax", type: "number"},
  ]

  public readonly openLocationsMap: SettingModel [] = [
    { compressedString: "b", key: "blueHouseOpen", type: "bool"},
    { compressedString: "h", key: "homewardShroom", type: "removed"},
    { compressedString: "s", key: "startingMap", type: "number"},
    { compressedString: "t", key: "toyboxOpen", type: "bool"},
    { compressedString: "w", key: "whaleOpen", type: "bool"},
    { compressedString: "c", key: "ch7BridgeVisible", type: "bool"},
    { compressedString: "r", key: "mtRuggedOpen", type: "bool"},
    { compressedString: "f", key: "foreverForestOpen", type: "bool"},
    { compressedString: "p", key: "prologueOpen", type: "bool"},
    { compressedString: "m", key: "magicalSeedsRequired", type: "number"},
    { compressedString: "o", key: "bowsersCastleMode", type: "number"},
    { compressedString: "d", key: "shuffleDungeonEntrances", type: "number"},
    { compressedString: "z", key: "mirrorMode", type: "number"}
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
    { compressedString: "s", key: "shufflePartners", type: "number"},
    { compressedString: "(p", key: "startWithPartners", type: "formGroup", map: this.startWithPartnersMap},
    { compressedString: "r", key: "startWithRandomPartners", type: "bool"},
  ]

  public readonly qualityOfLifeMap: SettingModel [] = [
    { compressedString: "i", key: "alwaysISpy", type: "bool"},
    { compressedString: "p", key: "alwaysPeekaboo", type: "bool"},
    { compressedString: "s", key: "alwaysSpeedySpin", type: "bool"},
    { compressedString: "h", key: "hiddenBlockMode", type: "number"},
    { compressedString: "g", key: "preventPhysicsGlitches", type: "bool"},
    { compressedString: "q", key: "quizmoAlwaysAppears", type: "bool"},
    { compressedString: "r", key: "romanNumerals", type: "removed"}, // Was moved to color palettes section
    { compressedString: "b", key: "bowsersCastleMode", type: "removed"}, // Was moved to World settings
    { compressedString: "c", key: "shortenCutscenes", type: "number"},
    { compressedString: "e", key: "skipEpilogue", type: "bool"},
    { compressedString: "z", key: "skipQuiz", type: "bool"},
    { compressedString: "m", key: "turnOffMusic", type: "removed"},
    { compressedString: "l", key: "writeSpoilerLog", type: "bool"},
    { compressedString: "f", key: "foliageItemHints", type: "bool"},
    { compressedString: "t", key: "revealLogInHours", type: "number"},
    { compressedString: "d", key: "delaySpoilerLog", type: "bool"},
    { compressedString: "v", key: "hiddenPanelVisibility", type: "bool"},
    { compressedString: "y", key: "iSpyPanelHints", type: "number"},
    { compressedString: "o", key: "cookWithoutFryingPan", type: "bool"},
  ]

  public readonly settingsMap: SettingModel[] = [
    { compressedString: "(c", key: "cosmetics", type: "formGroup", map: this.cosmeticsMap},
    { compressedString: "(d", key: "difficulty", type: "formGroup", map: this.difficultyMap},
    { compressedString: "(l", key: "goals", type: "formGroup", map: this.goalsMap},
    { compressedString: "(x", key: "itemPool", type: "formGroup", map: this.itemPoolMap},
    { compressedString: "(g", key: "gameplay", type: "formGroup", map: this.gameplayMap},
    { compressedString: "(i", key: "items", type: "formGroup", map: this.itemsMap},
    { compressedString: "(m", key: "marioStats", type: "formGroup", map: this.marioStatsMap},
    { compressedString: "(o", key: "openLocations", type: "formGroup", map: this.openLocationsMap},
    { compressedString: "(p", key: "partners", type: "formGroup", map: this.partnersMap},
    { compressedString: "(q", key: "qualityOfLife", type: "formGroup", map: this.qualityOfLifeMap},
    { compressedString: "g", key: "glitches", type: "glitches"},
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
          case "glitches":
            compressedString += this.encodeGlitches(nestedFormElement.value, settingModel)
            break;

          default:
            throw new Error("Unimplemented setting string mapping type: " + settingModel.type);
            break;
        }
      }
    })
    compressedString += ")"
    return compressedString
  }

  public decompressFormGroup(settingString: string, formGroup: FormGroup, settingsMap: SettingModel[]) {
    settingString = settingString.split('/').join('(').split('\\').join(')') // To be backwards compatible with v0.8. To be removed eventually
    var i = 0
    while(i < settingString.length) {
      var isNestingKey = false;
      if(settingString[i] == '(') {
        isNestingKey = true;
        i++;
      }
      else if(settingString[i] == ')') {
        i++;
        return;
      }
      var currentSubstring = isNestingKey ? '(' + settingString[i] : settingString[i];
      var settingModel = settingsMap.find(m => m.compressedString.toLowerCase() == currentSubstring.toLowerCase())

      switch (settingModel.type) {
        case "formGroup":
          i++;
          var nestingLevels = settingModel.map.filter(m => m.type == 'formGroup').length + 1;
          var formGroupEndIndex = this.indexOfNthOccurence(settingString.substring(i), ')', nestingLevels) + i;
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
            while(!isNaN(Number(settingString[i])) || settingString[i] == '-' || settingString[i] == '.') {
              numValue += settingString[i];
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

        case "glitches":
          i++;
          var glitchesSubstring = '';
          while((settingString[i]) != ')') {
            glitchesSubstring += settingString[i];
            i++;
          }
          formGroup.controls[settingModel.key].setValue(this.decodeGlitches(glitchesSubstring))
          break;

        case "removed":
          i++
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
      case 'p':
        return Constants.MARIO_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      case 'g':
        return Constants.GOOMBARIO_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      case 'k':
        return Constants.KOOPER_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      case 'o':
        return Constants.BOMBETTE_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      case 'a':
        return Constants.PARAKARRY_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      case 'b':
        return Constants.BOW_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      case 'w':
          return Constants.WATT_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      case 's':
        return Constants.SUSHIE_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
      case 'l':
        return Constants.LAKILESTER_OPTIONS.find(o => o.setting == Number(compressedSetting) && o.paletteSelection == Number(compressedPalette))
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

  private encodeGlitches(enabledGlitches: LogicGlitch[], settingModel: SettingModel) {
    var allGlitchesString = '';
    for (const glitch of enabledGlitches) {
      var glitchString = glitch.id;
      allGlitchesString += glitchString;
    }
    return settingModel.compressedString + allGlitchesString;
  }

  private decodeItems(itemValues: string): StartingItem[]{
    var i = 0;
    var items: StartingItem[] = [];
    while(i < itemValues.length) {
      const itemValue = Number(itemValues.substring(i, i+4))
      i += 4;
      if (Object.values(Items).includes(itemValue)) {
        items.push({name: pascalToVerboseString(Items[itemValue]), value: itemValue, itemType: "Item"} as StartingItem)
      }
      else if (Object.values(KeyItems).includes(itemValue)) {
        items.push({name: pascalToVerboseString(KeyItems[itemValue]), value: itemValue, itemType: "Key Item"} as StartingItem)
      }
      else if (Object.values(Badges).includes(itemValue)) {
        items.push({name: pascalToVerboseString(Badges[itemValue]), value: itemValue, itemType: "Badge"} as StartingItem)
      }
    }
    return items;
  }

  private decodeGlitches(glitchesValue: string): LogicGlitch[]{
    const allGlitches: LogicGlitch[] = glitchesJson;
    var i = 0;
    var enabledGlitches: LogicGlitch[] = [];
    while(i < glitchesValue.length) {
      var glitch = allGlitches.find(g => g.id == glitchesValue[i])
      i += 1;

      if(glitch) {
        enabledGlitches.push(glitch)
      }

    }
    return enabledGlitches;
  }

  private indexOfNthOccurence(string, subString, n) {
    return string.split(subString, n).join(subString).length;
  }
}
