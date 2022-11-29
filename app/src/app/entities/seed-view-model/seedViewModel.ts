import { StatsAndGear } from './statsAndGear';
import { Spoiler } from './spoiler';
import { Partners } from './partners';
import { OpenWorld } from './openWorld';
import { GeneralDifficulty } from './generalDifficulty';
import { Gameplay } from './gameplay';
import { Cosmetics } from './cosmetics';
import { ItemSettings } from './items';
import { SeedInfo } from './seedInfo';

export interface SeedViewModel {
    Cosmetics: Cosmetics;
    Gameplay: Gameplay;
    GeneralDifficulty: GeneralDifficulty;
    Items: ItemSettings;
    OpenWorld: OpenWorld;
    Partners: Partners;
    SeedInfo: SeedInfo;
    Spoiler: Spoiler;
    StatsAndGear: StatsAndGear;
}
