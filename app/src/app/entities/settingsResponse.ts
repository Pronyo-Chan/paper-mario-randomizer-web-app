import { ParakarrySprite } from './enum/parakarrySprite';
import { KootFavorsMode } from './enum/kootFavorsMode';
import { LettersMode } from './enum/lettersMode';
import { ItemTrapMode } from './enum/itemTrapMode';
import { BowSprite } from "./enum/bowSprite";
import { CoinColor } from "./enum/coinColor";
import { GoombarioSprite } from "./enum/goombarioSprite";
import { KooperSprite } from "./enum/kooperSprite";
import { MarioSprite } from "./enum/marioSprite";
import { SpriteSetting } from "./enum/spriteSetting";
import { WattSprite } from './enum/wattSprite';
import { SushieSprite } from './enum/sushieSprite';
import { BowsersCastleMode } from './enum/bowsersCastleMode';
import { BombetteSprite } from './enum/bombetteSprite';

export interface SettingsResponse{
    SeedID: string;
    CreationDate: Date;
    StarRodModVersion: number;
    SettingsString: string;
    AlwaysSpeedySpin: boolean;
    AlwaysISpy: boolean;
    AlwaysPeekaboo: boolean;
    HiddenBlockMode: number;
    AllowPhysicsGlitches: boolean;
    StartingCoins: number;
    CapEnemyXP: boolean;
    NoXP: boolean;
    DoubleDamage: boolean;
    QuadrupleDamage: boolean;
    OHKO: boolean;
    NoSaveBlocks: boolean;
    NoHeartBlocks: boolean;
    MagicalSeedsRequired: number;
    BlueHouseOpen: boolean;
    ToyboxOpen: boolean;
    WhaleOpen: boolean;
    ShuffleChapterDifficulty: boolean;
    ProgressiveScaling: boolean;
    RandomFormations: boolean;
    ShuffleItems: boolean;
    IncludeCoins: boolean;
    IncludeShops: boolean;
    IncludePanels: boolean;
    IncludeFavorsMode: KootFavorsMode;
    IncludeLettersMode: LettersMode;
    KeyitemsOutsideDungeon: boolean;
    RandomBadgesBP: number;
    RandomBadgesFP: number;
    RandomPartnerFP: number;
    RandomStarpowerSP: number;
    RandomQuiz: boolean;
    SkipQuiz: boolean;
    QuizmoAlwaysAppears: boolean;
    PartnersInDefaultLocations: boolean;
    PartnersAlwaysUsable: boolean;
    StartWithRandomPartners: boolean;
    RandomPartnersMin: number;
    RandomPartnersMax: number;
    StartWithPartners: StartingPartners;
    WriteSpoilerLog : boolean;
    RevealLogAtTime : string;
    RomanNumerals: boolean;
    IncludeDojo: boolean;
    BowsersCastleMode: BowsersCastleMode;
    ShortenCutscenes: boolean;
    SkipEpilogue: boolean;
    Box5ColorA: number;
    Box5ColorB: number;
    RandomCoinColor: boolean;
    CoinColor: CoinColor;
    MarioSetting: SpriteSetting;
    MarioSprite: MarioSprite;
    GoombarioSetting: SpriteSetting;
    GoombarioSprite: GoombarioSprite;
    KooperSetting: SpriteSetting;
    KooperSprite: KooperSprite;
    BombetteSetting: SpriteSetting;
    BombetteSprite: BombetteSprite;
    ParakarrySetting: SpriteSetting;
    ParakarrySprite: ParakarrySprite;
    BowSetting: SpriteSetting;
    BowSprite: BowSprite;
    WattSetting: SpriteSetting;
    WattSprite: WattSprite;
    SushieSetting: SpriteSetting;
    SushieSprite: SushieSprite;
    BossesSetting: SpriteSetting;
    NPCSetting: SpriteSetting;
    EnemiesSetting: SpriteSetting;
    StartingMaxHP: number;
    StartingMaxFP: number;
    StartingMaxBP: number;
    StartingStarPower: number;
    StartingBoots: number;
    StartingHammer: number;
    StartingItem0: number;
    StartingItem1: number;
    StartingItem2: number;
    StartingItem3: number;
    StartingItem4: number;
    StartingItem5: number;
    StartingItem6: number;
    StartingItem7: number;
    StartingItem8: number;
    StartingItem9: number;
    StartingItemA: number;
    StartingItemB: number;
    StartingItemC: number;
    StartingItemD: number;
    StartingItemE: number;
    StartingItemF: number;
    ItemScarcity: number;
    StarWaySpiritsNeeded: number;
    FoliageItemHints: boolean;
    RandomText: boolean;
    NoHealingItems: boolean;
    StartWithRandomItems: boolean;
    RandomItemsMin: number;
    RandomItemsMax: number;
    AddItemPouches: boolean;
    RandomChoice: boolean; // Mystery Random On Every Use
    MysteryRandomPick: boolean; // Mystery Random Pick
    ItemTrapMode: ItemTrapMode
    AllowItemHints: boolean;
    IncludeRadioTradeEvent: boolean;
    ShuffleBlocks: boolean;
    RandomPitch: boolean;
    HiddenPanelVisibility: number;
    GearShuffleMode: number;

    // Glitches: Goomba Region
    PrologueGelEarly: boolean

