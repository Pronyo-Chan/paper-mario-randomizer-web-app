import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { PartnersComponent } from './partners.component';

describe('PartnersComponent', () => {
  let component: PartnersComponent;
  let fixture: ComponentFixture<PartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnersComponent ],
      imports: [ MatSlideToggleModule, MatCardModule, ReactiveFormsModule, MatCheckboxModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersComponent);
    component = fixture.componentInstance;
    component.partnersFormGroup = new FormGroup({
      shufflePartners: new FormControl(false),
      partnersAlwaysUsable: new FormControl(false),
      startWithRandomPartners: new FormControl(false),
      randomPartnersMin: new FormControl(1),
      randomPartnersMax: new FormControl(8),
      startWithPartners: new FormGroup({
        goombario: new FormControl(false),
        kooper: new FormControl(false),
        bombette: new FormControl(false),
        parakarry: new FormControl(false),
        bow: new FormControl(false),
        watt: new FormControl(false),
        sushie: new FormControl(false),
        lakilester: new FormControl(false)
      })
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
