import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlandoPageComponent } from './plando-page.component';

describe('PlandoPageComponent', () => {
  let component: PlandoPageComponent;
  let fixture: ComponentFixture<PlandoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlandoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlandoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
