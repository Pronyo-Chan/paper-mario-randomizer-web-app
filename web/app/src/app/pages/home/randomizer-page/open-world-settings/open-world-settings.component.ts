import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-world-settings',
  templateUrl: './open-world-settings.component.html',
  styleUrls: ['./open-world-settings.component.scss']
})
export class OpenWorldSettingsComponent implements OnInit {

  @Input() public openLocationsFormGroup: FormGroup;
  public constructor() { }

  public ngOnInit(): void {
  }

}
