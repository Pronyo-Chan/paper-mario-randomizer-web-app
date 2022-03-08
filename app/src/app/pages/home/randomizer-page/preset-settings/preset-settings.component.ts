import { SavePresetDialogComponent } from './save-preset-dialog/save-preset-dialog.component';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import presetsJson from  '../../../../utilities/presets.json';
import { MatDialog } from '@angular/material/dialog';

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

  public settingsString: string = null;
  public importStatus: string = null;

  public constructor(private _dialog: MatDialog) { }

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

    const dialogRef = this._dialog.open(SavePresetDialogComponent, {
      width: '50%',
      data: this.customPresets.map(p => p.name)
    });

    dialogRef.afterClosed().subscribe(newPresetName => {
      if(!newPresetName) {
        return;
      }

      let formObj = this.formGroup.getRawValue();
      let newPreset = {name: newPresetName, settings: formObj}

      this.customPresets.push(newPreset);
      localStorage.setItem("presets", JSON.stringify(this.customPresets))

      this.selectedPreset = newPresetName;
    });

    
  }

  public removePreset(): void {
    this.customPresets = this.customPresets.filter(p => p.name != this.selectedPreset);
    this.selectedPreset = this.premadePresets[0].name;
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
  
  public exportSettings() {
    this.importStatus = null;
    let formData = JSON.stringify(this.formGroup.getRawValue());
    this.settingsString = btoa(formData)
  }

  public importSettings() {
    this.importStatus = null;
    try {      
      this.formGroup.patchValue(JSON.parse(atob(this.settingsString)))
      this.importStatus = "success";
    }
    catch(error) {
      this.importStatus = "error";
    }
  }

  public isSelectedPresetPremade() {
    return this.premadePresets.some(p => p.name == this.selectedPreset)
  }

}
