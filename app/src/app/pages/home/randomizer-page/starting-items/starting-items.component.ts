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

  public readonly MIN_AMOUNT_OF_CHARS = 2;

  public allStartingItems: {name: string, value: number, type: 'Badge' | 'Item' | 'KeyItem'}[];
  public addOnBlur = true;
  public searchText: string;

  public filteredSearchItems: string[];

  @Input() public startingItemsFormControl: FormControl

  public constructor() { }

  public ngOnInit(): void {
    this.allStartingItems = [];
    for(var itemEnum in Items) {
      if(isNaN(Number(Items[itemEnum])))
      {
        this.allStartingItems.push({name: Items[itemEnum], value: Number(itemEnum), type: 'Item'})
      }
    }
    for(var keyItemEnum in KeyItems) {
      if(isNaN(Number(KeyItems[keyItemEnum]))) {
        this.allStartingItems.push({name: KeyItems[keyItemEnum], value: Number(keyItemEnum), type: 'KeyItem'})
      }
        
    }
    for(var badgeEnum in Badges) {
      if(isNaN(Number(Badges[badgeEnum]))) {
        this.allStartingItems.push({name: Badges[badgeEnum], value: Number(badgeEnum), type: 'Badge'})
      }
        
    }
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.startingItemsFormControl.value.push({name: value});
    }
    event.chipInput!.clear();
  }

  public remove(startingItem: number): void {
    const index = this.allStartingItems.map(i => i.value).indexOf(startingItem);

    if (index >= 0) {
      this.allStartingItems.splice(index, 1);
    }
  }

  public onItemSearchChange() {
    var item = this.allStartingItems.find(i => i.name == this.searchText);
    if(!item) {
      return;
    }
    this.startingItemsFormControl.value.push(item)
    this.searchText = null;
  }

  public filter() {
    if(this.searchText.length < this.MIN_AMOUNT_OF_CHARS) {
      this.filteredSearchItems = [];
      return;
    }
    const filterValue = this.searchText.toLowerCase();
    // Filter unique items that inclue value
    this.filteredSearchItems =  this.allStartingItems.filter(item => item.name.toLowerCase().includes(filterValue)).map(item => item.name);

    if(this.filteredSearchItems.find(item => item == this.searchText)) {
      this.onItemSearchChange()
    }
  }

}
