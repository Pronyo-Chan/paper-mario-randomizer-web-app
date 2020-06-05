import { EquipUpgrade } from '../../enums/equipUpgrade';
import { Player } from '../../entities/player/player';
import { PartnerLocationFactory } from '../../factories/partnerLocationFactory';
import { ItemLocation } from '../../entities/itemLocation';
import { Partner } from '../../enums/partner';
import { KeyItem } from '../../enums/keyItem';
import { RandomizedPartner } from '../../entities/randomizedPartner';

export class PartnerRandomizer {

    private partnerLocationsFactory: PartnerLocationFactory
    private availablePartnerLocations: ItemLocation[]
    private tempRemovedItems: KeyItem[];
    private tempRemovedEquips: EquipUpgrade[];

    private retryCount = 0;

    public constructor(private _player: Player) {
        this.partnerLocationsFactory = PartnerLocationFactory.getInstance();
        this.availablePartnerLocations = this.partnerLocationsFactory.getAllPartnerLocations().sort((a,b) => b.difficulty - a.difficulty);
    }

    public randomizePartners(): RandomizedPartner[] {
        console.log("Randomizing partners")
        var randomizedPartners = [] as RandomizedPartner[];
        this._player.partners = this._player.partners.filter(p => p !== Partner.GOOMBARIO)
        while(this._player.partners.length > 0) {
            var partnerToRandomize = this._player.partners[Math.floor(Math.random() * this._player.partners.length)];
            var randomizedPartner = this.attemptToPlacePartner(partnerToRandomize)

            if (this.retryCount > 500) {
                return null;
            }
            if (randomizedPartner) {
                randomizedPartners.push(randomizedPartner);
            } else {
                this.resetRandomizer(randomizedPartners);
            }

        }
        const randomizedGoombario = this.placeGoombarioInRemainingLocation();
        randomizedPartners.push(randomizedGoombario);
        return randomizedPartners;
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

    private cancelPlacingPartner(partner: Partner, location: ItemLocation) {
        this._player.partners.push(partner);
        this._player.keyItems = this._player.keyItems.concat(this.tempRemovedItems);
        this._player.equipUpgrades = this._player.equipUpgrades.concat(this.tempRemovedEquips);
        this.availablePartnerLocations.push(location);
    }

    private removeLockedObjectsRecursive(object: Partner | KeyItem | EquipUpgrade) {
        var newlyRemovedItems = this._player.removeKeyItemsLockedBehindObject(object);
        var newlyRemovedEquips = this._player.removeUpgradesLockedBehindObject(object);

        this.tempRemovedItems = this.tempRemovedItems.concat(newlyRemovedItems);
        this.tempRemovedEquips = this.tempRemovedEquips.concat(newlyRemovedEquips);

        for (var item of newlyRemovedItems) {
            this.removeLockedObjectsRecursive(item)
        }

        for (var equip of newlyRemovedEquips) {
            this.removeLockedObjectsRecursive(equip)
        }

    }

    private placeGoombarioInRemainingLocation() : RandomizedPartner{
        if (!this.availablePartnerLocations.length) {
            console.error('Tried to place Goombario but no location remains')
            return;
        }

        const newlocation = this.availablePartnerLocations[0];
        console.log('Placed: ' + Partner.GOOMBARIO + ' at location:' + this.availablePartnerLocations[0].originalName)
        return new RandomizedPartner(newlocation.originalName as Partner, Partner.GOOMBARIO, newlocation.locationName)
    }

    private resetRandomizer(randomizedPartners: RandomizedPartner[]) {
        this.retryCount++;
        console.log('retrying: ' + this.retryCount);
        randomizedPartners = [];
        this._player.initializePlayer();
        this._player.partners = this._player.partners.filter(p => p !== Partner.GOOMBARIO);
        this.availablePartnerLocations = this.partnerLocationsFactory.getAllPartnerLocations().sort((a,b) => b.difficulty - a.difficulty);
    }      
        
}