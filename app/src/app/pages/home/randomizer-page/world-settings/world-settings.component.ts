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
  private _requiredStarsSubscription: Subscription;

  public constructor() { }

  public ngOnInit(): void {
    const requiredStarsControl = this.worldFormGroup.get("starWayPowerStarsNeeded");
    this._requiredStarsSubscription = requiredStarsControl.valueChanges.pipe(
      tap(() => this.onRequiredStarWayStarsBlur()),
      tap(() => this.onRequiredStarBeamStarsBlur())
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._startingMapSubcription) {
      this._startingMapSubcription.unsubscribe();
    }
    if(this._requiredStarsSubscription) {
      this._requiredStarsSubscription.unsubscribe();
    }
  }

  public onRequiredStarWayStarsBlur(): void {
    const requiredStarsControl = this.worldFormGroup.get("starWayPowerStarsNeeded");
    const placedStarsControl = this.worldFormGroup.get("starHuntTotal");

    if(requiredStarsControl.value > 120) {
      requiredStarsControl.setValue(120, { emitEvent: false });
    }
    else if(requiredStarsControl.value < 0) {
      requiredStarsControl.setValue(0, { emitEvent: false });
    }

    requiredStarsControl.updateValueAndValidity();
    placedStarsControl.updateValueAndValidity();
  }

  public onRequiredStarBeamStarsBlur(): void {
    const requiredBeamStarsControl = this.worldFormGroup.get("starBeamPowerStarsNeeded");
    const placedStarsControl = this.worldFormGroup.get("starHuntTotal");

    if(requiredBeamStarsControl.value > 120) {
      requiredBeamStarsControl.setValue(120, { emitEvent: false });
    }
    else if(requiredBeamStarsControl.value < 0) {
      requiredBeamStarsControl.setValue(0, { emitEvent: false });
    }

    requiredBeamStarsControl.updateValueAndValidity();
    placedStarsControl.updateValueAndValidity();
  }

  public onTotalStarsBlur(): void {
    const requiredStarsControl = this.worldFormGroup.get("starWayPowerStarsNeeded");
    const placedStarsControl = this.worldFormGroup.get("starHuntTotal");

    if(placedStarsControl.value > 120) {
      placedStarsControl.setValue(120);
    }
    else if(placedStarsControl.value < 0) {
      placedStarsControl.setValue(0);
    }

    requiredStarsControl.updateValueAndValidity();
    placedStarsControl.updateValueAndValidity();
  }
}
