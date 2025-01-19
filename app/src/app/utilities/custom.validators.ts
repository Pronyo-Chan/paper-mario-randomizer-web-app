import { AbstractControl, FormGroup } from '@angular/forms';

export namespace CustomValidators {

    export function greaterOrEqualTo(otherControlName: string) {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (!control.parent) {
                return null; // Control is not yet associated with a parent.
            }
            const thisValue = control.value;
            const otherValue = control.parent.get(otherControlName).value;
            if (thisValue >= otherValue) {
                return null;
            }

            return {
                'greaterOrEqual': true
            }
        };
    }

    export function greaterOrEqualToWhenNotRandom(otherControlName: string) {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
          if (!control.parent) {
              return null; // Control is not yet associated with a parent.
          }
          const thisValue = control.value;
          const otherValue = control.parent.get(otherControlName).value;
          if (thisValue === -1 || otherValue === -1 || thisValue >= otherValue) {
              return null;
          }

          return {
              'greaterOrEqual': true
          }
      };
  }

    export function atLeastOneTrueControl() {
        return (formGroup: FormGroup): { [key: string]: boolean } | null => {

            var hasTrueValue = false;

            Object.keys(formGroup.controls).forEach(formControlName => {
                if (formGroup.get(formControlName).value == true) {
                  hasTrueValue = true;
                }
              });
            if (hasTrueValue) {
                return null;
            }

            return {
                'atLeastOneTrueControl': true
            }
        };
    }

    export function levelGreaterOrEqualZero() {
        return (formGroup: FormGroup): { [key: string]: boolean } | null => {

            const startingLevel = ((formGroup.get("startingMaxHP").value - 5) / 5) +
            ((formGroup.get("startingMaxFP").value  - 5) / 5) +
              ((formGroup.get("startingMaxBP").value  - 3) / 3);

            if (startingLevel >= 0) {
                return null;
            }

            return {
                'levelGreaterOrEqualZero': true
            }
        };
    }
}
