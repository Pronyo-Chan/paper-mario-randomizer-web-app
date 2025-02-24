// Taken from https://stackoverflow.com/questions/51544452/making-material-tabs-scrollable/62031767#62031767

import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

interface DOMRectI {
  bottom: number;
  height: number;
  left: number; // position start of element
  right: number; // position end of element
  top: number;
  width: number; // width of element
  x?: number;
  y?: number;
}

@Directive({
  selector: '[scrollToCenter]',
})
export class MatTabScrollToCenterDirective implements OnDestroy {
  subs = new Subscription();
  constructor(
    private element: ElementRef
  ) {
    this.subs.add(
      fromEvent(this.element.nativeElement, 'click').subscribe((clickedContainer: MouseEvent) => {
        if (clickedContainer.target instanceof HTMLElement
          && (clickedContainer.target.classList.contains('mat-tab-label-content') || clickedContainer.target.classList.contains('mat-tab-label'))) {
          const scrollContainer = this.element.nativeElement.querySelector('.mat-tab-list');
          const currentScrolledContainerPosition: number = scrollContainer.scrollLeft;
          // const newPositionScrollTo = this.calcScrollValue(clickedContainer, currentScrolledContainerPosition);
          const newPositionScrollTo = this.calcScrollToCenterValue(clickedContainer, currentScrolledContainerPosition);

          scrollContainer.scroll({
            left: newPositionScrollTo,
            behavior: 'smooth',
          });
        }
      })
    );
  }

  calcScrollToCenterValue(clickedContainer, currentScrolledContainerPosition): number {
    const scrolledButton: DOMRectI = (clickedContainer.target as HTMLElement).getBoundingClientRect();
    const leftXOffset = (window.innerWidth - scrolledButton.width) / 2;
    const currentVisibleViewportLeft = scrolledButton.left;
    const neededLeftOffset = currentVisibleViewportLeft - leftXOffset;
    const newValueToSCroll = currentScrolledContainerPosition + neededLeftOffset;
    return newValueToSCroll;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
