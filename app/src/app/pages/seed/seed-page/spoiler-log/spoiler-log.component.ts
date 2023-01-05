import { SettingsSpoilerLog } from './../../../../entities/settingsSpoilerLog';
import { SphereSpoilerLog } from './../../../../entities/sphereSpoilerLog';
import { SpoilerLog } from 'src/app/entities/spoilerLog';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { catchError, of, Subscription, take, tap } from 'rxjs';
import { RandomizerService } from 'src/app/services/randomizer.service';

@Component({
  selector: 'app-spoiler-log',
  templateUrl: './spoiler-log.component.html',
  styleUrls: ['./spoiler-log.component.scss']
})
export class SpoilerLogComponent implements OnInit, OnDestroy {

  @Input() public seedId: string
  @Input() public spoilerLog: SpoilerLog;
  @Input() public progressionSpheres: SphereSpoilerLog;
  @Input() public allItemSpheres: SphereSpoilerLog;
  @Input() public settingsSpoilerLog: SettingsSpoilerLog;

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
  public selectedIndex: number = 0;

  public spoilerLogError: string;
  public isDownloadingSpoilerLog = false;
  private _spoilerLogSubscription: Subscription;

  public constructor(private _randomizerService: RandomizerService) { }

  public ngOnInit(): void {
    this.sphereNames = Object.keys(this.allItemSpheres)
    this.areas = Object.keys(this.spoilerLog);
    this.items = Object.values(this.spoilerLog).flat().flatMap(itemLocation => itemLocation.item)
  }

  public ngOnDestroy(): void {
    if(this._spoilerLogSubscription) {
      this._spoilerLogSubscription.unsubscribe();
    }
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

  public onTabChange(event: MatTabChangeEvent) {
    this.selectedIndex = event.index;
  }

  public downloadSpoilerLog() {

    this.spoilerLogError = null;
    this.isDownloadingSpoilerLog = true;
    this._spoilerLogSubscription = this._randomizerService.downloadSpoilerLog(this.seedId)
    .pipe(
      take(1),
      tap(spoilerLog => {
        this.isDownloadingSpoilerLog = false;
        this.serveDownload(spoilerLog, this.seedId+ '_spoiler.txt');     
      }),
      catchError( err => {
        this.spoilerLogError = 'A server error has occured'
        this.isDownloadingSpoilerLog = false;
        return of(err);
      })
    ).subscribe();
  }

  public serveDownload(blob: Blob, filename: string) {
    const data = window.URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = data;
    link.download = filename;
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  }

}
