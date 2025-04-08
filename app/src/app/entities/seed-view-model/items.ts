import { GearShuffleMode } from "../enum/gearShuffleMode";
import { KootFavorsMode } from "../enum/kootFavorsMode";
import { LettersMode } from "../enum/lettersMode";
import { MultiCoinBlockShuffle } from "../enum/MultiCoinBlockShuffle";
import { PartnerUpgradeShuffleMode } from "../enum/partnerUpgradeShuffleMode";

export interface ItemSettings {
    IncludeCoinsOverworld: boolean;
    IncludeCoinsBlocks: boolean;
    IncludeCoinsFavors: boolean;
    IncludeCoinsFoliage: boolean;
    GearShuffle: GearShuffleMode;
    PartnerUpgradeShuffle: PartnerUpgradeShuffleMode;
    IncludeDojoRewards: number;
    IncludeHiddenPanels: boolean;
    IncludeTradingEventRewards: boolean;
    Keysanity: boolean;
    KoopaKootFavors: KootFavorsMode;
    LetterDeliveryRewards: LettersMode;
    ProgressionOnRowf: number;
    ProgressionOnMerlow: boolean;
    RipCheatoItemsInLogic: number;
    Shopsanity: boolean;
    ShuffleItems: boolean;
    ShuffleSuperAndMulticoinBlocks: MultiCoinBlockShuffle
}
