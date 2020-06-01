import { EquipUpgrade } from '../enums/equipUpgrade';
import { ItemLocation } from '../entities/itemLocation';
import { KeyItem } from '../enums/keyItem';
import { ItemLocationType } from '../enums/itemLocationType';
import { Partner } from '../enums/partner';

export class KeyItemFactory {
    private static instance: KeyItemFactory;

    private constructor() {
    }

    public getAllKeyItemLocations(): ItemLocation[] {
        return [
            this.dolly,
            this.kooperShell,
            this.fortressKey1,
            this.letter1,
            this.letter10,
            this.letter25,
            this.boosPortrait,
            this.magicalSeed1,
            this.magicalSeed2,
            this.magicalSeed3,
            this.magicalSeed4
        ]
    }

    public dolly = new ItemLocation(
        KeyItem.DOLLY,
        ItemLocationType.KeyItem,
        [[EquipUpgrade.HAMMER]],
        'kmr_04',
        0
    );

    public kooperShell = new ItemLocation(
        KeyItem.KOOPER_SHELL,
        ItemLocationType.KeyItem,
        [[EquipUpgrade.HAMMER]],
        'nok_04',
        0
    );

    public fortressKey1 = new ItemLocation(
        KeyItem.FORTRESS_KEY,
        ItemLocationType.KeyItem,
        [[Partner.KOOPER, EquipUpgrade.HAMMER]],
        'trd_01',
        1
    );

    public ruinsKey3 = new ItemLocation(
        KeyItem.RUINS_KEY,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, Partner.PARAKARRY, EquipUpgrade.HAMMER]
        ],
        'trd_01',
        1
    );

    public letter1 = new ItemLocation(
        KeyItem.LETTER_01,
        ItemLocationType.KeyItem,
        [
            [Partner.KOOPER, Partner.BOMBETTE, EquipUpgrade.HAMMER],
            [Partner.PARAKARRY, Partner.BOMBETTE, EquipUpgrade.HAMMER],
            [Partner.KOOPER, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER],
            [Partner.PARAKARRY, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER],
        ],
        'iwa_01',
        1
    );

    public letter10 = new ItemLocation(
        KeyItem.LETTER_10,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, EquipUpgrade.HAMMER],
            [EquipUpgrade.HAMMER, EquipUpgrade.HAMMER]
        ],
        'iwa_04',
        1
    );

    public letter25 = new ItemLocation(
        KeyItem.LETTER_25,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, EquipUpgrade.HAMMER],
            [EquipUpgrade.HAMMER, EquipUpgrade.HAMMER]
        ],
        'iwa_03',
        1
    );

    public boosPortrait = new ItemLocation(
        KeyItem.BOOS_PORTRAIT,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS],
        ],
        'iwa_03',
        1
    );

    public magicalSeed1 = new ItemLocation(
        KeyItem.MAGICAL_SEED_1,
        ItemLocationType.KeyItem,
        [
            [EquipUpgrade.HAMMER],
        ],
        'mac_02',
        1
    );

    public magicalSeed2 = new ItemLocation(
        KeyItem.MAGICAL_SEED_2,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, Partner.BOMBETTE, EquipUpgrade.HAMMER],
            [Partner.PARAKARRY, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER],
        ],
        'iwa_02',
        1
    );

    public magicalSeed3 = new ItemLocation(
        KeyItem.MAGICAL_SEED_3,
        ItemLocationType.KeyItem,
        [[]],
        'mim_04',
        0
    );

    public magicalSeed4 = new ItemLocation(
        KeyItem.MAGICAL_SEED_4,
        ItemLocationType.KeyItem,
        [
            [Partner.WATT, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER],
            [Partner.SUSHIE, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS],
        ],
        'mim_04',
        3
    );


    static getInstance(): KeyItemFactory {
        if (!KeyItemFactory.instance) {
            KeyItemFactory.instance = new KeyItemFactory();
        }
    
        return KeyItemFactory.instance;
    }
}