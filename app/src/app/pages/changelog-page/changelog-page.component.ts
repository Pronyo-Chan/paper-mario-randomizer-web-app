import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-changelog-page',
  templateUrl: './changelog-page.component.html',
  styleUrls: ['./changelog-page.component.scss']
})
export class ChangelogPageComponent implements OnInit, OnDestroy {
  
  public homepageLink: string;

  public constructor(private _renderer: Renderer2) { }

  public ngOnInit(): void {
    this.homepageLink = environment.homepage;
    this._renderer.addClass(document.body, 'blue-bg');
  }

  public ngOnDestroy(): void {
    this._renderer.removeClass(document.body, 'blue-bg')
  }

}
