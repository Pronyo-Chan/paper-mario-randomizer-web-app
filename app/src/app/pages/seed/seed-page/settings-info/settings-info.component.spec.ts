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
    component.seedInfo = {CreationDate: new Date(2022, 3, 15)} as SettingsResponse
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On Init', () => {
    it('should set expiration date to 30 days beyond creation date', () => {
      component.ngOnInit()
      expect(component.expirationDate).toEqual(new Date(2022, 4, 15))
    });

    it('should call initSettingRows', () => {
      spyOn(component, 'initSettingRows').and.callThrough()
      component.ngOnInit()
      expect(component.initSettingRows).toHaveBeenCalled();
    });
  });
});
