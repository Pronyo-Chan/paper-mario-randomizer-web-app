import { EquipUpgrade } from '../../enums/equipUpgrade';
import { KeyItem } from '../../enums/keyItem';
import { RandomizedGame } from '../../entities/randomizedGame';
import { RandomizedEquipUpgrade } from '../../entities/randomizedEquipUpgrade';
import { RandomizedKeyItem } from '../../entities/randomizedKeyItem';
import { KeyItemLocationFactory } from '../../factories/keyItemLocationFactory';
import { EquipUpgradeLocationFactory } from '../../factories/equipUpgradeFactory';
import { Player } from '../../entities/player/player';
import { PartnerLocationFactory } from '../../factories/partnerLocationFactory';
import { ItemLocation } from '../../entities/itemLocation';
import { Partner } from '../../enums/partner';
import { RandomizedPartner } from '../../entities/randomizedPartner';

export class Randomizer {

    private partnerLocationsFactory: PartnerLocationFactory;
    private availablePartnerLocations: ItemLocation[];
    private keyItemLocationsFactory: KeyItemLocationFactory;
    private availableKeyItemLocations: ItemLocation[];
    private equipLocationsFactory: EquipUpgradeLocationFactory;
    private availableEquipLocations: ItemLocation[];
    private tempRemovedItems: KeyItem[];
    private tempRemovedEquips: EquipUpgrade[];
    private tempRemovedPartners: Partner[];

    private retryCount = 0;

    public constructor(
        private _player: Player,
        private _arePartnersRandomized = true,
        private _areKeyItemsRandomized = true,
        private _areEquipsRandomized = true,
    ) {
        this.partnerLocationsFactory = PartnerLocationFactory.getInstance();
        this.keyItemLocationsFactory = KeyItemLocationFactory.getInstance();
        this.equipLocationsFactory = EquipUpgradeLocationFactory.getInstance();

        this.availablePartnerLocations = this.partnerLocationsFactory.getAllPartnerLocations().sort((a,b) => b.difficulty - a.difficulty);
        this.availableKeyItemLocations = this.keyItemLocationsFactory.getAllKeyItemLocations().sort((a,b) => b.difficulty - a.difficulty);
        this.availableEquipLocations = this.equipLocationsFactory.getAllEquipUpgrades().sort((a,b) => b.difficulty - a.difficulty);
    }

    public randomizeGame(): RandomizedGame{
        console.log("Randomizing partners")
        var randomizedGame = new RandomizedGame;
        var progressionObjects = this.getProgressionObjects();
        while(progressionObjects.length > 0) {
            var objectToRandomize = progressionObjects[Math.floor(Math.random() * progressionObjects.length)];

            if(Object.values(Partner).some(p => p === objectToRandomize)) {
                const randomizedPartner = this.attemptToPlacePartner(objectToRandomize as Partner)
                if (randomizedPartner) {
                    randomizedGame.partners.push(randomizedPartner);
                    progressionObjects = progressionObjects.filter(o => o != objectToRandomize)
                } else {
                    this.resetRandomizer();
                }
            } else if (Object.values(KeyItem).some(ki => ki === objectToRandomize)) {
                const randomizedItem = this.attemptToPlaceKeyItem(objectToRandomize as KeyItem)
                if (randomizedItem) {
                    randomizedGame.keyItems.push(randomizedItem);
                    progressionObjects = progressionObjects.filter(o => o != objectToRandomize)
                } else {
                    this.resetRandomizer();
                }
            } else if (Object.values(EquipUpgrade).some(e => e === objectToRandomize)) {
                const randomizedEquip = this.attemptToPlaceEquipUpgrade(objectToRandomize as EquipUpgrade)
                if (randomizedEquip) {
                    randomizedGame.equipUpgrades.push(randomizedEquip);
                    progressionObjects = progressionObjects.filter(o => o != objectToRandomize)
                } else {
                    this.resetRandomizer();
                }
            }

            if (this.retryCount > 500) {
                return null;
            }
        }

        var uselessObjects = this.getUselessObjects();
        while (this._player.partners.length > 0) {
            const partnerToRandomize = this._player.partners[Math.floor(Math.random() * this._player.partners.length)];
            const randomizedPartner = this.placePartnerInRemainingLocation(partnerToRandomize);
            randomizedGame.partners.push(randomizedPartner);
        }

        while (this._player.keyItems.length > 0) {
            const keyItemToRandomize = this._player.keyItems[Math.floor(Math.random() * this._player.keyItems.length)];
            const randomizedPartner = this.placeKeyItemInRemainingLocation(keyItemToRandomize);
            randomizedGame.keyItems.push(randomizedPartner);
        }

        while (this._player.equipUpgrades.length > 0) {
            const equipToRandomize = this._player.equipUpgrades[Math.floor(Math.random() * this._player.equipUpgrades.length)];
            const randomizedPartner = this.placeEquipInRemainingLocation(equipToRandomize);
            randomizedGame.equipUpgrades.push(randomizedPartner);
        }
        
        return randomizedGame;
    }

