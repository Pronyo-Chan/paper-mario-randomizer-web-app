import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoilerSettingsComponent } from './spoiler-settings.component';

describe('SpoilerSettingsComponent', () => {
  let component: SpoilerSettingsComponent;
  let fixture: ComponentFixture<SpoilerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpoilerSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoilerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
