import { Boots } from './../enum/boots';
import { Hammer } from './../enum/hammer';
import { StartWithRandomItemsMode } from '../enum/startWithRandomItemsMode';

export interface StatsAndGear {
    BP: number;
    Boots: Boots;
    Coins: number;
    FP: number;
    HP: number;
    Hammer: Hammer;
    MaxNumberOfStartingItems: number;
    MinNumberOfStartingItems: number;
    RandomStartingStatsLevel: number;
    StarPower: number;
    StartingItems: string[]
    StartWithRandomItems: StartWithRandomItemsMode;
}
