import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDetailsPageComponent } from './setting-details-page.component';

describe('SettingDetailsPageComponent', () => {
  let component: SettingDetailsPageComponent;
  let fixture: ComponentFixture<SettingDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
