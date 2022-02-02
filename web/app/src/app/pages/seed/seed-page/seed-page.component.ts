import { SettingsResponse } from './../../../entities/settingsResponse';
import { Subscription, tap, switchMap, Observable, take, catchError, of } from 'rxjs';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { stringify } from 'querystring';
import { SpoilerLog } from 'src/app/entities/spoilerLog';

@Component({
  selector: 'app-seed-page',
  templateUrl: './seed-page.component.html',
  styleUrls: ['./seed-page.component.scss']
})
export class SeedPageComponent implements OnInit, OnDestroy {
  
  public seedId: string;
  public seedInfo$: Observable<SettingsResponse>;

  public seedInfoError: boolean;
  public spoilerLogError: boolean;

  public spoilerLog: Observable<SpoilerLog>;

  constructor(private _renderer: Renderer2, private _route: ActivatedRoute, private _randomizerService: RandomizerService) { }
  

  public ngOnInit(): void {
    this._renderer.addClass(document.body, 'purple-bg');

    this.seedInfo$ = this._route.queryParams.pipe(
      switchMap(params => {
        this.seedId = params.id;
        this.initSpoilerLog()
        return this._randomizerService.getSeedInfo(this.seedId)
        
      }),
      catchError(err => {
        this.seedInfoError = true;
        return of(err)
      })
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
      catchError( err => {
        this.spoilerLogError = true;
        return of(err);
      })
    ).subscribe();
  }

  public convertSpoilerFileToDict(spoilerFile: string) {
    var fileLines = spoilerFile.split('\n')
    var spoilerLogData: SpoilerLog = {};

    var currentRegion = '';
    fileLines.forEach(line => {
      
      if(line[0] != ' ') { // Region group name, first char not empty
        currentRegion = line
        
      } else if(line != '') {
        if(!spoilerLogData[currentRegion]) {
          spoilerLogData[currentRegion] = [];
        }
          var splitLine = line.split('):'); // Split the location and item
          spoilerLogData[currentRegion].push({location: splitLine[0].trimLeft(), item: splitLine[1]})
      }
    });
    this.spoilerLog = of(spoilerLogData); 
  }

  public ngOnDestroy(): void {
    this._renderer.removeClass(document.body, 'purple-bg')
  }

}
