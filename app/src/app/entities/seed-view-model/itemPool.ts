import { RandomConsumableMode } from '../enum/randomConsumableMode';
import { ItemTrapMode } from '../enum/itemTrapMode';

export interface ItemPool {
    ConsumableItemPool: RandomConsumableMode;
    ItemQuality: number;
    ItemTraps: ItemTrapMode;
}
