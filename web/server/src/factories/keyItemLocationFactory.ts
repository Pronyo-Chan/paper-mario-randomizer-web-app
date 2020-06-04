import { ItemLocationType } from './../enums/itemLocationType';
import { ItemLocation } from './../entities/itemLocation';
import { EquipUpgrade } from '../enums/equipUpgrade';
import { KeyItem } from '../enums/keyItem';
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
            this.ruinsKey3,
            this.letter1,
            this.letter10,
            this.letter25,
            this.boosPortrait,
            this.magicalSeed1,
            this.magicalSeed2,
            this.magicalSeed3,
            this.magicalSeed4,
            this.jadeRaven
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
        KeyItem.RUINS_KEY_3,
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
            [Partner.KOOPER, EquipUpgrade.HAMMER2],
            [Partner.PARAKARRY, EquipUpgrade.HAMMER2],
        ],
        'iwa_01',
        1
    );

    public letter10 = new ItemLocation(
        KeyItem.LETTER_10,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, EquipUpgrade.HAMMER],
            [EquipUpgrade.HAMMER2]
        ],
        'iwa_04',
        1
    );

    public letter25 = new ItemLocation(
        KeyItem.LETTER_25,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, EquipUpgrade.HAMMER],
            [EquipUpgrade.HAMMER2]
        ],
        'iwa_03',
        1
    );

    public boosPortrait = new ItemLocation(
        KeyItem.BOOS_PORTRAIT,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS2],
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
            [Partner.PARAKARRY, EquipUpgrade.HAMMER2],
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
            [Partner.WATT, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER3],
            [Partner.SUSHIE, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER3, EquipUpgrade.BOOTS2],
        ],
        'mim_04',
        3
    );

    public jadeRaven = new ItemLocation(
        KeyItem.JADE_RAVEN,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, Partner.WATT, Partner.SUSHIE, EquipUpgrade.HAMMER]
        ],
        'jan_02',
        2
    )


    static getInstance(): KeyItemFactory {
        if (!KeyItemFactory.instance) {
            KeyItemFactory.instance = new KeyItemFactory();
        }
    
        return KeyItemFactory.instance;
    }
}