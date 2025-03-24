import { BowserDoorQuiz } from './../enum/bowserDoorQuiz';
import { MerlowRewardPricing } from '../enum/merlowRewardPricing';
import { KentCKoopa } from '../enum/kentCKoopa';

export interface GeneralDifficulty {
    CapEnemyXP: boolean;
    EnemyDamage: string;
    EnemyDifficulty: string;
    MerlowRewardsPricing: MerlowRewardPricing;
    NoHealingItems: boolean;
    DropStarPoints: boolean;
    ChetRippoAvailable: boolean;
    NoHeartBlocks: boolean;
    NoSaveBlocks: boolean;
    XPMultiplier: number;
    OneHitKO: boolean;
    BadgeSynergy: boolean;
    BowserDoorQuiz: BowserDoorQuiz;
    KentCKoopa: KentCKoopa;
}
