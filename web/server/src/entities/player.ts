import { PartnerLocationFactory } from './../factories/partnerLocationFactory';
import { KeyItemFactory as KeyItemLocationFactory } from '../factories/keyItemLocationFactory';
import { ItemLocation } from './itemLocation';
import { KeyItem } from './../enums/keyItem';
import { EquipUpgrade } from '../enums/equipUpgrade';
import { Partner } from '../enums/partner';
import { EquipUpgradeLocationFactory } from '../factories/equipUpgradeFactory';

export class Player {
    public partners: Partner[];
    public keyItems: KeyItem[];
    public equipUpgrades: EquipUpgrade[];

    public keyItemLocationsFactory: KeyItemLocationFactory;
    public partnerLocationFactory: PartnerLocationFactory;
    public equipUpgradeFactory: EquipUpgradeLocationFactory;

    public constructor() {
        this.keyItemLocationsFactory = KeyItemLocationFactory.getInstance();
        this.partnerLocationFactory = PartnerLocationFactory.getInstance();
        this.equipUpgradeFactory = EquipUpgradeLocationFactory.getInstance()

        this.initializePartners();
        this.initializeKeyItems();
        this.initializeEquipUpgrades();
    }

    public hasRequirement(name: string, ammount =1 ) {
        return this.keyItems.filter( i => i === name).length >= ammount
        || this.partners.some( i => i === name)
        || this.equipUpgrades.filter( i => i === name).length >= ammount;;
    
    }

    public hasLocationRequirements(requirements: string[]) : boolean {
        for(var requirement of requirements) {
            if (!this.hasRequirement(requirement))
            {
                return false;
            }
        }
        return true;
    }

    public initializePartners() {
        this.partners = Object.values(Partner);
    }

    public removeKeyItemsLockedBehindObject(object: Partner | KeyItem | EquipUpgrade) : KeyItem[] {
        const itemsToRemove = this.keyItemLocationsFactory.getAllKeyItemLocations()
        .filter(location => location.requirements.every(reqPos => reqPos.some(r => r === object)))
        this.keyItems = this.keyItems.filter(ki => !itemsToRemove.some(itr => itr.originalName === ki))
        return itemsToRemove.map(i => i.originalName as KeyItem);
    }

    public removeUpgradesLockedBehindObject(object: Partner | KeyItem | EquipUpgrade) : EquipUpgrade[] {
        const itemsToRemove = this.equipUpgradeFactory.getAllEquipUpgrades()
        .filter(location => location.requirements.every(reqPos => reqPos.some(r => r === object)))
        this.keyItems = this.keyItems.filter(ki => !itemsToRemove.some(itr => itr.originalName === ki))
        return itemsToRemove.map(i => i.originalName as EquipUpgrade);
    }

    public initializeKeyItems() {
        this.keyItems = Object.values(KeyItem)
        this.keyItems.push(KeyItem.FORTRESS_KEY, KeyItem.FORTRESS_KEY, KeyItem.FORTRESS_KEY)
    }

    private initializeEquipUpgrades() {
        this.equipUpgrades = [
            EquipUpgrade.BOOTS,
            EquipUpgrade.BOOTS,
            EquipUpgrade.HAMMER,
            EquipUpgrade.HAMMER,
            EquipUpgrade.HAMMER
        ]
    }
}