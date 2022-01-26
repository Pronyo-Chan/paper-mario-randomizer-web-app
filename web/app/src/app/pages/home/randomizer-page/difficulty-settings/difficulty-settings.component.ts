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
    if(!this.difficultyFormGroup.get('initialCoins').value)
      {
        this.difficultyFormGroup.get('initialCoins').setValue(0);
      }
    this.difficultyFormGroup.updateValueAndValidity();
  }

}
