import { FormGroup } from '@angular/forms';

import { Constants } from './../../../../utilities/constants';
import { RandomizerRepository } from '../../../../repositories/randomizer-repository/randomizer.repository';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import {tap, take, catchError} from 'rxjs/operators';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { getMarcFileFromSource } from 'src/app/utilities/RomPatcher/MarcFile';
import { crc32 } from 'src/app/utilities/RomPatcher/crc32';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { environment } from 'src/environments/environment';

  
@Component({
  selector: 'app-patcher',
  templateUrl: './patcher.component.html',
  styleUrls: ['./patcher.component.scss']
})
export class PatcherComponent implements OnInit, OnDestroy {

  @Input() public seedId: string;
  @Input() public modVersion: number;
  @Input() public cosmeticsFormGroup: FormGroup;

  public userRom: any = null;
  public patchFile: any = null;
  public patchedRomBlob: Blob = null;

  public isRomValid = false;
  public isUserRomLoading = false;
  public isPatching = false;
  public doOverrideCosmetics = false;
  public useProdPatch: boolean;
  public isProduction: boolean;

  public patchingError: string;

  private _createSeedSubscription: Subscription;
  private _marcFileSubscription: Subscription;
  private _dbUpdateSubscription: Subscription;
  private _dbGetSubscription: Subscription;

  public constructor(private _randomizerService: RandomizerService, private _dbService: NgxIndexedDBService) { }

  public ngOnInit(): void {
    this._dbGetSubscription = this._dbService.getByKey('userCache', 1).subscribe((userRom: any) => {
      if(userRom) {
        Object.defineProperty(userRom.rom, 'name', {
          writable: true,
          value: '< using cached ROM >'
        });
        this.processUserRom(userRom.rom)
      }
    });

    this.isProduction = environment.production;
    this.useProdPatch = environment.production;
  }

  public ngOnDestroy(): void {
    if(this._createSeedSubscription) {
      this._createSeedSubscription.unsubscribe();
    }

    if(this._marcFileSubscription) {
      this._marcFileSubscription.unsubscribe();
    }

    if(this._dbGetSubscription) {
      this._dbGetSubscription.unsubscribe();
    }

    if(this._dbUpdateSubscription) {
      this._dbUpdateSubscription.unsubscribe();
    }
  }

  public patch() {
    this.patchingError = null
    this.isPatching = true;

    this._createSeedSubscription = this._randomizerService.downloadPatchedRom(
      this.userRom,
      this.seedId,
      this.modVersion,
      this.useProdPatch,
      this.doOverrideCosmetics ? this.cosmeticsFormGroup : null
    ).pipe(
      take(1),
      tap(romResult => {
        this.isPatching = false;
        this.serveDownload(romResult, 'Paper_Mario_' + this.seedId + '.z64');     
      }),
      catchError( err => {
        this.isPatching = false;
        if(err.status === 400) {
          this.patchingError = "Unable to override cosmetic settings for seeds generated before 2023-04-06."
        } else {
          this.patchingError = 'A server error has occured';
        }
        
        return of(err);
      })
    ).subscribe();
  }

  public handleFileInput(files: FileList) {
    if(!files[0]) {
      return;
    }
    this.userRom = null;
    this.isRomValid = false;    
    this.isUserRomLoading = true;
    this.processUserRom(files[0]);
  }

  private processUserRom(file: File) {
    this._marcFileSubscription = getMarcFileFromSource(file).pipe(
      tap(marcFile => {
        this.userRom = marcFile;
        var checksum = crc32(this.userRom, 0, false).toString();
        if (checksum == Constants.VALID_ROM_CRC) {
          this.isRomValid = true;
          this._dbUpdateSubscription = this._dbService.update('userCache', {id: 1, rom: file }).subscribe();
        }
        this.isUserRomLoading = false;
      }),
      catchError(err => {
        this.isRomValid = false;
        this.isUserRomLoading = false;
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
