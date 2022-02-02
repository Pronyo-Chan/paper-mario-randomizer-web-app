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
  
  public constructor() { }

  public ngOnInit(): void {
    this.initSettingRows();
  }

  public initSettingRows() {
    for (var key in this.seedInfo) {
      switch(key){
        case 'StartWithPartners': 
          var startingPartners = Object.keys(this.seedInfo["StartWithPartners"]).filter(partner => this.seedInfo["StartWithPartners"][partner] == true)
          this.settingRows.push({name: key, value: startingPartners.join(', ')} as SettingRow)
          break;
        case 'HiddenBlockMode':

          this.settingRows.push({name: key, value: HiddenBlockMode[this.seedInfo[key]]})
        case 'SeedID':
        case 'CreationDate': 
          break;

        default: {
          this.settingRows.push({name: key, value: this.seedInfo[key]} as SettingRow)
        }
      }
    }
  }

}
