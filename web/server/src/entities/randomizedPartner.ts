
import { Partner } from '../enums/partner';

export class RandomizedPartner {

    public constructor(
        public originalName: Partner,
        public newPartnerName: Partner,
        public locationName: string
    ) {

    }
}