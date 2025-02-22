import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { PARTNERS } from "src/app/pages/plando-page/plando-constants";
import { SAVED_PLANDO_NAME_PREFIX, SAVED_PLANDO_NAMES_KEY } from "src/app/pages/plando-page/plando-save-load/plando-save-load.component";
import { PlandoAssignmentService } from "src/app/services/plando-assignment.service";

@Component({
  selector: 'app-plandomizers',
  templateUrl: './plandomizers.component.html',
  styleUrls: ['./plandomizers.component.scss']
})
export class PlandomizersComponent implements OnInit, OnDestroy {
  @Input() public plandomizerFormControl: FormControl;

  private _plandoAssignmentSubscription: Subscription;
  public readonly PARTNERS_SET = new Set(Array.from(PARTNERS).map((p) => p.toLowerCase()));
  public readonly controlDisplayStrings: Map<string, string> = new Map([
    ["shuffleItems", "Shuffle Items"],
    ["includePanels", "Include Hidden Panels"],
    ["keyitemsOutsideDungeon", "Keysanity"],
    ["includeRadioTradeEvent", "Include Trading Event Rewards"],
    ["gearShuffleMode", "Gear Shuffle"],
    ["includeLetters", "Letter Delivery Rewards"],
    ["includeFavors", "Koopa Koot Favors"],
    ["ripCheatoItemsInLogic", "Rip Cheato Items in Logic"],
    ["partnerUpgradeShuffle", "Partner Upgrade Shuffle"],
    ["includeDojo", "Include Dojo Rewards"],
    ["includeShops", "Shopsanity"],
    ["progressionOnRowf", "Rowf Items in Logic"],
    ["progressionOnMerlow", "Merlow Items in Logic"],
    ["includeCoinsOverworld", "Shuffle Overworld Coins"],
    ["includeCoinsBlocks", "Shuffle Coin Blocks"],
    ["includeCoinsFavors", "Shuffle Favor Coins"],
    ["includeCoinsFoliage", "Shuffle Foliage Coins"],
    ["shufflePartners", "Shuffle Partners"],
    ["seedGoal", "Seed Goal"],
    ["includePowerStars", "Star Hunt"],
    ["starWaySpiritsNeeded", "Star Way - Star Spirits Required"],
    ["requireSpecificSpirits", "Require Specific Spirits"],
    ["shuffleStarBeam", "Shuffle Star Beam"],
    ["itemTrapMode", "Item Traps"],
    ["itemPouches", "Add Item Pouches"],
    ["addUnusedBadgeDuplicates", "Add Unused Badge Duplicates"],
    ["addBetaItems", "Add Beta Items"],
    ["progressiveBadges", "Progressive Badges"],
  ]);
  public savedPlandoNames: Set<String>;
  public selectedPlandoName: string;
  public loadStatus: string;
  public plandoAssignedControls: Set<string>
  public anyPartnerPlandoed: boolean = false;

  constructor(private _plandoAssignmentService: PlandoAssignmentService) { }

  public ngOnInit(): void {
    const storedNames = window.localStorage.getItem(SAVED_PLANDO_NAMES_KEY);
    this.savedPlandoNames = storedNames ? new Set(storedNames.split(',')) : new Set();
    this._plandoAssignmentSubscription = this._plandoAssignmentService.assignedControls.asObservable().subscribe(assignedControls => {
      this.plandoAssignedControls = assignedControls;
      this.anyPartnerPlandoed = Array.from(this.plandoAssignedControls).some((control) => this.PARTNERS_SET.has(control));
    });
  }

  ngOnDestroy(): void {
    if (this._plandoAssignmentSubscription) {
      this._plandoAssignmentSubscription.unsubscribe();
    }
  }

  public onSavedPlandoSelect($event: InputEvent) {
    const plandoName = ($event.target as HTMLSelectElement).value;
    if (!plandoName) {
      this.plandomizerFormControl.setValue(null);
      this.loadStatus = '';
    } else {
      const plandoSettings = localStorage.getItem(SAVED_PLANDO_NAME_PREFIX + plandoName);
      if (!plandoSettings) {
        this.savedPlandoNames.delete(plandoName);
        this.loadStatus = 'notFound';
      } else {
        const plandoFormObj = JSON.parse(plandoSettings)
        this.plandomizerFormControl.setValue(plandoFormObj);
        this.selectedPlandoName = plandoName;
        this.loadStatus = 'loaded';
      }
    }
  }

}
