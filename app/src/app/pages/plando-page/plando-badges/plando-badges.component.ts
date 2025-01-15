import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputFilterService } from "src/app/services/inputfilter.service";
import { pascalToVerboseString } from "src/app/utilities/stringFunctions";
import { MAX_BP_COST, MAX_FP_COST } from "../plando-page.component";

type Badge = {
    id: string;
    hasFPCost: boolean
}

export const BADGE_LIST: Array<Badge> = [
    { id: 'AllorNothing', hasFPCost: false },
    { id: 'AutoJump', hasFPCost: true },
    { id: 'AutoSmash', hasFPCost: true },
    { id: 'Autobounce', hasFPCost: true },
    { id: 'Berserker', hasFPCost: false },
    { id: 'BumpAttack', hasFPCost: false },
    { id: 'ChillOut', hasFPCost: false },
    { id: 'CloseCall', hasFPCost: false },
    { id: 'CrazyHeart', hasFPCost: false },
    { id: 'DDownJump', hasFPCost: true },
    { id: 'DDownPound', hasFPCost: true },
    { id: 'DamageDodge', hasFPCost: false },
    { id: 'DeepFocus', hasFPCost: false },
    { id: 'DefendPlus', hasFPCost: false },
    { id: 'DizzyAttack', hasFPCost: false },
    { id: 'DizzyStomp', hasFPCost: true },
    { id: 'DodgeMaster', hasFPCost: false },
    { id: 'DoubleDip', hasFPCost: true },
    { id: 'FPPlus', hasFPCost: false },
    { id: 'FeelingFine', hasFPCost: false },
    { id: 'FireShield', hasFPCost: false },
    { id: 'FirstAttack', hasFPCost: false },
    { id: 'FlowerFanatic', hasFPCost: false },
    { id: 'FlowerFinder', hasFPCost: false },
    { id: 'FlowerSaver', hasFPCost: false },
    { id: 'GroupFocus', hasFPCost: false },
    { id: 'HPDrain', hasFPCost: false },
    { id: 'HPPlus', hasFPCost: false },
    { id: 'HammerThrow', hasFPCost: true },
    { id: 'HappyFlower', hasFPCost: false },
    { id: 'HappyHeart', hasFPCost: false },
    { id: 'HealthyHealthy', hasFPCost: false },
    { id: 'HeartFinder', hasFPCost: false },
    { id: 'ISpy', hasFPCost: false },
    { id: 'IcePower', hasFPCost: false },
    { id: 'JumpCharge', hasFPCost: true },
    { id: 'LastStand', hasFPCost: false },
    { id: 'LuckyDay', hasFPCost: false },
    { id: 'MegaHPDrain', hasFPCost: false },
    { id: 'MegaJump', hasFPCost: true },
    { id: 'MegaQuake', hasFPCost: true },
    { id: 'MegaRush', hasFPCost: false },
    { id: 'MegaSmash', hasFPCost: true },
    { id: 'MiniJumpCharge', hasFPCost: true },
    { id: 'MiniSmashCharge', hasFPCost: true },
    { id: 'MoneyMoney', hasFPCost: false },
    { id: 'Multibounce', hasFPCost: true },
    { id: 'PDownDUp', hasFPCost: false },
    { id: 'PUpDDown', hasFPCost: false },
    { id: 'PayOff', hasFPCost: false },
    { id: 'Peekaboo', hasFPCost: false },
    { id: 'PowerBounce', hasFPCost: true },
    { id: 'PowerJump', hasFPCost: true },
    { id: 'PowerPlus', hasFPCost: false },
    { id: 'PowerQuake', hasFPCost: true },
    { id: 'PowerRush', hasFPCost: false },
    { id: 'PowerSmash', hasFPCost: true },
    { id: 'PrettyLucky', hasFPCost: false },
    { id: 'QuakeBounce', hasFPCost: true },
    { id: 'QuakeHammer', hasFPCost: true },
    { id: 'QuickChange', hasFPCost: false },
    { id: 'Refund', hasFPCost: false },
    { id: 'RightOn', hasFPCost: false },
    { id: 'RunawayPay', hasFPCost: false },
    { id: 'ShrinkSmash', hasFPCost: true },
    { id: 'ShrinkStomp', hasFPCost: true },
    { id: 'SleepStomp', hasFPCost: true },
    { id: 'SmashCharge', hasFPCost: true },
    { id: 'SpeedySpin', hasFPCost: false },
    { id: 'SpikeShield', hasFPCost: false },
    { id: 'SpinAttack', hasFPCost: false },
    { id: 'SpinSmash', hasFPCost: true },
    { id: 'SuperFocus', hasFPCost: false },
    { id: 'SuperJump', hasFPCost: true },
    { id: 'SuperJumpCharge', hasFPCost: true },
    { id: 'SuperSmash', hasFPCost: true },
    { id: 'SuperSmashCharge', hasFPCost: true },
    { id: 'TripleDip', hasFPCost: true },
    { id: 'ZapTap', hasFPCost: false }
]

@Component({
    selector: 'app-plando-badges',
    templateUrl: './plando-badges.component.html',
    styleUrls: ['../plando-page.component.scss', './plando-badges.component.scss']
})
export class PlandoBadgesComponent {
    @Input() badgeMoveCostsFormGroup: FormGroup;
    constructor(public inputFilters: InputFilterService) { };
    public readonly MAX_FP: number = MAX_FP_COST;
    public readonly MAX_BP: number = MAX_BP_COST;
    public readonly BADGES = BADGE_LIST;
    public toDisplayString = pascalToVerboseString;
}
