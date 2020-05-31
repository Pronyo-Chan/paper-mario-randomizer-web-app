import { EquipUpgradeType } from './../enums/equipUpgradeType';
import { Partner } from "./partner";
import { KeyItem } from "./keyItem";

export class EquipUpgrade {

    public constructor(
        public type: EquipUpgradeType,
        public keyItemRequirements: KeyItem[],
        public partnerRequirements: Partner[],
        public equipUpgradeRequirements: EquipUpgrade[],
        public location: string
    ) {

    }
}