    private attemptToPlacePartner(partner: Partner) : RandomizedPartner {
        for (var availableLocation of this.availablePartnerLocations) {
            if (!this._player.isAbleToReachLocation(availableLocation)) {
                continue;                
            }

            this._player.partners = this._player.partners.filter(p => partner !== p)
            this.availablePartnerLocations = this.availablePartnerLocations.filter(l => availableLocation !== l)
            this.tempRemovedEquips = [];
            this.tempRemovedItems = [];
            this.removeLockedObjectsRecursive(partner)
            
            if (!this._player.isAbleToReachLocation(availableLocation)) {
                this.cancelPlacingPartner(partner, availableLocation);
                continue;                
            }
            console.log ('Placed: ' + partner + ' at location:' + availableLocation.originalName);
            return new RandomizedPartner(availableLocation.originalName as Partner, partner, availableLocation.locationName);
            
        }
        return null;
    }

    private attemptToPlaceKeyItem(keyItem: KeyItem) : RandomizedKeyItem {
        for (var availableLocation of this.availableKeyItemLocations) {
            if (!this._player.isAbleToReachLocation(availableLocation)) {
                continue;                
            }

            this._player.keyItems = this._player.keyItems.filter(ki => keyItem !== ki)
            this.availablePartnerLocations = this.availableEquipLocations.filter(l => availableLocation !== l)
            this.tempRemovedEquips = [];
            this.tempRemovedItems = [];
            this.removeLockedObjectsRecursive(keyItem)
            
            if (!this._player.isAbleToReachLocation(availableLocation)) {
                this.cancelPlacingKeyItem(keyItem, availableLocation);
                continue;                
            }
            console.log ('Placed: ' + keyItem + ' at location:' + availableLocation.originalName);
            return new RandomizedKeyItem(availableLocation.originalName as KeyItem, keyItem, availableLocation.locationName);            
        }
        return null;
    }

    private attemptToPlaceEquipUpgrade(equipUpgrade: EquipUpgrade) : RandomizedEquipUpgrade {
        for (var availableLocation of this.availablePartnerLocations) {
            if (!this._player.isAbleToReachLocation(availableLocation)) {
                continue;                
            }

            this._player.equipUpgrades = this._player.equipUpgrades.filter(e => equipUpgrade !== e)
            this.availablePartnerLocations = this.availablePartnerLocations.filter(l => availableLocation !== l)
            this.tempRemovedEquips = [];
            this.tempRemovedItems = [];
            this.removeLockedObjectsRecursive(equipUpgrade)
            
            if (!this._player.isAbleToReachLocation(availableLocation)) {
                this.cancelPlacingEquipUpgrade(equipUpgrade, availableLocation);
                continue;                
            }
            console.log ('Placed: ' + equipUpgrade + ' at location:' + availableLocation.originalName);
            return new RandomizedEquipUpgrade(availableLocation.originalName as EquipUpgrade, equipUpgrade, availableLocation.locationName);            
        }
        return null;
    }

    private cancelPlacingPartner(partner: Partner, location: ItemLocation) {
        this._player.partners.push(partner);
        this._player.keyItems = this._player.keyItems.concat(this.tempRemovedItems);
        this._player.equipUpgrades = this._player.equipUpgrades.concat(this.tempRemovedEquips);
        this.availablePartnerLocations.push(location);
    }

    private cancelPlacingKeyItem(keyItem: KeyItem, location: ItemLocation) {
        this._player.keyItems.push(keyItem);
        this._player.partners = this._player.partners.concat(this.tempRemovedPartners);
        this._player.equipUpgrades = this._player.equipUpgrades.concat(this.tempRemovedEquips);
        this.availablePartnerLocations.push(location);
    }

    private cancelPlacingEquipUpgrade(equipUpgrade: EquipUpgrade, location: ItemLocation) {
        this._player.equipUpgrades.push(equipUpgrade);
        this._player.keyItems = this._player.keyItems.concat(this.tempRemovedItems);
        this._player.partners = this._player.partners.concat(this.tempRemovedPartners);
        this.availablePartnerLocations.push(location);
    }

