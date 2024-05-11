import { QualityOfLife } from './qualityOfLife';
import { StatsAndGear } from './statsAndGear';
import { Spoiler } from './spoiler';
import { Partners } from './partners';
import { World } from './world';
import { GeneralDifficulty } from './generalDifficulty';
import { Gameplay } from './gameplay';
import { Cosmetics } from './cosmetics';
import { ItemSettings } from './items';
import { SeedInfo } from './seedInfo';
import { ItemPool } from './itemPool';
import { Goals } from './goals';

export interface SeedViewModel {
    Cosmetics: Cosmetics;
    Gameplay: Gameplay;
    GeneralDifficulty: GeneralDifficulty;
    Goals: Goals;
    Glitches: string[];
    Items: ItemSettings;
    ItemPool: ItemPool;
    World: World;
    Partners: Partners;
    QualityOfLife: QualityOfLife;
    SeedInfo: SeedInfo;
    Spoiler: Spoiler;
    StatsAndGear: StatsAndGear;
}
