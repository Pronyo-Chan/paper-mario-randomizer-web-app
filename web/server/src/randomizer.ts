import { EquipUpgrade } from './enums/equipUpgrade';
import { Player } from './entities/player';
import { PartnerLocationFactory } from './factories/partnerLocationFactory';
import { ItemLocation } from './entities/itemLocation';
import { Partner } from './enums/partner';
import { KeyItem } from './enums/keyItem';
export class Randomizer {

    private partnerLocationsFactory: PartnerLocationFactory
    private availablePartnerLocations: ItemLocation[]

    private retryCount = 0;
    private successiveFailureCount = 0;

    public constructor() {
        this.partnerLocationsFactory = PartnerLocationFactory.getInstance();
        this.availablePartnerLocations = this.partnerLocationsFactory.getAllPartnerLocations().sort((a,b) => b.difficulty - a.difficulty);

    }

    public randomizePartners(player: Player): void {
        console.log("Randomizing partners")
        player.partners = player.partners.filter(p => p !== Partner.GOOMBARIO)
        while(player.partners.length > 0) {
            var partnerToRandomize = player.partners[Math.floor(Math.random() * player.partners.length)];
            this.attemptToPlacePartner(player, partnerToRandomize)

            if(this.retryCount > 1000) {
                console.log('fail')
                return;
            }
            if(this.successiveFailureCount > 20) {
                console.log('retrying: ' + this.retryCount)
                this.retryCount++
                this.successiveFailureCount = 0;
                player.initializePartners();
                player.partners = player.partners.filter(p => p !== Partner.GOOMBARIO)
                player.initializeKeyItems();
                this.availablePartnerLocations = this.partnerLocationsFactory.getAllPartnerLocations().sort((a,b) => b.difficulty - a.difficulty);
            }

        }
        //this.attemptToPlacePartner(player, Partner.GOOMBARIO);
        console.log('finished in ' + this.retryCount + ' tries')
    }

    public attemptToPlacePartner(player: Player, partner: Partner) {
        for (var availableLocation of this.availablePartnerLocations) {
            for (var i=0; i < availableLocation.requirements.length; i++) {
                var requirements = availableLocation.requirements[i];
                if (!player.hasLocationRequirements(requirements)) {
                    this.successiveFailureCount++;
                    continue;                
                }
                player.partners = player.partners.filter(p => partner !== p)
                this.availablePartnerLocations = this.availablePartnerLocations.filter(l => availableLocation !== l)
                var removedItems = player.removeKeyItemsLockedBehindObject(partner);
                if (!player.hasLocationRequirements(requirements)) {
                    player.partners.push(partner);
                    player.keyItems = player.keyItems.concat(removedItems)
                    this.availablePartnerLocations.push(availableLocation);
                    this.successiveFailureCount++;
                    continue;                
                }
                console.log ('Placed: ' + partner + ' at location:' + availableLocation.originalName)
                return;
            }
        }
     }
     
        
        
}