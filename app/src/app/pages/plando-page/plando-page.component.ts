import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { escapeRegexChars } from "src/app/utilities/stringFunctions";
import { BADGE_LIST } from "./plando-badges/plando-badges.component";
import { CheckType, LEGAL_TRAP_ITEMS, REGIONS_LIST, PLANDO_ITEMS_LIST } from "./plando-constants";
import { STAR_SPIRIT_POWER_NAMES } from "./plando-spirits-and-chapters/plando-spirits-and-chapters.component";

export const MAX_FP_COST: number = 75;
export const MAX_BP_COST: number = 10;
export const DEFAULT_PLANDOMIZER_KEY: string = 'default_plandomizer';

const plandoItemSet = new Set(PLANDO_ITEMS_LIST.map((i) => i.code));
export const manualTrapRegex = new RegExp('^TRAP \\((' + LEGAL_TRAP_ITEMS.map(escapeRegexChars).join('|') + ')\\)$');

@Component({
  selector: 'app-plando-page',
  templateUrl: './plando-page.component.html',
  styleUrls: ['./plando-page.component.scss']
})
export class PlandoPageComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup
  public isValidating: boolean = false;
  public plandoName: FormControl = new FormControl('');

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      difficulty: new FormGroup({
        'chapter 1': new FormControl<number>(null, [Validators.min(0), Validators.max(8)]),
        'chapter 2': new FormControl<number>(null, [Validators.min(0), Validators.max(8)]),
        'chapter 3': new FormControl<number>(null, [Validators.min(0), Validators.max(8)]),
        'chapter 4': new FormControl<number>(null, [Validators.min(0), Validators.max(8)]),
        'chapter 5': new FormControl<number>(null, [Validators.min(0), Validators.max(8)]),
        'chapter 6': new FormControl<number>(null, [Validators.min(0), Validators.max(8)]),
        'chapter 7': new FormControl<number>(null, [Validators.min(0), Validators.max(8)]),
      }),
      boss_battles: new FormGroup({
        'chapter 1': new FormControl<string>(null),
        'chapter 2': new FormControl<string>(null),
        'chapter 3': new FormControl<string>(null),
        'chapter 4': new FormControl<string>(null),
        'chapter 5': new FormControl<string>(null),
        'chapter 6': new FormControl<string>(null),
        'chapter 7': new FormControl<string>(null),
      }),
      required_spirits: new FormControl<Array<string>>(null),
      move_costs: new FormGroup({
        badge: new FormGroup({}),
        partner: new FormGroup({
          'Goombario': new FormGroup({
            'Charge': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'Multibonk': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)])
          }),
          'Kooper': new FormGroup({
            'PowerShell': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'DizzyShell': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'FireShell': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)])
          }),
          'Bombette': new FormGroup({
            'Bomb': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'PowerBomb': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'MegaBomb': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)])
          }),
          'Parakarry': new FormGroup({
            'ShellShot': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'AirLift': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'AirRaid': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)])
          }),
          'Bow': new FormGroup({
            'OuttaSight': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'Spook': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'FanSmack': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)])
          }),
          'Watt': new FormGroup({
            'PowerShock': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'TurboCharge': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'MegaShock': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)])
          }),
          'Sushie': new FormGroup({
            'Squirt': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'WaterBlock': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'TidalWave': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)])
          }),
          'Lakilester': new FormGroup({
            'SpinySurge': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'CloudNine': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]),
            'Hurricane': new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)])
          })
        }),
        starpower: new FormGroup({
          'Refresh': new FormControl<number>(-1),
          'Lullaby': new FormControl<number>(-1),
          'StarStorm': new FormControl<number>(-1),
          'ChillOut': new FormControl<number>(-1),
          'Smooch': new FormControl<number>(-1),
          'TimeOut': new FormControl<number>(-1),
          'UpAndAway': new FormControl<number>(-1)
        })
      }),
      items: new FormGroup({})
    });
    for (const badge of BADGE_LIST) {
      const badgeFormGroup = new FormGroup({});
      badgeFormGroup.addControl('BP', new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_BP_COST)]));
      if (badge.hasFPCost) {
        badgeFormGroup.addControl('FP', new FormControl<number>(null, [Validators.min(0), Validators.max(MAX_FP_COST)]));
      }
      (this.formGroup.get('move_costs').get('badge') as FormGroup).addControl(badge.id, badgeFormGroup)
    }
    for (const region of REGIONS_LIST) {
      const regionFormGroup = new FormGroup({});
      for (const check of region.checks) {
        if (check.type === CheckType.SHOP) {
          const shopItemFormGroup = new FormGroup({});
          shopItemFormGroup.addControl('price', new FormControl<number>(null, [Validators.min(0), Validators.max(999)]));
          shopItemFormGroup.addControl('item', new FormControl<string>(null, [this.itemNameValidator, this.perCheckTypeValidator(check.type)]));
          regionFormGroup.addControl(check.name, shopItemFormGroup);
        } else {
          regionFormGroup.addControl(check.name, new FormControl<string>(null, [this.itemNameValidator, this.perCheckTypeValidator(check.type)]));
        }
      }
      (this.formGroup.get('items') as FormGroup).addControl(region.name, regionFormGroup);
    }
    localStorage.setItem(DEFAULT_PLANDOMIZER_KEY, JSON.stringify(this.formGroup.getRawValue()));
    const savedFormObj = localStorage.getItem('autosavePlandoSettings');
    if (savedFormObj) {
      this.formGroup.setValue(JSON.parse(savedFormObj));
    }
    window.addEventListener('beforeunload', () => this.ngOnDestroy());
  }

  public ngOnDestroy(): void {
    localStorage.setItem('autosavePlandoSettings', JSON.stringify(this.formGroup.getRawValue()));
  }

  private itemNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value === '' || !control.touched || manualTrapRegex.test(control.value) || plandoItemSet.has(control.value)) {
      return null;
    }
    return { invalidPlandoItem: { value: control.value } };
  }

  private perCheckTypeValidator(checkType: CheckType): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === 'SuperBlock' && checkType !== CheckType.SUPER_BLOCK && checkType !== CheckType.MULTICOIN_BLOCK) {
        return { invalidPlacement: { value: 'SuperBlock can only be placed in Multi-Coin Block or Super Block check locations.' } };
      }
      return null;
    };
  }

  public resetPlandoForm() {
    if (confirm('This will clear and reset ALL plando settings. Are you sure?')) {
      this.formGroup.reset();
      for (const power of STAR_SPIRIT_POWER_NAMES) {
        this.formGroup.get('move_costs').get('starpower').get(power).setValue(-1);
      }
      this.formGroup.get('move_costs').get('starpower').updateValueAndValidity();
    }
  }

}
