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

  public constructor(private _localStorage: LocalStorageService, private _dialog: MatDialog,) {

  }

  public ngOnInit(): void {
    this.$latestSeedId = this._localStorage.watch('latestSeedId');
    // const userSawWarning = this._localStorage.get('viewed 0.8.3 warning')

    if(true) {
      return;
    }

    const dialogRef = this._dialog.open(InfoDialogComponent, {
      width: '50rem',
      
    });

    dialogRef.afterClosed().subscribe(newPresetName => {
      this._localStorage.set('viewed 0.8.3 warning', true)

    });
  }
}
