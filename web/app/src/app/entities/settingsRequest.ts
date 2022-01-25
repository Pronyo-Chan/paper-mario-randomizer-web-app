export class SetingsRequest {
    BlocksMatchContent: boolean;
    AlwaysSpeedySpin: boolean;
    AlwaysISpy: boolean;
    AlwaysPeekaboo: boolean;
    HiddenBlockMode: number
    AllowPhysicsGlitches: boolean;
    InitialCoins: number;
    CapEnemyXP: boolean;
    NoXP: boolean;
    DoubleDamage: boolean;
    QuadrupleDamage: boolean;
    OHKO: boolean;
    NoSaveBlocks: boolean;
    NoHeartBlock: boolean;
    FlowerGateOpen: boolean;
    BlueHouseOpen: boolean;
    ToyboxOpen: boolean;
    WhaleOpen: boolean;
    ShuffleChapterDifficulty: boolean;
    RandomFormations: boolean;
    ShuffleItems: boolean;
    IncludeCoins: boolean;
    IncludeShops: boolean;
    IncludePanels: boolean;
    IncludeFavors: boolean;
    IncludeLetterChain: boolean;
    KeyitemsOutsideDungeon: boolean;
    ShuffleBadgesBP: boolean;
    ShuffleBadgesFP: boolean;
    ShufflePartnerFP: boolean;
    ShuffleStarpowerSP: boolean;
    RandomQuiz: boolean;
    SkipQuiz: boolean;
    PartnersInDefaultLocations: boolean;
    PartnersAlwaysUsable: boolean;
    StartWithRandomPartners: boolean;
    RandomPartnersMin: number;
    RandomPartnersMax: number;
    StartWithPartners: StartingPartners;
    WriteSpoilerLog : boolean;
    RandomCoinPalette: boolean;
    TurnOffMusic: boolean;
    IncludeDojo: boolean;
}

interface StartingPartners {
    Goombario: boolean;
    Kooper: boolean;
    Bombette: boolean;
    Parakarry: boolean;
    Bow: boolean;
    Watt: boolean;
    Sushie: boolean;
    Lakilester: boolean;
}