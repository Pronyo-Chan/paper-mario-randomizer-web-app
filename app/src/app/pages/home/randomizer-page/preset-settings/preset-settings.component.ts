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

  public customPresetNames: string[];
  public customPresets: {name, settings}[];

  public newPresetName: string;

  public constructor() { }


  //TODO: Prevent from saving existing name, styling
  public ngOnInit(): void {
    this.presetNames = presetsJson.map(p => p.name);
    this.selectedPreset = this.presetNames[0];
    this.loadPreset();

    var customPresetsString = localStorage.getItem("presets")
    if (customPresetsString) {
      this.customPresets = JSON.parse(customPresetsString)
      this.customPresets
      this.customPresetNames = this.customPresets.map(p => p.name)
    } 
    else {
      this.customPresets = []
    }
  } 

  public loadPreset(): void {
    let preset = presetsJson.find(p => p['name'] == this.selectedPreset);

    if(!preset) {
      preset = this.customPresets.find(p => p.name == this.selectedPreset);
    }
    this.populateFormGroupWithPreset(this.formGroup, preset['settings']);
  }

  public savePreset(): void {
    let formObj = this.formGroup.getRawValue();
    let newPreset = {name: this.newPresetName, settings: formObj}

    this.customPresets.push(newPreset)
    localStorage.setItem("presets", JSON.stringify(this.customPresets))

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

  public initCustomPresets(): void {
    var customPresets = JSON.parse(localStorage.getItem("presets"))
  }

}
