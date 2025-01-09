import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MAX_FP_COST } from "../plando-page.component";

type Move = {
  id: string;
  displayName: string;
}

type Partner = {
  name: string;
  moves: Array<Move>;
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
    {
      name: 'Goombario',
      moves: [
        { id: 'Charge', displayName: 'Charge'},
        { id: 'Multibonk', displayName: 'Multibonk'}]
    },
    {
      name: 'Kooper',
      moves: [
        { id: 'PowerShell', displayName: 'Power Shell'},
        { id: 'DizzyShell', displayName: 'Dizzy Shell'},
        { id: 'FireShell', displayName: 'Fire Shell'}]
    },
    {
      name: 'Bombette',
      moves: [
        { id: 'Bomb', displayName: 'Bomb'},
        { id: 'PowerBomb', displayName: 'Power Bomb'},
        { id: 'MegaBomb', displayName: 'Mega Bomb'}]
    },
    {
      name: 'Parakarry',
      moves: [
        { id: 'ShellShot', displayName: 'Shell Shot'},
        { id: 'AirLift', displayName: 'Air Lift'},
        { id: 'AirRaid', displayName: 'Air Raid'}]
    },
    {
      name: 'Bow',
      moves: [
        { id: 'OuttaSight', displayName: 'Outta Sight'},
        { id: 'Spook', displayName: 'Spook'},
        { id: 'FanSmack', displayName: 'Fan Smack'}]
    },
    {
      name: 'Watt',
      moves: [
        { id: 'PowerShock', displayName: 'Power Shock'},
        { id: 'TurboCharge', displayName: 'Turbo Charge'},
        { id: 'MegaShock', displayName: 'Mega Shock'}]
    },
    {
      name: 'Sushie',
      moves: [
        { id: 'Squirt', displayName: 'Squirt'},
        { id: 'WaterBlock', displayName: 'Water Block'},
        { id: 'TidalWave', displayName: 'Tidal Wave'}]
    },
    {
      name: 'Lakilester',
      moves: [
        { id: 'SpinySurge', displayName: 'Spiny Surge'},
        { id: 'CloudNine', displayName: 'Cloud Nine'},
        { id: 'Hurricane', displayName: 'Hurricane'}]
    }
  ];
}
