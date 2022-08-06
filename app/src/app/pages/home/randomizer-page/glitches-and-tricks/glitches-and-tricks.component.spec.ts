import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlitchesAndTricksComponent } from './glitches-and-tricks.component';

describe('GlitchesAndTricksComponent', () => {
  let component: GlitchesAndTricksComponent;
  let fixture: ComponentFixture<GlitchesAndTricksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlitchesAndTricksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlitchesAndTricksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
