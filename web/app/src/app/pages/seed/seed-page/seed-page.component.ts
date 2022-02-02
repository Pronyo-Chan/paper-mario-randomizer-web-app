import { SettingsResponse } from './../../../entities/settingsResponse';
import { Subscription, tap, switchMap, Observable } from 'rxjs';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RandomizerService } from 'src/app/services/randomizer.service';

@Component({
  selector: 'app-seed-page',
  templateUrl: './seed-page.component.html',
  styleUrls: ['./seed-page.component.scss']
})
export class SeedPageComponent implements OnInit, OnDestroy {
  
  public seedId: string;
  public seedInfo$: Observable<SettingsResponse>;

  constructor(private _renderer: Renderer2, private _route: ActivatedRoute, private _randomizerService: RandomizerService) { }
  

  ngOnInit(): void {
    this._renderer.addClass(document.body, 'purple-bg')

    this.seedInfo$ = this._route.queryParams.pipe(
      switchMap(params => {
        this.seedId = params.id;
        return this._randomizerService.getSeedInfo(this.seedId)
      })
    )
  }

  ngOnDestroy(): void {
    this._renderer.removeClass(document.body, 'purple-bg')
  }

}
