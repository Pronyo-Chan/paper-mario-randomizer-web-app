import { BowserDoorQuiz } from './enum/bowserDoorQuiz';
import { KootFavorsMode } from './enum/kootFavorsMode';
import { LettersMode } from './enum/lettersMode';
import { BowSprite } from './enum/bowSprite';
import { CoinColor } from './enum/coinColor';
import { GoombarioSprite } from './enum/goombarioSprite';
import { ItemTrapMode } from './enum/itemTrapMode';
import { KooperSprite } from './enum/kooperSprite';
import { MarioSprite } from './enum/marioSprite';
import { SpriteSetting } from './enum/spriteSetting';
import { SushieSprite } from './enum/sushieSprite';
import { WattSprite } from './enum/wattSprite';
import { LakilesterSprite } from './enum/lakilesterSprite';
import { MusicMode } from './enum/musicMode';
import { StatusBarColorMode } from './enum/statusBarColorMode';
import { MirrorMode } from './enum/mirrorMode';
import { SeedGoal } from './enum/seedGoal';
import { DungeonEntranceShuffleMode as DungeonEntranceShuffleMode } from './enum/DungeonEntranceShuffleMode';
import { PartnerShuffleMode } from './enum/partnerShuffleMode';
import { BossShuffleMode } from './enum/BossShuffleMode';
import { MultiCoinBlockShuffle } from './enum/MultiCoinBlockShuffle';
import { KentCKoopa } from './enum/kentCKoopa';

export interface SettingsRequest {
    StarRodModVersion: number;
    SettingsString: string;
    AlwaysSpeedySpin: boolean;
    AlwaysISpy: boolean;
    AlwaysPeekaboo: boolean;
    HiddenBlockMode: number;
    AllowPhysicsGlitches: boolean;
    StartingCoins: number;
    CapEnemyXP: boolean;
    XPMultiplier: number;
    DoubleDamage: boolean;
    QuadrupleDamage: boolean;
    OHKO: boolean;
    NoSaveBlocks: boolean;
    NoHeartBlocks: boolean;
    MagicalSeedsRequired: number;
    BlueHouseOpen: boolean;
    ToyboxOpen: boolean;
    WhaleOpen: boolean;
    Ch7BridgeVisible: boolean;
    MtRuggedOpen: boolean;
    ForeverForestOpen: boolean;
    PrologueOpen: boolean;
    ShuffleChapterDifficulty: boolean;
    ProgressiveScaling: boolean;
    RandomFormations: boolean;
    BossShuffleMode: BossShuffleMode;
    RandomizePuzzles: boolean;
    ShuffleDungeonEntrances: DungeonEntranceShuffleMode;
    MirrorMode: MirrorMode;
    StaticMapMirroring: boolean;
    ShuffleItems: boolean;
    IncludeCoinsOverworld: boolean;
    IncludeCoinsBlocks: boolean;
    IncludeCoinsFavors: boolean;
    IncludeCoinsFoliage: boolean;
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
    PartnerShuffle: PartnerShuffleMode;
    PartnersAlwaysUsable: boolean;
    StartWithRandomPartners: boolean;
    RandomPartnersMin?: number;
    RandomPartnersMax?: number;
    StartWithPartners?: StartingPartners;
    WriteSpoilerLog : boolean;
    RevealLogInHours : boolean;
    RomanNumerals: boolean;
    IncludeDojo: number;
    BowsersCastleMode: boolean;
    CutsceneMode: number;
    SkipEpilogue: boolean;
    ColorMode: StatusBarColorMode;
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
    ParakarrySetting: SpriteSetting;
    ParakarrySprite: KooperSprite;
    BowSetting: SpriteSetting;
    BowSprite: BowSprite;
    WattSetting: SpriteSetting;
    WattSprite: WattSprite;
    SushieSetting: SpriteSetting;
    SushieSprite: SushieSprite;
    LakilesterSetting: SpriteSetting;
    LakilesterSprite: LakilesterSprite;
    BossesSetting: SpriteSetting;
    NPCSetting: SpriteSetting;
    EnemiesSetting: SpriteSetting;
    HammerSetting: SpriteSetting;
    StartingMaxHP: number;
    StartingMaxFP: number;
    StartingMaxBP: number;
    RandomStartingStatsLevel: number;
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
    StartingItemF?: number;
    ItemQuality: number;
    RandomConsumableMode: number;
    StarWaySpiritsNeededCnt: number;
    RequireSpecificSpirits: boolean;
    ShuffleStarBeam: boolean;
    StarBeamSpiritsNeeded: number;
    StarBeamPowerStarsNeeded: number;
    LimitChapterLogic: boolean;
    FoliageItemHints: boolean;
    RandomText: boolean;
    NoHealingItems: boolean;
    DropStarPoints: boolean;
    ChetRippoAvailable: boolean;
    StartWithRandomItems: boolean;
    RandomItemsMin: number;
    RandomItemsMax: number;
    AddItemPouches: boolean;
    AddUnusedBadgeDuplicates: boolean;
    AddBetaItems: boolean;
    ProgressiveBadges: boolean;
    BadgePoolLimit: number;
    RandomChoice: boolean; // Mystery Random On Every Use
    MysteryRandomPick: boolean; // Mystery Random Pick
    ItemTrapMode: ItemTrapMode;
    AllowItemHints: boolean;
    IncludeRadioTradeEvent: boolean;
    MultiCoinBlockShuffle: MultiCoinBlockShuffle;
    BowserDoorQuiz: BowserDoorQuiz;
    KentCKoopa: KentCKoopa;
    RandomPitch: boolean;
    MuteDangerBeeps: boolean;
    ShuffleMusic: boolean;
    ShuffleMusicMode: MusicMode;
    ShuffleJingles: boolean;
    HiddenPanelVisibility: number;
    ISpyPanelHints: number;
    CookWithoutFryingPan: boolean;
    GearShuffleMode: number;
    PartnerUpgradeShuffle: number;
    RipCheatoItemsInLogic: number;
    MerlowRewardPricing: number;
    ProgressionOnRowf: number;
    ProgressionOnMerlow: boolean;
    StarWayPowerStarsNeeded: number;
    StarHuntTotal: number;
    SeedGoal: SeedGoal;

