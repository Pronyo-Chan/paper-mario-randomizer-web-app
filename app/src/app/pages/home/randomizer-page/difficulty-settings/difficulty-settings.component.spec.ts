import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultySettingsComponent } from './difficulty-settings.component';

describe('DifficultySettingsComponent', () => {
  let component: DifficultySettingsComponent;
  let fixture: ComponentFixture<DifficultySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultySettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
