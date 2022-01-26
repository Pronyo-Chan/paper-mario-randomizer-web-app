import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  @Input() public partnersFormGroup: FormGroup;

  public constructor() { }

  public ngOnInit(): void {
    this.partnersFormGroup.get('startWithRandomPartners').valueChanges.pipe(
      tap(value => {
        if (value == true) {
          this.partnersFormGroup.get('randomPartnersMin').enable();
          this.partnersFormGroup.get('randomPartnersMax').enable();
          this.partnersFormGroup.get('startWithPartners').disable();

        } else {
          this.partnersFormGroup.get('randomPartnersMin').disable();
          this.partnersFormGroup.get('randomPartnersMax').disable();
          this.partnersFormGroup.get('startWithPartners').enable();
        }
        this.partnersFormGroup.updateValueAndValidity();
      })
    ).subscribe();
  }

}
