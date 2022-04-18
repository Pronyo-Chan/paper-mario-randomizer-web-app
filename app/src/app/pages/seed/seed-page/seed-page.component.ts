import { pascalToVerboseString } from 'src/app/utilities/stringFunctions';
import { SettingsResponse } from './../../../entities/settingsResponse';
import { Subscription, tap, switchMap, Observable, take, catchError, of } from 'rxjs';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { SpoilerLog } from 'src/app/entities/spoilerLog';
import { environment } from 'src/environments/environment';
import { SphereSpoilerLog } from 'src/app/entities/sphereSpoilerLog';

@Component({
  selector: 'app-seed-page',
  templateUrl: './seed-page.component.html',
  styleUrls: ['./seed-page.component.scss']
})
export class SeedPageComponent implements OnInit, OnDestroy {
  
  public seedId: string;
  public seedInfo$: Observable<SettingsResponse>;

  public pageLoadingErrorCode: string;
  public spoilerLog: Observable<SpoilerLog>;
  public progressionSphereLog: Observable<SphereSpoilerLog>;
  public allItemsSphereLog: Observable<SphereSpoilerLog>;

  public chapterDifficulties: string[] = [];
  public isDifficultyShuffled: boolean = false;

  public isPageLoading: boolean;

  public isSpoilerLogExpanded: boolean = false;
  private _navigationSubscription: Subscription;

  constructor(private _renderer: Renderer2, private _activatedRoute: ActivatedRoute, private _router: Router, private _randomizerService: RandomizerService) { }
  

  public ngOnInit(): void {
    this._renderer.addClass(document.body, 'purple-bg');

    this.isPageLoading = true;

    this.seedInfo$ = this._activatedRoute.queryParams.pipe(
      switchMap(params => {
        this.seedId = params.id;
        return this._randomizerService.getSeedInfo(this.seedId).pipe(
          tap(seedInfo => {
            if(seedInfo.WriteSpoilerLog) {
              this.initSpoilerLog();
            }
            else {
              this.isPageLoading = false;
            }
            if(seedInfo.ShuffleChapterDifficulty) {
              this.isDifficultyShuffled = true;
            }
          }),
          catchError(err => this.handleError(err))
        )
        
      }),
      catchError(err => this.handleError(err))
    )

    this._navigationSubscription = this._router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd && (e as NavigationEnd).url.includes('seed?')) {
        if(this.pageLoadingErrorCode) {
          this._renderer.removeClass(document.body, 'red-bg')
          this.pageLoadingErrorCode = null;
        }
        this.ngOnInit();
      }
    });
  }

  public initSpoilerLog(): void {
    this._randomizerService.downloadSpoilerLog(this.seedId)
    .pipe(
      take(1),
      tap(spoilerLog => {
        spoilerLog.text().then(spoilerFile =>{
          this.convertSpoilerFileToDict(spoilerFile)
          this.isPageLoading = false;
        })
      }),
      catchError(err => this.handleError(err)) 
    ).subscribe();
  }

  public convertSpoilerFileToDict(spoilerFile: string) {
    const progressionItemIndicator = '*';
    var fileLines = spoilerFile.split('\n');
    var spoilerLogData: SpoilerLog = {}; 
    var progressionSphereData: SphereSpoilerLog = {}; 
    var allItemsSphereData: SphereSpoilerLog = {}; 

    var currentRegion = '';
    fileLines.forEach(line => {

      if(line.includes("-> Chapter") && this.isDifficultyShuffled) { // Parse shuffled chapter difficulties
        this.chapterDifficulties.push(line.charAt(line.length-1))
      } else if(line[0] != ' ') { // Region group name, first char not empty
        currentRegion = line.replace(':', '')
      } else if(line != '') {
        if(currentRegion.includes("Sphere") || currentRegion.includes("Starting Items")) {
          if(!progressionSphereData[currentRegion])
            progressionSphereData[currentRegion] = [];

          if(!allItemsSphereData[currentRegion])
          allItemsSphereData[currentRegion] = [];
          
          var regionName = line.split(')', 2)[0].replace('((', '').trim();
          var locationName = line.split('):', 2)[0].replace(regionName, '').replace(':', '').replace('((', '').replace(')', '').trim();

          var itemName = line.split('):')[1].replace('*', '').trim();
          var cleanItemName = pascalToVerboseString(itemName);
          
          // Only write sphere items that are progression in progression log
          if(line.endsWith(progressionItemIndicator)) {
            progressionSphereData[currentRegion].push({region: regionName, location: locationName, item: cleanItemName});
          }
          // Write everything in the allItemsLog
          allItemsSphereData[currentRegion].push({region: regionName, location: locationName, item: cleanItemName});
        }
        else {
          if(!spoilerLogData[currentRegion]) {
            spoilerLogData[currentRegion] = [];
          }
            var splitLine = line.split('):'); // Split the location and item
  
            var locationName = splitLine[0].trimLeft().substring(1);        
            var itemName = splitLine[1];
            
            var cleanItemName = pascalToVerboseString(itemName);
  
            spoilerLogData[currentRegion].push({location: locationName, item: cleanItemName}) //trimleft removes whitespace, substring(1) removes the first (
        }
        
      }
    });
    this.spoilerLog = of(spoilerLogData); 
    this.progressionSphereLog = of(progressionSphereData);
    this.allItemsSphereLog = of(allItemsSphereData)
  }

  public ngOnDestroy(): void {
    this._renderer.removeClass(document.body, 'purple-bg')
    this._renderer.removeClass(document.body, 'red-bg')
  }

  private handleError(err: any): Observable<any> {
    this.pageLoadingErrorCode = err?.status ? err?.status : err?.name;
    this.isPageLoading = false;
    this._renderer.removeClass(document.body, 'puple-bg')
    this._renderer.addClass(document.body, 'red-bg')
    return of(err)
  }

}
