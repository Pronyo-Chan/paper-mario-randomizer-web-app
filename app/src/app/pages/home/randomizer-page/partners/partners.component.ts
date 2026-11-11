import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap, Subscription } from 'rxjs';
import { InputFilterService } from "src/app/services/inputfilter.service";

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit, OnDestroy {

  @Input() public partnersFormGroup: FormGroup;

  private _startWithRandomPartnersSubscription: Subscription
  private _partnerUpgradeShuffleSubscription: Subscription;

  public constructor(public inputfilters: InputFilterService) { }
  

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

    // Progressive Partners requires Partner Upgrade Shuffle to not be Off
    this.onPartnerUpgradeShuffleChange();
    this._partnerUpgradeShuffleSubscription = this.partnersFormGroup.get('partnerUpgradeShuffle').valueChanges.pipe(
      tap(() => this.onPartnerUpgradeShuffleChange())
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._startWithRandomPartnersSubscription) {
      this._startWithRandomPartnersSubscription.unsubscribe();
    }

    if(this._partnerUpgradeShuffleSubscription) {
      this._partnerUpgradeShuffleSubscription.unsubscribe();
    }
  }

  private onPartnerUpgradeShuffleChange(): void {
    const progressivePartners = this.partnersFormGroup.get('progressivePartners');
    if (this.partnersFormGroup.get('partnerUpgradeShuffle').value == 0) {
      progressivePartners.setValue(false);
      progressivePartners.disable();
    } else {
      progressivePartners.enable();
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
