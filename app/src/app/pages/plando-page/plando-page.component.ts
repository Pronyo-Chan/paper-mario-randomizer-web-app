import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

export const MAX_FP_COST = 75;

@Component({
  selector: 'app-plando-page',
  templateUrl: './plando-page.component.html',
  styleUrls: ['./plando-page.component.scss']
})
export class PlandoPageComponent implements OnInit {
  public formGroup: FormGroup

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
    })
  }

  onSubmit() {
    let obj = this.formGroup.getRawValue()
    // A bit of a kludge to keep the star power cost sliders consistent.
    // Setting cost to 'null' while editing keeps the slider locked at 0.
    const powercosts = obj['move_costs']['starpower']
    for (const power in powercosts) {
      if (powercosts[power] === -1) {
        powercosts[power] = null;
      }
    }
    console.log(obj)
  }
}
