import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {

  private _shuffleItemsSubscription: any;

  @Input() public itemFormGroup: FormGroup;
  
  public constructor() { }
  

  public ngOnInit(): void {
    // Set every item setting to false if shuffleItems false
    this._shuffleItemsSubscription = this.itemFormGroup.get("shuffleItems").valueChanges.pipe(
      tap(() => {
        if(this.itemFormGroup.get("shuffleItems").value == false){
          Object.keys(this.itemFormGroup.controls).filter(formControl => formControl != "shuffleItems").forEach(formControl => {
            if(typeof this.itemFormGroup.get(formControl).value === 'number') {
              this.itemFormGroup.get(formControl).setValue(0);
            } else {
              this.itemFormGroup.get(formControl).setValue(false);
            }
              this.itemFormGroup.get(formControl).disable();
          })
        } else {
          Object.keys(this.itemFormGroup.controls).filter(formControl => formControl != "shuffleItems").forEach(formControl => {
            this.itemFormGroup.get(formControl).enable();
        })
        }
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._shuffleItemsSubscription) {
      this._shuffleItemsSubscription.unsubscribe();
    }
  }

}
