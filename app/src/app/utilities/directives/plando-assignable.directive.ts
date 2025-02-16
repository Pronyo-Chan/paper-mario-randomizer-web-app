import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgControl } from "@angular/forms";
import { MatTooltip } from "@angular/material/tooltip";
import { Subscription, tap } from "rxjs";
import { PlandoAssignmentService } from "src/app/services/plando-assignment.service";

@Directive({
  standalone: true,
  selector: '[standaloneMatTooltip]',
  exportAs: 'standaloneMatTooltip'
})
export class StandaloneMatTooltip extends MatTooltip { }

@Directive({
  selector: '[plandoAssignable]',
  hostDirectives: [StandaloneMatTooltip]
})
export class PlandoAssignableDirective implements OnInit, OnDestroy {
  @Input() formControlName: string;

  private _assignedControlsSubscription: Subscription;

  constructor(private formControl: NgControl, private standaloneToolTip: StandaloneMatTooltip, private plandoAssignmentService: PlandoAssignmentService) { }

  public ngOnInit(): void {
    this.standaloneToolTip.position = 'right';
    this.standaloneToolTip.showDelay = 50;
    this.standaloneToolTip.hideDelay = 100;
    this._assignedControlsSubscription = this.plandoAssignmentService.assignedControls.asObservable().subscribe(assignedControls => {
      if (assignedControls.has(this.formControlName)) {
        this.standaloneToolTip.message = 'This setting is assigned by the currently-selected Plandomizer.';
        this.formControl.control.disable();
      } else {
        this.standaloneToolTip.message = '';
        this.formControl.control.enable();
      }
    }
    );
  }

  public ngOnDestroy(): void {
    if (this._assignedControlsSubscription) {
      this._assignedControlsSubscription.unsubscribe();
    }
  }

}
