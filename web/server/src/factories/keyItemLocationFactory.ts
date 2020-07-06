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
            this.pulseStone,
            this.ruinsKey1,
            this.ruinsKey2,
            this.ruinsKey3,
            this.ruinsKey4,
            this.artefact,
            this.diamondStone,
            this.pyramidStone,
            this.lunarStone,
            this.record,
            this.weight,
            this.boosPortrait,
            this.castleKey1,
            this.castleKey2,
            this.castleKey3,
            this.mysticalKey,
            this.storeroomKey,
            this.calculator,
            this.toyTrain,
            this.fryingPan,
            this.mailBag,
            this.cookbook,
            this.dictionary,
            this.mysteryNote,
            this.boosPortrait,
            this.magicalSeed1,
            this.magicalSeed2,
            this.magicalSeed3,
            this.magicalSeed4,
            this.jadeRaven,
            this.ultraStone,
            this.volcanoVase,
            this.magicalBean,
            this.fertileSoil,
            this.crystalBerry,
            this.waterStone,
            this.miracleWater,
            this.warehouseKey,
            this.bucket,
            this.scarf,
            this.starStone,
            this.blueKey,
            this.redKey,
            this.palaceKey,
            this.firstDegreeCard,
            this.secondDegreeCard,
            this.thirdDegreeCard,
            this.fourthDegreeCard,
            this.diploma,
            this.oddKey,
            this.letter1,
            this.letter3,
            this.letter4,
            this.letter5,
            this.letter6,
            this.letter7,
            this.letter8,
            this.letter9,
            this.letter10,
            this.letter11,
            this.letter21,
            this.letter25
        ]
    }

    public dolly = new ItemLocation(
        KeyItem.DOLLY,
        ItemLocationType.KeyItem,
        [[EquipUpgrade.HAMMER]],
        'kmr_04',
        false,
        0
    );

    public kooperShell = new ItemLocation(
        KeyItem.KOOPER_SHELL,
        ItemLocationType.KeyItem,
        [[EquipUpgrade.HAMMER]],
        'nok_04',
        true,
        0
    );

    public fortressKey1 = new ItemLocation(
        KeyItem.FORTRESS_KEY_1,
        ItemLocationType.KeyItem,
        [[Partner.KOOPER, EquipUpgrade.HAMMER]],
        'trd_01',
        true,
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
        true,
        2
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
        true,
        3
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
        true,
        1
    );

    public pulseStone = new ItemLocation(
        KeyItem.PULSE_STONE,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, Partner.PARAKARRY, EquipUpgrade.HAMMER],
            [EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2]
        ],
        'dro_02',
        true,
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
        true,
        2
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
        true,
        3
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
        true,
        3
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
        true,
        3
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
        false,
        2
    );

    public diamondStone = new ItemLocation(
        KeyItem.DIAMOND_STONE,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
            [Partner.BOMBETTE, KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_2, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
        ],
        'isk_14',
        true,
        2
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
        true,
        2
    );

    public lunarStone = new ItemLocation(
        KeyItem.LUNAR_STONE,
        ItemLocationType.KeyItem,
        [
            [KeyItem.PULSE_STONE, KeyItem.RUINS_KEY_1, KeyItem.RUINS_KEY_2, KeyItem.RUINS_KEY_3, KeyItem.RUINS_KEY_4, EquipUpgrade.HAMMER, EquipUpgrade.HAMMER2],
        ],
        'isk_13',
        true,
        2
    );

    public record = new ItemLocation(
        KeyItem.RECORD,
        ItemLocationType.KeyItem,
        [
            [EquipUpgrade.HAMMER],
        ],
        'obk_08',
        true,
        1
    )

    public weight = new ItemLocation(
        KeyItem.WEIGHT,
        ItemLocationType.KeyItem,
        [
            [KeyItem.RECORD, EquipUpgrade.HAMMER],
        ],
        'obk_07',
        true,
        1
    );

    public boosPortrait = new ItemLocation(
        KeyItem.BOOS_PORTRAIT,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS2],
        ],
        'obk_06',
        true,
        1
    );

    public castleKey1 = new ItemLocation(
        KeyItem.CASTLE_KEY_1,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS2],
        ],
        'dgb_06',
        true,
        1
    );

    public castleKey2 = new ItemLocation(
        KeyItem.CASTLE_KEY_2,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, Partner.BOW, KeyItem.CASTLE_KEY_1, EquipUpgrade.HAMMER],
            [Partner.PARAKARRY, Partner.BOW, KeyItem.CASTLE_KEY_2, EquipUpgrade.HAMMER],
            [Partner.PARAKARRY, Partner.BOW, KeyItem.CASTLE_KEY_3, EquipUpgrade.HAMMER],
        ],
        'dgb_12',
        true,
        2
    );

    public castleKey3 = new ItemLocation(
        KeyItem.CASTLE_KEY_3,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, Partner.BOW, KeyItem.CASTLE_KEY_1, KeyItem.CASTLE_KEY_2, EquipUpgrade.HAMMER],
            [Partner.PARAKARRY, Partner.BOW, KeyItem.CASTLE_KEY_2, KeyItem.CASTLE_KEY_3, EquipUpgrade.HAMMER],
            [Partner.PARAKARRY, Partner.BOW, KeyItem.CASTLE_KEY_1, KeyItem.CASTLE_KEY_3, EquipUpgrade.HAMMER]
        ],
        'dgb_16',
        true,
        2
    );

    public mysticalKey = new ItemLocation(
        KeyItem.MYSTICAL_KEY,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, Partner.BOW, KeyItem.CASTLE_KEY_1, KeyItem.CASTLE_KEY_2, KeyItem.CASTLE_KEY_3, KeyItem.MYSTICAL_KEY, EquipUpgrade.HAMMER]
        ],
        'dgb_18',
        true,
        1
    );

    public storeroomKey = new ItemLocation(
        KeyItem.STOREROOM_KEY,
        ItemLocationType.KeyItem,
        [
            [Partner.BOW, EquipUpgrade.HAMMER]
        ],
        'omo_04',
        true,
        0
    );

    public calculator = new ItemLocation(
        KeyItem.CALCULATOR,
        ItemLocationType.KeyItem,
        [
            [Partner.BOW, EquipUpgrade.HAMMER]
        ],
        'omo_01',
        false,
        0
    );

    public toyTrain = new ItemLocation(
        KeyItem.TOY_TRAIN,
        ItemLocationType.KeyItem,
        [
            [KeyItem.STOREROOM_KEY, EquipUpgrade.HAMMER]
        ],
        'mac_04',
        true,
        0
    );

    public fryingPan = new ItemLocation(
        KeyItem.FRYING_PAN,
        ItemLocationType.KeyItem,
        [
            [Partner.BOW, KeyItem.TOY_TRAIN, EquipUpgrade.HAMMER]
        ],
        'omo_07',
        true,
        1
    );

    public mailBag = new ItemLocation(
        KeyItem.MAIL_BAG,
        ItemLocationType.KeyItem,
        [
            [Partner.BOW, KeyItem.TOY_TRAIN, EquipUpgrade.HAMMER]
        ],
        'omo_06',
        false,
        1
    );

    public cookbook = new ItemLocation(
        KeyItem.COOKBOOK,
        ItemLocationType.KeyItem,
        [
            [Partner.BOW, KeyItem.TOY_TRAIN, KeyItem.FRYING_PAN, EquipUpgrade.HAMMER]
        ],
        'omo_05',
        false,
        1
    );

    public dictionary = new ItemLocation(
        KeyItem.DICTIONARY,
        ItemLocationType.KeyItem,
        [
            [Partner.BOW, Partner.PARAKARRY, KeyItem.TOY_TRAIN, KeyItem.FRYING_PAN, EquipUpgrade.HAMMER]
        ],
        'omo_09',
        false,
        2
    );

    public mysteryNote = new ItemLocation(
        KeyItem.MYSTERY_NOTE,
        ItemLocationType.KeyItem,
        [
            [Partner.BOW, KeyItem.TOY_TRAIN, KeyItem.FRYING_PAN, EquipUpgrade.HAMMER]
        ],
        'omo_09',
        false,
        1
    );

    public magicalSeed1 = new ItemLocation(
        KeyItem.MAGICAL_SEED_1,
        ItemLocationType.KeyItem,
        [
            [EquipUpgrade.HAMMER],
        ],
        'mac_02',
        true,
        0
    );

    public magicalSeed2 = new ItemLocation(
        KeyItem.MAGICAL_SEED_2,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, Partner.BOMBETTE, EquipUpgrade.HAMMER],
            [Partner.PARAKARRY, EquipUpgrade.HAMMER2],
        ],
        'iwa_02',
        true,
        1
    );

    public magicalSeed3 = new ItemLocation(
        KeyItem.MAGICAL_SEED_3,
        ItemLocationType.KeyItem,
        [[EquipUpgrade.HAMMER]],
        'mim_04',
        true,
        0
    );

    public magicalSeed4 = new ItemLocation(
        KeyItem.MAGICAL_SEED_4,
        ItemLocationType.KeyItem,
        [
            [Partner.WATT, KeyItem.VOLCANO_VASE, EquipUpgrade.HAMMER],
            [Partner.SUSHIE, KeyItem.VOLCANO_VASE, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS2],
        ],
        'jan_03',
        true,
        2
    );

    public jadeRaven = new ItemLocation(
        KeyItem.JADE_RAVEN,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, Partner.WATT, Partner.SUSHIE, EquipUpgrade.HAMMER]
        ],
        'jan_02',
        true,
        1
    );

    public ultraStone = new ItemLocation(
        KeyItem.ULTRA_STONE,
        ItemLocationType.KeyItem,
        [
            [Partner.WATT, Partner.SUSHIE, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER],
            [Partner.SUSHIE, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS2],
        ],
        'jan_22',
        false,
        2
    )

    public volcanoVase = new ItemLocation(
        KeyItem.VOLCANO_VASE,
        ItemLocationType.KeyItem,
        [
            [Partner.WATT, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER3],
            [Partner.SUSHIE, KeyItem.JADE_RAVEN, EquipUpgrade.HAMMER3, EquipUpgrade.BOOTS2],
        ],
        'jan_04',
        true,
        2
    );

    public magicalBean = new ItemLocation(
        KeyItem.MAGICAL_BEAN,
        ItemLocationType.KeyItem,
        [
            [KeyItem.MAGICAL_SEED_1, KeyItem.MAGICAL_SEED_2, KeyItem.MAGICAL_SEED_3, KeyItem.MAGICAL_SEED_4, EquipUpgrade.HAMMER]
        ],
        'flo_03',
        true,
        3
    );

    public fertileSoil = new ItemLocation(
        KeyItem.FERTILE_SOIL,
        ItemLocationType.KeyItem,
        [
            [KeyItem.MAGICAL_SEED_1, KeyItem.MAGICAL_SEED_2, KeyItem.MAGICAL_SEED_3, KeyItem.MAGICAL_SEED_4, EquipUpgrade.HAMMER]
        ],
        'flo_07',
        true,
        4
    );

    public crystalBerry = new ItemLocation(
        KeyItem.CRYSTAL_BERRY,
        ItemLocationType.KeyItem,
        [
            [KeyItem.MAGICAL_SEED_1, KeyItem.MAGICAL_SEED_2, KeyItem.MAGICAL_SEED_3, KeyItem.MAGICAL_SEED_4, EquipUpgrade.HAMMER]
        ],
        'flo_07',
        true,
        3
    );

    public waterStone = new ItemLocation(
        KeyItem.WATER_STONE,
        ItemLocationType.KeyItem,
        [
            [KeyItem.MAGICAL_SEED_1, KeyItem.MAGICAL_SEED_2, KeyItem.MAGICAL_SEED_3, KeyItem.MAGICAL_SEED_4, KeyItem.CRYSTAL_BERRY, EquipUpgrade.HAMMER]
        ],
        'flo_12',
        true,
        3
    );

    public miracleWater = new ItemLocation(
        KeyItem.MIRACLE_WATER,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, Partner.SUSHIE, KeyItem.MAGICAL_SEED_1, KeyItem.MAGICAL_SEED_2, KeyItem.MAGICAL_SEED_3, KeyItem.MAGICAL_SEED_4, KeyItem.WATER_STONE, EquipUpgrade.HAMMER],
            [Partner.LAKILESTER, Partner.SUSHIE, KeyItem.MAGICAL_SEED_1, KeyItem.MAGICAL_SEED_2, KeyItem.MAGICAL_SEED_3, KeyItem.MAGICAL_SEED_4, KeyItem.WATER_STONE, EquipUpgrade.HAMMER],
        ],
        'flo_10',
        true,
        3
    );

    public warehouseKey = new ItemLocation(
        KeyItem.WAREHOUSE_KEY,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS3]
        ],
        'sam_11',
        true,
        2
    );

    public bucket = new ItemLocation(
        KeyItem.BUCKET,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, KeyItem.WAREHOUSE_KEY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS3]
        ],
        'sam_01',
        true,
        2
    );

    public scarf = new ItemLocation(
        KeyItem.SCARF,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, KeyItem.WAREHOUSE_KEY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS3]
        ],
        'sam_06',
        true,
        2
    );

    public starStone = new ItemLocation(
        KeyItem.STAR_STONE,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, Partner.KOOPER, Partner.BOMBETTE, KeyItem.WAREHOUSE_KEY, KeyItem.SCARF, KeyItem.BUCKET, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS3]
        ],
        'sam_12',
        true,
        3
    );

    public blueKey = new ItemLocation(
        KeyItem.BLUE_KEY,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, Partner.KOOPER, Partner.BOMBETTE, KeyItem.WAREHOUSE_KEY, KeyItem.SCARF, KeyItem.BUCKET, KeyItem.STAR_STONE, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS3]
        ],
        'pra_05',
        true,
        3
    );

    public redKey = new ItemLocation(
        KeyItem.RED_KEY,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, Partner.KOOPER, Partner.BOMBETTE, KeyItem.WAREHOUSE_KEY, KeyItem.SCARF, KeyItem.BUCKET, KeyItem.STAR_STONE, KeyItem.BLUE_KEY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS3]
        ],
        'pra_11',
        true,
        3
    );

    public palaceKey = new ItemLocation(
        KeyItem.PALACE_KEY,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, Partner.KOOPER, Partner.BOMBETTE, KeyItem.WAREHOUSE_KEY, KeyItem.SCARF, KeyItem.BUCKET, KeyItem.STAR_STONE, KeyItem.RED_KEY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS3]
        ],
        'pra_27',
        true,
        3
    );

    public firstDegreeCard = new ItemLocation(
        KeyItem.FIRST_DEGREE_CARD,
        ItemLocationType.KeyItem,
        [
            [EquipUpgrade.HAMMER]
        ],
        'mac_00',
        false,
        0
    );

    public secondDegreeCard = new ItemLocation(
        KeyItem.SECOND_DEGREE_CARD,
        ItemLocationType.KeyItem,
        [
            [EquipUpgrade.HAMMER]
        ],
        'mac_00',
        false,
        0
    );

    public thirdDegreeCard = new ItemLocation(
        KeyItem.THIRD_DEGREE_CARD,
        ItemLocationType.KeyItem,
        [
            [EquipUpgrade.HAMMER2, EquipUpgrade.BOOTS2]
        ],
        'mac_00',
        false,
        1
    );

    public fourthDegreeCard = new ItemLocation(
        KeyItem.FOURTH_DEGREE_CARD,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, Partner.KOOPER, Partner.BOMBETTE, KeyItem.WAREHOUSE_KEY, KeyItem.SCARF, KeyItem.BUCKET, KeyItem.STAR_STONE, KeyItem.RED_KEY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS3]
        ],
        'mac_00',
        false,
        2
    );
    
    public diploma = new ItemLocation(
        KeyItem.DIPLOMA,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, Partner.KOOPER, Partner.BOMBETTE, KeyItem.WAREHOUSE_KEY, KeyItem.SCARF, KeyItem.BUCKET, KeyItem.STAR_STONE, KeyItem.RED_KEY, KeyItem.PALACE_KEY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS3]
        ],
        'mac_00',
        false,
        2
    );

    public oddKey = new ItemLocation(
        KeyItem.ODD_KEY,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, EquipUpgrade.BOOTS3]
        ],
        'mac_02',
        false,
        2
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
        true,
        1
    );

    public letter3 = new ItemLocation(
        KeyItem.LETTER_03,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, Partner.BOMBETTE, EquipUpgrade.HAMMER],
            [EquipUpgrade.HAMMER2]
        ],
        'sbk_36',
        false,
        1
    );

    public letter4 = new ItemLocation(
        KeyItem.LETTER_04,
        ItemLocationType.KeyItem,
        [
            [Partner.WATT, Partner.SUSHIE, EquipUpgrade.HAMMER],
            [Partner.SUSHIE, EquipUpgrade.BOOTS2, EquipUpgrade.HAMMER]
        ],
        'jan_04',
        false,
        1
    );

    public letter5 = new ItemLocation(
        KeyItem.LETTER_05,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, KeyItem.WAREHOUSE_KEY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS3]
        ],
        'sam_04',
        false,
        1
    );

    public letter6 = new ItemLocation(
        KeyItem.LETTER_06,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, KeyItem.WAREHOUSE_KEY, EquipUpgrade.HAMMER, EquipUpgrade.BOOTS3]
        ],
        'sam_05',
        false,
        1
    );

    public letter7 = new ItemLocation(
        KeyItem.LETTER_07,
        ItemLocationType.KeyItem,
        [
            [Partner.SUSHIE, KeyItem.BOOS_PORTRAIT, EquipUpgrade.HAMMER]
        ],
        'arn_02',
        false,
        1
    );

    public letter8 = new ItemLocation(
        KeyItem.LETTER_08,
        ItemLocationType.KeyItem,
        [
            [Partner.PARAKARRY, Partner.BOMBETTE, EquipUpgrade.HAMMER],
            [EquipUpgrade.HAMMER2]
        ],
        'dro_02',
        false,
        1
    );

    public letter9 = new ItemLocation(
        KeyItem.LETTER_08,
        ItemLocationType.KeyItem,
        [
            [Partner.LAKILESTER, KeyItem.MAGICAL_SEED_1, KeyItem.MAGICAL_SEED_2, KeyItem.MAGICAL_SEED_3, KeyItem.MAGICAL_SEED_4, EquipUpgrade.HAMMER],
        ],
        'flo_17',
        false,
        2
    );

    public letter10 = new ItemLocation(
        KeyItem.LETTER_10,
        ItemLocationType.KeyItem,
        [
            [Partner.BOMBETTE, EquipUpgrade.HAMMER],
            [EquipUpgrade.HAMMER2]
        ],
        'iwa_04',
        true,
        1
    );

    public letter11 = new ItemLocation(
        KeyItem.LETTER_11,
        ItemLocationType.KeyItem,
        [
            [Partner.WATT, EquipUpgrade.HAMMER],
            [Partner.SUSHIE, EquipUpgrade.BOOTS2],
        ],
        'jan_01',
        false,
        1
    );

    public letter21 = new ItemLocation(
        KeyItem.LETTER_21,
        ItemLocationType.KeyItem,
        [
            [Partner.WATT, EquipUpgrade.HAMMER],
            [Partner.SUSHIE, EquipUpgrade.BOOTS2],
        ],
        'mac_03',
        false,
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
        true,
        1
    );

    static getInstance(): KeyItemLocationFactory {
        if (!KeyItemLocationFactory.instance) {
            KeyItemLocationFactory.instance = new KeyItemLocationFactory();
        }
    
        return KeyItemLocationFactory.instance;
    }
}