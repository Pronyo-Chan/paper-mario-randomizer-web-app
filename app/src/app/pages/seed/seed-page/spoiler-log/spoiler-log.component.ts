import { SphereSpoilerLog } from './../../../../entities/sphereSpoilerLog';
import { SpoilerLog } from 'src/app/entities/spoilerLog';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spoiler-log',
  templateUrl: './spoiler-log.component.html',
  styleUrls: ['./spoiler-log.component.scss']
})
export class SpoilerLogComponent implements OnInit {

  @Input() public spoilerLog: SpoilerLog;
  @Input() public progressionSpheres: SphereSpoilerLog;
  @Input() public allItemSpheres: SphereSpoilerLog;
  @Input() public chapterDifficulties: string[]

  public readonly MIN_AMOUNT_OF_CHARS = 2;

  public areas: string[];
  public items: string[];
  public sphereNames: string[];

  public searchText: string;
  public filteredSearchItems: string[] = []
  public itemSearchresult: string
  public locationSearchResults: string[] = []
  public areaSearchResults: string[] = []

  public hideItemNames = true;
  public viewMode: number = 0;

  public constructor() { }

  public ngOnInit(): void {
    this.sphereNames = Object.keys(this.progressionSpheres)
    this.areas = Object.keys(this.spoilerLog);
    this.items = Object.values(this.spoilerLog).flat().flatMap(itemLocation => itemLocation.item)
  }

  public onItemSearchChange() {
    this.itemSearchresult = this.searchText
    var itemLocations = Object.values(this.spoilerLog).flat().filter(itemLocation => itemLocation.item == this.itemSearchresult);
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

    if(this.searchText.length < this.MIN_AMOUNT_OF_CHARS) {
      this.filteredSearchItems = [];
      return;
    }
    const filterValue = this.searchText.toLowerCase();
    // Filter unique items that inclue value
    this.filteredSearchItems =  this.items.filter((item, index, array) => array.indexOf(item) === index && item.toLowerCase().includes(filterValue));

    if(!this.filteredSearchItems.length) {
      this.itemSearchresult = null;
    } else if(this.filteredSearchItems.find(item => item == this.searchText)) {
      this.onItemSearchChange()
    }
  }

}
