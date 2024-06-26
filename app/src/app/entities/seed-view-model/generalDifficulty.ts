import { MerlowRewardPricing } from '../enum/merlowRewardPricing';

export interface GeneralDifficulty {
    CapEnemyXP: boolean;
    EnemyDamage: string;
    EnemyDifficulty: string;
    MerlowRewardsPricing: MerlowRewardPricing;
    NoHealingItems: boolean;
    DropStarPoints: boolean;
    NoHeartBlocks: boolean;
    NoSaveBlocks: boolean;
    XPMultiplier: number;
    OneHitKO: boolean;
    BadgeSynergy: boolean;
}
