import { RandomConsumableMode } from 'src/app/entities/enum/randomConsumableMode';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { tap, Subscription } from 'rxjs';

@Component({
  selector: 'app-item-pool-settings',
  templateUrl: './item-pool-settings.component.html',
  styleUrls: ['./item-pool-settings.component.scss']
})
export class ItemPoolSettingsComponent implements OnInit, OnDestroy {

  @Input() public itemPoolFormGroup: FormGroup;
  @Input() public plandoAssignedControls: FormControl<Set<String>>;
  public isSevenOrZeroStarSpirits: boolean;

  private _randomConsumableModeSubscription: Subscription;

  public constructor() { }

  public ngOnInit(): void {
    this.disableItemQualityWhenNotBalancedRandom(this.itemPoolFormGroup.get('randomConsumableMode').value);

    this._randomConsumableModeSubscription =  this.itemPoolFormGroup.get('randomConsumableMode').valueChanges.pipe(
      tap(value => {
        this.disableItemQualityWhenNotBalancedRandom(value);
      })
    ).subscribe();

  }

  public ngOnDestroy(): void {
    if(this._randomConsumableModeSubscription) {
      this._randomConsumableModeSubscription.unsubscribe();
    }
  }

  public onBadgeLimitBlur(): void {
    const badgePoolLimitControl = this.itemPoolFormGroup.get("badgePoolLimit");

    if(badgePoolLimitControl.value > 128) {
      badgePoolLimitControl.setValue(128);
    }
    else if(badgePoolLimitControl.value < 0) {
      badgePoolLimitControl.setValue(0);
    }

    badgePoolLimitControl.updateValueAndValidity();
  }

  private disableItemQualityWhenNotBalancedRandom(randomConsumableMode: RandomConsumableMode) {
    if(randomConsumableMode != RandomConsumableMode['Balanced Random']) {
      this.itemPoolFormGroup.get('itemQuality').disable();
    } else {
      this.itemPoolFormGroup.get('itemQuality').enable();
    }
  }
}
