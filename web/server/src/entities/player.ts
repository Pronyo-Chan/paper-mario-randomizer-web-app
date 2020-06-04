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

        this.initializePlayer();
    }

    public hasObject(name: string) {
        return this.keyItems.some( i => i === name)
        || this.partners.some( i => i === name)
        || this.equipUpgrades.some( i => i === name);
    
    }

    public removeKeyItemsLockedBehindObject(object: Partner | KeyItem | EquipUpgrade) : KeyItem[] {
        const itemsToRemove = this.keyItemLocationsFactory.getAllKeyItemLocations()
            .filter(location => this.hasObject(location.originalName)
             && location.requirements.every(reqSet => reqSet.some(r => r === object)));
        this.keyItems = this.keyItems.filter(ki => !itemsToRemove.some(itr => itr.originalName === ki));
        return itemsToRemove.map(i => i.originalName as KeyItem);
    }

    public removeUpgradesLockedBehindObject(object: Partner | KeyItem | EquipUpgrade) : EquipUpgrade[] {
        const equipsToRemove = this.equipUpgradeFactory.getAllEquipUpgrades()
            .filter(location => this.hasObject(location.originalName)
            && location.requirements.every(reqSet => reqSet.some(r => r === object)));
        this.equipUpgrades = this.equipUpgrades.filter(eq => !equipsToRemove.some(etr => etr.originalName === eq))
        return equipsToRemove.map(i => i.originalName as EquipUpgrade);
    }

    public isAbleToReachLocation(itemLocation: ItemLocation) {
        for (var i=0; i < itemLocation.requirements.length; i++) {
            var requirements = itemLocation.requirements[i];
            if (requirements.every(r => this.hasObject(r))) {
                return true;
            }
        }
        return false;
    }

    public initializePlayer() {
        this.initializePartners();
        this.initializeKeyItems();
        this.initializeEquipUpgrades();
    }

    private initializePartners() {
        this.partners = Object.values(Partner);
    }

    private initializeKeyItems() {
        this.keyItems = Object.values(KeyItem)
        this.keyItems.push(KeyItem.FORTRESS_KEY, KeyItem.FORTRESS_KEY, KeyItem.FORTRESS_KEY)
    }

    private initializeEquipUpgrades() {
        this.equipUpgrades = [
            EquipUpgrade.BOOTS2,
            EquipUpgrade.BOOTS3,
            EquipUpgrade.HAMMER,
            EquipUpgrade.HAMMER2,
            EquipUpgrade.HAMMER3
        ]
    }
}