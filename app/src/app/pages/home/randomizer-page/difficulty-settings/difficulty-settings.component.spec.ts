import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DifficultySetting } from 'src/app/entities/enum/difficultySetting';

import { DifficultySettingsComponent } from './difficulty-settings.component';

describe('DifficultySettingsComponent', () => {
  let component: DifficultySettingsComponent;
  let fixture: ComponentFixture<DifficultySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultySettingsComponent ],
      imports: [ MatSlideToggleModule, ReactiveFormsModule, FormsModule, MatCardModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultySettingsComponent);
    component = fixture.componentInstance;
    component.difficultyFormGroup = new FormGroup({
      difficultyMode: new FormControl(DifficultySetting.Vanilla),
      capEnemyXP: new FormControl(false),
      xpMultiplier: new FormControl(1),
      damageMultiplier: new FormControl(1),
      oneHitKO: new FormControl(false),
      noSaveBlocks: new FormControl(false),
      noHeartBlocks: new FormControl(false),
      noHealingItems: new FormControl(false),
      dropStarPoints: new FormControl(false),
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
