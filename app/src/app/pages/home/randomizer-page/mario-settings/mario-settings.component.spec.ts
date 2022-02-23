import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarioSettingsComponent } from './mario-settings.component';

describe('MarioSettingsComponent', () => {
  let component: MarioSettingsComponent;
  let fixture: ComponentFixture<MarioSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarioSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarioSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
