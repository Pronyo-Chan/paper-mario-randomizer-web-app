import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { tap, Subscription } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  private _shuffleItemsSubscription: Subscription;
  private _includeShopsSubscription: Subscription;

  @Input() public itemFormGroup: FormGroup;

  public constructor() { }

  public ngOnInit(): void {
    this.onShuffleItemsChange();
    this.onShuffleShopsChange();
    // Set every item setting to false if shuffleItems false
    this._shuffleItemsSubscription = this.itemFormGroup.get("shuffleItems").valueChanges.pipe(
      tap(() => this.onShuffleItemsChange())
    ).subscribe();

    // Set every shop setting to false if Shopsanity is off
    this._includeShopsSubscription = this.itemFormGroup.get("includeShops").valueChanges.pipe(
      tap(() => this.onShuffleShopsChange())
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._shuffleItemsSubscription) {
      this._shuffleItemsSubscription.unsubscribe();
    }

    if(this._includeShopsSubscription) {
      this._includeShopsSubscription.unsubscribe();
    }
  }

  private onShuffleItemsChange(): void {
    if(this.itemFormGroup.get("shuffleItems").value == false){
      Object.keys(this.itemFormGroup.controls).filter(formControl => formControl != "shuffleItems")
      .forEach(formControl => {
        if(typeof this.itemFormGroup.get(formControl).value === 'number') {
          this.itemFormGroup.get(formControl).setValue(0);
        } else {
          this.itemFormGroup.get(formControl).setValue(false);
        }
          this.itemFormGroup.get(formControl).disable();
      })
    } else {
      Object.keys(this.itemFormGroup.controls).filter(formControl => formControl != "shuffleItems" && formControl != "progressionOnMerlow" && formControl != "progressionOnRowf")
      .forEach(formControl => {
        this.itemFormGroup.get(formControl).enable();
      })
    }
  }

  private onShuffleShopsChange(): void {
    if(this.itemFormGroup.get("includeShops").value == false){
        this.itemFormGroup.get("progressionOnMerlow").setValue(false);
        this.itemFormGroup.get("progressionOnMerlow").disable();

        this.itemFormGroup.get("progressionOnRowf").setValue(0);
        this.itemFormGroup.get("progressionOnRowf").disable();

    } else {
      this.itemFormGroup.get("progressionOnMerlow").enable();
      this.itemFormGroup.get("progressionOnRowf").enable();
    }
  }

}
