import { ParakarrySprite } from './enum/parakarrySprite';
import { SushieSprite } from './enum/sushieSprite';
import { WattSprite } from './enum/wattSprite';
import { SpriteSetting } from './enum/spriteSetting';
import { GoombarioSprite } from './enum/goombarioSprite';
import { MarioSprite } from './enum/marioSprite';
import { KooperSprite } from './enum/kooperSprite';
import { BowSprite } from './enum/bowSprite';

export interface CharacterSpriteSetting {
    setting: SpriteSetting;
    paletteSelection: MarioSprite | GoombarioSprite | KooperSprite | BowSprite | WattSprite | SushieSprite | ParakarrySprite;
    optionDisplay: string;
}