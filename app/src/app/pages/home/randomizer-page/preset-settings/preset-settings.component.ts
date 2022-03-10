import { SavePresetDialogComponent } from './save-preset-dialog/save-preset-dialog.component';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import presetsJson from  '../../../../utilities/presets.json';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-preset-settings',
  templateUrl: './preset-settings.component.html',
  styleUrls: ['./preset-settings.component.scss']
})
export class PresetSettingsComponent implements OnInit {

  public readonly CUSTOM_PRESET_NAME = "[New Preset]"

  @Input() public formGroup: FormGroup

  public selectedPreset: string;

  public premadePresets: {name: string, settings}[];
  public customPresets: {name: string, settings}[];
  public presetStatus: string = null;
  public recentlyRemovedPreset: string = null;

  public settingsString: string = null;
  public importStatus: string = null;

  public constructor(private _dialog: MatDialog) { }

  public ngOnInit(): void {
    this.premadePresets = presetsJson;
    var customPresetsString = localStorage.getItem("presets")

    if (customPresetsString) {
      this.customPresets = JSON.parse(customPresetsString);
    } 
    else {
      this.customPresets = []
    }

    this.selectedPreset = this.customPresets?.length ? this.customPresets[0].name : this.premadePresets[0].name;
    this.loadPreset();
    this.presetStatus = null;
  } 

  public loadPreset(): void {
    let preset = presetsJson.find(p => p['name'] == this.selectedPreset);

    if(!preset) {
      preset = this.customPresets.find(p => p.name == this.selectedPreset);
    }
    this.formGroup.patchValue(preset['settings'])
    this.presetStatus = "loaded";
  }

  public savePreset(): void {

    if(this.selectedPreset == this.CUSTOM_PRESET_NAME) {
      const dialogRef = this._dialog.open(SavePresetDialogComponent, {
        width: '30rem',
        
        data: this.customPresets.map(p => p.name).concat(this.premadePresets.map(p => p.name))
      });
  
      dialogRef.afterClosed().subscribe(newPresetName => {
        if(!newPresetName) {
          return;
        }
        newPresetName = newPresetName.trim().replace(/\s+/g, ' ')
  
        let formObj = this.formGroup.getRawValue();
        let newPreset = {name: newPresetName, settings: formObj}
  
        this.customPresets.push(newPreset);
        localStorage.setItem("presets", JSON.stringify(this.customPresets))
  
        this.selectedPreset = newPresetName;
        this.presetStatus = "saved";
      });
    }
    else {
      let updatedPresetSettings = this.formGroup.getRawValue();
      this.customPresets.find(p => p.name == this.selectedPreset).settings = updatedPresetSettings;

      localStorage.setItem("presets", JSON.stringify(this.customPresets))
      this.presetStatus = "saved";
    }

    
  }

  public removePreset(): void {
    this.customPresets = this.customPresets.filter(p => p.name != this.selectedPreset);
    this.recentlyRemovedPreset = this.selectedPreset;
    this.selectedPreset = this.customPresets?.length ? this.customPresets[0].name : this.premadePresets[0].name;
    localStorage.setItem("presets", JSON.stringify(this.customPresets))

    this.presetStatus = "removed";
  }

  public exportSettings() {
    this.importStatus = null;
    let formData = this.getFormValues(this.formGroup);

    this.settingsString = btoa(JSON.stringify(formData))
  }

  public importSettings() {
    this.importStatus = null;
    try {      
      this.setFormValues(this.formGroup, JSON.parse(atob(this.settingsString)));
      this.importStatus = "success";
    }
    catch(error) {
      console.error(error);
      this.importStatus = "error";
    }
  }

  public getFormValues(formElement: FormGroup): string[] {
    var formValues: string[] = [];
    Object.keys(formElement.controls).forEach(controlName => {
      var nestedFormElement = formElement.controls[controlName] as FormGroup
      if(nestedFormElement?.controls) {
        formValues = formValues.concat(this.getFormValues(nestedFormElement))
      }
      else {
        if(nestedFormElement.value.toString() == 'true' || nestedFormElement.value.toString() == 'false') {
          formValues.push(this.encodeBoolean(nestedFormElement.value))
        }
        else {
          formValues.push(nestedFormElement.value)
        }
      }
    })
    return formValues
  }

  public setFormValues(formElement: AbstractControl, formValues: string[]): void {
    if((formElement as FormGroup).controls) {
      Object.keys((formElement as FormGroup).controls).forEach(formControl => {
        if(((formElement as FormGroup).controls[formControl])) {
          this.setFormValues((formElement as FormGroup).controls[formControl] as FormGroup, formValues)
        }
      });
    }
    else {
      var valueToAdd: any = formValues.shift();
      if(valueToAdd == 't' || valueToAdd == 'f') {
        valueToAdd = this.decodeBoolean(valueToAdd);
      }
      formElement.setValue(valueToAdd)
    }
  }

  public isSelectedPresetPremade(): boolean {
    return this.premadePresets.some(p => p.name == this.selectedPreset && p.name != this.CUSTOM_PRESET_NAME)
  }

  public onSelectedPresetChange(): void {
    this.presetStatus = null;
  }

  public encodeBoolean(value: boolean): string {
    return value ? 't': 'f';
  }

  public decodeBoolean(value: string): boolean {
    return value == 't' ? true : false;
  }

}
