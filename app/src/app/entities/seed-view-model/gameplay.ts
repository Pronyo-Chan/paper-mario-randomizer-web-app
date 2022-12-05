import { MysteryMode } from "../enum/mysteryMode";

export interface Gameplay {
    BadgesBP: number;
    BadgesFP: number
    PartnersFP: number
    StarPowerSP: number
    ShuffleBattleFormations: boolean
    MysteryMode: MysteryMode
}