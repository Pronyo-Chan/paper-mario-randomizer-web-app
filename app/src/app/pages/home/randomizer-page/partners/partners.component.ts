import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap, Subscription } from 'rxjs';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit, OnDestroy {

  @Input() public partnersFormGroup: FormGroup;

  private _startWithRandomPartnersSubscription: Subscription

  public constructor() { }
  

  public ngOnInit(): void {
    this.partnersFormGroup.get('startWithRandomPartners').valueChanges.pipe(
      tap(value => {
        if (value == true) {
          this.partnersFormGroup.get('randomPartnersMin').enable();
          this.partnersFormGroup.get('randomPartnersMax').enable();
          this.partnersFormGroup.get('startWithPartners').disable();

        } else {
          this.partnersFormGroup.get('randomPartnersMin').disable();
          this.partnersFormGroup.get('randomPartnersMax').disable();
          this.partnersFormGroup.get('startWithPartners').enable();
        }
        this.partnersFormGroup.updateValueAndValidity();
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._startWithRandomPartnersSubscription) {
      this._startWithRandomPartnersSubscription.unsubscribe();
    }
  }

  public onRandomPartnersMinBlur() {
    if(!this.partnersFormGroup.get('randomPartnersMin').value && this.partnersFormGroup.get('randomPartnersMin').value != 0)
      {
        this.partnersFormGroup.get('randomPartnersMin').setValue(1);
      }
    this.partnersFormGroup.updateValueAndValidity();
  }

  public onRandomPartnersMaxBlur() {
    if(!this.partnersFormGroup.get('randomPartnersMax').value && this.partnersFormGroup.get('randomPartnersMax').value != 0)
      {
        this.partnersFormGroup.get('randomPartnersMax').setValue(1);
      }
    this.partnersFormGroup.updateValueAndValidity();
  }

}
