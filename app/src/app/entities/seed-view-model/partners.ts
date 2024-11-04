import { PartnerShuffleMode } from "../enum/partnerShuffleMode";

export interface Partners {
    MaxNumberOfStartingPartners: number;
    MinNumberOfStartingPartners: number;
    PartnersAlwaysUsable: boolean;
    ShufflePartners: PartnerShuffleMode;
    StartWithRandomPartners: boolean;
    StartWithPartners: string[];
}
