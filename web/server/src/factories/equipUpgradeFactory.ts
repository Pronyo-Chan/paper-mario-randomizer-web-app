import { EquipUpgradeType } from './../enums/equipUpgradeType';
import { KeyItemFactory } from './keyItemFactory';
import { EquipUpgrade } from './../entities/equipUpgrade';
import { PartnerFactory } from './partnerFactory';

export class EquipUpgradeFactory {
    private static instance: EquipUpgradeFactory;
    private partnerFactory: PartnerFactory
    private keyItemFactory: KeyItemFactory

    private constructor() {
        this.partnerFactory = PartnerFactory.getInstance();
        this.keyItemFactory = KeyItemFactory.getInstance();
    }

    public hammer = new EquipUpgrade(
        EquipUpgradeType.HAMMER,
        [],
        [],
        [],
        'kmr_04'
    );


    static getInstance(): EquipUpgradeFactory {
        if (!EquipUpgradeFactory.instance) {
            EquipUpgradeFactory.instance = new EquipUpgradeFactory();
        }
    
        return EquipUpgradeFactory.instance;
    }
}