    private removeLockedObjectsRecursive(object: Partner | KeyItem | EquipUpgrade) {
        var newlyRemovedItems = [] as KeyItem[];
        var newlyRemovedEquips = [] as EquipUpgrade[];
        var newlyRemovedPartners = [] as Partner[];

        if (!this._areKeyItemsRandomized) {
            newlyRemovedItems = this._player.removeKeyItemsLockedBehindObject(object);
        }

        if (!this._areEquipsRandomized) {
            newlyRemovedEquips = this._player.removeUpgradesLockedBehindObject(object);
        }

        if (!this._arePartnersRandomized) {
            newlyRemovedPartners = this._player.removePartnersLockedBehindObject(object);
        }

        this.tempRemovedItems = this.tempRemovedItems.concat(newlyRemovedItems);
        this.tempRemovedEquips = this.tempRemovedEquips.concat(newlyRemovedEquips);
        this.tempRemovedPartners = this.tempRemovedPartners.concat(newlyRemovedPartners);

        for (var item of newlyRemovedItems) {
            this.removeLockedObjectsRecursive(item)
        }

        for (var equip of newlyRemovedEquips) {
            this.removeLockedObjectsRecursive(equip)
        }

        for (var partner of newlyRemovedPartners) {
            this.removeLockedObjectsRecursive(partner)
        }
    }

    private placePartnerInRemainingLocation(partner: Partner) : RandomizedPartner{
        if (!this.availablePartnerLocations.length) {
            console.error('Tried to place ' + partner + ' but no location remains')
            return;
        }

        const newlocation = this.availablePartnerLocations[0];
        console.log('Placed: ' + Partner.GOOMBARIO + ' at location:' + this.availablePartnerLocations[0].originalName)
        return new RandomizedPartner(newlocation.originalName as Partner, partner, newlocation.locationName)
    }

    private placeKeyItemInRemainingLocation(keyItem: KeyItem) : RandomizedKeyItem{
        if (!this.availableKeyItemLocations.length) {
            console.error('Tried to place ' + KeyItem + ' but no location remains')
            return;
        }

        const newlocation = this.availablePartnerLocations[0];
        console.log('Placed: ' + Partner.GOOMBARIO + ' at location:' + this.availablePartnerLocations[0].originalName)
        return new RandomizedKeyItem(newlocation.originalName as KeyItem, keyItem, newlocation.locationName)
    }

    private placeEquipInRemainingLocation(equipUpgrade: EquipUpgrade) : RandomizedEquipUpgrade{
        if (!this.availableEquipLocations.length) {
            console.error('Tried to place ' + equipUpgrade + ' but no location remains')
            return;
        }

        const newlocation = this.availablePartnerLocations[0];
        console.log('Placed: ' + Partner.GOOMBARIO + ' at location:' + this.availablePartnerLocations[0].originalName)
        return new RandomizedEquipUpgrade(newlocation.originalName as EquipUpgrade, equipUpgrade, newlocation.locationName)
    }

    private resetRandomizer() {
        this.retryCount++;
        console.log('retrying: ' + this.retryCount);
        this._player.initializePlayer();

        this.availablePartnerLocations = this.partnerLocationsFactory.getAllPartnerLocations().sort((a,b) => b.difficulty - a.difficulty);
        this.availableKeyItemLocations = this.keyItemLocationsFactory.getAllKeyItemLocations().sort((a,b) => b.difficulty - a.difficulty);
        this.availableEquipLocations = this.equipLocationsFactory.getAllEquipUpgrades().sort((a,b) => b.difficulty - a.difficulty);
    }
    
    private getProgressionObjects(): (Partner | KeyItem | EquipUpgrade)[] {
        const requiredPartners = this.partnerLocationsFactory.getAllPartnerLocations().filter(l => l.isProgressionItem).map(l => l.originalName);
        const requiredKeyItems = this.keyItemLocationsFactory.getAllKeyItemLocations().filter(l => l.isProgressionItem).map(l => l.originalName);
        const requiredEquipUpgrades = this.equipLocationsFactory.getAllEquipUpgrades().filter(l => l.isProgressionItem).map(l => l.originalName);

        return [].concat(requiredPartners, requiredKeyItems, requiredEquipUpgrades);
    }

    private getUselessObjects(): (Partner | KeyItem | EquipUpgrade)[] {
        const requiredPartners = this._arePartnersRandomized ? 
            this.partnerLocationsFactory.getAllPartnerLocations().filter(l => !l.isProgressionItem).map(l => l.originalName) :
            [];

        const requiredKeyItems = this._areKeyItemsRandomized ?
            this.keyItemLocationsFactory.getAllKeyItemLocations().filter(l => !l.isProgressionItem).map(l => l.originalName) :
            [];
        const requiredEquipUpgrades = this._areEquipsRandomized ?
            this.equipLocationsFactory.getAllEquipUpgrades().filter(l => !l.isProgressionItem).map(l => l.originalName) :
            [];

        return [].concat(requiredPartners, requiredKeyItems, requiredEquipUpgrades);
    }
        
}