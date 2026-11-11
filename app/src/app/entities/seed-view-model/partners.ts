import { PartnerShuffleMode } from "../enum/partnerShuffleMode";
import { PartnerUpgradeShuffleMode } from "../enum/partnerUpgradeShuffleMode";

export interface Partners {
    MaxNumberOfStartingPartners: number;
    MinNumberOfStartingPartners: number;
    PartnersAlwaysUsable: boolean;
    PartnerUpgradeShuffle: PartnerUpgradeShuffleMode;
    ProgressivePartners: boolean;
    ShufflePartners: PartnerShuffleMode;
    StartWithRandomPartners: boolean;
    StartWithPartners: string[];
}
