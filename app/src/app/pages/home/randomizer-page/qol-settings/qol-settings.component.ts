import { tap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-qol-settings',
  templateUrl: './qol-settings.component.html',
  styleUrls: ['./qol-settings.component.scss']
})
export class QolSettingsComponent implements OnChanges {

  @Input() public qualityOfLifeFormGroup: FormGroup;
  @Input() public hasEnabledTricks: boolean;
  public constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes["hasEnabledTricks"].currentValue == true) {
      this.qualityOfLifeFormGroup.get("preventPhysicsGlitches").setValue(false)
      this.qualityOfLifeFormGroup.get("preventPhysicsGlitches").disable()
    } else {
      this.qualityOfLifeFormGroup.get("preventPhysicsGlitches").enable()
    }
  }

}
