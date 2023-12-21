import { BowsersCastleMode } from "../enum/bowsersCastleMode";
import { MirrorMode } from "../enum/mirrorMode";

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
    ShuffleDungeonEntrances: boolean;
    MirrorMode: MirrorMode;
    StarHunt: boolean;
    StarHuntRequired: number;
    StarHuntTotal: number;
    StarHuntEndsGame: boolean;
}
