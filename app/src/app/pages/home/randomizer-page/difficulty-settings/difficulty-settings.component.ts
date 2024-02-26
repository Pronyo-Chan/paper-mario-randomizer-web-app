import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { tap, Subscription } from 'rxjs';

@Component({
  selector: 'app-difficulty-settings',
  templateUrl: './difficulty-settings.component.html',
  styleUrls: ['./difficulty-settings.component.scss']
})
export class DifficultySettingsComponent implements OnInit, OnDestroy {

  @Input() public difficultyFormGroup: FormGroup;
  @Input() public starHuntFormControl: FormControl;
  public isSevenOrZeroStarSpirits: boolean;

  private _randomConsumableModeSubscription: Subscription;
  private _randomNumberOfStarSpiritsSubscription: Subscription;
  private _requireSpecificSpiritsSubscription: Subscription;
  private _starSpiritsNeededSubscription: Subscription;
  private _starHuntFormControlSubscription: Subscription;

  public constructor() { }

  public ngOnInit(): void {
    this.updateIsSevenOrZeroStarSpirits();

    this.disableStarSpiritsNeededWhenRandom(this.difficultyFormGroup.get('randomNumberOfStarSpirits').value);
    this.disableRequireSpecificSpiritsWhenSevenSpirits();
    this.disableLimitChapterLogicWhenNotRequiringSpecificSpirits(this.difficultyFormGroup.get('requireSpecificSpirits').value);
    this.disableSpiritSettingsWhenStarHunt(this.starHuntFormControl.value);

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

    this._requireSpecificSpiritsSubscription =  this.difficultyFormGroup.get('requireSpecificSpirits').valueChanges.pipe(
      tap(value => {
        this.disableLimitChapterLogicWhenNotRequiringSpecificSpirits(value);
      })
    ).subscribe();

    this._starHuntFormControlSubscription = this.starHuntFormControl.valueChanges.pipe(
      tap(value => {
        this.disableSpiritSettingsWhenStarHunt(value)
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

    if(this._requireSpecificSpiritsSubscription) {
      this._starSpiritsNeededSubscription.unsubscribe();
    }

    if(this._starSpiritsNeededSubscription) {
      this._starSpiritsNeededSubscription.unsubscribe();
    }

    if(this._starHuntFormControlSubscription) {
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

  private disableSpiritSettingsWhenStarHunt(isStarHuntEnabled: boolean) {
    if(isStarHuntEnabled) {
      this.difficultyFormGroup.get('randomNumberOfStarSpirits').disable();
      this.difficultyFormGroup.get('starWaySpiritsNeeded').disable();
      this.difficultyFormGroup.get('requireSpecificSpirits').disable();
      this.difficultyFormGroup.get('limitChapterLogic').disable();
    } else {
      this.difficultyFormGroup.get('randomNumberOfStarSpirits').enable();
      this.difficultyFormGroup.get('starWaySpiritsNeeded').enable();
      this.difficultyFormGroup.get('requireSpecificSpirits').enable();
      this.difficultyFormGroup.get('limitChapterLogic').enable();
    }
  }
}
