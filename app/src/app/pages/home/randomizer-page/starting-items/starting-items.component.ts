import { pascalToVerboseString } from 'src/app/utilities/stringFunctions';
import { StartingItem } from './../../../../entities/startingItem';
import { Badges } from './../../../../entities/enum/badges';
import { KeyItems } from './../../../../entities/enum/keyItems';
import { Items } from './../../../../entities/enum/items';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-starting-items',
  templateUrl: './starting-items.component.html',
  styleUrls: ['./starting-items.component.scss']
})
export class StartingItemsComponent implements OnInit {

  public availableItems: StartingItem[] = [];
  public availableBadges: StartingItem[] = [];
  public availableKeyItems: StartingItem[] = [];

  @Input() public marioStatsFormGroup: FormGroup;

  private startWithRandomItemsSubscription: any;

  public constructor() { }

  public ngOnInit(): void {
    for(var itemEnum in Items) {
      if(isNaN(Number(Items[itemEnum])))
      {
        this.availableItems.push({name: pascalToVerboseString(Items[itemEnum]), value: Number(itemEnum), itemType: 'Item'})
      }
    }
    for(var keyItemEnum in KeyItems) {
      if(isNaN(Number(KeyItems[keyItemEnum])) && keyItemEnum != KeyItems.HomewardShroom.toString()) {
        this.availableKeyItems.push({name: pascalToVerboseString(KeyItems[keyItemEnum]), value: Number(keyItemEnum), itemType: 'Key Item'})
      }
        
    }
    for(var badgeEnum in Badges) {
      if(isNaN(Number(Badges[badgeEnum]))) {
        this.availableBadges.push({name: pascalToVerboseString(Badges[badgeEnum]), value: Number(badgeEnum), itemType: 'Badge'})
      }
        
    }

    this.availableItems.sort((a, b) => a.name.localeCompare(b.name))
    this.availableKeyItems.sort((a, b) => a.name.localeCompare(b.name))
    this.availableBadges.sort((a, b) => a.name.localeCompare(b.name))

    this.startWithRandomItemsSubscription = this.marioStatsFormGroup.get('startWithRandomItems').valueChanges.pipe(
      tap(value => {
        if (value == true) {
          this.marioStatsFormGroup.get('randomItemsMin').enable();
          this.marioStatsFormGroup.get('randomItemsMax').enable();
          this.marioStatsFormGroup.get('startingItems').disable();

        } else {
          this.marioStatsFormGroup.get('randomItemsMin').disable();
          this.marioStatsFormGroup.get('randomItemsMax').disable();
          this.marioStatsFormGroup.get('startingItems').enable();
        }
        this.marioStatsFormGroup.updateValueAndValidity();
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this.startWithRandomItemsSubscription) {
      this.startWithRandomItemsSubscription.unsubscribe();
    }
  }

  public onRandomItemsMinBlur() {
    if(!this.marioStatsFormGroup.get('randomItemsMin').value && this.marioStatsFormGroup.get('randomItemsMin').value != 0)
      {
        this.marioStatsFormGroup.get('randomItemsMin').setValue(0);
      }
    this.marioStatsFormGroup.updateValueAndValidity();
  }

  public onRandomItemsMaxBlur() {
    if(!this.marioStatsFormGroup.get('randomItemsMax').value && this.marioStatsFormGroup.get('randomItemsMax').value != 0)
      {
        this.marioStatsFormGroup.get('randomItemsMax').setValue(0);
      }
    this.marioStatsFormGroup.updateValueAndValidity();
  }
}
