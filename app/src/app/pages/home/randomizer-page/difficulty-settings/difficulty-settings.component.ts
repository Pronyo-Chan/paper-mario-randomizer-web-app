import { RandomConsumableMode } from 'src/app/entities/enum/randomConsumableMode';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { tap, Subscription } from 'rxjs';

@Component({
  selector: 'app-difficulty-settings',
  templateUrl: './difficulty-settings.component.html',
  styleUrls: ['./difficulty-settings.component.scss']
})
export class DifficultySettingsComponent implements OnInit, OnDestroy {

  @Input() public difficultyFormGroup: FormGroup;
  private _randomConsumableModeSubscription: Subscription;
  private _randomNumberOfStarSpiritsSubscription: Subscription;

  public constructor() { }
  

  public ngOnInit(): void {
    
    this.disableItemQualityWhenNotBalancedRandom(this.difficultyFormGroup.get('randomConsumableMode').value);
    this.disableStarSpiritsNeededWhenRandom(this.difficultyFormGroup.get('randomNumberOfStarSpirits').value);

    this._randomConsumableModeSubscription =  this.difficultyFormGroup.get('randomConsumableMode').valueChanges.pipe(
      tap(value => {
        this.disableItemQualityWhenNotBalancedRandom(value)
      })
    ).subscribe();

    this._randomNumberOfStarSpiritsSubscription =  this.difficultyFormGroup.get('randomNumberOfStarSpirits').valueChanges.pipe(
      tap(value => {
        this.disableStarSpiritsNeededWhenRandom(value)
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._randomConsumableModeSubscription) {
      this._randomConsumableModeSubscription.unsubscribe();
    }

    if(this._randomNumberOfStarSpiritsSubscription) {
      this._randomNumberOfStarSpiritsSubscription.unsubscribe();
    }
  }

  private disableItemQualityWhenNotBalancedRandom(randomConsumableMode: RandomConsumableMode) {
    if(randomConsumableMode != RandomConsumableMode['Balanced Random']) {
      this.difficultyFormGroup.get('itemQuality').disable();
    } else {
      this.difficultyFormGroup.get('itemQuality').enable();
    }
  }

  private disableStarSpiritsNeededWhenRandom(randomNumberOfStarSpirits: boolean) {
    if(randomNumberOfStarSpirits) {
      this.difficultyFormGroup.get('starWaySpiritsNeeded').disable();
    } else {
      this.difficultyFormGroup.get('starWaySpiritsNeeded').enable();
    }
  }
}
