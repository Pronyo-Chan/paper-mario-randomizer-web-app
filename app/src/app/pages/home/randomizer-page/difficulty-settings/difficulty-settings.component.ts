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
  public isSevenOrZeroStarSpirits: boolean;

  private _randomConsumableModeSubscription: Subscription;
  private _randomNumberOfStarSpiritsSubscription: Subscription;
  private requireSpecificSpiritsSubscription: Subscription;
  private _starSpiritsNeededSubscription: Subscription;

  public constructor() { }

  public ngOnInit(): void {
    this.updateIsSevenOrZeroStarSpirits();

    this.disableStarSpiritsNeededWhenRandom(this.difficultyFormGroup.get('randomNumberOfStarSpirits').value);
    this.disableRequireSpecificSpiritsWhenSevenSpirits();
    this.disableLimitChapterLogicWhenNotRequiringSpecificSpirits(this.difficultyFormGroup.get('requireSpecificSpirits').value);

    this._starSpiritsNeededSubscription = this.difficultyFormGroup.get('starWaySpiritsNeeded').valueChanges.pipe(
      tap(value => {
        this.updateIsSevenOrZeroStarSpirits();
        this.disableRequireSpecificSpiritsWhenSevenSpirits();
      })
    ).subscribe();

    this._randomNumberOfStarSpiritsSubscription =  this.difficultyFormGroup.get('randomNumberOfStarSpirits').valueChanges.pipe(
      tap(value => {
        this.updateIsSevenOrZeroStarSpirits();
        this.disableStarSpiritsNeededWhenRandom(value);
      })
    ).subscribe();

    this.requireSpecificSpiritsSubscription =  this.difficultyFormGroup.get('requireSpecificSpirits').valueChanges.pipe(
      tap(value => {
        this.disableLimitChapterLogicWhenNotRequiringSpecificSpirits(value);
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

    if(this.requireSpecificSpiritsSubscription) {
      this._starSpiritsNeededSubscription.unsubscribe();
    }

    if(this._starSpiritsNeededSubscription) {
      this._starSpiritsNeededSubscription.unsubscribe();
    }
  }

  private disableStarSpiritsNeededWhenRandom(randomNumberOfStarSpirits: boolean) {
    if(randomNumberOfStarSpirits) {
      this.difficultyFormGroup.get('starWaySpiritsNeeded').disable();
    } else {
      this.difficultyFormGroup.get('starWaySpiritsNeeded').enable();
    }
  }

  private disableRequireSpecificSpiritsWhenSevenSpirits() {
    if(this.isSevenOrZeroStarSpirits) {
      this.difficultyFormGroup.get('requireSpecificSpirits').setValue(false);
      this.difficultyFormGroup.get('requireSpecificSpirits').disable();
    } else {
      this.difficultyFormGroup.get('requireSpecificSpirits').enable();
    }
  }

  private disableLimitChapterLogicWhenNotRequiringSpecificSpirits(requireSpecificSpirits: boolean) {
    if(!requireSpecificSpirits || this.isSevenOrZeroStarSpirits) {
      this.difficultyFormGroup.get('limitChapterLogic').setValue(false);
      this.difficultyFormGroup.get('limitChapterLogic').disable();
    } else {
      this.difficultyFormGroup.get('limitChapterLogic').enable();
    }
  }

  private updateIsSevenOrZeroStarSpirits() {
    this.isSevenOrZeroStarSpirits = (this.difficultyFormGroup.get('starWaySpiritsNeeded').value == 7 || this.difficultyFormGroup.get('starWaySpiritsNeeded').value == 0)
      && !this.difficultyFormGroup.get('randomNumberOfStarSpirits').value;
  }
}
