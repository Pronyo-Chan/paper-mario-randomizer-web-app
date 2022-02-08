import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { tap, Subscription } from 'rxjs';

@Component({
  selector: 'app-difficulty-settings',
  templateUrl: './difficulty-settings.component.html',
  styleUrls: ['./difficulty-settings.component.scss']
})
export class DifficultySettingsComponent implements OnInit {

  @Input() public difficultyFormGroup: FormGroup;

  public constructor() { }
  

  public ngOnInit(): void {

  }

  public onStartingCoinsBlur() {
    var startingCoinsControl = this.difficultyFormGroup.get('startingCoins')
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
    this.difficultyFormGroup.updateValueAndValidity();
  }

}
