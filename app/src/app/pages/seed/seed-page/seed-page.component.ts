import { SettingsResponse } from './../../../entities/settingsResponse';
import { Subscription, tap, switchMap, Observable, take, catchError, of } from 'rxjs';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { stringify } from 'querystring';
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

  constructor(private _renderer: Renderer2, private _route: ActivatedRoute, private _randomizerService: RandomizerService) { }
  

  public ngOnInit(): void {
    this.homepageLink = environment.homepage;
    this._renderer.addClass(document.body, 'purple-bg');

    this.seedInfo$ = this._route.queryParams.pipe(
      switchMap(params => {
        this.seedId = params.id;
        return this._randomizerService.getSeedInfo(this.seedId).pipe(
          tap(seedInfo => {
            if(seedInfo.WriteSpoilerLog) {
              this.initSpoilerLog();
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
      
      if(line[0] != ' ') { // Region group name, first char not empty
        currentRegion = line.replace(':', '')
        
      } else if(line != '') {
        if(!spoilerLogData[currentRegion]) {
          spoilerLogData[currentRegion] = [];
        }
          var splitLine = line.split('):'); // Split the location and item
          spoilerLogData[currentRegion].push({location: splitLine[0].trimLeft().substring(1), item: splitLine[1].trimLeft()}) //trimleft removes whitespace, substring(1) removes the first (
      }
    });
    this.spoilerLog = of(spoilerLogData); 
  }

  public ngOnDestroy(): void {
    this._renderer.removeClass(document.body, 'purple-bg')
  }

  private handleError(err: any): Observable<any> {
    this.pageLoadingErrorCode = err?.status ? err?.status : err?.name;
      this._renderer.removeClass(document.body, 'puple-bg')
      this._renderer.addClass(document.body, 'red-bg')
      return of(err)
  }

}
