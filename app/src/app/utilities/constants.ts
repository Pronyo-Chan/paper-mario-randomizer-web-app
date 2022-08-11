import { BombetteSprite } from './../entities/enum/bombetteSprite';
import { ParakarrySprite } from './../entities/enum/parakarrySprite';
import { SushieSprite } from './../entities/enum/sushieSprite';
import { WattSprite } from './../entities/enum/wattSprite';
import { CharacterSpriteSetting } from "../entities/characterSpriteSetting";
import { BowSprite } from "../entities/enum/bowSprite";
import { GoombarioSprite } from "../entities/enum/goombarioSprite";
import { KooperSprite } from "../entities/enum/kooperSprite";
import { MarioSprite } from "../entities/enum/marioSprite";
import { SpriteSetting } from "../entities/enum/spriteSetting";
import { MenuColor } from "../entities/menuColors";

export class Constants {

    public static VALID_ROM_CRC: string = "2817903998"; //decimal value
    public static MENU_COLORS: MenuColor[] = [
        {colorA: 0xEBE677FF, colorB: 0x8E5A25FF, colorName: 'Default'}, // 0 = Default
        {colorA: 0x8D8FFFFF, colorB: 0x2B4566FF, colorName: 'Blue'}, // 1 = Blue
        {colorA: 0xAAD080FF, colorB: 0x477B53FF, colorName: 'Green'}, // 2 = Green
        {colorA: 0x8ED4ECFF, colorB: 0x436245FF, colorName: 'Teal'}, // 3 = Teal
        {colorA: 0xD7BF74FF, colorB: 0x844632FF, colorName: 'Brown'}, // 4 = Brown
        {colorA: 0xB797B7FF, colorB: 0x62379AFF, colorName: 'Purple'}, // 5 = Purple
        {colorA: 0xC0C0C0FF, colorB: 0x404040FF, colorName: 'Grey'}, // 6 = Grey
    ]

    public static MARIO_OPTIONS : CharacterSpriteSetting[] = [
        {setting: SpriteSetting.DefaultPalette, paletteSelection: MarioSprite.Default, optionDisplay: 'Default'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: MarioSprite.Luigi, optionDisplay: 'Luigi'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: MarioSprite.Wario, optionDisplay: 'Wario'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: MarioSprite.Waluigi, optionDisplay: 'Waluigi'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: MarioSprite.Fire, optionDisplay: 'Fire'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: MarioSprite.Maker, optionDisplay: 'Maker'},
        {setting: SpriteSetting.RandomPick, paletteSelection: MarioSprite.Default, optionDisplay: 'Random Pick'},
        {setting: SpriteSetting.RandomOnEveryLoad, paletteSelection: MarioSprite.Default, optionDisplay: 'Random On Every Load'}
      ];
      
      public static GOOMBARIO_OPTIONS : CharacterSpriteSetting[] = [
        {setting: SpriteSetting.DefaultPalette, paletteSelection: GoombarioSprite.Default, optionDisplay: 'Default'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: GoombarioSprite.Green, optionDisplay: 'Green'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: GoombarioSprite.Red, optionDisplay: 'Red'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: GoombarioSprite.Yellow, optionDisplay: 'Yellow'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: GoombarioSprite.Blue, optionDisplay: 'Blue'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: GoombarioSprite.Grey, optionDisplay: 'Grey'},
        {setting: SpriteSetting.RandomPick, paletteSelection: GoombarioSprite.Default, optionDisplay: 'Random Pick'},
        {setting: SpriteSetting.RandomOnEveryLoad, paletteSelection: GoombarioSprite.Default, optionDisplay: 'Random On Every Load'}
      ];
    
      public static KOOPER_OPTIONS : CharacterSpriteSetting[] = [
        {setting: SpriteSetting.DefaultPalette, paletteSelection: KooperSprite.Default, optionDisplay: 'Default'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: KooperSprite.Green, optionDisplay: 'Green'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: KooperSprite.Red, optionDisplay: 'Red'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: KooperSprite.Purple, optionDisplay: 'Purple'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: KooperSprite.Grey, optionDisplay: 'Grey'},
        {setting: SpriteSetting.RandomPick, paletteSelection: KooperSprite.Default, optionDisplay: 'Random Pick'},
        {setting: SpriteSetting.RandomOnEveryLoad, paletteSelection: KooperSprite.Default, optionDisplay: 'Random On Every Load'}
      ];

