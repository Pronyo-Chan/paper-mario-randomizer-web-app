import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-plando-badges',
  templateUrl: './plando-badges.component.html',
  styleUrls: ['./plando-badges.component.scss']
})
export class PlandoBadgesComponent {
  @Input() badgeMoveCostsFormGroup: FormGroup;
}
