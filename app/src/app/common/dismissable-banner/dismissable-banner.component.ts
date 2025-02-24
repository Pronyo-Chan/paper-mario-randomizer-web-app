import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dismissable-banner',
  templateUrl: './dismissable-banner.component.html',
  styleUrls: ['./dismissable-banner.component.scss']
})
export class DismissableBannerComponent {
  @Input() public bannerText: string;

  public isVisible: boolean = true;

  public dismiss(): void {
    this.isVisible = false;
  }
}
