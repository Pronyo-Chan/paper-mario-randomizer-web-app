import { Subscription, tap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { StartingMap as StartingMaps } from 'src/app/entities/enum/startingMaps';

@Component({
  selector: 'app-world-settings',
  templateUrl: './world-settings.component.html',
  styleUrls: ['./world-settings.component.scss']
})
export class WorldSettingsComponent implements OnInit, OnDestroy {

  public startingMaps = [
    {name: "Toad Town", value: StartingMaps.ToadTown},
    {name: "Goomba Village", value: StartingMaps.GoombaVillage},
    {name: "Dry Dry Outpost", value: StartingMaps.DryDryOutpost},
    {name: "Yoshi Village", value: StartingMaps.YoshiVillage},
    {name: "Random Pick", value: StartingMaps.Random}
  ];

  @Input() public worldFormGroup: FormGroup;
  private _startingMapSubcription: Subscription;
  public constructor() { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    if(this._startingMapSubcription) {
      this._startingMapSubcription.unsubscribe();
    }
  }

  public onRequiredStarsBlur(): void {
    const requiredStarsControl = this.worldFormGroup.get("starHuntRequired")
    if(requiredStarsControl.value > 120) {
      requiredStarsControl.setValue(120);
    }
    else if(requiredStarsControl.value < 0) {
      requiredStarsControl.setValue(0);
    }
    requiredStarsControl.updateValueAndValidity();
  }

  public onPlacedStarsBlur(): void {
    const requiredStarsControl = this.worldFormGroup.get("starHuntPlaced")
    if(requiredStarsControl.value > 120) {
      requiredStarsControl.setValue(120);
    }
    else if(requiredStarsControl.value < 0) {
      requiredStarsControl.setValue(0);
    }
    requiredStarsControl.updateValueAndValidity();
  }
}
