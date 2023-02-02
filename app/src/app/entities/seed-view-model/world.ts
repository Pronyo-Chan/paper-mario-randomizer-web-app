import { BowsersCastleMode } from "../enum/bowsersCastleMode";

export interface World {
    MagicalSeedsRequired: string;
    OpenBlueHouse: boolean;
    OpenPrologue: boolean;
    OpenToyBox: boolean;
    StartingLocation: string;
    OpenWhale: boolean;
    OpenMtRugged: boolean;
    Ch7BridgeVisible: boolean;
    BowsersCastleMode: BowsersCastleMode;
    ShuffleDungeonEntrances: boolean
}