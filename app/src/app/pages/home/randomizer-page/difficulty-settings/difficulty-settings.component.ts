import { RandomConsumableMode } from 'src/app/entities/enum/randomConsumableMode';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { tap, Subscription } from 'rxjs';
import { DifficultySetting } from 'src/app/entities/enum/difficultySetting';

@Component({
  selector: 'app-difficulty-settings',
  templateUrl: './difficulty-settings.component.html',
  styleUrls: ['./difficulty-settings.component.scss']
})
export class DifficultySettingsComponent implements OnInit, OnDestroy {

  @Input() public difficultyFormGroup: FormGroup;
  private _enemyDifficultySubscription: Subscription;
  private _randomConsumableModeSubscription: Subscription;
  private _randomNumberOfStarSpiritsSubscription: Subscription;

  public constructor() { }
  

  public ngOnInit(): void {
    
    this.forceXpCapWhenProgressiveScaling(this.difficultyFormGroup.get('difficultyMode').value);
    this.disableItemQualityWhenNotBalancedRandom(this.difficultyFormGroup.get('randomConsumableMode').value);
    this.disableStarSpiritsNeededWhenRandom(this.difficultyFormGroup.get('randomNumberOfStarSpirits').value);

    this._enemyDifficultySubscription =  this.difficultyFormGroup.get('difficultyMode').valueChanges.pipe(
      tap(value => {
        this.forceXpCapWhenProgressiveScaling(value)
      })
    ).subscribe();

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
    if(this._enemyDifficultySubscription) {
      this._enemyDifficultySubscription.unsubscribe();
    }

    if(this._randomConsumableModeSubscription) {
      this._randomConsumableModeSubscription.unsubscribe();
    }

    if(this._randomNumberOfStarSpiritsSubscription) {
      this._randomNumberOfStarSpiritsSubscription.unsubscribe();
    }
  }

  private forceXpCapWhenProgressiveScaling(difficultySetting: DifficultySetting) {
    if(difficultySetting == DifficultySetting.ProgressiveScaling) {
      this.difficultyFormGroup.get('capEnemyXP').setValue(true);
      this.difficultyFormGroup.get('capEnemyXP').disable();
    } else {
      this.difficultyFormGroup.get('capEnemyXP').enable();
    }
  }

  private disableItemQualityWhenNotBalancedRandom(randomConsumableMode: RandomConsumableMode) {
    console.log(randomConsumableMode)
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
