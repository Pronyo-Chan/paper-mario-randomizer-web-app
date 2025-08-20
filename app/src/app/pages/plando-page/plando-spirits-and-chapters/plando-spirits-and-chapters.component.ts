import { AfterContentInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from "rxjs";
import { pascalToVerboseString } from "src/app/utilities/stringFunctions";
import { STAR_SPIRITS } from "../plando-constants";

export const STAR_SPIRIT_POWER_NAMES: Array<string> = ['Refresh', 'Lullaby', 'StarStorm', 'ChillOut', 'Smooch', 'TimeOut', 'UpAndAway'];

@Component({
  selector: 'app-plando-spirits-and-chapters',
  templateUrl: './plando-spirits-and-chapters.component.html',
  styleUrls: ['../plando-page.component.scss']
})
export class PlandoSpiritsAndChaptersComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input() plandoFormGroup: FormGroup;

  public readonly SPIRIT_POWERS: Array<string> = STAR_SPIRIT_POWER_NAMES;
  public readonly SPIRITS: Array<string> = [...STAR_SPIRITS, ''];
  public readonly CHAPTER_OVERWORLDS: Array<string> = ['PleasantPath', 'DryDryDesert', 'GustyGulch', 'EnterToyBox', 'LavalavaIsland', 'EnterFlowerGate', 'ShiverMountain', 'RideStarShip'];
  public readonly DUNGEONS: Array<string> = ['KoopaBrosFortress', 'DryDryRuins', 'TubbasCastle', 'ShyGuysToybox', 'MtLavalava', 'FlowerFields', 'CrystalPalace', 'BowsersCastle'];
  public readonly BOSSES: Array<string> = ['KoopaBros', 'Tutankoopa', 'TubbasHeart', 'GeneralGuy', 'LavaPiranha', 'HuffNPuff', 'CrystalKing'];
  public spiritsSubscription: Subscription;
  public requiredChaptersArray = Array<string>();
  public toDisplayString = pascalToVerboseString;

  public ngOnInit(): void {
    this.spiritsSubscription = this.plandoFormGroup.get('required_spirits').valueChanges.subscribe(val => {
      if (val) {
        this.requiredChaptersArray = val;
      } else {
        this.requiredChaptersArray = [];
      }
    })
  }

  public ngAfterContentInit(): void {
    if (this.plandoFormGroup.get('required_spirits').value) {
      this.requiredChaptersArray = this.plandoFormGroup.get('required_spirits').value;
    } else {
      this.requiredChaptersArray = [];
    }
  }

  public ngOnDestroy(): void {
    this.spiritsSubscription.unsubscribe();
  }

  public updateSpiritSelection($event: InputEvent, spirit: string) {
    if ($event.currentTarget instanceof HTMLInputElement) {
      if ($event.currentTarget.checked) {
        this.requiredChaptersArray.push(spirit)
      } else {
        const i = this.requiredChaptersArray.indexOf(spirit);
        if (i > -1) {
          this.requiredChaptersArray.splice(i, 1);
        }
      }
    }
    this.plandoFormGroup.get('required_spirits').setValue(this.requiredChaptersArray);
  }

  public getChapterDifficulty(chapter_number: number) {
    return this.plandoFormGroup.get('difficulty').get('chapter ' + chapter_number).value;
  }

  public setChapterDifficulty(chapter_number: number, value: number) {
    this.plandoFormGroup.get('difficulty').get('chapter ' + chapter_number).setValue(value);
  }

  public getStarPowerCost(id: string) {
    const val = this.plandoFormGroup.get('move_costs').get('starpower').get(id).value
    return val === null ? -1 : val;
  }

  public setStarPowerCost(id: string, cost: number) {
    this.plandoFormGroup.get('move_costs').get('starpower').get(id).setValue(cost);
  }
}
