import { KeyItem } from "../enums/keyItem";


export class RandomizedKeyItem {

    public constructor(
        public originalName: KeyItem,
        public newKeyItemName: KeyItem,
        public locationName: string
    ) {}
}