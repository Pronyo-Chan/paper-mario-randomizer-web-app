import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  @Input() public isLoading: boolean;
  @Input() public loadingText: string;

  public constructor() { }
  
}
