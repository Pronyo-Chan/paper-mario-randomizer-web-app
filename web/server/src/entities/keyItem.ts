import { Partner } from "./partner";

export class KeyItem {

    public constructor(
        public name: string,
        public keyItemRequirements: KeyItem[],
        public partnerRequirements: Partner[],
        public equipUpgradeRequirements: EquipUpgrade[],
        public location: string
    ) {

    }
}