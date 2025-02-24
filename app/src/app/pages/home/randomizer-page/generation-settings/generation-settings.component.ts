import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { tap, Subscription } from 'rxjs';

@Component({
  selector: 'app-generation-settings',
  templateUrl: './generation-settings.component.html',
  styleUrls: ['./generation-settings.component.scss']
})
export class GenerationSettingsComponent{

  @Input() public formGroup: FormGroup;
  @Input() public isRandomizing: boolean;
  @Input() public seedGenError: string;
  @Input() public seedGenErrorDetails: string;

  @Output() onSubmitEmit = new EventEmitter<void>();

  public shouldShowDetails: boolean = false;

  public onSubmit() {
    this.onSubmitEmit.emit();
  }
}
