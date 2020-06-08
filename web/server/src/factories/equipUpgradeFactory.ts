import { ItemLocation } from './../entities/itemLocation';
import { EquipUpgrade } from '../enums/equipUpgrade';
import { ItemLocationType } from '../enums/itemLocationType';
import { Partner } from '../enums/partner';
import { KeyItem } from '../enums/keyItem';

export class EquipUpgradeLocationFactory {
    private static instance: EquipUpgradeLocationFactory;

    private constructor() {
    }

    public getAllEquipUpgrades(): ItemLocation[] {
        return [
            this.hammer1,
            this.hammer2, 
            this.hammer3, 
            this.boots2, 
            this.boots3  
        ]
    }
    public hammer1 = new ItemLocation(
        EquipUpgrade.HAMMER,
        ItemLocationType.EquipUpgrade,
        [[]],
        'kmr_04',
        0
    );

    public hammer2 = new ItemLocation(
        EquipUpgrade.HAMMER2,
        ItemLocationType.EquipUpgrade,
        [
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_3, EquipUpgrade.HAMMER],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_3, EquipUpgrade.HAMMER2],
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER2],
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_3, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_3, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER2],
        ],
        'isk_09',
        2
    );

    public hammer3 = new ItemLocation(
        EquipUpgrade.HAMMER3,
        ItemLocationType.EquipUpgrade,
        [
            [Partner.WATT, Partner.PARAKARRY, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER],
            [Partner.WATT, Partner.LAKILESTER, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER],
            [Partner.SUSHIE, Partner.PARAKARRY, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS2],
            [Partner.SUSHIE, Partner.LAKILESTER, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS2]
        ],
        'kzn_07',
        2
    );

    public boots2 = new ItemLocation(
        EquipUpgrade.BOOTS2,
        ItemLocationType.EquipUpgrade,
        [[KeyItem.WEIGHT, EquipUpgrade.HAMMER]],
        'obk_04',
        1
    );

    public boots3 = new ItemLocation(
        EquipUpgrade.BOOTS3,
        ItemLocationType.EquipUpgrade,
        [[Partner.SUSHIE, Partner.LAKILESTER, EquipUpgrade.HAMMER3]],
        'tik_25',
        2
    );

    static getInstance(): EquipUpgradeLocationFactory {
        if (!EquipUpgradeLocationFactory.instance) {
            EquipUpgradeLocationFactory.instance = new EquipUpgradeLocationFactory();
        }
    
        return EquipUpgradeLocationFactory.instance;
    }
}