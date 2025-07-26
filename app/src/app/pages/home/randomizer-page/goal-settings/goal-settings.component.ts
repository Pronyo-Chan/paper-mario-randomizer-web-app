import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { tap, Subscription } from 'rxjs';
import { SeedGoal } from 'src/app/entities/enum/seedGoal';
import { PlandoAssignmentService } from "src/app/services/plando-assignment.service";
import { RequiredChapters } from 'src/app/entities/enum/requiredChapters';
import { SpiritShuffleMode } from 'src/app/entities/enum/spiritShuffleMode';

@Component({
  selector: 'app-goal-settings',
  templateUrl: './goal-settings.component.html',
  styleUrls: ['./goal-settings.component.scss']
})
export class GoalSettingsComponent implements OnInit, OnDestroy {

  @Input() public goalsFormGroup: FormGroup;
  @Input() public isSpiritShuffleEnabled: boolean;
  public isSevenOrZeroRequiredChapters: boolean;

  private _starWaySpiritsNeededSubscription: Subscription;
  private _requiredStarWayPowerStarsSubscription: Subscription;
  private _requiredStarBeamPowerStarsSubscription: Subscription;
  private _plandoSubscription: Subscription;
  private _lclSubscription: Subscription;

  public constructor(private _plandoAssignmentService: PlandoAssignmentService) { }

  public ngOnInit(): void {
    this.updateIsSevenOrZeroRequiredChapters();

    this.disableRequiredChaptersWhenSevenChapters();
    this.disableStarBeamChaptersRequiredWhenLCL(this.goalsFormGroup.get('requiredChapters').value === RequiredChapters['Specific And Limit Chapter Logic']);

    this._starWaySpiritsNeededSubscription = this.goalsFormGroup.get('starWayChaptersNeeded').valueChanges.pipe(
      tap(value => {
        this.updateIsSevenOrZeroRequiredChapters();
        this.disableRequiredChaptersWhenSevenChapters();
      })
    ).subscribe();

    this._lclSubscription =  this.goalsFormGroup.get('requiredChapters').valueChanges.pipe(
      tap(value => {
        this.disableStarBeamChaptersRequiredWhenLCL(value === RequiredChapters['Specific And Limit Chapter Logic']);
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

  public ngOnChanges(changes: SimpleChanges): void {
      if(changes["isSpiritShuffleEnabled"].currentValue == SpiritShuffleMode.Vanilla) {
        this.goalsFormGroup.get('starWaySpiritsNeeded').setValue(0);
        this.goalsFormGroup.get('starWaySpiritsNeeded').disable();
      } else {
        this.goalsFormGroup.get("starWaySpiritsNeeded").enable()
      }
    }

  public ngOnDestroy(): void {
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

  public getStarWayChaptersNumber(): string {
    return this.goalsFormGroup.get('starWayChaptersNeeded').value >= 0 ? this.goalsFormGroup.get('starWayChaptersNeeded').value : 'Random'
  }

  public getStarWaySpiritsNumber(): string {
    return this.goalsFormGroup.get('starWaySpiritsNeeded').value >= 0 ? this.goalsFormGroup.get('starWaySpiritsNeeded').value : 'Random'
  }

  public getStarBeamSpiritsNumber(): string {
    return this.goalsFormGroup.get('starBeamSpiritsNeeded').value >= 0 ? this.goalsFormGroup.get('starBeamSpiritsNeeded').value : 'Random'
  }

  private disableRequiredChaptersWhenSevenChapters() {
    if(this.isSevenOrZeroRequiredChapters) {
      this.goalsFormGroup.get('requiredChapters').setValue(RequiredChapters.Any);
      this.goalsFormGroup.get('requiredChapters').disable();
    } else {
      this.goalsFormGroup.get('requiredChapters').enable();
    }
  }

  private disableStarBeamChaptersRequiredWhenLCL(limitChapterLogic: boolean) {
    if(limitChapterLogic) {
      this.goalsFormGroup.get('starBeamSpiritsNeeded').setValue(0);
      this.goalsFormGroup.get('starBeamSpiritsNeeded').disable();
    } else {
      this.goalsFormGroup.get('starBeamSpiritsNeeded').enable();
    }
  }

  private updateIsSevenOrZeroRequiredChapters() {
    this.isSevenOrZeroRequiredChapters = (this.goalsFormGroup.get('starWayChaptersNeeded').value == 7 || this.goalsFormGroup.get('starWayChaptersNeeded').value == 0);
  }
}
