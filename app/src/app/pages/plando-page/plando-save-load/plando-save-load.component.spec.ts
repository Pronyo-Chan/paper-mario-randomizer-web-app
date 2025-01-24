import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlandoSaveLoadComponent } from './plando-save-load.component';

describe('PlandoSaveLoadComponent', () => {
  let component: PlandoSaveLoadComponent;
  let fixture: ComponentFixture<PlandoSaveLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlandoSaveLoadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlandoSaveLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
