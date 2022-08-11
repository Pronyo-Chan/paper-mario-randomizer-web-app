import { CoinColor } from '../../../../entities/enum/coinColor';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpriteSetting } from 'src/app/entities/enum/spriteSetting';

import { CosmeticsComponent } from './cosmetics.component';

describe('CosmeticsComponent', () => {
  let component: CosmeticsComponent;
  let fixture: ComponentFixture<CosmeticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CosmeticsComponent ],
      imports: [ MatSlideToggleModule, ReactiveFormsModule, FormsModule, MatCardModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmeticsComponent);
    component = fixture.componentInstance;
    component.cosmeticsFormGroup = new FormGroup({
      menu: new FormControl(0),
      marioSprite : new FormControl(),
      goombarioSprite : new FormControl(),
      kooperSprite : new FormControl(),
      bombetteSprite : new FormControl(),
      bowSprite : new FormControl(),
      bossesSetting: new FormControl(SpriteSetting.DefaultPalette),
      npcSetting: new FormControl(SpriteSetting.DefaultPalette),
      enemiesSetting: new FormControl(SpriteSetting.DefaultPalette),
      coinColor: new FormControl(CoinColor.Default)
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
