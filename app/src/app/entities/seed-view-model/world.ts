import { BowsersCastleMode } from "../enum/bowsersCastleMode";
import { DungeonEntranceShuffleMode } from "../enum/DungeonEntranceShuffleMode";
import { MirrorMode } from "../enum/mirrorMode";
import { SeedGoal } from "../enum/seedGoal";

export interface World {
    MagicalSeedsRequired: string;
    OpenBlueHouse: boolean;
    OpenPrologue: boolean;
    OpenToyBox: boolean;
    StartingLocation: string;
    OpenWhale: boolean;
    OpenMtRugged: boolean;
    OpenForeverForest: boolean;
    Ch7BridgeVisible: boolean;
    BowsersCastleMode: BowsersCastleMode;
    ShuffleDungeonEntrances: DungeonEntranceShuffleMode;
    MirrorMode: MirrorMode;
}
