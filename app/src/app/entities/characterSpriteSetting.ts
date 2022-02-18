import { SpriteSetting } from './enum/spriteSetting';
import { GoombarioSprite } from './enum/goombarioSprite';
import { MarioSprite } from './enum/marioSprite';
import { KooperSprite } from './enum/kooperSprite';
import { BowSprite } from './enum/bowSprite';

export interface CharacterSpriteSetting {
    setting: SpriteSetting;
    paletteSelection: MarioSprite | GoombarioSprite | KooperSprite | BowSprite;
    optionDisplay: string;
}