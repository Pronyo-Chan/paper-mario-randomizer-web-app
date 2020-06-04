import { EquipUpgrade } from './enums/equipUpgrade';
import { Player } from './entities/player';
import { PartnerLocationFactory } from './factories/partnerLocationFactory';
import { ItemLocation } from './entities/itemLocation';
import { Partner } from './enums/partner';
import { KeyItem } from './enums/keyItem';
export class Randomizer {

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

    public randomizePartners(player: Player): void {
        console.log("Randomizing partners")
        player.partners = player.partners.filter(p => p !== Partner.GOOMBARIO)
        while(player.partners.length > 0) {
            var partnerToRandomize = player.partners[Math.floor(Math.random() * player.partners.length)];
            var success = this.attemptToPlacePartner(player, partnerToRandomize)

            if (this.retryCount > 500) {
                console.log('failed after ' + this.successCount + ' success' )
                return;
            }
            if (!success) {
                this.retryCount++
                console.log('retrying: ' + this.retryCount)
                player.initializePlayer();
                player.partners = player.partners.filter(p => p !== Partner.GOOMBARIO)
                this.availablePartnerLocations = this.partnerLocationsFactory.getAllPartnerLocations().sort((a,b) => b.difficulty - a.difficulty);
            }

        }
        this.placeGoombarioInRemainingLocation();
    }

    public attemptToPlacePartner(player: Player, partner: Partner) : boolean {
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
            return true;
            
        }
        return false;
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
     
     public placeGoombarioInRemainingLocation() {
         if (!this.availablePartnerLocations.length) {
             console.error('Tried to place Goombario but no location remains')
             return;
         }

         console.log('Placed: ' + Partner.GOOMBARIO + ' at location:' + this.availablePartnerLocations[0].originalName)
     }
        
        
}