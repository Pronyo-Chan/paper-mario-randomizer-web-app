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
  private _starHuntSubscription: Subscription;

  public constructor() { }

  public ngOnInit(): void {
    const requiredStarsControl = this.worldFormGroup.get("starHuntRequired");
    this._requiredStarsSubscription = requiredStarsControl.valueChanges.pipe(
      tap(() => this.onRequiredStarsBlur())
    ).subscribe();

    const starHuntControl = this.worldFormGroup.get("starHunt");
    this._starHuntSubscription = starHuntControl.valueChanges.pipe(
      tap(value => this.disableSecondaryStarHuntOptionsWhenStarHuntDisabled(value))
    ).subscribe();
    this.disableSecondaryStarHuntOptionsWhenStarHuntDisabled(starHuntControl.value);
  }

  public ngOnDestroy(): void {
    if(this._startingMapSubcription) {
      this._startingMapSubcription.unsubscribe();
    }
    if(this._requiredStarsSubscription) {
      this._requiredStarsSubscription.unsubscribe();
    }
    if(this._starHuntSubscription) {
      this._starHuntSubscription.unsubscribe();
    }
  }

  public onRequiredStarsBlur(): void {
    const requiredStarsControl = this.worldFormGroup.get("starHuntRequired");
    const placedStarsControl = this.worldFormGroup.get("starHuntTotal");

    if(requiredStarsControl.value > 120) {
      requiredStarsControl.setValue(120);
    }
    else if(requiredStarsControl.value < 0) {
      requiredStarsControl.setValue(0);
    }

    requiredStarsControl.updateValueAndValidity();
    placedStarsControl.updateValueAndValidity();
  }

  public onTotalStarsBlur(): void {
    const requiredStarsControl = this.worldFormGroup.get("starHuntRequired");
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

  private disableSecondaryStarHuntOptionsWhenStarHuntDisabled(starHunt: boolean) {
    if(starHunt) {
      this.worldFormGroup.get('starHuntRequired').enable();
      this.worldFormGroup.get('starHuntTotal').enable();
      this.worldFormGroup.get('starHuntEndsGame').enable();
    } else {
      this.worldFormGroup.get('starHuntRequired').disable();
      this.worldFormGroup.get('starHuntTotal').disable();
      this.worldFormGroup.get('starHuntEndsGame').disable();
    }
  }
}
