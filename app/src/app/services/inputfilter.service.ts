import { Injectable } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { escapeRegexChars } from "../utilities/stringFunctions";
const intRegex = /^[0-9]*$/;

@Injectable({
  providedIn: 'root'
})
export class InputFilterService {

  constructor() { }
  public filterNumericInput($event: Event, parentFormGroup: FormGroup, formControlName: string) {
    const target = $event.target as HTMLInputElement;
    if (target.type === 'number') {
      if (target.value === '') {
        target.value = '';
        target.dataset.prevValue = target.value;
        parentFormGroup.get(formControlName).setValue(null);
      } else if (!intRegex.test(target.value)) {
        if (target.dataset.prevValue !== undefined) {
          target.value = target.dataset.prevValue;
        } else {
          target.value = '';
        }
      } else {
        const val = parseInt(target.value);
        target.dataset.prevValue = target.value;
        if (val < parseInt(target.min)) {
          target.value = target.min;
        } else if (val > parseInt(target.max)) {
          target.value = target.max;
        }
        parentFormGroup.get(formControlName).setValue(parseInt(target.value));
      }
      parentFormGroup.updateValueAndValidity();
    }
  }

  public disallowChars($event: KeyboardEvent, invalidChars: string) {
    if (new RegExp(escapeRegexChars(invalidChars)).test($event.key)) {
      $event.preventDefault();
      return false;
    }
  }
}
