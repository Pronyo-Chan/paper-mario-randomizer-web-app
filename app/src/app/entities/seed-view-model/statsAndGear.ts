import { Boots } from './../enum/boots';
import { Hammer } from './../enum/hammer';

export interface StatsAndGear {
    BP: number;
    Boots: Boots;
    Coins: number;
    FP: number;
    HP: number;
    Hammer: Hammer;
    MaxNumberOfStartingItems: number;
    MinNumberOfStartingItems: number;
    StarPower: number;
    StartingItems: string[]
}