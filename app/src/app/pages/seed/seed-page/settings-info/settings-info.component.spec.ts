import { MatTableModule } from '@angular/material/table';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsResponse } from 'src/app/entities/settingsResponse';

import { SettingsInfoComponent } from './settings-info.component';

describe('SettingsInfoComponent', () => {
  let component: SettingsInfoComponent;
  let fixture: ComponentFixture<SettingsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsInfoComponent ],
      imports: [MatTableModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsInfoComponent);
    component = fixture.componentInstance;
    component.seedInfo = {CreationDate: new Date()} as SettingsResponse
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
