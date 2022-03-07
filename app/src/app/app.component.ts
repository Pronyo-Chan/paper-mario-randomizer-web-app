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

  public constructor(private _localStorage: LocalStorageService) {

  }

  public ngOnInit(): void {
    this.$latestSeedId = this._localStorage.watch('latestSeedId');
  }
}
