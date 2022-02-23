import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-mario-settings',
  templateUrl: './mario-settings.component.html',
  styleUrls: ['./mario-settings.component.scss']
})
export class MarioSettingsComponent implements OnInit, OnDestroy {

  public startingLevel: number = 1;

  @Input() public marioStatsFormGroup: FormGroup

  private _formGroupSubscription: any;
  constructor() { }
  

  public ngOnInit(): void {
    this._formGroupSubscription = this.marioStatsFormGroup.valueChanges.pipe(
      tap(() => this.updateStartingLevel())
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._formGroupSubscription)
      this._formGroupSubscription.unsubscribe();
  }

  public updateStartingLevel(): void {
    this.startingLevel = 1 +
     ((this.getAdjustedHPValue() - 10) / 5) +
      ((this.getAdjustedFPValue() - 5) / 5) +
        ((this.getAdjustedBPValue() - 3) / 3);
      
    this.startingLevel = Math.round(Math.min(27, Math.max(1, this.startingLevel)))
  }

  public onStartingCoinsBlur() {
    var startingCoinsControl = this.marioStatsFormGroup.get('startingCoins')
    if(startingCoinsControl.invalid)
      {
        if(startingCoinsControl.value < 0)
        {
          startingCoinsControl.setValue(0)
        }
        else if(startingCoinsControl.value > 999)
        {
          startingCoinsControl.setValue(999)
        }
      }
    else if(!startingCoinsControl.value)
    {
      startingCoinsControl.setValue(0)
    }
    this.marioStatsFormGroup.updateValueAndValidity();
  }

  public onStartingHPBlur() {
    
    console.log(this.getAdjustedHPValue())
    this.marioStatsFormGroup.get('startingMaxHP').setValue(this.getAdjustedHPValue())
    this.marioStatsFormGroup.updateValueAndValidity();
    this.updateStartingLevel();
  }

  public getAdjustedHPValue(): number {
    var startingHPControl = this.marioStatsFormGroup.get('startingMaxHP')
    var adjustedValue = startingHPControl.value

    if(startingHPControl.value < 10)
    {
      adjustedValue = 10;
    }
    else if(startingHPControl.value > 50)
    {
      adjustedValue = 50;
    }
    else if(startingHPControl.value % 5 > 0)
    {
      adjustedValue =  Math.ceil(startingHPControl.value/5)*5;
    }
    return adjustedValue;
  }

  public onStartingFPBlur() {
    
    this.marioStatsFormGroup.get('startingMaxFP').setValue(this.getAdjustedFPValue())
    this.marioStatsFormGroup.updateValueAndValidity();
    this.updateStartingLevel();
  }

  public getAdjustedFPValue(): number {
    var startingFPControl = this.marioStatsFormGroup.get('startingMaxFP')
    var adjustedValue = startingFPControl.value;

    if(startingFPControl.value < 5)
    {
      adjustedValue = 5;
    }
    else if(startingFPControl.value > 50)
    {
      adjustedValue = 50;
    }
    else if(startingFPControl.value % 5 > 0)
    {
      adjustedValue = Math.ceil(startingFPControl.value/5)*5;
    }
    return adjustedValue;
  }

  public onStartingBPBlur() {
    
    this.marioStatsFormGroup.get('startingMaxBP').setValue(this.getAdjustedBPValue())
    this.marioStatsFormGroup.updateValueAndValidity();
    this.updateStartingLevel();
  }

  public getAdjustedBPValue(): number {
    var startingBPControl = this.marioStatsFormGroup.get('startingMaxBP')
    var adjustedValue = startingBPControl.value;
    if(startingBPControl.value < 3)
    {
      adjustedValue = 3;
    }
    else if(startingBPControl.value > 30)
    {
      adjustedValue = 30;
    }
    else if(startingBPControl.value % 5 > 0)
    {
      adjustedValue = Math.ceil(startingBPControl.value/3)*3;
    }

    return adjustedValue;
  }
}
