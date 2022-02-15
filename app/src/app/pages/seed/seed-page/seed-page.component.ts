import { SettingsResponse } from './../../../entities/settingsResponse';
import { Subscription, tap, switchMap, Observable, take, catchError, of } from 'rxjs';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { SpoilerLog } from 'src/app/entities/spoilerLog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seed-page',
  templateUrl: './seed-page.component.html',
  styleUrls: ['./seed-page.component.scss']
})
export class SeedPageComponent implements OnInit, OnDestroy {
  
  public homepageLink: string;
  public seedId: string;
  public seedInfo$: Observable<SettingsResponse>;

  public pageLoadingErrorCode: string;
  public spoilerLog: Observable<SpoilerLog>;

  public chapterDifficulties: string[] = [];
  public isDifficultyShuffled: boolean = false;

  public isPageLoading: boolean;

  public isSpoilerLogExpanded: boolean = false;

  constructor(private _renderer: Renderer2, private _route: ActivatedRoute, private _randomizerService: RandomizerService) { }
  

  public ngOnInit(): void {
    this.homepageLink = environment.homepage;
    this._renderer.addClass(document.body, 'purple-bg');

    this.isPageLoading = true;

    this.seedInfo$ = this._route.queryParams.pipe(
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
    var fileLines = spoilerFile.split('\n')
    var spoilerLogData: SpoilerLog = {};

    var currentRegion = '';
    fileLines.forEach(line => {

      if(line.includes("-> Chapter") && this.isDifficultyShuffled) { // Parse shuffled chapter difficulties
        this.chapterDifficulties.push(line.charAt(line.length-1))

      }else if(line[0] != ' ') { // Region group name, first char not empty
        currentRegion = line.replace(':', '') 

      } else if(line != '') {
        if(!spoilerLogData[currentRegion]) {
          spoilerLogData[currentRegion] = [];
        }
          var splitLine = line.split('):'); // Split the location and item

          var location = splitLine[0].trimLeft().substring(1);        
          var item = splitLine[1].trimLeft();
          
          item = item.replace(/([A-Z0-9])/g, " $1");
          var cleanItemName = item.charAt(0).toUpperCase() + item.slice(1); 
          var cleanestItemName = cleanItemName.replace("H P", "HP").replace("B P", "BP").replace("F P", "FP").replace("F X", "FX").replace("P O W", "POW")

          spoilerLogData[currentRegion].push({location: location, item: cleanestItemName}) //trimleft removes whitespace, substring(1) removes the first (
      }
    });
    this.spoilerLog = of(spoilerLogData); 
  }

  public ngOnDestroy(): void {
    this._renderer.removeClass(document.body, 'purple-bg')
  }

  private handleError(err: any): Observable<any> {
    this.pageLoadingErrorCode = err?.status ? err?.status : err?.name;
    this.isPageLoading = false;
    this._renderer.removeClass(document.body, 'puple-bg')
    this._renderer.addClass(document.body, 'red-bg')
    return of(err)
  }

}
