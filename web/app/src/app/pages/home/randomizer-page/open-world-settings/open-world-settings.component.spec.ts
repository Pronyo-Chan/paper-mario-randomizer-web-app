import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenWorldSettingsComponent } from './open-world-settings.component';

describe('OpenWorldSettingsComponent', () => {
  let component: OpenWorldSettingsComponent;
  let fixture: ComponentFixture<OpenWorldSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenWorldSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenWorldSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
