import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import presetsJson from  '../../../../utilities/presets.json';

@Component({
  selector: 'app-preset-settings',
  templateUrl: './preset-settings.component.html',
  styleUrls: ['./preset-settings.component.scss']
})
export class PresetSettingsComponent implements OnInit {

  @Input() public formGroup: FormGroup

  public presetNames: string[]
  public selectedPreset: string;
  public constructor() { }

  public ngOnInit(): void {
    this.presetNames = presetsJson.map(p => p.name);
  }

  public loadPreset(): void {
    let preset = presetsJson.find(p => p['name'] == this.selectedPreset);
    this.populateFormGroupWithPreset(this.formGroup, preset['settings']);
  }

  public populateFormGroupWithPreset(formGroup: FormGroup, preset: any) {
    Object.keys(formGroup.controls).forEach(formControl => {
      if( Object.keys(preset).find(p => p == formControl)) {
        formGroup.controls[formControl].setValue(preset[formControl])
      }
      else if((formGroup.controls[formControl] as FormGroup)?.controls) {
        this.populateFormGroupWithPreset(formGroup.controls[formControl] as FormGroup, preset)
      }
    });
  }

}
