import { SettingsResponse } from './../../../../entities/settingsResponse';
import { Component, Input, OnInit } from '@angular/core';
import { HiddenBlockMode } from 'src/app/entities/enum/hiddenBlockMode';

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
    for (var key in this.seedInfo) {
      var cleanSettingName = key.replace(/([A-Z0-9])/g, " $1").trimLeft();
      cleanSettingName = cleanSettingName.charAt(0).toUpperCase() + cleanSettingName.slice(1); 
      cleanSettingName = cleanSettingName.replace("S P", "SP").replace("B P", "BP").replace("F P", "FP").replace("X P", "XP").replace("O H K O", "One Hit KO")
      switch(key){
        case 'StartWithPartners':
          if(!this.seedInfo.StartWithRandomPartners) {
            var startingPartners = Object.keys(this.seedInfo["StartWithPartners"]).filter(partner => this.seedInfo["StartWithPartners"][partner] == true)
            this.settingRows.push({name: cleanSettingName, value: startingPartners.join(', ')} as SettingRow)
          }        
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
        case 'RandomPartnersMin':
        case 'RandomPartnersMax':
          if(this.seedInfo.StartWithRandomPartners) {
            this.settingRows.push({name: cleanSettingName, value: this.seedInfo[key].toString()} as SettingRow)
          }
          break;
        case 'SeedID':
        case 'CreationDate': 
        case 'StarRodModVersion':
        case 'SettingsName':
        case 'SettingsVersion':
        case 'PlacementLogic':
        case 'PlacementAlgorithm':
        case 'PrettySpoilerLog':
        case 'RomanNumerals':
        case 'IncludeLetterChain':
        case 'ColorA':
        case 'ColorB':
          break;

        default: {
          this.settingRows.push({name: cleanSettingName, value: this.seedInfo[key]} as SettingRow)
        }
      }
    }
  }

  private inverseStringBoolean(value: boolean) {
    return String(!value);
  }

}
