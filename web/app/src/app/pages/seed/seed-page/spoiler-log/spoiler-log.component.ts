import { SpoilerLog } from 'src/app/entities/spoilerLog';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spoiler-log',
  templateUrl: './spoiler-log.component.html',
  styleUrls: ['./spoiler-log.component.scss']
})
export class SpoilerLogComponent implements OnInit {

  @Input() public spoilerLog: SpoilerLog;

  public areas: string[]
  constructor() { }

  ngOnInit(): void {
    this.areas = Object.keys(this.spoilerLog)
  }

}
