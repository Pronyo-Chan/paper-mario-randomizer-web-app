import { Subscription } from 'rxjs';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seed-page',
  templateUrl: './seed-page.component.html',
  styleUrls: ['./seed-page.component.scss']
})
export class SeedPageComponent implements OnInit, OnDestroy {
  private _queryParamsSubscription: Subscription;
  
  public seedId: string;

  constructor(private _renderer: Renderer2, private _route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this._renderer.addClass(document.body, 'blue-bg')

    this._queryParamsSubscription = this._route.queryParams
      .subscribe(params => {
        this.seedId = params.id;
        console.log(params); // { orderby: "price" }

      }
    );
  }

  ngOnDestroy(): void {
    this._renderer.removeClass(document.body, 'blue-bg')

    if(this._queryParamsSubscription) {
      this._queryParamsSubscription.unsubscribe();
    }
  }

}
