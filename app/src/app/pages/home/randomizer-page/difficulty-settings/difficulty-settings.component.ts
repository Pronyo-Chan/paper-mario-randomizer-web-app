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
  private scarcitySubscription: Subscription;

  public constructor() { }
  

  public ngOnInit(): void {
    
    this.forceXpCapWhenProgressiveScaling(this.difficultyFormGroup.get('difficultyMode').value)
    this._enemyDifficultySubscription =  this.difficultyFormGroup.get('difficultyMode').valueChanges.pipe(
      tap(value => {
        this.forceXpCapWhenProgressiveScaling(value)
      })
    ).subscribe();

    // Ensure scarcity is 50 at minimum. This is because older presets will have a value between 0 and 7.
    this.setMinimumScarcityValue();
    this.scarcitySubscription = this.difficultyFormGroup.get('itemScarcity').valueChanges.pipe(
      tap(() => this.setMinimumScarcityValue())
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._enemyDifficultySubscription) {
      this._enemyDifficultySubscription.unsubscribe();
    }
    if(this.scarcitySubscription) {
      this.scarcitySubscription.unsubscribe();
    }
  }

  public forceXpCapWhenProgressiveScaling(difficultySetting: DifficultySetting) {
    if(difficultySetting == DifficultySetting.ProgressiveScaling) {
      this.difficultyFormGroup.get('capEnemyXP').setValue(true);
      this.difficultyFormGroup.get('capEnemyXP').disable();
    } else {
      this.difficultyFormGroup.get('capEnemyXP').enable();
    }
  }

  private setMinimumScarcityValue(): void {
    let scarcityControl = this.difficultyFormGroup.get('itemScarcity')
    if(scarcityControl.value < 10) {
      scarcityControl.setValue(100);
    }
  }

}
