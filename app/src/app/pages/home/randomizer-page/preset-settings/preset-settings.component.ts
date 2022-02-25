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

  public selectedPreset: string;

  public premadePresets: {name, settings}[];
  public customPresets: {name, settings}[];
 
  public newPresetName: string;
  public invalidPresetError: string = "A preset name is required"; 

  public constructor() { }

  public ngOnInit(): void {
    this.premadePresets = presetsJson;
    this.selectedPreset = this.premadePresets[0].name;
    this.loadPreset();

    var customPresetsString = localStorage.getItem("presets")
    if (customPresetsString) {
      this.customPresets = JSON.parse(customPresetsString);
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

    this.customPresets.push(newPreset);
    localStorage.setItem("presets", JSON.stringify(this.customPresets))

    this.selectedPreset = this.newPresetName;
    this.newPresetName = null;
    this.validatePresetName();
  }

  public removePreset(): void {
    this.customPresets = this.customPresets.filter(p => p.name != this.selectedPreset);
    this.selectedPreset = this.premadePresets[0].name;
    localStorage.setItem("presets", JSON.stringify(this.customPresets))
    this.validatePresetName();

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

  public validatePresetName() {
    if(!this.newPresetName || this.newPresetName == '') {
      this.invalidPresetError = "A preset name is required"
    } else if(this.customPresets.find(p => p.name == this.newPresetName) || this.premadePresets.find(p => p.name == this.newPresetName)) {
      this.invalidPresetError = "A preset with this name already exists"
    } else {
      this.invalidPresetError = null;
    }
  }

  public isSelectedPresetPremade() {
    return this.premadePresets.some(p => p.name == this.selectedPreset)
  }
}
