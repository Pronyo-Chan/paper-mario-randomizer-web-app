import { KeyItems } from './../../../../../entities/enum/keyItems';
import { Items } from './../../../../../entities/enum/items';
import { tap } from 'rxjs';
import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StartingItem } from 'src/app/entities/startingItem';

@Component({
  selector: 'app-item-chiplist',
  templateUrl: './item-chiplist.component.html',
  styleUrls: ['./item-chiplist.component.scss']
})
export class ItemChiplistComponent implements OnInit, OnDestroy {

  @Input() public availableItems: StartingItem[];
  @Input() public startingItemsFormControl: FormControl;
  @Input() public itemType: string;

  @ViewChild('autocomplete') public autocomplete;

  public selectedItems: StartingItem[] = [];

  public searchText: FormControl;
  public filteredSearchItems: string[] = [];

  public isInputDisabled = false;

  private _searchTextSubscription: any;
  private _startingItemsControlSubscription: any;

  public constructor() { }
  

  public ngOnInit(): void {
    this.filteredSearchItems = this.availableItems.map(item => item.name);
    this.selectedItems =  this.startingItemsFormControl.value.filter(i => i.itemType == this.itemType)
    this.searchText = new FormControl('');

    this._searchTextSubscription = this.searchText.valueChanges.pipe(
      tap(() => this.filter())
    ).subscribe();

    this._startingItemsControlSubscription = this.startingItemsFormControl.valueChanges.pipe(
      tap(startingItems => {
        if(this.itemType == 'Item' && this.selectedItems.length >= 10 || startingItems.length >= 16) {
          this.searchText.disable()
        } 
        else {
          this.searchText.enable()
        }
        this.selectedItems =  startingItems.filter(i => i.itemType == this.itemType)
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if(this._searchTextSubscription) {
      this._searchTextSubscription.unsubscribe();
    }
    if(this._startingItemsControlSubscription) {
      this._startingItemsControlSubscription.unsubscribe();
    }
  }

  public removeItem(startingItem: StartingItem): void {
    const formControlIndex = this.startingItemsFormControl.value.indexOf(startingItem);

    if (formControlIndex >= 0) {
      this.startingItemsFormControl.setValue(this.startingItemsFormControl.value.filter((_, i) => i != formControlIndex));
    }
  }

  public onItemSearchChange() {
    var item = this.availableItems.find(i => i.name == this.searchText.value);
    if(!item) {
      return;
    }

    this.addItem(item);
    if(this.searchText.enabled)
      setTimeout(() => this.autocomplete.openPanel(), 500)
  }

  public addItem(item: StartingItem) {
    this.startingItemsFormControl.setValue([...this.startingItemsFormControl.value, item]);
    this.searchText.setValue('');
  }

  public filter() {
    const filterValue = this.searchText.value.toLowerCase();
    // Filter unique items that inclue value
    this.filteredSearchItems =  this.availableItems.filter(item => item.name.toLowerCase().includes(filterValue)).map(item => item.name);
    if(this.itemType == 'Badge' || this.itemType == 'Key Item') {
      this.filteredSearchItems = this.filteredSearchItems.filter(itemName => !this.selectedItems.find(selectedItem => selectedItem.name == itemName))
    }
  }

}
