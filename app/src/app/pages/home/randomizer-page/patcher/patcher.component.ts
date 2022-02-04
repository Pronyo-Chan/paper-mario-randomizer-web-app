
import { Constants } from './../../../../utilities/constants';
import { RandomizerRepository } from '../../../../repositories/randomizer-repository/randomizer.repository';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import {tap, take, catchError} from 'rxjs/operators';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { getMarcFileFromSource } from 'src/app/utilities/RomPatcher/MarcFile';
import { crc32 } from 'src/app/utilities/RomPatcher/crc32';

  
@Component({
  selector: 'app-patcher',
  templateUrl: './patcher.component.html',
  styleUrls: ['./patcher.component.scss']
})
export class PatcherComponent implements OnInit, OnDestroy {

  @Input() public seedId: string;
  @Input() public hasSpoilerLog: boolean;

  public userRom: any = null;
  public patchFile: any = null;
  public patchedRomBlob: Blob = null;

  public isRomValid = false;
  public isUserRomLoading = false;
  public isPatching = false;
  public isDownloadingSpoilerLog = false;

  public patchingError: string;
  public spoilerLogError: string;

  private _createSeedSubscription: Subscription;
  private _spoilerLogSubscription: Subscription;

  public constructor(private _randomizerService: RandomizerService, private _randomizerRepo: RandomizerRepository) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    if(this._createSeedSubscription) {
      this._createSeedSubscription.unsubscribe();
    }

    if(this._spoilerLogSubscription) {
      this._spoilerLogSubscription.unsubscribe();
    }
  }

  public patch() {
    this.patchingError = null
    this.isPatching = true;

    this._createSeedSubscription = this._randomizerService.downloadPatchedRom(this.userRom, this.seedId)
    .pipe(
      take(1),
      tap(romResult => {
        this.isPatching = false;
        this.serveDownload(romResult, 'Paper_Mario_' + this.seedId + '.z64');     
      }),
      catchError( err => {
        this.isPatching = false;
        this.patchingError = 'A server error has occured';
        return of(err);
      })
    ).subscribe();
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

  public handleFileInput(files: FileList) {
    if(!files[0]) {
      return;
    }
    this.userRom = null;
    this.isRomValid = false;    
    this.isUserRomLoading = true;
    getMarcFileFromSource(files[0]).pipe(
      tap(marcFile => {
        this.userRom = marcFile
        var checksum = crc32(this.userRom, 0, false).toString();
        if (checksum == Constants.VALID_ROM_CRC) {
          this.isRomValid = true;
        }
        this.isUserRomLoading = false;
      }),
      catchError(err => {
        this.isRomValid = false;
        this.isUserRomLoading = false;
        return of(err)
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
