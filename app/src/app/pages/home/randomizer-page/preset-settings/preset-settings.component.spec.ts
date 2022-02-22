import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PresetSettingsComponent } from './preset-settings.component';

describe('PresetSettingsComponent', () => {
  let component: PresetSettingsComponent;
  let fixture: ComponentFixture<PresetSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresetSettingsComponent ],
      imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatTooltipModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetSettingsComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
