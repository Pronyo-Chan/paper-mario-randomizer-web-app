import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { InputFilterService } from "src/app/services/inputfilter.service";
import { escapeRegexChars, pascalToVerboseString } from "src/app/utilities/stringFunctions";
import { CheckType, Location, LOCATIONS_LIST, PLANDO_ITEMS_LIST } from "../plando-constants";

const possessiveRegex = /(Mario|Peach|Boo|Guy|Troopa|King|Bowser|Rowf|Merlow|Merluvlee|Tubba|Kolorado|Bow|Lily|Petunia|Rosie)s /g;
const displayStringReplacements = {
  "B L U": "BLU",
  "P N K": "PNK",
  "G R N": "GRN",
  "R E D": "RED",
  "P- ": "P-",
  "D- ": "D-",
  "( ": "(",
  "N W": "NW",
  "N E": "NE",
  "S W": "SW",
  "S E": "SE",
  "Bros": "Bros.",
  "Non Progression": "Non-Progression Item",
  "Consumable": "Random Consumable",
}
const replacementRegEx = new RegExp(Object.keys(displayStringReplacements).map(escapeRegexChars).join('|'), "g");
const displayStrings: Map<string, string> = new Map<string, string>();


@Component({
  selector: 'app-plando-items',
  templateUrl: './plando-items.component.html',
  styleUrls: ['../plando-page.component.scss', './plando-items.component.scss']
})
export class PlandoItemsComponent {
  @Input() itemsFormGroup: FormGroup;
  public readonly CHECK_TYPES = CheckType;
  public readonly LOCATIONS: Array<Location> = LOCATIONS_LIST;
  public readonly PLANDO_ITEMS: Array<string> = PLANDO_ITEMS_LIST.slice();
  constructor(public inputFilters: InputFilterService) { };
  // Multicoin and super blocks not supported yet. Always filter them for now.
  // Remove these and add toggles (if desired) when support is added.
  public filteredTypes: Array<CheckType> = [CheckType.MULTICOIN_BLOCK, CheckType.SUPER_BLOCK];
  public filteredItems: string[] = this.PLANDO_ITEMS.slice();
  public searchText: FormControl;

  public updateAutoCompleteFilter($event: InputEvent) {
    this._filter(($event.target as HTMLInputElement).value);
  }

  private _filter(value: string): void {
    const regexes = value.toLowerCase().split(/\s/g).filter(s => s.trim() !== '').map(s => new RegExp(escapeRegexChars(s), 'i'));
    this.filteredItems = this.PLANDO_ITEMS.slice();
    this.filteredItems = this.filteredItems.filter(item => regexes.every(reg => reg.test(item)));
  }

  public resetFilter($event: Event) {
    if ($event.target instanceof HTMLInputElement && $event.target.value) {
      this._filter($event.target.value.trim());
    } else if (this.filteredItems.length < this.PLANDO_ITEMS.length) {
      this.filteredItems = this.PLANDO_ITEMS.slice();
    }
  }

  public onNameInputBlur(formControlName: string[]) {
    this.itemsFormGroup.get(formControlName).updateValueAndValidity();
  }

  public toggleCheckTypeFilter($event: MatSlideToggleChange, checkType: CheckType) {
    if ($event.checked) {
      this.filteredTypes.push(checkType);
    } else {
      const i = this.filteredTypes.indexOf(checkType);
      if (i > -1) {
        this.filteredTypes.splice(i, 1);
      }
    }
  }

  public toDisplayString = function (s: string): string {
    if (!displayStrings.has(s)) {
      displayStrings.set(s, pascalToVerboseString(s).replace(possessiveRegex, "$1's").replace(replacementRegEx, function (matched) {
        return displayStringReplacements[matched];
      }));
    }
    return displayStrings.get(s);
  }

};
