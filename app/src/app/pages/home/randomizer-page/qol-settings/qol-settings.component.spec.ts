import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QolSettingsComponent } from './qol-settings.component';

describe('QolSettingsComponent', () => {
  let component: QolSettingsComponent;
  let fixture: ComponentFixture<QolSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QolSettingsComponent ],
      imports: [ReactiveFormsModule, MatCardModule, MatSlideToggleModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QolSettingsComponent);
    component = fixture.componentInstance;
    component.qualityOfLifeFormGroup = new FormGroup({   
      hiddenBlockMode: new FormControl(0),           
      alwaysSpeedySpin: new FormControl(false),      
      alwaysISpy: new FormControl(false),      
      alwaysPeekaboo: new FormControl(false),        
      skipQuiz: new FormControl(false),      
      preventPhysicsGlitches: new FormControl(false), 
      bowsersCastleMode: new FormControl(false), 
      shortenCutscenes: new FormControl(false), 
      skipEpilogue: new FormControl(false), 
      writeSpoilerLog: new FormControl(true),
      quizmoAlwaysAppears: new FormControl(false),
      romanNumerals: new FormControl(false),        
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
