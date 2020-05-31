import { PartnerName } from './../enums/partnerName';
import { Partner } from '../entities/partner';
import { EquipUpgradeType } from '../enums/equipUpgradeType';
import { EquipUpgrade } from '../entities/equipUpgrade';
import { KeyItem } from '../entities/keyItem';
import { KeyItemFactory } from './keyItemFactory';
import { EquipUpgradeFactory } from './equipUpgradeFactory';

export class PartnerFactory {
    private static instance: PartnerFactory;
    private keyItemFactory: KeyItemFactory
    private equipUpgradeFactory: EquipUpgradeFactory;

    public goombario = new Partner(
        PartnerName.GOOMBARIO,
        [] as KeyItem[],
        [] as Partner[],
        [this.equipUpgradeFactory.hammer],
        'kmr_02'      
    );

    public kooper = new Partner(
        PartnerName.KOOPER,
        [this.keyItemFactory.kooperShell],
        [],
        [this.equipUpgradeFactory.hammer],
        'nok_04'
    )

    //public bombette = new Partner(
    //    PartnerName.BOMBETTE,
    //    []
    //)

    private constructor() {
        this.equipUpgradeFactory = EquipUpgradeFactory.getInstance();
        this.keyItemFactory = KeyItemFactory.getInstance();
    }

    static getInstance(): PartnerFactory {
        if (!PartnerFactory.instance) {
            PartnerFactory.instance = new PartnerFactory();
        }
    
        return PartnerFactory.instance;
    }
}