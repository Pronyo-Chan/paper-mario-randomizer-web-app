import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { STAR_SPIRIT_POWER_NAMES } from "../plando-spirits-and-chapters/plando-spirits-and-chapters.component";
import { InputFilterService } from "src/app/services/inputfilter.service";

export const SAVED_PLANDO_NAMES_KEY = 'savedPlandoNames';
export const SAVED_PLANDO_NAME_PREFIX = 'plando_';

@Component({
  selector: 'app-plando-save-load',
  templateUrl: './plando-save-load.component.html',
  styleUrls: ['../plando-page.component.scss', './plando-save-load.component.scss']
})
export class PlandoSaveLoadComponent implements OnInit {
  @Input() plandoFormGroup: FormGroup;

  constructor(public inputFilters: InputFilterService) { };
  public savedPlandoNames: Set<string>;
  public saveLoadFormGroup: FormGroup;
  public saveLoadStatus: string;
  public lastPlandoName: string;
  public importStatus: string;

  public ngOnInit(): void {
    const savedNames = localStorage.getItem(SAVED_PLANDO_NAMES_KEY);
    this.savedPlandoNames = savedNames ? new Set(savedNames.split(',')) : new Set();
    this.saveLoadFormGroup = new FormGroup({
      plandoName: new FormControl<string>(''),
      savedPlandoNameSelect: new FormControl<string>('')
    });
  }

  public savePlandoSettings(name: string) {
    localStorage.setItem(SAVED_PLANDO_NAME_PREFIX + name, JSON.stringify(this.plandoFormGroup.getRawValue()))
    this.savedPlandoNames.add(name);
    localStorage.setItem(SAVED_PLANDO_NAMES_KEY, Array.from(this.savedPlandoNames).join(','));
    this.saveLoadStatus = 'saved';
    this.lastPlandoName = name;
  };

  public loadPlandoSettings(name: string) {
    const plandoSettings = localStorage.getItem(SAVED_PLANDO_NAME_PREFIX + name);
    if (!plandoSettings) {
      this.deletePlandoSettings(name);
    } else {
      const plandoFormObj = JSON.parse(plandoSettings);
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
    }
  }

  public exportPlandoSettings(name: string) {
    const plandoSettings = localStorage.getItem(SAVED_PLANDO_NAME_PREFIX + name);
    if (!plandoSettings) {
      this.deletePlandoSettings(name, true);
    } else {
      const plandoFormObj = JSON.parse(plandoSettings);
      // The slider inputs don't play nicely with setting the form control value to "null"
      // when they're at the lowest setting; handle those values here by removing them instead.
      const difficultySettings = plandoFormObj['difficulty'];
      for (const chapter in difficultySettings) {
        if (difficultySettings[chapter] === 0) {
          delete difficultySettings[chapter];
        }
      }
      const powercosts = plandoFormObj['move_costs']['starpower'];
      for (const power in powercosts) {
        if (powercosts[power] === -1) {
          delete powercosts[power];
        }
      }

      // Remove all null and empty values.
      const tidyObj = (obj) => {
        return Object.fromEntries(Object.entries(obj).flatMap(([k, v]) => {
          if (v === null
            || (typeof v === 'object' && Object.keys(v).length === 0)
            || (typeof v === 'string' && v.trim() === '')) {
            return [];
          }
          if (typeof v !== 'object' || (Array.isArray(v) && v.length > 0)) {
            return [[k, v]];
          }
          v = tidyObj(v);
          if (Object.keys(v).length === 0) {
            return []
          } else {
            return [[k, v]];
          }
        }));
      }
      const a = document.createElement('a');
      const plandoFile = new Blob([JSON.stringify(tidyObj(plandoFormObj))], { type: 'application/json' });
      a.href = URL.createObjectURL(plandoFile);
      const dateParts = new Date().toISOString().split('T');
      const datetime = dateParts[0] + '_' + dateParts[1].substring(0, 8).replace(/:/g, '');
      a.download = 'pm64-plando-' + datetime + '.json';
      a.click();
    }
  }

  public deletePlandoSettings(name: string, notFound: boolean = false) {
    this.savedPlandoNames.delete(name);
    localStorage.removeItem(name);
    localStorage.setItem(SAVED_PLANDO_NAMES_KEY, Array.from(this.savedPlandoNames).join(','));
    this.lastPlandoName = name;
    this.saveLoadStatus = notFound ? 'notFound' : 'deleted';
  }

  public importPlandoSettings() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async () => {
      if (!input.files || !input.files.item(0))
        return;
      try {
        const fileContents = await this.loadFile(input.files.item(0) as File);
        const obj = JSON.parse(fileContents);
        this.plandoFormGroup.setValue(obj);
        this.importStatus = 'success';
      } catch (e) {
        console.error(e);
        this.importStatus = 'failure';
      }
    }
    input.click();
  }

  private loadFile(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
              resolve(reader.result as string);
          }
          reader.onerror = (e) => reject(e);
          reader.readAsText(file);
      });
  }
}
