import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MAX_FP_COST } from "../plando-page.component";

type Move = {
  id: string;
  displayName: string;
  cost: number;
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
  @Input() moveCostsFormGroup: FormGroup;
  public readonly MAX_FP: number = MAX_FP_COST;
  public readonly PARTNERS: Array<Partner> = [
    {
      name: 'Goombario',
      moves: [
        { id: 'Charge', displayName: 'Charge', cost: null },
        { id: 'Multibonk', displayName: 'Multibonk', cost: null }]
    },
    {
      name: 'Kooper',
      moves: [
        { id: 'PowerShell', displayName: 'Power Shell', cost: null },
        { id: 'DizzyShell', displayName: 'Dizzy Shell', cost: null },
        { id: 'FireShell', displayName: 'Fire Shell', cost: null }]
    },
    {
      name: 'Bombette',
      moves: [
        { id: 'Bomb', displayName: 'Bomb', cost: null },
        { id: 'PowerBomb', displayName: 'Power Bomb', cost: null },
        { id: 'MegaBomb', displayName: 'Mega Bomb', cost: null }]
    },
    {
      name: 'Parakarry',
      moves: [
        { id: 'ShellShot', displayName: 'Shell Shot', cost: null },
        { id: 'AirLift', displayName: 'Air Lift', cost: null },
        { id: 'AirRaid', displayName: 'Air Raid', cost: null }]
    },
    {
      name: 'Bow',
      moves: [
        { id: 'OuttaSight', displayName: 'Outta Sight', cost: null },
        { id: 'Spook', displayName: 'Spook', cost: null },
        { id: 'FanSmack', displayName: 'Fan Smack', cost: null }]
    },
    {
      name: 'Watt',
      moves: [
        { id: 'PowerShock', displayName: 'Power Shock', cost: null },
        { id: 'TurboCharge', displayName: 'Turbo Charge', cost: null },
        { id: 'MegaShock', displayName: 'Mega Shock', cost: null }]
    },
    {
      name: 'Sushie',
      moves: [
        { id: 'Squirt', displayName: 'Squirt', cost: null },
        { id: 'WaterBlock', displayName: 'Water Block', cost: null },
        { id: 'TidalWave', displayName: 'Tidal Wave', cost: null }]
    },
    {
      name: 'Lakilester',
      moves: [
        { id: 'SpinySurge', displayName: 'Spiny Surge', cost: null },
        { id: 'CloudNine', displayName: 'Cloud Nine', cost: null },
        { id: 'Hurricane', displayName: 'Hurricane', cost: null }]
    }
  ];
}
