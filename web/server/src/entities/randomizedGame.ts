import { EquipUpgrade } from './../enums/equipUpgrade';
import { RandomizedKeyItem } from './randomizedKeyItem';
import { RandomizedPartner } from './randomizedPartner';
import { RandomizedEquipUpgrade } from './randomizedEquipUpgrade';

export class RandomizedGame {

    public partners: RandomizedPartner[] = [];
    public keyItems: RandomizedKeyItem[] = [];
    public equipUpgrades: RandomizedEquipUpgrade[] = [];
}