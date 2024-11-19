import { SettingStringMappingService } from './../../../../services/setting-string-mapping/setting-string-mapping.service';
import { SavePresetDialogComponent } from './save-preset-dialog/save-preset-dialog.component';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import presetsJson from  '../../../../utilities/presets.json';
import { MatDialog } from '@angular/material/dialog';
import { LogicGlitch } from 'src/app/entities/logicGlitch';
import glitchesJson from '../../../../utilities/glitches.json'
import { ToastrService } from 'ngx-toastr';

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
  public copiedToClipboard = false;

  private _dialogSubscription: any;

  public constructor(private _dialog: MatDialog, private _mappingService: SettingStringMappingService, private _toastr: ToastrService) { }

  public ngOnDestroy(): void {
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

  public showImportSuccess() {
    this._toastr.success('Settings import successful!');
  }

  public showImportError() {
    this._toastr.error('Invalid setting string');
  }

  public loadPreset(): void {
    let preset = presetsJson.find(p => p['name'] == this.selectedPreset);

    if(!preset) {
      preset = this.customPresets.find(p => p.name == this.selectedPreset);
    }
    this.formGroup.patchValue(preset['settings'])

    // Special handling for glitches objects not loaded properly with patchValue
    const allGlitches: LogicGlitch[] = glitchesJson;
    let enabledGlitches = allGlitches.filter(g => preset['settings'].glitches?.some(enabledGlitch => enabledGlitch.settingName == g.settingName))
    this.formGroup.get('glitches').setValue(enabledGlitches)

    // Fix for old presets that have invalid Koot value
    this.fixPresetBackwardsCompatibility();

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
    this.settingsString = this._mappingService.compressFormGroup(this.formGroup, this._mappingService.settingsMap)
  }

  public importSettings() {
    const previousFormState = this.formGroup.getRawValue()
    try {
      this._mappingService.decompressFormGroup(this.settingsString, this.formGroup, this._mappingService.settingsMap)
      this.showImportSuccess();
    }
    catch(error) {
      this.formGroup.patchValue(previousFormState)
      this.showImportError();
    }
  }

  public isSelectedPresetPremade(): boolean {
    return this.premadePresets.some(p => p.name == this.selectedPreset && p.name != this.CUSTOM_PRESET_NAME)
  }

  public onSelectedPresetChange(): void {
    this.presetStatus = null;
  }

  private fixPresetBackwardsCompatibility() {
    var kootFormControl = this.formGroup.get('items').get('includeFavors');
    if (typeof kootFormControl.value == "boolean") {
      kootFormControl.setValue(0);
    }
  }

}
