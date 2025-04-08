import { RequiredSpirits } from '../enum/requiredSpirits';
import { SeedGoal } from '../enum/seedGoal';

export interface Goals {
    StarWaySpiritsNeeded: number;
    RequiredSpirits: RequiredSpirits;
    ShuffleStarBeam: boolean;
    StarBeamSpiritsNeeded: number;
    StarBeamPowerStarsNeeded: number
    StarWayPowerStarsNeeded: number;
    StarHuntTotal: number;
    SeedGoal: SeedGoal;
}
