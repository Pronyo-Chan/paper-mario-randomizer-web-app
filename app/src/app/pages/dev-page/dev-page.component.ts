import { environment } from './../../../environments/environment.uat';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../services/localStorage/localStorage.service';
import { RandomizerRepository } from './../../repositories/randomizer-repository/randomizer.repository';
import { Component, OnInit } from '@angular/core';
import { catchError, of, Subscription, take, tap } from 'rxjs';
import * as jsYaml from 'js-yaml' ;

@Component({
  selector: 'app-dev-page',
  templateUrl: './dev-page.component.html',
  styleUrls: ['./dev-page.component.scss']
})
export class DevPageComponent implements OnInit {

  public userYaml: any = null;

  public isYamlLoading = false;
  public isGenerating = false;
  public isDownloadingSpoilerLog = false;
  public invalidYaml: boolean = false;
  public yamlFileName: string = null;

  public serverError: string;

  private _createSeedSubscription: Subscription;

  public constructor(private _randomizerRepository: RandomizerRepository, private _localStorage: LocalStorageService, private _router: Router) {}

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    if(this._createSeedSubscription) {
      this._createSeedSubscription.unsubscribe();
    }
  }

  public generate() {
    this.serverError = null
    this.isGenerating = true;

    this._createSeedSubscription = this._randomizerRepository.sendRandoSettings(this.userYaml)
    .pipe(
      take(1),
      tap(seedId => {
        this._localStorage.set("latestSeedId", seedId)
        this._router.navigate(['/seed'], {queryParams: {id: seedId}})
      }),
      catchError(err => {
        this.serverError = 'A server error has occured';
        this.isGenerating = false;
        return of(err)
      })
    ).subscribe();
  }

  public handleFileInput(files: FileList) {
    this.yamlFileName = null;
    if(!files[0]) {
      return;
    }
    this.invalidYaml =  false;
    this.serverError = null;

    this.yamlFileName = files[0].name;
    files[0].text().then( result => {
      try {
        this.userYaml = jsYaml.load(result);

        this.userYaml.StarRodModVersion = environment.currentModVersion
        this.removeNonRequestFields();
      } catch (error) {
        this.invalidYaml = true;
      }
    }) 
  }

  public removeNonRequestFields() {

    // Always off settings, determined by server
    this.userYaml.SettingsName = undefined;
    this.userYaml.SettingsVersion = undefined;
    this.userYaml.BlocksMatchContent = undefined;
    this.userYaml.PrettySpoilerlog = undefined;
    this.userYaml.PlacementAlgorithm = undefined;
    this.userYaml.PlacementLogic = undefined;
    
    this.userYaml.StartingLevel = undefined;

    // WIP settings
    this.userYaml.PeachCastleReturnPipe = undefined;
    this.userYaml.ChallengeMode = undefined;
    this.userYaml.KeyitemsOutsideChapter = undefined;

    // Entrance settings
    this.userYaml.ShuffleEntrances = undefined;
    this.userYaml.ShuffleEntrancesByArea = undefined;
    this.userYaml.ShuffleEntrancesByAll = undefined;
    this.userYaml.MatchEntranceTypes = undefined;
    this.userYaml.RandomizeOnewayEntrances = undefined;
    this.userYaml.UnpairedEntrances = undefined;
  }
}
