import { StartingItem } from './../../../../entities/startingItem';
import { Badges } from './../../../../entities/enum/badges';
import { KeyItems } from './../../../../entities/enum/keyItems';
import { Items } from './../../../../entities/enum/items';
import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-starting-items',
  templateUrl: './starting-items.component.html',
  styleUrls: ['./starting-items.component.scss']
})
export class StartingItemsComponent implements OnInit {

  public availableItems: StartingItem[] = [];
  public availableBadges: StartingItem[] = [];
  public availableKeyItems: StartingItem[] = [];

  @Input() public startingItemsFormControl: FormControl;

  public constructor() { }

  public ngOnInit(): void {
    for(var itemEnum in Items) {
      if(isNaN(Number(Items[itemEnum])))
      {
        this.availableItems.push({name: Items[itemEnum], value: Number(itemEnum)})
      }
    }
    for(var keyItemEnum in KeyItems) {
      if(isNaN(Number(KeyItems[keyItemEnum]))) {
        this.availableKeyItems.push({name: KeyItems[keyItemEnum], value: Number(keyItemEnum)})
      }
        
    }
    for(var badgeEnum in Badges) {
      if(isNaN(Number(Badges[badgeEnum]))) {
        this.availableBadges.push({name: Badges[badgeEnum], value: Number(badgeEnum)})
      }
        
    }
  }

}
