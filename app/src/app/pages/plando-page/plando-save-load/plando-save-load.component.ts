import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { STAR_SPIRIT_POWER_NAMES } from "../plando-spirits-and-chapters/plando-spirits-and-chapters.component";

@Component({
  selector: 'app-plando-save-load',
  templateUrl: './plando-save-load.component.html',
  styleUrls: ['../plando-page.component.scss', './plando-save-load.component.scss']
})
export class PlandoSaveLoadComponent {
  @Input() plandoFormGroup: FormGroup;
  private savedPlandoNames: Set<string> = new Set(this.getSavedPlandos());
  private readonly SAVED_PLANDO_NAMES_KEY = 'savedPlandoNames';

  public getSavedPlandos(): Array<string> {
    const savedNames = localStorage.getItem(this.SAVED_PLANDO_NAMES_KEY);
    return savedNames ? savedNames.split(',') : [];
  }

  public savePlandoSettings(name: string) {
    localStorage.setItem(name, JSON.stringify(this.plandoFormGroup.getRawValue()))
    this.savedPlandoNames.add(name);
    localStorage.setItem(this.SAVED_PLANDO_NAMES_KEY, Array.from(this.savedPlandoNames).join(','));
  };

  public loadPlandoSettings(name: string) {
    const plandoSettings = localStorage.getItem(name);
    if (!plandoSettings) {
      this.savedPlandoNames.delete(name);
      localStorage.setItem(this.SAVED_PLANDO_NAMES_KEY, Array.from(this.savedPlandoNames).join(','));
    } else {
      const plandoFormObj = JSON.parse(plandoSettings)
      // Because 0 is a valid value for star spirit power costs, and -1 is the "defer to generator" setting,
      // manually set any missing star powers to -1, so that the sliders will display correctly.
      if (!plandoFormObj['move_costs']) {
        plandoFormObj['move_costs'] = {};
      }
      if (!plandoFormObj['move_costs']['starpower']) {
        plandoFormObj['move_costs']['starpower'] = {};
      }
      const powercosts = plandoFormObj['move_costs']['starpower'];
      for (const power of STAR_SPIRIT_POWER_NAMES) {
        if (powercosts[power] === undefined || powercosts[power] === null) {
          powercosts[power] = -1;
        }
      }
      this.plandoFormGroup.setValue(plandoFormObj);
      this.plandoFormGroup.updateValueAndValidity();
    }
  }
}
