import { ItemLocationType } from './../enums/itemLocationType';
import { ItemLocation } from './../entities/itemLocation';
import { EquipUpgrade } from '../enums/equipUpgrade';
import { KeyItem } from '../enums/keyItem';
import { Partner } from '../enums/partner';

export class KeyItemLocationFactory {
    private static instance: KeyItemLocationFactory;

    private constructor() {
    }

    public getAllKeyItemLocations(): ItemLocation[] {
        return [
            this.dolly,
            this.kooperShell,
            this.fortressKey1,
            this.fortressKey2,
            this.fortressKey3,
            this.fortressKey4,
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
        KeyItem.FORTRESS_KEY_1,
        ItemLocationType.KeyItem,
        [[Partner.KOOPER, EquipUpgrade.HAMMER]],
        'trd_01',
        1
    );

    public fortressKey2 = new ItemLocation(
        KeyItem.FORTRESS_KEY_2,
        ItemLocationType.KeyItem,
        [
            [Partner.KOOPER, Partner.BOMBETTE, KeyItem.FORTRESS_KEY_1, EquipUpgrade.HAMMER],
            [Partner.KOOPER, Partner.BOMBETTE, KeyItem.FORTRESS_KEY_2, EquipUpgrade.HAMMER],
            [Partner.KOOPER, Partner.BOMBETTE, KeyItem.FORTRESS_KEY_3, EquipUpgrade.HAMMER],
            [Partner.KOOPER, Partner.BOMBETTE, KeyItem.FORTRESS_KEY_4, EquipUpgrade.HAMMER],
        ],
        'trd_03',
        1
    );

    public fortressKey3 = new ItemLocation(
        KeyItem.FORTRESS_KEY_3,
        ItemLocationType.KeyItem,
        [
            [Partner.KOOPER, KeyItem.FORTRESS_KEY_1, KeyItem.FORTRESS_KEY_2, KeyItem.FORTRESS_KEY_3, EquipUpgrade.HAMMER],
            [Partner.KOOPER, KeyItem.FORTRESS_KEY_1, KeyItem.FORTRESS_KEY_3, KeyItem.FORTRESS_KEY_4, EquipUpgrade.HAMMER],
            [Partner.KOOPER, KeyItem.FORTRESS_KEY_2, KeyItem.FORTRESS_KEY_3, KeyItem.FORTRESS_KEY_4, EquipUpgrade.HAMMER],
        ],
        'trd_03',
        1
    );

    public fortressKey4 = new ItemLocation(
        KeyItem.FORTRESS_KEY_4,
        ItemLocationType.KeyItem,
        [
            [Partner.KOOPER, KeyItem.FORTRESS_KEY_1, EquipUpgrade.HAMMER],
            [Partner.KOOPER, KeyItem.FORTRESS_KEY_2, EquipUpgrade.HAMMER],
            [Partner.KOOPER, KeyItem.FORTRESS_KEY_3, EquipUpgrade.HAMMER],
            [Partner.KOOPER, KeyItem.FORTRESS_KEY_4, EquipUpgrade.HAMMER],
        ],
        'trd_08',
        1
    );

    public pulseStone = new ItemLocation(
        KeyItem.PULSE_STONE,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, Partner.PARAKARRY, EquipUpgrade.HAMMER],
            [EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2]
        ],
        'trd_08',
        1
    )

    public ruinsKey1 = new ItemLocation(
        KeyItem.RUINS_KEY_1,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, EquipUpgrade.HAMMER],
            [KeyItem.PULSE_STONE, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2]
        ],
        'isk_03',
        1
    );

    public ruinsKey2 = new ItemLocation(
        KeyItem.RUINS_KEY_2,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, EquipUpgrade.HAMMER],
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_2, EquipUpgrade.HAMMER],
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_3, EquipUpgrade.HAMMER],
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER]
        ],
        'isk_06',
        1
    );

    public ruinsKey3 = new ItemLocation(
        KeyItem.RUINS_KEY_3,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, EquipUpgrade.HAMMER],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_3, EquipUpgrade.HAMMER],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_3, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_3, EquipUpgrade.HAMMER],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [Partner.BOMBETTE, Partner.PARAKARRY, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_3, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_3, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
        ],
        'isk_07',
        1
    );

    public ruinsKey4 = new ItemLocation(
        KeyItem.RUINS_KEY_4,
        ItemLocationType.KeyItem,
        [
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_3, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_3, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
        ],
        'isk_12',
        1
    );

    public artefact = new ItemLocation(
        KeyItem.ARTEFACT,
        ItemLocationType.KeyItem,
        [
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_3, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_3, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_3, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
        ],
        'isk_07',
        1
    );

    public diamondStone = new ItemLocation(
        KeyItem.DIAMOND_STONE,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [Partner.BOMBETTE, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_2, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
        ],
        'isk_14',
        1
    );

    public pyramidStone = new ItemLocation(
        KeyItem.PYRAMID_STONE,
        ItemLocationType.KeyItem,
        [
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_2, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_3, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
        ],
        'isk_05',
        1
    );

    public lunarStone = new ItemLocation(
        KeyItem.PYRAMID_STONE,
        ItemLocationType.KeyItem,
        [
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_3, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
        ],
        'isk_13',
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


    static getInstance(): KeyItemLocationFactory {
        if (!KeyItemLocationFactory.instance) {
            KeyItemLocationFactory.instance = new KeyItemLocationFactory();
        }
    
        return KeyItemLocationFactory.instance;
    }
}