import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QolSettingsComponent } from './qol-settings.component';

describe('QolSettingsComponent', () => {
  let component: QolSettingsComponent;
  let fixture: ComponentFixture<QolSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QolSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QolSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
