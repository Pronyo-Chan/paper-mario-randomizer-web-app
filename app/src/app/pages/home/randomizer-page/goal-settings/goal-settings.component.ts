import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { tap, Subscription } from 'rxjs';
import { SeedGoal } from 'src/app/entities/enum/seedGoal';
import { PlandoAssignmentService } from "src/app/services/plando-assignment.service";

@Component({
  selector: 'app-goal-settings',
  templateUrl: './goal-settings.component.html',
  styleUrls: ['./goal-settings.component.scss']
})
export class GoalSettingsComponent implements OnInit, OnDestroy {

  @Input() public goalsFormGroup: FormGroup;
  public isSevenOrZeroStarSpirits: boolean;

  private _requireSpecificSpiritsSubscription: Subscription;
  private _starWaySpiritsNeededSubscription: Subscription;
  private _requiredStarWayPowerStarsSubscription: Subscription;
  private _requiredStarBeamPowerStarsSubscription: Subscription;
  private _plandoSubscription: Subscription;
  private _lclSubscription: Subscription;

  public constructor(private _plandoAssignmentService: PlandoAssignmentService) { }

  public ngOnInit(): void {
    this.updateIsSevenOrZeroStarSpirits();

    this.disableRequireSpecificSpiritsWhenSevenSpirits();
    this.disableLimitChapterLogicWhenNotRequiringSpecificSpirits(this.goalsFormGroup.get('requireSpecificSpirits').value);
    this.disableStarBeamSpiritsRequiredWhenLCL(this.goalsFormGroup.get('limitChapterLogic').value);

    this._starWaySpiritsNeededSubscription = this.goalsFormGroup.get('starWaySpiritsNeeded').valueChanges.pipe(
      tap(value => {
        this.updateIsSevenOrZeroStarSpirits();
        this.disableRequireSpecificSpiritsWhenSevenSpirits();
      })
    ).subscribe();

    this._requireSpecificSpiritsSubscription =  this.goalsFormGroup.get('requireSpecificSpirits').valueChanges.pipe(
      tap(value => {
        this.disableLimitChapterLogicWhenNotRequiringSpecificSpirits(value);
      })
    ).subscribe();

    this._lclSubscription =  this.goalsFormGroup.get('limitChapterLogic').valueChanges.pipe(
      tap(value => {
        this.disableStarBeamSpiritsRequiredWhenLCL(value);
      })
    ).subscribe();

    const starWayPowerStarsNeededControl = this.goalsFormGroup.get("starWayPowerStarsNeeded");
    this._requiredStarWayPowerStarsSubscription = starWayPowerStarsNeededControl.valueChanges.pipe(
      tap(() => this.onRequiredStarWayStarsBlur()),
    ).subscribe();

    const starBeamPowerStarsNeededControl = this.goalsFormGroup.get("starBeamPowerStarsNeeded");
    this._requiredStarBeamPowerStarsSubscription = starBeamPowerStarsNeededControl.valueChanges.pipe(
      tap(() => this.onRequiredStarBeamStarsBlur())
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._requireSpecificSpiritsSubscription) {
      this._starWaySpiritsNeededSubscription.unsubscribe();
    }

    if(this._starWaySpiritsNeededSubscription) {
      this._starWaySpiritsNeededSubscription.unsubscribe();
    }

    if(this._requiredStarWayPowerStarsSubscription) {
      this._requiredStarWayPowerStarsSubscription.unsubscribe();
    }

    if(this._requiredStarBeamPowerStarsSubscription) {
      this._requiredStarBeamPowerStarsSubscription.unsubscribe();
    }

    if(this._lclSubscription) {
      this._lclSubscription.unsubscribe();
    }

    if(this._plandoSubscription) {
      this._plandoSubscription.unsubscribe();
    }
  }

  public onRequiredStarWayStarsBlur(): void {
    const requiredStarsControl = this.goalsFormGroup.get("starWayPowerStarsNeeded");
    const placedStarsControl = this.goalsFormGroup.get("starHuntTotal");

    if(requiredStarsControl.value > 120) {
      requiredStarsControl.setValue(120, { emitEvent: false });
    }
    else if(requiredStarsControl.value < -1) {
      requiredStarsControl.setValue(0, { emitEvent: false });
    }

    requiredStarsControl.updateValueAndValidity();
    placedStarsControl.updateValueAndValidity();
  }

