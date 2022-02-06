import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent implements OnInit {
  
  public homepageLink: string;

  public constructor() { }

  public ngOnInit(): void {
    this.homepageLink = environment.homepage;
  }

}
