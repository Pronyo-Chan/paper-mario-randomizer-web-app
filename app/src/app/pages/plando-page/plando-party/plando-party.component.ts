import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MAX_FP_COST } from "../plando-page.component";
import { pascalToVerboseString } from "src/app/utilities/stringFunctions";

type Partner = {
  name: string;
  moves: Array<string>;
}

@Component({
  selector: 'app-plando-party',
  templateUrl: './plando-party.component.html',
  styleUrls: ['../plando-page.component.scss', './plando-party.component.scss']
})
export class PlandoPartyComponent {
  @Input() partnerMoveCostsFormGroup: FormGroup;
  public readonly MAX_FP: number = MAX_FP_COST;
  public readonly PARTNERS: Array<Partner> = [
    { name: 'Goombario', moves: ['Charge', 'Multibonk'] },
    { name: 'Kooper', moves: ['PowerShell', 'DizzyShell', 'FireShell'] },
    { name: 'Bombette', moves: ['Bomb', 'PowerBomb', 'MegaBomb'] },
    { name: 'Parakarry', moves: ['ShellShot', 'AirLift', 'AirRaid'] },
    { name: 'Bow', moves: ['OuttaSight', 'Spook', 'FanSmack'] },
    { name: 'Watt', moves: ['PowerShock', 'TurboCharge', 'MegaShock'] },
    { name: 'Sushie', moves: ['Squirt', 'WaterBlock', 'TidalWave'] },
    { name: 'Lakilester', moves: ['SpinySurge', 'CloudNine', 'Hurricane'] }
  ];
  public toDisplayString = pascalToVerboseString;
}
