import { SphereItemLocation } from './../../../entities/sphereItemLocation';
import { ItemLocation } from './../../../entities/itemLocation';
import { SeedViewModel } from './../../../entities/seed-view-model/seedViewModel';
import { pascalToVerboseString } from 'src/app/utilities/stringFunctions';
import { Subscription, tap, switchMap, Observable, take, catchError, of } from 'rxjs';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { SpoilerLog } from 'src/app/entities/spoilerLog';
import { SphereSpoilerLog } from 'src/app/entities/sphereSpoilerLog';
import { FormControl, FormGroup } from '@angular/forms';
import { SpriteSetting } from 'src/app/entities/enum/spriteSetting';
import { CoinColor } from 'src/app/entities/enum/coinColor';

@Component({
  selector: 'app-seed-page',
  templateUrl: './seed-page.component.html',
  styleUrls: ['./seed-page.component.scss']
})
export class SeedPageComponent implements OnInit, OnDestroy {
  
  public seedId: string;
  public seedViewModel$: Observable<SeedViewModel>;
  public cosmeticsFormGroup: FormGroup;

  public pageLoadingErrorCode: string;
  public spoilerLog: Observable<SpoilerLog>;
  public progressionSphereLog: Observable<SphereSpoilerLog>;
  public allItemsSphereLog: Observable<SphereSpoilerLog>;

  public chapterDifficulties: string[] = [];
  public isDifficultyShuffled: boolean = false;

  public isPageLoading: boolean;

  public displaySpoilerLog: boolean = false;
  public isSpoilerLogExpanded: boolean = false;
  private _navigationSubscription: Subscription;

  constructor(private _renderer: Renderer2, private _activatedRoute: ActivatedRoute, private _router: Router, private _randomizerService: RandomizerService) { }
  

  public ngOnInit(): void {
    this._renderer.addClass(document.body, 'purple-bg');

    this.isPageLoading = true;

    this.initCosmeticsFormGroup();
    this.seedViewModel$ = this._activatedRoute.queryParams.pipe(
      switchMap(params => {
        this.seedId = params.id;
        return this._randomizerService.getSeedInfo(this.seedId).pipe(
          tap(seedModel => {
            let dateNow = (new Date()).getTime();
            let revealDate = (new Date(seedModel.Spoiler.RevealLogAtTime)).getTime()
            if(seedModel.Spoiler.IncludeSpoilerLog && (dateNow > revealDate || !revealDate)) {
              this.initSpoilerLog();
              this.displaySpoilerLog = true;
            }
            else {
              this.isPageLoading = false;
              this.displaySpoilerLog = false;
            }
            if(seedModel.GeneralDifficulty.EnemyDifficulty == "Shuffle Chapter Difficulty") {
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
          const spoilerLogJson = JSON.parse(spoilerFile);
          this.convertSpoilerFileToDict(spoilerLogJson)
          this.isPageLoading = false;
        })
      }),
      catchError(err => this.handleError(err)) 
    ).subscribe();
  }

  public convertSpoilerFileToDict(spoilerLogJson: any) {
    var progressionSphereData: SphereSpoilerLog = {}; 
    var allItemsSphereData: SphereSpoilerLog = {}; 
    var spoilerLogRegions: SpoilerLog = {}

    const spoilerLogData = Object.fromEntries(Object.entries(spoilerLogJson).filter(([key]) => key!= "difficulty" && key != "sphere_log"))
    for (const region in spoilerLogData) {
      spoilerLogRegions[region] = [];
      for (const location in spoilerLogData[region] as any) {
        const cleanItemName = pascalToVerboseString(spoilerLogData[region][location]);
        spoilerLogRegions[region].push({location: location, item: cleanItemName} as ItemLocation)
      }
    }
    this.spoilerLog = of(spoilerLogRegions); 

    const sphereLogData = spoilerLogJson["sphere_log"];
    var sphereCount = 0;
    for (const sphere in sphereLogData) {
      if(sphere == "starting_items") {
        const startingItems = sphereLogData[sphere].map(startingItem => {
          return {region: "Start", location: "Mario's inventory", item: pascalToVerboseString(startingItem)} as SphereItemLocation;
        });
        allItemsSphereData["Starting Items"] = startingItems;
        progressionSphereData["Starting Items"] = startingItems;
        continue;
      }
      
      const sphereName = sphere == "unreachable_in_logic" ? "Unreachable in Logic" : `Sphere ${sphereCount}`
      allItemsSphereData[sphereName] = [];
      progressionSphereData[sphereName] = [];
      for (const region in sphereLogData[sphere] as any) {
        for (const location in sphereLogData[sphere][region] as any) {
          const itemname = sphereLogData[sphere][region][location] as string;
          const cleanItemName = pascalToVerboseString(itemname);
          allItemsSphereData[sphereName].push({location: location, item: cleanItemName, region: region} as SphereItemLocation)
          if(itemname.includes("*")) {
            progressionSphereData[sphereName].push({location: location, item: cleanItemName, region: region} as SphereItemLocation)
          }
        }
      }
      sphereCount++;
    }

    this.chapterDifficulties = Object.values(spoilerLogJson["difficulty"])
    this.progressionSphereLog = of(progressionSphereData);
    this.allItemsSphereLog = of(allItemsSphereData)
  }

  public ngOnDestroy(): void {
    this._renderer.removeClass(document.body, 'purple-bg')
    this._renderer.removeClass(document.body, 'red-bg')

    if(this._navigationSubscription) {
      this._navigationSubscription.unsubscribe();
    }
  }

  private handleError(err: any): Observable<any> {
    this.pageLoadingErrorCode = err?.status ? err?.status : err?.name;
    this.isPageLoading = false;
    this._renderer.removeClass(document.body, 'puple-bg')
    this._renderer.addClass(document.body, 'red-bg')
    return of(err)
  }

  private initCosmeticsFormGroup() {
    
    this.cosmeticsFormGroup =  new FormGroup({
      menu: new FormControl(0),
      marioSprite : new FormControl(),
      goombarioSprite : new FormControl(),
      kooperSprite : new FormControl(),
      bombetteSprite : new FormControl(),
      parakarrySprite : new FormControl(),
      bowSprite : new FormControl(),
      wattSprite: new FormControl(),
      sushieSprite: new FormControl(),
      lakilesterSprite: new FormControl(),
      bossesSetting: new FormControl(SpriteSetting.Default),
      npcSetting: new FormControl(SpriteSetting.Default),
      enemiesSetting: new FormControl(SpriteSetting.Default),
      hammerSetting: new FormControl(SpriteSetting.Default),
      coinColor: new FormControl(CoinColor.Default),
      randomText: new FormControl(false),
      romanNumerals: new FormControl(false),
      randomPitch: new FormControl(false),
    })
  }
}
