import { Component, OnInit, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-setting-details-page',
  templateUrl: './setting-details-page.component.html',
  styleUrls: ['./setting-details-page.component.scss']
})
export class SettingDetailsPageComponent implements OnInit {

  public constructor(private _renderer: Renderer2) { }

  public ngOnInit(): void {
    this._renderer.addClass(document.body, 'blue-bg');
  }

  public ngOnDestroy(): void {
    this._renderer.removeClass(document.body, 'blue-bg')
  }
}
