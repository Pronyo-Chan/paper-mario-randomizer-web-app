import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { STAR_SPIRIT_POWER_NAMES } from "../plando-spirits-and-chapters/plando-spirits-and-chapters.component";
import { InputFilterService } from "src/app/services/inputfilter.service";

@Component({
  selector: 'app-plando-save-load',
  templateUrl: './plando-save-load.component.html',
  styleUrls: ['../plando-page.component.scss', './plando-save-load.component.scss']
})
export class PlandoSaveLoadComponent implements OnInit {
  @Input() plandoFormGroup: FormGroup;

  constructor(public inputFilters: InputFilterService) { };
  private readonly SAVED_PLANDO_NAMES_KEY = 'savedPlandoNames';
  public savedPlandoNames: Set<string>;
  public saveLoadFormGroup: FormGroup;
  public saveLoadStatus: string;
  public lastPlandoName: string;

  public ngOnInit(): void {
    const savedNames = localStorage.getItem(this.SAVED_PLANDO_NAMES_KEY);
    this.savedPlandoNames = savedNames ? new Set(savedNames.split(',')) : new Set();
    this.saveLoadFormGroup = new FormGroup({
      plandoName: new FormControl<string>(''),
      savedPlandoNameSelect: new FormControl<string>('')
    });
  }

  public savePlandoSettings(name: string) {
    localStorage.setItem(name, JSON.stringify(this.plandoFormGroup.getRawValue()))
    this.savedPlandoNames.add(name);
    localStorage.setItem(this.SAVED_PLANDO_NAMES_KEY, Array.from(this.savedPlandoNames).join(','));
    this.saveLoadFormGroup.get('plandoName').reset();
    this.saveLoadFormGroup.get('plandoName').updateValueAndValidity();
    this.saveLoadStatus = 'saved';
    this.lastPlandoName = name;
    setTimeout(() => {
      this.saveLoadStatus = '';
    }, 5000);
  };

  public loadPlandoSettings(name: string) {
    const plandoSettings = localStorage.getItem(name);
    if (!plandoSettings) {
      this.deletePlandoSettings(name);
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
      this.lastPlandoName = name;
      this.saveLoadStatus = 'loaded';
      setTimeout(() => {
        this.saveLoadStatus = '';
      }, 5000);
    }
  }

  public deletePlandoSettings(name: string) {
    this.savedPlandoNames.delete(name);
    localStorage.removeItem(name);
    localStorage.setItem(this.SAVED_PLANDO_NAMES_KEY, Array.from(this.savedPlandoNames).join(','));
    this.lastPlandoName = name;
    this.saveLoadStatus = 'deleted';
    setTimeout(() => {
      this.saveLoadStatus = '';
    }, 5000);
  }
}
