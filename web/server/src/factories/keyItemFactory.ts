import { KeyItem } from './../entities/keyItem';
import { PartnerFactory } from './partnerFactory';
import { EquipUpgradeFactory } from './equipUpgradeFactory';

export class KeyItemFactory {
    private static instance: KeyItemFactory;
    private partnerFactory: PartnerFactory
    private equipUpgradeFactory: EquipUpgradeFactory;

    private constructor() {
        this.partnerFactory = PartnerFactory.getInstance();
        this.equipUpgradeFactory = EquipUpgradeFactory.getInstance();
    }

    public dolly = new KeyItem(
        'Dolly',
        [],
        [],
        [],
        'kmr_04'
    );

    public kooperShell = new KeyItem(
        'KooperShell',
        [],
        [],
        [this.equipUpgradeFactory.hammer],
        'nok_04'
    );

    public fortressKey1 = new KeyItem(
        'FortressKey',
        [],
        [this.partnerFactory.kooper],
        [this.equipUpgradeFactory.hammer],
        'trd_01'
    );



    static getInstance(): KeyItemFactory {
        if (!KeyItemFactory.instance) {
            KeyItemFactory.instance = new KeyItemFactory();
        }
    
        return KeyItemFactory.instance;
    }
}