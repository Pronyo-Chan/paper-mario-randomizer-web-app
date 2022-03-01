import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { GameplayComponent } from './gameplay.component';

describe('GameplayComponent', () => {
  let component: GameplayComponent;
  let fixture: ComponentFixture<GameplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameplayComponent ],
      imports: [ MatSlideToggleModule, MatCardModule, ReactiveFormsModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameplayComponent);
    component = fixture.componentInstance;
    component.gameplayFormGroup = new FormGroup({
      shuffleBadgesBP: new FormControl(false),
      shuffleBadgesFP: new FormControl(false),
      shufflePartnerFP: new FormControl(false),
      shuffleStarpowerSP: new FormControl(false),
      randomFormations: new FormControl(false),
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
