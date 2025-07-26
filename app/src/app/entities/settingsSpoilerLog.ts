import { ShuffledEntrance } from './shuffledEntrance';
import { StarPowerCost } from './starPowerCost';
import { PartnerCost } from './partnerCost';
import { BadgeCost } from './badgeCost';
import { PuzzleSolution } from './PuzzleSolution';

export interface SettingsSpoilerLog
{
    requiredChapters: string[];
    badgeCosts: BadgeCost[];
    partnerCosts: PartnerCost[];
    starPowerCosts: StarPowerCost[];
    superBlocks: string[];
    bossBattles: string[];
    chapterDifficulties: number[];
    entrances: ShuffledEntrance[];
    puzzleSolutions: PuzzleSolution[];
}
