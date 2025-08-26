import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { escapeRegexChars } from "src/app/utilities/stringFunctions";
import { BADGE_LIST } from "./plando-badges/plando-badges.component";
import { CheckType, LEGAL_TRAP_ITEMS, REGIONS_LIST, PLANDO_ITEMS_LIST } from "./plando-constants";
import { STAR_SPIRIT_POWER_NAMES } from "./plando-spirits-and-chapters/plando-spirits-and-chapters.component";
import { CustomValidators } from "src/app/utilities/custom.validators";
import { convertRequiredSpiritsToChapters } from "./plando-save-load/plando-save-load.component";

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
      dungeon_entrances: new FormGroup({
        'PleasantPath': new FormControl<string>(null),
        'DryDryDesert': new FormControl<string>(null),
        'GustyGulch': new FormControl<string>(null),
        'EnterToyBox': new FormControl<string>(null),
        'LavalavaIsland': new FormControl<string>(null),
        'EnterFlowerGate': new FormControl<string>(null),
        'ShiverMountain': new FormControl<string>(null),
        'RideStarShip': new FormControl<string>(null),
      }),
      required_chapters: new FormControl<Array<number>>(null),
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
          shopItemFormGroup.addControl('item', new FormControl<string>(null, [this.itemNameValidator, CustomValidators.perCheckTypeValidator(check.type)]));
          regionFormGroup.addControl(check.name, shopItemFormGroup);
        } else {
          regionFormGroup.addControl(check.name, new FormControl<string>(null, [this.itemNameValidator, CustomValidators.perCheckTypeValidator(check.type)]));
        }
      }
      (this.formGroup.get('items') as FormGroup).addControl(region.name, regionFormGroup);
    }
    localStorage.setItem(DEFAULT_PLANDOMIZER_KEY, JSON.stringify(this.formGroup.getRawValue()));
    const savedFormStr = localStorage.getItem('autosavePlandoSettings');
    if (savedFormStr) {
      const savedFormObj = JSON.parse(savedFormStr);
      if (!savedFormObj.required_chapters) {
        if (savedFormObj.required_spirits) {
          savedFormObj.required_chapters = convertRequiredSpiritsToChapters(savedFormObj.required_spirits);
        } else {
          savedFormObj.required_chapters = [];
        }
        delete savedFormObj.required_spirits;
      }
      this.formGroup.setValue(savedFormObj);
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
