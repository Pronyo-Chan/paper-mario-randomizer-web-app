import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { StartingMap as StartingMaps } from 'src/app/entities/enum/startingMaps';

@Component({
  selector: 'app-open-world-settings',
  templateUrl: './open-world-settings.component.html',
  styleUrls: ['./open-world-settings.component.scss']
})
export class OpenWorldSettingsComponent implements OnInit {

  public startingMaps = [
    {name: "Toad Town", value: StartingMaps.ToadTown},
    {name: "Goomba Village", value: StartingMaps.GoombaVillage},
    {name: "Dry Dry Outpost", value: StartingMaps.DryDryOutpost},
    {name: "Yoshi Village", value: StartingMaps.YoshiVillage},
  ];

  @Input() public openLocationsFormGroup: FormGroup;
  public constructor() { }

  public ngOnInit(): void {
    this.openLocationsFormGroup.get('startingMap').setValue(StartingMaps.ToadTown)
  }

}
