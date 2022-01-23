import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-qol-settings',
  templateUrl: './qol-settings.component.html',
  styleUrls: ['./qol-settings.component.scss']
})
export class QolSettingsComponent implements OnInit {

  @Input() public qualityOfLifeFormGroup: FormGroup;
  public constructor() { }

  public ngOnInit(): void {
  }

}
