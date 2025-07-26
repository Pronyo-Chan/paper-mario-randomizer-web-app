import { RequiredChapters } from '../enum/requiredChapters';
import { SeedGoal } from '../enum/seedGoal';

export interface Goals {
    StarWaySpiritsNeeded: number;
    StarWayChaptersNeeded: number;
    RequiredChapters: RequiredChapters;
    ShuffleStarBeam: boolean;
    StarBeamSpiritsNeeded: number;
    StarBeamPowerStarsNeeded: number
    StarWayPowerStarsNeeded: number;
    StarHuntTotal: number;
    SeedGoal: SeedGoal;
}
