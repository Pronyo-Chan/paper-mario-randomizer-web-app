import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPalettesComponent } from './color-palettes.component';

describe('ColorPalettesComponent', () => {
  let component: ColorPalettesComponent;
  let fixture: ComponentFixture<ColorPalettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPalettesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPalettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
