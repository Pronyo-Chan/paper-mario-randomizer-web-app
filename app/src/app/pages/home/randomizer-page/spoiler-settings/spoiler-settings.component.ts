import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spoiler-settings',
  templateUrl: './spoiler-settings.component.html',
  styleUrls: ['./spoiler-settings.component.scss']
})
export class SpoilerSettingsComponent implements OnInit {

  @Input() public formGroup: FormGroup
  
  public constructor() { }

  public ngOnInit(): void {
  }

  public onRevealLogInHoursBlur() {
    let formControl = this.formGroup.get('qualityOfLife').get('revealLogInHours');

    if(!formControl.value || formControl.value < 0) {
      formControl.setValue(0);
    }
    else if(formControl.value > 700) {
      formControl.setValue(700);
    }
    formControl.updateValueAndValidity();
  }

}
