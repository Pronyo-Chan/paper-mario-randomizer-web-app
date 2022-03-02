import { CoinColor } from './../../../../entities/enum/coinColor';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpriteSetting } from 'src/app/entities/enum/spriteSetting';

import { ColorPalettesComponent } from './color-palettes.component';

describe('ColorPalettesComponent', () => {
  let component: ColorPalettesComponent;
  let fixture: ComponentFixture<ColorPalettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPalettesComponent ],
      imports: [ MatSlideToggleModule, ReactiveFormsModule, FormsModule, MatCardModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPalettesComponent);
    component = fixture.componentInstance;
    component.colorPalettesFormGroup = new FormGroup({
      menu: new FormControl(0),
      marioSprite : new FormControl(),
      goombarioSprite : new FormControl(),
      kooperSprite : new FormControl(),
      bowSprite : new FormControl(),
      bossesSetting: new FormControl(SpriteSetting.DefaultPalette),
      npcSetting: new FormControl(SpriteSetting.DefaultPalette),
      coinColor: new FormControl(CoinColor.Default)
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
