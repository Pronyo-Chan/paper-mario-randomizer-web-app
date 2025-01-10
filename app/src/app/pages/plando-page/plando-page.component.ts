import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BADGE_LIST } from "./plando-badges/plando-badges.component";
import { CheckType, LOCATIONS_LIST } from "./plando-items/plando-items.component";

export const MAX_FP_COST = 75;
export const MAX_BP_COST = 10;

@Component({
  selector: 'app-plando-page',
  templateUrl: './plando-page.component.html',
  styleUrls: ['./plando-page.component.scss']
})
export class PlandoPageComponent implements OnInit {
  public formGroup: FormGroup
  public isValidating: boolean = false;
  public plandoName: FormControl = new FormControl('');

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      difficulty: new FormGroup({
        'chapter 1': new FormControl<number>(null, [Validators.min(1), Validators.max(7)]),
        'chapter 2': new FormControl<number>(null, [Validators.min(1), Validators.max(7)]),
        'chapter 3': new FormControl<number>(null, [Validators.min(1), Validators.max(7)]),
        'chapter 4': new FormControl<number>(null, [Validators.min(1), Validators.max(7)]),
        'chapter 5': new FormControl<number>(null, [Validators.min(1), Validators.max(7)]),
        'chapter 6': new FormControl<number>(null, [Validators.min(1), Validators.max(7)]),
        'chapter 7': new FormControl<number>(null, [Validators.min(1), Validators.max(7)]),
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
          'Refresh': new FormControl<number>(null),
          'Lullaby': new FormControl<number>(null),
          'StarStorm': new FormControl<number>(null),
          'ChillOut': new FormControl<number>(null),
          'Smooch': new FormControl<number>(null),
          'TimeOut': new FormControl<number>(null),
          'UpAndAway': new FormControl<number>(null)
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
    for (const location of LOCATIONS_LIST) {
      const locationFormGroup = new FormGroup({});
      for (const check of location.checks) {
        if (check.type === CheckType.SHOP) {
          const shopItemFormGroup = new FormGroup({});
          shopItemFormGroup.addControl('price', new FormControl<number>(null, [Validators.min(0), Validators.max(999)]));
          shopItemFormGroup.addControl('item', new FormControl<string>(null));
          locationFormGroup.addControl(check.name, shopItemFormGroup);
        } else {
          locationFormGroup.addControl(check.name, new FormControl<string>(null));
        }
      }
      (this.formGroup.get('items') as FormGroup).addControl(location.name, locationFormGroup);
    }
  }

  onSubmit() {
    this.isValidating = true;
    let plandoFormObj = this.formGroup.getRawValue()
    // A bit of a kludge to keep the star power cost sliders consistent.
    // Setting cost to 'null' while editing keeps the slider locked at 0.
    const powercosts = plandoFormObj['move_costs']['starpower']
    for (const power in powercosts) {
      if (powercosts[power] === -1) {
        delete powercosts[power];
      }
    }

    // Remove all null and empty values.
    const tidyObj = (obj) => {
      return Object.fromEntries(Object.entries(obj).flatMap(([k, v]) => {
        if (typeof v !== 'object' || (Array.isArray(v) && v.length > 0)) {
          return [[k, v]];
        }
        if (!v || Object.keys(v).length === 0 || (Array.isArray(v) && v.length === 0)) {
          return [];
        } else {
          v = tidyObj(v);
          if (Object.keys(v).length === 0) {
            return []
          } else {
            return [[k, v]];
          }
        }
      }));
    }
    const a = document.createElement('a');
    const plandoFile = new Blob([JSON.stringify(tidyObj(plandoFormObj))], { type: 'application/json' });
    a.href = URL.createObjectURL(plandoFile);
    const dateParts = new Date().toISOString().split('T');
    const datetime = dateParts[0] + '_' + dateParts[1].substring(0,8).replaceAll(':','');
    a.download = 'pm64-plando-' + datetime + '.json';
    a.click();
    this.isValidating = false;
  }
}
