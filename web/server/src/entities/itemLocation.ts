import { EquipUpgrade } from '../enums/equipUpgrade';
import { ItemLocationType } from '../enums/itemLocationType';
import { Partner } from '../enums/partner';
import { KeyItem } from '../enums/keyItem';

export class ItemLocation {

    public constructor(
        public originalName: Partner | EquipUpgrade | KeyItem,
        public type: ItemLocationType,
        public requirements: (KeyItem | Partner | EquipUpgrade)[][],
        public locationName: string,
        public isRequiredItem: boolean,
        public difficulty: number
    ) {

    }
}