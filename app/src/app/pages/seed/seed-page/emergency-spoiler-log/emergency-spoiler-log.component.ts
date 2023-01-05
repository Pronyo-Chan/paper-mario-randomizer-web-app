import { SettingsSpoilerLog } from '../../../../entities/settingsSpoilerLog';
import { SphereSpoilerLog } from '../../../../entities/sphereSpoilerLog';
import { SpoilerLog } from 'src/app/entities/spoilerLog';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { catchError, of, Subscription, take, tap } from 'rxjs';
import { RandomizerService } from 'src/app/services/randomizer.service';

@Component({
  selector: 'app-emergency-spoiler-log',
  templateUrl: './emergency-spoiler-log.component.html',
  styleUrls: ['./emergency-spoiler-log.component.scss']
})
export class EmergencySpoilerLogComponent implements OnDestroy {

  @Input() public seedId: string

  public spoilerLogError: string;
  public isDownloadingSpoilerLog = false;
  private _spoilerLogSubscription: Subscription;

  public constructor(private _randomizerService: RandomizerService) { }

  public ngOnDestroy(): void {
    if(this._spoilerLogSubscription) {
      this._spoilerLogSubscription.unsubscribe();
    }
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
