import { GearShuffleMode } from "../enum/gearShuffleMode";
import { KootFavorsMode } from "../enum/kootFavorsMode";
import { LettersMode } from "../enum/lettersMode";

export interface ItemSettings {
    AddItemPouches: boolean;
    IncludeCoinsOverworld: boolean;
    IncludeCoinsBlocks: boolean;
    IncludeCoinsFavors: boolean;
    IncludeCoinsFoliage: boolean;
    GearShuffle: GearShuffleMode;
    IncludeDojoRewards: boolean;
    IncludeHiddenPanels: boolean;
    IncludeTradingEventRewards: boolean;
    Keysanity: boolean;
    KoopaKootFavors: KootFavorsMode;
    LetterDeliveryRewards: LettersMode;
    ProgressionOnRowf: boolean;
    ProgressionOnMerlow: boolean;
    RipCheatoItemsInLogic: number;
    Shopsanity: boolean;
    ShuffleItems: boolean;
    ShuffleSuperAndMulticoinBlocks: boolean
}