    // Glitches: Goomba Region
    PrologueGelEarly: boolean
    ReverseGoombaKingBridge: boolean
    GoombaVillageEntryFenceClip: boolean
    GoombaVillageNpcLureExit: boolean
    HammerlessJrPlaygroundLaki: boolean
    GoombaVillageLakiExit: boolean
    PrologueSushieGlitchKsj: boolean
    PrologueSushieGlitchUltraBootsLaki: boolean

    // Glitches: Toad Town
    OddKeyEarly: boolean
    BlueHouseSkip: boolean
    BlueHouseSkipLaki: boolean
    BlueHouseSkipToadLure: boolean
    JumplessDaneTLetters: boolean
    BowlessToyBoxHammer: boolean
    BowlessToyBoxHammerlessLure: boolean
    EarlyStoreroomParakarry: boolean
    EarlyStoreroomHammer: boolean
    EarlyStoreroomHammerlessLure: boolean
    WhaleEarly: boolean
    SushielessToadTownStarPiece: boolean
    ToadTownSushieGlitchGearless: boolean
    ToadTownSushieGlitchOneGear: boolean
    ToadTownSushieGlitchFullGear: boolean
    JumplessSummitClimb: boolean

    // Glitches: Toad Town Tunnels
    ClippyBootsStoneBlockSkip: boolean
    ClippyBootsMetalBlockSkip: boolean
    IslandPipeBlooperSkip: boolean
    ParakarrylessSewerStarPiece: boolean
    ClippySewersUpgradeBlock: boolean
    SewerBlocksWithoutUltraBoots: boolean
    Chapter7BridgeWithSuperBoots: boolean
    FirstBlockToShiverCityWithoutSuperBoots: boolean
    BlocksToShiverCityWithKooperShellItemThrow: boolean
    SewerYellowBlockWithUltraBoots: boolean
    JumplessSewerShootingStar: boolean

    // Glitches: Plesant Path
    KooperlessPleasantPathStarPiece: boolean
    HammerlessPleasantPathBridgeUltraBootsParakarry: boolean
    InvisibleBridgeClipLzs: boolean
    InvisibleBridgeClipLaki: boolean
    KooperlessPleasantPathThunderBolt: boolean
    JumplessKoopaVillageBluePipe: boolean

    // Glitches: Koopa Bros Fortress
    BombettelessKbfFpPlusLZS: boolean
    BombettelessKbfFpPlusLaki: boolean
    LakiJailbreak: boolean
    BombettelessRightFortressJailKey: boolean
    WaterStaircaseSkip: boolean

    // Glitches: Mt. Rugged
    MtRuggedQuakeHammerAndLetterWithLaki: boolean
    ParakarrylessMtRuggedSeed: boolean
    ParakarrylessMtRuggedSeedClippy: boolean
    BuzzarGapSkipClippy: boolean
    ParakarrylessMtRuggedStarPiece: boolean
    MtRuggedCoinsWithKooper: boolean
    MtRuggedStationJumplessClimbBombette: boolean
    MtRuggedStationJumplessClimbLaki: boolean
    JumplessMtRuggedTrainPlatformParakarry: boolean

    // Glitches: Dry Dry Desert
    DesertBrickBlockItemWithParakarry: boolean
    EarlyRuinsLakiJump: boolean
    EarlyRuinsUltraBoots: boolean

