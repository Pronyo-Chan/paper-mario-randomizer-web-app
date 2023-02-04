import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { tap, Subscription } from 'rxjs';

@Component({
  selector: 'app-spoiler-settings',
  templateUrl: './spoiler-settings.component.html',
  styleUrls: ['./spoiler-settings.component.scss']
})
export class SpoilerSettingsComponent implements OnInit, OnDestroy {

  @Input() public formGroup: FormGroup

  public writeSpoilerLogControl : FormControl;
  public delaySpoilerLogControl : FormControl;
  public revealLogInHoursControl : FormControl;

  private includeSpoilerLogSubscription: Subscription;
  private delaySpoilerLogSubscription: Subscription;
  
  public constructor() { }

  public ngOnDestroy(): void {
    if(this.includeSpoilerLogSubscription) {
      this.includeSpoilerLogSubscription.unsubscribe();
    }

    if(this.delaySpoilerLogSubscription) {
      this.delaySpoilerLogSubscription.unsubscribe();
    }
  }

  public ngOnInit(): void {
    this.writeSpoilerLogControl = (this.formGroup.get('qualityOfLife').get("writeSpoilerLog")) as FormControl;
    this.delaySpoilerLogControl = (this.formGroup.get('qualityOfLife').get("delaySpoilerLog")) as FormControl;
    this.revealLogInHoursControl = (this.formGroup.get('qualityOfLife').get("revealLogInHours")) as FormControl;

    this.disableDelaySpoilerLogWhenWriteSpoilerLogChanged(this.writeSpoilerLogControl.value);
    this.disableRevalLogInHoursWhenDelaySpoilerLogChanged(this.delaySpoilerLogControl.value);

    this.includeSpoilerLogSubscription = this.writeSpoilerLogControl.valueChanges.pipe(
      tap(v => this.disableDelaySpoilerLogWhenWriteSpoilerLogChanged(v))
    ).subscribe();

    this.delaySpoilerLogSubscription = this.delaySpoilerLogControl.valueChanges.pipe(
      tap(v => this.disableRevalLogInHoursWhenDelaySpoilerLogChanged(v))
    ).subscribe();
  }

  public onRevealLogInHoursBlur() {

    if(!this.revealLogInHoursControl.value || this.revealLogInHoursControl.value < 0) {
      this.revealLogInHoursControl.setValue(0);
    }
    else if(this.revealLogInHoursControl.value > 700) {
      this.revealLogInHoursControl.setValue(700);
    }
    this.revealLogInHoursControl.updateValueAndValidity();
  }

  private disableDelaySpoilerLogWhenWriteSpoilerLogChanged(writeSpoilerLog: boolean) {
    if(writeSpoilerLog) {
      this.delaySpoilerLogControl.enable();
    } else {
      this.delaySpoilerLogControl.disable();
      this.delaySpoilerLogControl.setValue(false);
    }
  }

  private disableRevalLogInHoursWhenDelaySpoilerLogChanged(delaySpoilerLog: boolean) {
    if(delaySpoilerLog) {
      this.revealLogInHoursControl.enable();
    } else {
      this.revealLogInHoursControl.disable();
    }
  }

}