  public onRequiredStarBeamStarsBlur(): void {
    const requiredBeamStarsControl = this.goalsFormGroup.get("starBeamPowerStarsNeeded");
    const placedStarsControl = this.goalsFormGroup.get("starHuntTotal");

    if(requiredBeamStarsControl.value > 120) {
      requiredBeamStarsControl.setValue(120, { emitEvent: false });
    }
    else if(requiredBeamStarsControl.value < -1) {
      requiredBeamStarsControl.setValue(0, { emitEvent: false });
    }

    requiredBeamStarsControl.updateValueAndValidity();
    placedStarsControl.updateValueAndValidity();
  }

  public onTotalStarsBlur(): void {
    const requiredStarsControl = this.goalsFormGroup.get("starWayPowerStarsNeeded");
    const placedStarsControl = this.goalsFormGroup.get("starHuntTotal");

    if(placedStarsControl.value > 120) {
      placedStarsControl.setValue(120);
    }
    else if(placedStarsControl.value < -1) {
      placedStarsControl.setValue(0);
    }

    requiredStarsControl.updateValueAndValidity();
    placedStarsControl.updateValueAndValidity();
  }

  public shouldShowStarBeamSettings(): boolean {
    const seedGoalControl = this.goalsFormGroup.get("seedGoal");
    return seedGoalControl.value == SeedGoal.DefeatBowser
  }

  public getStarWaySpiritsNumber(): string {
    return this.goalsFormGroup.get('starWaySpiritsNeeded').value >= 0 ? this.goalsFormGroup.get('starWaySpiritsNeeded').value : 'Random'
  }

  public getStarBeamSpiritsNumber(): string {
    return this.goalsFormGroup.get('starBeamSpiritsNeeded').value >= 0 ? this.goalsFormGroup.get('starBeamSpiritsNeeded').value : 'Random'
  }

  public getStarHuntTotalNumber(): string {
    return this.goalsFormGroup.get('starHuntTotal').value >= 0 ? this.goalsFormGroup.get('starHuntTotal').value : 'Random'
  }

  public getStarWayPowerStarsNeededNumber(): string {
    return this.goalsFormGroup.get('starWayPowerStarsNeeded').value >= 0 ? this.goalsFormGroup.get('starWayPowerStarsNeeded').value : 'Random'
  }

  public getStarBeamPowerStarsNeededNumber(): string {
    return this.goalsFormGroup.get('starBeamPowerStarsNeeded').value >= 0 ? this.goalsFormGroup.get('starBeamPowerStarsNeeded').value : 'Random'
  }

  private disableRequireSpecificSpiritsWhenSevenSpirits() {
    if(this.isSevenOrZeroStarSpirits) {
      this.goalsFormGroup.get('requireSpecificSpirits').setValue(false);
      this.goalsFormGroup.get('requireSpecificSpirits').disable();
    } else if(this._plandoAssignmentService.assignedControls.getValue().has('starWaySpiritsNeeded')) {
      this.goalsFormGroup.get('requireSpecificSpirits').setValue(true);
      this.goalsFormGroup.get('requireSpecificSpirits').disable();
    } else {
      this.goalsFormGroup.get('requireSpecificSpirits').enable();
    }
  }

  private disableLimitChapterLogicWhenNotRequiringSpecificSpirits(requireSpecificSpirits: boolean) {
    if(!requireSpecificSpirits || this.isSevenOrZeroStarSpirits) {
      this.goalsFormGroup.get('limitChapterLogic').setValue(false);
      this.goalsFormGroup.get('limitChapterLogic').disable();
    } else {
      this.goalsFormGroup.get('limitChapterLogic').enable();
    }
  }

  private disableStarBeamSpiritsRequiredWhenLCL(limitChapterLogic: boolean) {
    if(limitChapterLogic) {
      this.goalsFormGroup.get('starBeamSpiritsNeeded').setValue(0);
      this.goalsFormGroup.get('starBeamSpiritsNeeded').disable();
    } else {
      this.goalsFormGroup.get('starBeamSpiritsNeeded').enable();
    }
  }

  private updateIsSevenOrZeroStarSpirits() {
    this.isSevenOrZeroStarSpirits = (this.goalsFormGroup.get('starWaySpiritsNeeded').value == 7 || this.goalsFormGroup.get('starWaySpiritsNeeded').value == 0);
  }
}
