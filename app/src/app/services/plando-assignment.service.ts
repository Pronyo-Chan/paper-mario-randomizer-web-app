import { Injectable } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { CheckType, DOJO_CHECK_VALUES, DUNEGON_KEYS, GEAR_LOCATIONS, KEY_TO_DUNGEON, KOOT_FAVOR_CHECKS, KOOT_FAVOR_ITEMS, LETTER_CHAIN_CHECKS, PARTNERS, PROGRESSIVE_BADGES, REGIONS_LIST, ROWF_MERLOW_BADGES, SPIRIT_TO_HOME_CHAPTER_REGIONS, STAR_SPIRITS, SUPER_BLOCK_LOCATIONS, VANILLA_ITEMS } from "../pages/plando-page/plando-constants";
import { CustomValidators } from "../utilities/custom.validators";

@Injectable({
  providedIn: 'root'
})
export class PlandoAssignmentService {
  public assignedControls: BehaviorSubject<Set<string>> = new BehaviorSubject(new Set([]));

  constructor() { }

  public updatePlandoAssignedControls(randoSettingsFormGroup: FormGroup, plando: any) {
    const plandoAssignedControls: Set<string> = new Set();
    if (plando && Object.keys(plando).length) {
      let ripCheatoChecks: number = 0;
      let dojoChecks: number = 0;
      let kootFavors: number = 0;
      let powerStars: number = 0;
      let traps: number = 0;
      let gearShuffle: number = 0;
      let spiritShuffle: number = 0;
      let partnerShuffle: number = 0;
      let partnerUpgradeShuffle: number = 0;
      let letterShuffle: number = 0;
      let partnersPlandoed: number = 0;
      const rowfSets: Set<string> = new Set();
      if (plando['items']) {
        randoSettingsFormGroup.get('items').get('shuffleItems').setValue(true);
        plandoAssignedControls.add('shuffleItems');
        const plandoCheckTypes: Set<CheckType> = new Set();
        const plandoRegions = plando['items'];
        for (const region of REGIONS_LIST) {
          if (plandoRegions[region.name]) {
            const plandoChecks = plandoRegions[region.name];
            for (const check of region.checks) {
              if (plandoChecks[check.name]) {
                const plandoItem = check.type === CheckType.SHOP ? plandoChecks[check.name].item : plandoChecks[check.name];

                if (!plandoItem) {
                  continue;
                }
                if (VANILLA_ITEMS[region.name][check.name] !== plandoItem) {
                  plandoCheckTypes.add(check.type);
                }

                if (DUNEGON_KEYS.has(plandoItem)
                  && (KEY_TO_DUNGEON[plandoItem] !== region.name)) {
                  randoSettingsFormGroup.get('items').get('keyitemsOutsideDungeon').setValue(true);
                  plandoAssignedControls.add('keyitemsOutsideDungeon');
                }

                if (VANILLA_ITEMS[region.name][check.name] !== plandoItem
                  && (plandoItem === 'ProgressiveHammer' || plandoItem === 'ProgressiveBoots')) {
                  if (!GEAR_LOCATIONS.has(check.name)) {
                    gearShuffle = 2;
                  } else {
                    gearShuffle = Math.max(gearShuffle, 1);
                  }
                }

                if (KOOT_FAVOR_ITEMS.has(plandoItem) && KOOT_FAVOR_CHECKS[check.name] !== plandoItem) {
                  kootFavors = 2;
                }

                if (PARTNERS.has(plandoItem)) {
                  randoSettingsFormGroup.get(['partners', 'startWithPartners', plandoItem.toLowerCase()]).setValue(false);
                  plandoAssignedControls.add(plandoItem.toLowerCase());
                  partnersPlandoed++;
                  if (!check.name.endsWith(' Partner')) {
                    partnerShuffle = 2;
                  } else if (VANILLA_ITEMS[region.name][check.name] !== plandoItem) {
                    partnerShuffle = Math.max(partnerShuffle, 1);
                  }
                }

                if (STAR_SPIRITS.has(plandoItem) && VANILLA_ITEMS[region.name][check.name] !== plandoItem) {
                  if (!SPIRIT_TO_HOME_CHAPTER_REGIONS[plandoItem].includes(region.name)) {
                    spiritShuffle = 2;
                  } else {
                    spiritShuffle = Math.max(spiritShuffle, 1);
                  }
                }

                if (PROGRESSIVE_BADGES.has(plandoItem)) {
                  randoSettingsFormGroup.get('itemPool').get('progressiveBadges').setValue(true);
                  plandoAssignedControls.add('progressiveBadges');
                }

                if (ROWF_MERLOW_BADGES.has(plandoItem)) {
                  plandoCheckTypes.add(CheckType.SHOP);
                }

                if (check.type === CheckType.LETTER_REWARD && VANILLA_ITEMS[region.name][check.name] !== plandoItem) {
                  if (LETTER_CHAIN_CHECKS.has(check.name)) {
                    letterShuffle = 3;
                  } else if (check.name === 'Goomba Village - Goompapa Letter Reward 2') {
                    letterShuffle = Math.max(letterShuffle, 2);
                  } else {
                    letterShuffle = Math.max(letterShuffle, 1);
                  }
                }

                if (plandoItem === 'StarBeam'
                  && check.name !== 'Star Sanctuary - Gift of the Stars') {
                  randoSettingsFormGroup.get('goals').get('shuffleStarBeam').setValue(true);
                  plandoAssignedControls.add('shuffleStarBeam');
                }

                if (plandoItem === 'PowerStar') {
                  randoSettingsFormGroup.get('goals').get('includePowerStars').setValue(true);
                  plandoAssignedControls.add('includePowerStars');
                  powerStars++;
                }

                if (plandoItem === 'ItemPouch') {
                  randoSettingsFormGroup.get('itemPool').get('itemPouches').setValue(true);
                  plandoAssignedControls.add('itemPouches');
                }

                if (plandoItem.includes('Upgrade') && VANILLA_ITEMS[region.name][check.name] !== plandoItem) {
                  if (!SUPER_BLOCK_LOCATIONS.has(check.name)) {
                    partnerUpgradeShuffle = 2;
                  } else {
                    partnerUpgradeShuffle = Math.max(partnerUpgradeShuffle, 1);
                  }
                }

                if (plandoItem.includes('TRAP')) {
                  traps++;
                }

                if (check.name.includes('Rip Cheato Offer')) {
                  ripCheatoChecks++;
                }

                if (DOJO_CHECK_VALUES[check.name]) {
                  dojoChecks = Math.max(dojoChecks, DOJO_CHECK_VALUES[check.name]);
                }

                if (check.name.includes('Rowfs Shop Set')) {
                  const setNumber = check.name.substring(check.name.length - 5, check.name.length - 4);
                  rowfSets.add(setNumber);
                }

                if (check.name.includes('Merlows Rewards')) {
                  randoSettingsFormGroup.get('items').get('progressionOnMerlow').setValue(true);
                  plandoAssignedControls.add('progressionOnMerlow');
                }
              }
            }
          }
        }
        if (plandoCheckTypes.has(CheckType.HIDDEN_PANEL)) {
          randoSettingsFormGroup.get('items').get('includePanels').setValue(true);
          plandoAssignedControls.add('includePanels');
        }
        if (plandoCheckTypes.has(CheckType.SHOP)) {
          randoSettingsFormGroup.get('items').get('includeShops').setValue(true);
          plandoAssignedControls.add('includeShops');
        }
        if (plandoCheckTypes.has(CheckType.COIN_BLOCK)) {
          randoSettingsFormGroup.get('items').get('includeCoinsBlocks').setValue(true);
          plandoAssignedControls.add('includeCoinsBlocks');
        }
        if (plandoCheckTypes.has(CheckType.OVERWORLD_COIN)) {
          randoSettingsFormGroup.get('items').get('includeCoinsOverworld').setValue(true);
          plandoAssignedControls.add('includeCoinsOverworld');
        }
        if (plandoCheckTypes.has(CheckType.TRADE_EVENT)) {
          randoSettingsFormGroup.get('items').get('includeRadioTradeEvent').setValue(true);
          plandoAssignedControls.add('includeRadioTradeEvent');
        }
        if (plandoCheckTypes.has(CheckType.FOLIAGE_COIN)) {
          randoSettingsFormGroup.get('items').get('includeCoinsFoliage').setValue(true);
          plandoAssignedControls.add('includeCoinsFoliage');
        }
        if (plandoCheckTypes.has(CheckType.KOOT_FAVOR_REWARD)) {
          kootFavors = Math.max(kootFavors, 1);
        }
        if (plandoCheckTypes.has(CheckType.KOOT_FAVOR_ITEM)) {
          kootFavors = 2;
        }
        if (kootFavors) {
          randoSettingsFormGroup.get('items').get('includeFavors').setValue(kootFavors);
          plandoAssignedControls.add('includeFavors');
        }
        if (plandoCheckTypes.has(CheckType.KOOT_FAVOR_COIN)) {
          randoSettingsFormGroup.get('items').get('includeCoinsFavors').setValue(true);
          plandoAssignedControls.add('includeCoinsFavors');
        }
        if (dojoChecks) {
          randoSettingsFormGroup.get('items').get('includeDojo').setValue(dojoChecks);
          plandoAssignedControls.add('includeDojo');
        }
        if (rowfSets.size) {
          randoSettingsFormGroup.get('items').get('progressionOnRowf').setValue(rowfSets.size);
          plandoAssignedControls.add('progressionOnRowf');
        }
        if (ripCheatoChecks) {
          randoSettingsFormGroup.get('items').get('ripCheatoItemsInLogic').setValue(ripCheatoChecks);
          plandoAssignedControls.add('ripCheatoItemsInLogic');
        }
        if (gearShuffle) {
          randoSettingsFormGroup.get('items').get('gearShuffleMode').setValue(gearShuffle);
          plandoAssignedControls.add('gearShuffleMode');
        }
        if (spiritShuffle) {
          randoSettingsFormGroup.get('items').get('spiritShuffleMode').setValue(spiritShuffle);
          plandoAssignedControls.add('spiritShuffleMode');
        }
        if (partnerShuffle) {
          randoSettingsFormGroup.get('partners').get('shufflePartners').setValue(partnerShuffle);
          plandoAssignedControls.add('shufflePartners');
        }
        if (letterShuffle) {
          randoSettingsFormGroup.get('items').get('includeLetters').setValue(letterShuffle);
          plandoAssignedControls.add('includeLetters');
        }
        if (partnerUpgradeShuffle) {
          randoSettingsFormGroup.get('items').get('partnerUpgradeShuffle').setValue(partnerUpgradeShuffle);
          plandoAssignedControls.add('partnerUpgradeShuffle');
        }
        if (partnersPlandoed) {
          if (partnersPlandoed === 7) {
            randoSettingsFormGroup.get(['partners', 'startWithRandomPartners']).setValue(false);
            const startingPartner = Array.from(PARTNERS).filter((p) => !plandoAssignedControls.has(p.toLowerCase()))[0];
            randoSettingsFormGroup.get(['partners', 'startWithPartners', startingPartner.toLowerCase()]).setValue(true);
            plandoAssignedControls.add('startWithRandomPartners');
          } else {
            const maxRandomPartners = 8 - partnersPlandoed;
            randoSettingsFormGroup.get(['partners', 'randomPartnersMin']).setValidators([Validators.min(1), Validators.max(maxRandomPartners)]);
            randoSettingsFormGroup.get(['partners', 'randomPartnersMax']).setValidators([Validators.min(1), Validators.max(maxRandomPartners), CustomValidators.greaterOrEqualTo('randomPartnersMin')]);
            if (randoSettingsFormGroup.get(['partners', 'randomPartnersMax']).value > maxRandomPartners) {
              randoSettingsFormGroup.get(['partners', 'randomPartnersMax']).setValue(maxRandomPartners);
            }
            plandoAssignedControls.add('randomPartnersMax');
          }
        }
        if (traps) {
          if (traps > 35) {
            randoSettingsFormGroup.get('itemPool').get('itemTrapMode').setValue(3);
          } else if (traps > 15) {
            randoSettingsFormGroup.get('itemPool').get('itemTrapMode').setValue(2);
          } else {
            randoSettingsFormGroup.get('itemPool').get('itemTrapMode').setValue(1);
          }
          plandoAssignedControls.add('itemTrapMode');
        }
      }
      if (Array.isArray(plando['required_spirits']) && plando['required_spirits'].length) {
        plandoAssignedControls.add('starWaySpiritsNeeded');
      }
    } else {
      // No plando assigned, reset any validators.
      randoSettingsFormGroup.get(['partners', 'randomPartnersMin']).setValidators([Validators.min(1), Validators.max(8)]);
      randoSettingsFormGroup.get(['partners', 'randomPartnersMax']).setValidators([Validators.min(1), Validators.max(8), CustomValidators.greaterOrEqualTo('randomPartnersMin')]);
    }
    this.assignedControls.next(plandoAssignedControls);
  }

}
