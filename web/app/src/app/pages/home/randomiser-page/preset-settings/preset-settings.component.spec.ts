import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetSettingsComponent } from './preset-settings.component';

describe('PresetSettingsComponent', () => {
  let component: PresetSettingsComponent;
  let fixture: ComponentFixture<PresetSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresetSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
