import { FormGroup } from '@angular/forms';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-difficulty-settings',
  templateUrl: './difficulty-settings.component.html',
  styleUrls: ['./difficulty-settings.component.scss']
})
export class DifficultySettingsComponent {

  @Input() public difficultyFormGroup: FormGroup;

  public constructor() { }

}