      public static BOMBETTE_OPTIONS : CharacterSpriteSetting[] = [
        {setting: SpriteSetting.DefaultPalette, paletteSelection: BombetteSprite.Default, optionDisplay: 'Default'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: BombetteSprite.Orange, optionDisplay: 'Orange'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: BombetteSprite.Purple, optionDisplay: 'Purple'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: BombetteSprite.Green, optionDisplay: 'Green'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: BombetteSprite.Yellow, optionDisplay: 'Yellow'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: BombetteSprite.Blue, optionDisplay: 'Blue'},
        {setting: SpriteSetting.RandomPick, paletteSelection: BombetteSprite.Default, optionDisplay: 'Random Pick'},
        {setting: SpriteSetting.RandomOnEveryLoad, paletteSelection: BombetteSprite.Default, optionDisplay: 'Random On Every Load'}
      ];

      public static PARAKARRY_OPTIONS : CharacterSpriteSetting[] = [
        {setting: SpriteSetting.DefaultPalette, paletteSelection: ParakarrySprite.Default, optionDisplay: 'Default'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: ParakarrySprite.Green, optionDisplay: 'Green'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: ParakarrySprite.Red, optionDisplay: 'Red'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: ParakarrySprite.Purple, optionDisplay: 'Purple'},
        {setting: SpriteSetting.RandomPick, paletteSelection: ParakarrySprite.Default, optionDisplay: 'Random Pick'},
        {setting: SpriteSetting.RandomOnEveryLoad, paletteSelection: ParakarrySprite.Default, optionDisplay: 'Random On Every Load'}
      ];
    
      public static BOW_OPTIONS : CharacterSpriteSetting[] = [
        {setting: SpriteSetting.DefaultPalette, paletteSelection: BowSprite.Default, optionDisplay: 'Default'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: BowSprite.Red, optionDisplay: 'Red'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: BowSprite.Pink, optionDisplay: 'Pink'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: BowSprite.Blue, optionDisplay: 'Blue'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: BowSprite.Grey, optionDisplay: 'Grey'},
        {setting: SpriteSetting.RandomPick, paletteSelection: BowSprite.Default, optionDisplay: 'Random Pick'},
        {setting: SpriteSetting.RandomOnEveryLoad, paletteSelection: BowSprite.Default, optionDisplay: 'Random On Every Load'}
      ];

      public static WATT_OPTIONS : CharacterSpriteSetting[] = [
        {setting: SpriteSetting.DefaultPalette, paletteSelection: WattSprite.Default, optionDisplay: 'Default'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: WattSprite.Blue, optionDisplay: 'Blue'},
        {setting: SpriteSetting.RandomPick, paletteSelection: WattSprite.Default, optionDisplay: 'Random Pick'},
        {setting: SpriteSetting.RandomOnEveryLoad, paletteSelection: WattSprite.Default, optionDisplay: 'Random On Every Load'}
      ];

      public static SUSHIE_OPTIONS : CharacterSpriteSetting[] = [
        {setting: SpriteSetting.DefaultPalette, paletteSelection: SushieSprite.Default, optionDisplay: 'Default'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: SushieSprite.Red, optionDisplay: 'Red'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: SushieSprite.Yellow, optionDisplay: 'Yellow'},
        {setting: SpriteSetting.SelectPalette, paletteSelection: SushieSprite.Green, optionDisplay: 'Green'},
        {setting: SpriteSetting.RandomPick, paletteSelection: SushieSprite.Default, optionDisplay: 'Random Pick'},
        {setting: SpriteSetting.RandomOnEveryLoad, paletteSelection: SushieSprite.Default, optionDisplay: 'Random On Every Load'}
      ];

}