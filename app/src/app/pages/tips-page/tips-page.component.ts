import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tips-page',
  templateUrl: './tips-page.component.html',
  styleUrls: ['./tips-page.component.scss']
})
export class TipsPageComponent implements OnInit, OnDestroy {
  
  public homepageLink: string;

  public constructor(private _renderer: Renderer2) { }

  public ngOnInit(): void {
    this.homepageLink = environment.homepage;
    this._renderer.addClass(document.body, 'turquoise-bg');
  }

  public ngOnDestroy(): void {
    this._renderer.removeClass(document.body, 'turquoise-bg')
  }

}
