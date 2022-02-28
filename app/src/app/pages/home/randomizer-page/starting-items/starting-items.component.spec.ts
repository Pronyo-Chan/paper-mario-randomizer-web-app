import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingItemsComponent } from './starting-items.component';

describe('StartingItemsComponent', () => {
  let component: StartingItemsComponent;
  let fixture: ComponentFixture<StartingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartingItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
