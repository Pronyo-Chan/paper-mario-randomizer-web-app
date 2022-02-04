import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  @Input() public isLoading: boolean;
  @Input() public loadingText: string;

  public dynamicDots: string = "..."
  private _dynamicDotSubscription: any;

  public constructor() { }
  

  public ngOnInit(): void {
    this._dynamicDotSubscription = interval(1000)
    .pipe(takeWhile(() => this.isLoading))
    .subscribe(() => {
      if(this.dynamicDots.length >= 3) {
        this.dynamicDots = "";
      } else {
        this.dynamicDots += "."
      }
    });
  }

  public ngOnDestroy(): void {
    if(this._dynamicDotSubscription) {
      this._dynamicDotSubscription.unsubscribe()
    }
  }
}
