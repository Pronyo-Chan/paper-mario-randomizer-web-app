import { Subscription, tap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { StartingMap as StartingMaps } from 'src/app/entities/enum/startingMaps';

@Component({
  selector: 'app-open-world-settings',
  templateUrl: './open-world-settings.component.html',
  styleUrls: ['./open-world-settings.component.scss']
})
export class OpenWorldSettingsComponent implements OnInit, OnDestroy {

  public startingMaps = [
    {name: "Toad Town", value: StartingMaps.ToadTown},
    {name: "Goomba Village", value: StartingMaps.GoombaVillage},
    {name: "Dry Dry Outpost", value: StartingMaps.DryDryOutpost},
    {name: "Yoshi Village", value: StartingMaps.YoshiVillage},
  ];

  @Input() public openLocationsFormGroup: FormGroup;
  private _startingMapSubcription: Subscription;
  public constructor() { }

  public ngOnInit(): void {
    this.openLocationsFormGroup.get('startingMap').setValue(StartingMaps.ToadTown)
    
    this._startingMapSubcription =  this.openLocationsFormGroup.get('startingMap').valueChanges.pipe(
      tap(value => {
        if(value == StartingMaps.DryDryOutpost) {
          this.openLocationsFormGroup.get('homewardShroom').setValue(true);
          this.openLocationsFormGroup.get('homewardShroom').disable();
        } else {
          this.openLocationsFormGroup.get('homewardShroom').enable();
        }
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._startingMapSubcription) {
      this._startingMapSubcription.unsubscribe();
    }
  }
}
