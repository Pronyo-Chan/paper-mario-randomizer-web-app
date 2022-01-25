import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip-span',
  templateUrl: './tooltip-span.component.html',
  styleUrls: ['./tooltip-span.component.scss']
})
export class TooltipSpanComponent implements OnInit {

  @Input() spanText: string;
  @Input() tooltipText: string;

  public constructor() { }

  public ngOnInit(): void {
  }

}
