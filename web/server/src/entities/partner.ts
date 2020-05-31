import { EquipUpgrade } from './equipUpgrade';
import { PartnerName } from './../enums/partnerName';
import { KeyItem } from "./keyItem";

export class Partner {

    public constructor(
        public name: PartnerName,
        public keyItemRequirements: KeyItem[],
        public partnerRequirements: Partner[],
        public equipUpgradeRequirements: EquipUpgrade[],
        public location: string
    ) {

    }
}