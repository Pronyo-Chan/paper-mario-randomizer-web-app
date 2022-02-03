import { ItemLocation } from './../../../../entities/itemLocation';
import { SpoilerLog } from 'src/app/entities/spoilerLog';
import { Component, Input, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-spoiler-log',
  templateUrl: './spoiler-log.component.html',
  styleUrls: ['./spoiler-log.component.scss']
})
export class SpoilerLogComponent implements OnInit {

  @Input() public spoilerLog: SpoilerLog;

  public areas: string[];
  public items: string[];

  public searchText: string;
  public filteredSearchItems: string[] = []
  public searchedItem: string
  public locationSearchResults: string[] = []
  public areaSearchResults: string[] = []

  public constructor() { }

  public ngOnInit(): void {
    this.areas = Object.keys(this.spoilerLog);
    this.items = Object.values(this.spoilerLog).flat().flatMap(itemLocation => itemLocation.item)
  }

  public onItemSearchChange(event: MatAutocompleteSelectedEvent) {
    this.searchedItem = event.option.value;
    var itemLocations = Object.values(this.spoilerLog).flat().filter(itemLocation => itemLocation.item == this.searchedItem);
    this.locationSearchResults = itemLocations.map(itemLocation => itemLocation.location);

    this.areaSearchResults = [];
    for(var itemLocation of itemLocations) {
      var areaFound = Object.keys(this.spoilerLog).find(key => this.spoilerLog[key].find(value => value.location == itemLocation.location));
      if(areaFound) {
        this.areaSearchResults.push(areaFound);
      }
    }
  }

  public filter() {
    if(this.searchText.length < 2) {
      this.filteredSearchItems = [];
      return;
    }
    const filterValue = this.searchText.toLowerCase();
    // Filter unique items that inclue value
    this.filteredSearchItems =  this.items.filter((item, index, array) => array.indexOf(item) === index && item.toLowerCase().includes(filterValue));
  }

}
