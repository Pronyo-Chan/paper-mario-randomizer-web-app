import { EquipUpgrade } from './../enums/equipUpgrade';

export class RandomizedEquipUpgrade {

    public constructor(
        public originalName: EquipUpgrade,
        public newEquipName: EquipUpgrade,
        public locationName: string
    ) {}
}