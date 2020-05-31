import { EquipUpgradeType } from './../enums/equipUpgradeType';
import { EquipUpgrade } from './equipUpgrade';
import { KeyItem } from "./keyItem";
import { Partner } from "./partner";
import { PartnerName } from '../enums/partnerName';

export class Player {
    public partners: Partner[]
    public keyItems: KeyItem[]
    public equipUpgrades: EquipUpgrade[]

    public constructor() {
        this.initializePartners();
        this.initializeKetItems();
        this.initializeEquipUpgrades();
    }

    public hasKeyItem(name: string, ammount =1 ) {
        return this.keyItems.filter( i => i.name === name).length >= ammount;
    }

    public hasPartner(name: string, ammount =1 ) {
        return this.keyItems.filter( i => i.name === name).length >= ammount;
    }

    // Note that there are 3 hammer upgrades and 2 boots upgrades. First hammer is considered upgrade
    public hasEquipUpgrade(type: EquipUpgradeType, ammount=1 ) {
        this.equipUpgrades.filter( i => i.type === type).length >= ammount;
    }

    private initializePartners() {
        this.partners.push
        (
         
         
         
         
         
         
    }
}