import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlandoItemsComponent } from './plando-items.component';

describe('PlandoItemsComponent', () => {
  let component: PlandoItemsComponent;
  let fixture: ComponentFixture<PlandoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlandoItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlandoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
