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

  public constructor() { }
  

  public ngOnInit(): void {
    
    this._enemyDifficultySubscription =  this.difficultyFormGroup.get('difficultyMode').valueChanges.pipe(
      tap(value => {
        if(value == DifficultySetting.ProgressiveScaling) {
          this.difficultyFormGroup.get('capEnemyXP').setValue(true);
          this.difficultyFormGroup.get('capEnemyXP').disable();
        } else {
          this.difficultyFormGroup.get('capEnemyXP').enable();
        }
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._enemyDifficultySubscription) {
      this._enemyDifficultySubscription.unsubscribe();
    }
  }

  

}
