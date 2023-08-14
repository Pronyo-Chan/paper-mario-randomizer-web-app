import { MerlowRewardPricing } from '../enum/merlowRewardPricing';
import { RandomConsumableMode } from '../enum/randomConsumableMode';
import { ItemTrapMode } from './../enum/itemTrapMode';

export interface GeneralDifficulty {
    CapEnemyXP: boolean;
    ConsumableItemPool: RandomConsumableMode;
    EnemyDamage: string;
    EnemyDifficulty: string;
    ItemQuality: number;
    ItemTraps: ItemTrapMode;
    MerlowRewardsPricing: MerlowRewardPricing;
    NoHealingItems: boolean;
    DropStarPoints: boolean;
    NoHeartBlocks: boolean;
    NoSaveBlocks: boolean;
    XPMultiplier: number;
    OneHitKO: boolean;
    RandomNumberOfRrequiredStarSpirits: boolean;
    StarSpiritsRequired: number;
    RequireSpecificSpirits: boolean;
    LimitChapterLogic: boolean;
    BadgeSynergy: boolean;
}
