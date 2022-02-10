import { environment } from 'src/environments/environment';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  public homepageLink: string;
  public latestSeedId: string;

  public ngOnInit(): void {
    this.homepageLink = environment.homepage;
    this.latestSeedId = JSON.parse(localStorage.getItem("latestSeedId"))
  }
}
