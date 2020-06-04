import { EquipUpgrade } from './enums/equipUpgrade';
import { Player } from './entities/player';
import { PartnerLocationFactory } from './factories/partnerLocationFactory';
import { ItemLocation } from './entities/itemLocation';
import { Partner } from './enums/partner';
import { KeyItem } from './enums/keyItem';
import { RandomizedPartner } from './entities/randomizedPartner';
import { ItemLocationType } from './enums/itemLocationType';

export class PartnerRandomizer {

    private partnerLocationsFactory: PartnerLocationFactory
    private availablePartnerLocations: ItemLocation[]
    private tempRemovedItems: KeyItem[];
    private tempRemovedEquips: EquipUpgrade[];

    private retryCount = 0;
    private successCount = 0;

    public constructor() {
        this.partnerLocationsFactory = PartnerLocationFactory.getInstance();
        this.availablePartnerLocations = this.partnerLocationsFactory.getAllPartnerLocations().sort((a,b) => b.difficulty - a.difficulty);

    }

    public randomizePartners(player: Player): RandomizedPartner[] {
        console.log("Randomizing partners")
        var randomizedPartners = [] as RandomizedPartner[];
        player.partners = player.partners.filter(p => p !== Partner.GOOMBARIO)
        while(player.partners.length > 0) {
            var partnerToRandomize = player.partners[Math.floor(Math.random() * player.partners.length)];
            var randomizedPartner = this.attemptToPlacePartner(player, partnerToRandomize)

            if (this.retryCount > 500) {
                console.log('failed after ' + this.successCount + ' success' )
                return null;
            }
            if (randomizedPartner) {
                randomizedPartners.push(randomizedPartner)
            } else {
                this.retryCount++
                console.log('retrying: ' + this.retryCount)
                randomizedPartners = [];
                player.initializePlayer();
                player.partners = player.partners.filter(p => p !== Partner.GOOMBARIO)
                this.availablePartnerLocations = this.partnerLocationsFactory.getAllPartnerLocations().sort((a,b) => b.difficulty - a.difficulty);
            }

        }
        const randomizedGoombario = this.placeGoombarioInRemainingLocation();
        randomizedPartners.push(randomizedGoombario);
        return randomizedPartners;
    }

    public attemptToPlacePartner(player: Player, partner: Partner) : RandomizedPartner {
        for (var availableLocation of this.availablePartnerLocations) {
            if (!player.isAbleToReachLocation(availableLocation)) {
                continue;                
            }

            player.partners = player.partners.filter(p => partner !== p)
            this.availablePartnerLocations = this.availablePartnerLocations.filter(l => availableLocation !== l)
            this.tempRemovedEquips = [];
            this.tempRemovedItems = [];
            this.removeLockedObjectsRecursive(player, partner)
            
            if (!player.isAbleToReachLocation(availableLocation)) {
                player.partners.push(partner);
                player.keyItems = player.keyItems.concat(this.tempRemovedItems)
                player.equipUpgrades = player.equipUpgrades.concat(this.tempRemovedEquips)
                this.availablePartnerLocations.push(availableLocation);
                continue;                
            }
            console.log ('Placed: ' + partner + ' at location:' + availableLocation.originalName)
            return new RandomizedPartner(availableLocation.originalName as Partner, partner, availableLocation.locationName);
            
        }
        return null;
     }

     public removeLockedObjectsRecursive(player: Player, object: Partner | KeyItem | EquipUpgrade) {
        var newlyRemovedItems = player.removeKeyItemsLockedBehindObject(object);
        var newlyRemovedEquips = player.removeUpgradesLockedBehindObject(object);

        this.tempRemovedItems = this.tempRemovedItems.concat(newlyRemovedItems);
        this.tempRemovedEquips = this.tempRemovedEquips.concat(newlyRemovedEquips);

        for (var item of newlyRemovedItems) {
            this.removeLockedObjectsRecursive(player, item)
        }

        for (var equip of newlyRemovedEquips) {
            this.removeLockedObjectsRecursive(player, equip)
        }

     }

     public placeGoombarioInRemainingLocation() : RandomizedPartner{
         if (!this.availablePartnerLocations.length) {
             console.error('Tried to place Goombario but no location remains')
             return;
         }

         const newlocation = this.availablePartnerLocations[0];
         console.log('Placed: ' + Partner.GOOMBARIO + ' at location:' + this.availablePartnerLocations[0].originalName)
         return new RandomizedPartner(newlocation.originalName as Partner, Partner.GOOMBARIO, newlocation.locationName)
     }
        
        
}