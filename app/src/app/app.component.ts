import { InfoDialogComponent } from './pages/home/randomizer-page/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LocalStorageService } from './services/localStorage/localStorage.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {


  public $latestSeedId: Observable<string>;

  private readonly lastChangelogEntry = "viewed-0.28.0-changelog";
  private readonly cutoffDate = new Date(2024, 11, 1)

  public constructor(private _localStorage: LocalStorageService, private _dialog: MatDialog,) {

  }

  public ngOnInit(): void {
    this.$latestSeedId = this._localStorage.watch('latestSeedId');
    const userSawChangelog = this._localStorage.get(this.lastChangelogEntry)
    const dateNow = new Date();

    if(userSawChangelog || dateNow > this.cutoffDate) {
      return;
    }

    const dialogRef = this._dialog.open(InfoDialogComponent, {
      width: '35rem',
      autoFocus: null
    });

    dialogRef.afterClosed().subscribe(() => {
      this._localStorage.set(this.lastChangelogEntry, true)
    });
  }
}
