import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipSpanComponent } from './tooltip-span.component';

describe('TooltipSpanComponent', () => {
  let component: TooltipSpanComponent;
  let fixture: ComponentFixture<TooltipSpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooltipSpanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
