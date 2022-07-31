import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { OpenWorldSettingsComponent } from './open-world-settings.component';

describe('OpenWorldSettingsComponent', () => {
  let component: OpenWorldSettingsComponent;
  let fixture: ComponentFixture<OpenWorldSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenWorldSettingsComponent ],
      imports: [ MatSlideToggleModule, MatCardModule, ReactiveFormsModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenWorldSettingsComponent);
    component = fixture.componentInstance;
    component.openLocationsFormGroup = new FormGroup({
      magicalSeedsRequired: new FormControl(4),
      blueHouseOpen : new FormControl(false),
      toyboxOpen: new FormControl(false),
      whaleOpen: new FormControl(false)
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
