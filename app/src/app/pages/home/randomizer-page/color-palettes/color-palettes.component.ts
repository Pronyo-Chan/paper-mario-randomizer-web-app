import { MarioSprite } from './../../../../entities/enum/marioSprite';
import { GoombarioSprite } from './../../../../entities/enum/goombarioSprite';
import { KooperSprite } from './../../../../entities/enum/kooperSprite';
import { CharacterSpriteSetting } from './../../../../entities/characterSpriteSetting';
import { BowSprite } from './../../../../entities/enum/bowSprite';
import { SpriteSetting } from './../../../../entities/enum/spriteSetting';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-color-palettes',
  templateUrl: './color-palettes.component.html',
  styleUrls: ['./color-palettes.component.scss']
})
export class ColorPalettesComponent implements OnInit {

  @Input() public colorPalettesFormGroup: FormGroup;

  public marioOptions : CharacterSpriteSetting[] = [
    {setting: SpriteSetting.DefaultPalette, paletteSelection: MarioSprite.Default, optionDisplay: 'Default'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: MarioSprite.Luigi, optionDisplay: 'Luigi'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: MarioSprite.Wario, optionDisplay: 'Wario'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: MarioSprite.Waluigi, optionDisplay: 'Waluigi'},
    {setting: SpriteSetting.RandomPick, paletteSelection: MarioSprite.Default, optionDisplay: 'Random Pick'},
    {setting: SpriteSetting.AlwaysRandom, paletteSelection: MarioSprite.Default, optionDisplay: 'Random on every load'}
  ];
  
  public goombarioOptions : CharacterSpriteSetting[] = [
    {setting: SpriteSetting.DefaultPalette, paletteSelection: GoombarioSprite.Default, optionDisplay: 'Default'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: GoombarioSprite.Green, optionDisplay: 'Green'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: GoombarioSprite.Red, optionDisplay: 'Red'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: GoombarioSprite.Yellow, optionDisplay: 'Yellow'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: GoombarioSprite.Blue, optionDisplay: 'Blue'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: GoombarioSprite.Grey, optionDisplay: 'Grey'},
    {setting: SpriteSetting.RandomPick, paletteSelection: GoombarioSprite.Default, optionDisplay: 'Random Pick'},
    {setting: SpriteSetting.AlwaysRandom, paletteSelection: GoombarioSprite.Default, optionDisplay: 'Random on every load'}
  ];

  public kooperOptions : CharacterSpriteSetting[] = [
    {setting: SpriteSetting.DefaultPalette, paletteSelection: KooperSprite.Default, optionDisplay: 'Default'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: KooperSprite.Green, optionDisplay: 'Green'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: KooperSprite.Red, optionDisplay: 'Red'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: KooperSprite.Purple, optionDisplay: 'Purple'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: KooperSprite.Grey, optionDisplay: 'Grey'},
    {setting: SpriteSetting.RandomPick, paletteSelection: KooperSprite.Default, optionDisplay: 'Random Pick'},
    {setting: SpriteSetting.AlwaysRandom, paletteSelection: KooperSprite.Default, optionDisplay: 'Random on every load'}
  ];

  public bowOptions : CharacterSpriteSetting[] = [
    {setting: SpriteSetting.DefaultPalette, paletteSelection: BowSprite.Default, optionDisplay: 'Default'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: BowSprite.Red, optionDisplay: 'Red'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: BowSprite.Pink, optionDisplay: 'Pink'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: BowSprite.Blue, optionDisplay: 'Blue'},
    {setting: SpriteSetting.SelectPalette, paletteSelection: BowSprite.Grey, optionDisplay: 'Grey'},
    {setting: SpriteSetting.RandomPick, paletteSelection: BowSprite.Default, optionDisplay: 'Random Pick'},
    {setting: SpriteSetting.AlwaysRandom, paletteSelection: BowSprite.Default, optionDisplay: 'Random on every load'}
  ];

  constructor() { }

  ngOnInit(): void {
    this.colorPalettesFormGroup.get('marioSprite').setValue(this.marioOptions[0]);
    this.colorPalettesFormGroup.get('goombarioSprite').setValue(this.goombarioOptions[0]);
    this.colorPalettesFormGroup.get('kooperSprite').setValue(this.kooperOptions[0]);
    this.colorPalettesFormGroup.get('bowSprite').setValue(this.bowOptions[0]);
  }

}