    // Glitches: Dry Dry Ruins
    ArtifactJumpLaki: boolean
    ArtifactJumpUltraBoots: boolean
    RuinsKeyLakiJump: boolean
    ParakarrylessSecondSandRoomUltraBoots: boolean
    ParakarrylessSecondSandRoomNormalBoots: boolean
    ParakarrylessSuperHammerRoomUltraBoots: boolean
    ParakarrylessSuperHammerRoomNormalBoots: boolean
    RuinsLocksSkipClippy: boolean
    RuinsStoneSkip: boolean
    RuinsPuzzleSolutionEarly: boolean

    // Glitches: Boo's Mansion
    JumplessMansionEntry: boolean
    ForeverForestBackwards: boolean
    RecordSkipNoBombettePush: boolean
    RecordSkipBombettePush: boolean
    BoosPortraitWithKooper: boolean
    BoosPortraitWithLaki: boolean

    // Glitches: Gusty Gulch
    GustyGulchGateSkipLZS: boolean
    GustyGulchGateSkipLaki: boolean
    KooperlessGustyGulchDizzyDialJump: boolean
    KooperlessGustyGulchDizzyDialLaki: boolean
    KooperlessGustyGulchDizzyDialParakarry: boolean
    GustyGulchGapSkip: boolean

    // Glitches: Tubba's Castle
    BowlessTubbasCastle: boolean
    TubbasTableLakiJumpClock: boolean
    TubbasTableUltraBoots: boolean
    TubbasCastleSuperBootsSkip: boolean
    JumplessMegaRush: boolean
    ParakarrylessMegaRush: boolean

    // Glitches: Toy Box
    ParakarrylessBlueBuildingStarPiece: boolean
    GourmetGuySkipJump: boolean
    GourmetGuySkipLaki: boolean
    GourmetGuySkipParakarry: boolean
    BowlessGreenStation: boolean
    ClippyGreenStationCoinBlock: boolean
    KooperlessRedStationShootingStar: boolean
    GearlessRedStationShootingStar: boolean
    ParakarrylessBlueBlockCityGap: boolean
    BlueSwitchSkipLaki: boolean
    BlueSwitchSkipUltraBoots: boolean
    RedBarricadeSkip: boolean
    WattlessDarkRoom: boolean
    HammerlessBlueStationLaki: boolean
    HammerlessPinkStationLaki: boolean

    // Glitches: Jade Jungle
    RaphSkipEnglish: boolean
    RaphSkipParakarry: boolean
    RaphSkipLakilester: boolean
    Ch5SushieGlitch: boolean
    SushielessJungleStarpieceAndLetter: boolean
    JumplessDeepJungleLaki: boolean

    // Glitches: Mt. Lavalava
    KooperlessLavalavaPowBlockParakarry: boolean
    KooperlessLavalavaPowBlockSuperBoots: boolean
    JumplessLavalavaPowBlock: boolean
    UltraHammerSkip: boolean
    UltraHammerSkipLaki: boolean
    UltraHammerSkipSushie: boolean
    Flarakarry: boolean
    ParakarrylessFlarakarryBombette: boolean
    ParakarrylessFlarakarryLaki: boolean
    VolcanoSushieGlitch: boolean
    VolcanoSushieGlitchGoombario: boolean

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
    BubbleBerryTreeUltraBoots: boolean

    // Glitches: Shiver Region
    MurderSolvedEarlyLaki: boolean
    MurderSolvedEarlyBombettePush: boolean
    Ch7SushieGlitch: boolean
    StarStoneWithCh7SushieGlitch: boolean
    ShiverMountainHiddenBlockWithoutUltraBootsLaki: boolean
    ShiverMountainHiddenBlockWithoutUltraBootsNoLaki: boolean
    SnowmenSkipLaki: boolean
    ShiverMountainSwitchSkip: boolean
    SushielessWarehouseKeyBombette: boolean
    SushielessWarehouseKeyKooper: boolean

    // Glitches: Crystal Palace
    MirrorClip: boolean
    KooperPuzzleSkip: boolean

    // Glitches: Bowser's Castle
    BowlessBowsersCastleBasement: boolean
    FastFloodRoomKooper: boolean
    FastFloodRoomKooperless: boolean
    FastFloodRoomBombetteUltraBoots: boolean
    Cannonless: boolean
    BombettelessBowsersCastleBasement: boolean
    WattlessDarkBasement: boolean
    BasementSkipParakarry: boolean
    BasementSkipLakilester: boolean
    BasementSkipHammer: boolean
    BowsersCastleHub1StairClip: boolean

    // Glitches: Global
    BreakStoneBlocksWithUltraBoots: boolean
    KnowsPuzzleSolutions: boolean
    BreakYellowBlocksWithSuperBoots: boolean
    KnowsHiddenBlocks: boolean
    ReachHighBlocksWithSuperBoots: boolean
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
