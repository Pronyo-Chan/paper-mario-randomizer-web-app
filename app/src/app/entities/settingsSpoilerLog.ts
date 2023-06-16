import { ShuffledEntrance } from './shuffledEntrance';
import { StarPowerCost } from './starPowerCost';
import { PartnerCost } from './partnerCost';
import { BadgeCost } from './badgeCost';

export interface SettingsSpoilerLog
{
    requiredStarSpirits: string[];
    badgeCosts: BadgeCost[];
    partnerCosts: PartnerCost[];
    starPowerCosts: StarPowerCost[];
    superBlocks: string[];
    chapterDifficulties: number[];
    entrances: ShuffledEntrance[];
}
