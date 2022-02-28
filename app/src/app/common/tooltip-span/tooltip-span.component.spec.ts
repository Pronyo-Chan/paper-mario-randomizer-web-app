import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipSpanComponent } from './tooltip-span.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TooltipSpanComponent', () => {
  let component: TooltipSpanComponent;
  let fixture: ComponentFixture<TooltipSpanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooltipSpanComponent ],
      imports: [ MatTooltipModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
