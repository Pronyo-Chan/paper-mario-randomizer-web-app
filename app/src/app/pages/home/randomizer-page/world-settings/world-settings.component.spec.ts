import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { WorldSettingsComponent } from './world-settings.component';

describe('WorldSettingsComponent', () => {
  let component: WorldSettingsComponent;
  let fixture: ComponentFixture<WorldSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldSettingsComponent ],
      imports: [ MatSlideToggleModule, MatCardModule, ReactiveFormsModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldSettingsComponent);
    component = fixture.componentInstance;
    component.worldFormGroup = new FormGroup({
      magicalSeedsRequired: new FormControl(4),
      blueHouseOpen : new FormControl(false),
      toyboxOpen: new FormControl(false),
      whaleOpen: new FormControl(false),
      ch7BridgeVisible: new FormControl(false),
      mtRuggedOpen: new FormControl(false),
      prologueOpen: new FormControl(false),
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
