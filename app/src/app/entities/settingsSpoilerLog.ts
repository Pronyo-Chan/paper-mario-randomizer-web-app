import { StarPowerCost } from './starPowerCost';
import { PartnerCost } from './partnerCost';
import { BadgeCost } from './badgeCost';

export interface SettingsSpoilerLog 
{ 
    badgeCosts: BadgeCost[];
    partnerCosts: PartnerCost[];
    starPowerCosts: StarPowerCost[];
    superBlocks: string[];
    chapterDifficulties: number[];
}
