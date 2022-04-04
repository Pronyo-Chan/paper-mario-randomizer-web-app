import { SettingStringMappingService } from './../../../../services/setting-string-mapping/setting-string-mapping.service';
import { SavePresetDialogComponent } from './save-preset-dialog/save-preset-dialog.component';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import presetsJson from  '../../../../utilities/presets.json';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-preset-settings',
  templateUrl: './preset-settings.component.html',
  styleUrls: ['./preset-settings.component.scss']
})
export class PresetSettingsComponent implements OnInit, OnDestroy {

  public readonly CUSTOM_PRESET_NAME = "[New Preset]"

  @Input() public formGroup: FormGroup

  public selectedPreset: string;

  public premadePresets: {name: string, settings}[];
  public customPresets: {name: string, settings}[];
  public presetStatus: string = null;
  public recentlyRemovedPreset: string = null;

  public settingsString: string = null;
  public importStatus: string = null;
  private _dialogSubscription: any;

  public constructor(private _dialog: MatDialog, private _mappingService: SettingStringMappingService) { }

  ngOnDestroy(): void {
    if(this._dialogSubscription) {
      this._dialogSubscription.unsubscribe();
    }
  }

  public ngOnInit(): void {
    this.premadePresets = presetsJson;
    var customPresetsString = localStorage.getItem("presets")

    if (customPresetsString) {
      this.customPresets = JSON.parse(customPresetsString);
    } 
    else {
      this.customPresets = []
    }

    var latestSettingsString = JSON.parse(localStorage.getItem("latestSettingsString"));
    if(latestSettingsString) {
      try {
        this._mappingService.decompressFormGroup(latestSettingsString, this.formGroup, this._mappingService.settingsMap);
        this.selectedPreset = this.CUSTOM_PRESET_NAME
      } catch (error) {
        this.selectedPreset = this.customPresets?.length ? this.customPresets[0].name : this.premadePresets[0].name;
        this.loadPreset();
      }
    } else {
      this.selectedPreset = this.customPresets?.length ? this.customPresets[0].name : this.premadePresets[0].name;
      this.loadPreset();
    }

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
  
      this._dialogSubscription = dialogRef.afterClosed().subscribe(newPresetName => {
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

    this.settingsString = this._mappingService.compressFormGroup(this.formGroup, this._mappingService.settingsMap)
  }

  public importSettings() {
    this.importStatus = null;
    const previousFormState = this.formGroup.getRawValue()
    try {      
      this._mappingService.decompressFormGroup(this.settingsString, this.formGroup, this._mappingService.settingsMap)
      this.importStatus = "success";
    }
    catch(error) {
      this.formGroup.patchValue(previousFormState)
      this.importStatus = "error";
    }
  }

  public isSelectedPresetPremade(): boolean {
    return this.premadePresets.some(p => p.name == this.selectedPreset && p.name != this.CUSTOM_PRESET_NAME)
  }

  public onSelectedPresetChange(): void {
    this.presetStatus = null;
  }

}