    // Glitches: Toad Town
    OddKeyEarly: boolean
    BlueHouseSkip: boolean
    BlueHouseSkipLaki: boolean
    BlueHouseSkipToadLure: boolean
    BowlessToyBox: boolean
    EarlyStoreroomParakarry: boolean
    EarlyStoreroomHammer: boolean
    WhaleEarly: boolean
    SushielessToadTownStarPiece: boolean

    // Glitches: Toad Town Tunnels
    ClippyBootsStoneBlockSkip: boolean
    ClippyBootsMetalBlockSkip: boolean
    IslandPipeBlooperSkip: boolean
    ParakarrylessSewerStarPiece: boolean
    SewerBlocksWithoutUltraBoots: boolean

    // Glitches: Plesant Path
    KooperlessPleasantPathStarPiece: boolean
    InvisibleBridgeClipLzs: boolean
    InvisibleBridgeClipLaki: boolean
    KooperlessPleasantPathThunderBolt: boolean

    // Glitches: Koopa Bros Fortress
    BombettelessKbfFpPlusLZS: boolean
    BombettelessKbfFpPlusLaki: boolean
    LakiJailbreak: boolean
    BombettelessRightFortressJailKey: boolean

    // Glitches: Mt. Rugged
    MtRuggedQuakeHammerAndLetterWithLaki: boolean
    ParakarrylessMtRuggedSeed: boolean
    BuzzarGapSkipClippy: boolean
    ParakarrylessMtRuggedStarPiece: boolean

    // Glitches: Dry Dry Desert
    DesertBrickBlockItemWithParakarry: boolean
    EarlyRuinsLakiJump: boolean
    EarlyRuinsUltraBoots: boolean

    // Glitches: Dry Dry Ruins
    ArtifactJump: boolean
    RuinsKeyLakiJump: boolean
    ParakarylessSecondSandRoomUltraBoots: boolean
    ParakarylessSecondSandRoomNormalBoots: boolean
    ParakarylessSuperHammerRoomUltraBoots: boolean
    ParakarylessSuperHammerRoomNormalBoots: boolean
    RuinsLocksSkipClippy: boolean

    // Glitches: Boo's Mansion
    RecordSkipNoBombettePush: boolean
    RecordSkipBombettePush: boolean
    BoosPortraitWithKooper: boolean
    BoosPortraitWithLaki: boolean

    // Glitches: Gusty Gulch
    GustyGulchGateSkipLZS: boolean
    KooperlessGustyGulchDizzyDialJump: boolean
    KooperlessGustyGulchDizzyDialLaki: boolean
    KooperlessGustyGulchDizzyDialParakarry: boolean
    GustyGulchGapSkip: boolean

    // Glitches: Tubba's Castle
    BowlessTubbasCastle: boolean
    TubbasTableLakiJump: boolean
    TubbasCastleSuperBootsSkip: boolean
    ParakarrylessMegaRush: boolean

    // Glitches: Toy Box
    ParakarrylessBlueBuildingStarPiece: boolean
    GourmetGuySkipJump: boolean
    GourmetGuySkipLaki: boolean
    GourmetGuySkipParakarry: boolean
    BowlessGreenStation: boolean
    KooperlessRedStationShootingStar: boolean

    // Glitches: Jade Jungle
    RaphSkipEnglish: boolean
    Ch5SushieGlitch: boolean

    // Glitches: Mt. Lavalava
    KooperlessLavalavaPowBlock: boolean
    UltraHammerSkip: boolean
    Flarakarry: boolean
    ParakarrylessFlarakarryBombette: boolean
    ParakarrylessFlarakarryLaki: boolean

    // Glitches: Flower Fields
    EarlyLakiLZS: boolean
    EarlyLakiBombettePush: boolean
    BombettelessMegaSmash: boolean
    SunTowerSkip: boolean
    YellowBerryGateSkipLZS: boolean
    YellowBerryGateSkipLaki: boolean
    YellowBerryGateSkipBombettePush: boolean
    RedBerryGateSkipBombettePush: boolean
    RedBerryGateSkipLaki: boolean
    BlueBerryGateSkipBombettePush: boolean
    BlueBerryGateSkipLaki: boolean
    BubbleBerryTreeLakiJump: boolean

    // Glitches: Shiver Region
    MurderSolvedEarlyLaki: boolean
    MurderSolvedEarlyBombettePush: boolean
    Ch7SushieGlitch: boolean
    ShiverMountainHiddenBlockWithoutUltraBootsLaki: boolean
    ShiverMountainHiddenBlockWithoutUltraBootsNoLaki: boolean

    // Glitches: Crystal Palace
    MirrorClip: boolean

    // Glitches: Bowser's Castle
    BowlessBowsersCastleBasement: boolean
    FastFloodRoomKooper: boolean
    FastFloodRoomBombetteUltraBoots: boolean

    // Glitches: Global
    BreakMetalBlocksWithUltraBoots: boolean
    KnowsPuzzleSolutions: boolean
    BreakYellowBlocksWithSuperBoots: boolean
    KnowsHiddenBlocks: boolean
}

export interface StartingPartners {
    Goombario: boolean;
    Kooper: boolean;
    Bombette: boolean;
    Parakarry: boolean;
    Bow: boolean;
    Watt: boolean;
    Sushie: boolean;
    Lakilester: boolean;
}