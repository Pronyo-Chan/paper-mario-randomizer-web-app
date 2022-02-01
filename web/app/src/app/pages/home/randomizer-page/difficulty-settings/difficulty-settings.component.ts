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

  private initialCoinsSubscription: Subscription;
  public constructor() { }
  

  public ngOnInit(): void {

  }

  public onInitialCoinsBlur() {
    var initialCoinsControl = this.difficultyFormGroup.get('initialCoins')
    if(initialCoinsControl.invalid)
      {
        if(initialCoinsControl.value < 0)
        {
          initialCoinsControl.setValue(0)
        }
        else if(initialCoinsControl.value > 999)
        {
          initialCoinsControl.setValue(999)
        }
      }
    else if(!initialCoinsControl.value)
    {
      initialCoinsControl.setValue(0)
    }
    this.difficultyFormGroup.updateValueAndValidity();
  }

}
