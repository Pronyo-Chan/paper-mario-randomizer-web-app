import { AfterContentInit, AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from "rxjs";
import { pascalToVerboseString } from "src/app/utilities/stringFunctions";

type Boss = {
  id: string;
  displayName: string;
}

export const STAR_SPIRIT_POWER_NAMES: Array<string> = ['Refresh', 'Lullaby', 'StarStorm', 'ChillOut', 'Smooch', 'TimeOut', 'UpAndAway'];

@Component({
  selector: 'app-plando-spirits-and-chapters',
  templateUrl: './plando-spirits-and-chapters.component.html',
  styleUrls: ['../plando-page.component.scss']
})
export class PlandoSpiritsAndChaptersComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input() plandoFormGroup: FormGroup;

  public readonly SPIRIT_POWERS: Array<string> = STAR_SPIRIT_POWER_NAMES;
  public readonly SPIRITS: Array<string> = ['Eldstar', 'Mamar', 'Skolar', 'Muskular', 'Misstar', 'Klevar', 'Kalmar'];
  public readonly BOSSES: Array<Boss> = [
    { id: '', displayName: '' },
    { id: 'KoopaBros', displayName: 'Koopa Bros.' },
    { id: 'Tutankoopa', displayName: 'Tutankoopa' },
    { id: 'TubbasHeart', displayName: 'Tubba\'s Heart' },
    { id: 'GeneralGuy', displayName: 'General Guy' },
    { id: 'LavaPiranha', displayName: 'Lava Piranha' },
    { id: 'HuffNPuff', displayName: 'Huff N Puff' },
    { id: 'CrystalKing', displayName: 'Crystal King' }];
  public spiritsSubscription: Subscription;
  public requiredSpiritsArray = Array<string>();
  public toDisplayString = pascalToVerboseString;

  public ngOnInit(): void {
    this.spiritsSubscription = this.plandoFormGroup.get('required_spirits').valueChanges.subscribe(val => {
      if (val) {
        this.requiredSpiritsArray = val;
      } else {
        this.requiredSpiritsArray = [];
      }
    })
  }

  public ngAfterContentInit(): void {
    if (this.plandoFormGroup.get('required_spirits').value) {
      this.requiredSpiritsArray = this.plandoFormGroup.get('required_spirits').value;
    } else {
      this.requiredSpiritsArray = [];
    }
  }

  public ngOnDestroy(): void {
    this.spiritsSubscription.unsubscribe();
  }

  public updateSpiritSelection($event: InputEvent, spirit: string) {
    if ($event.currentTarget instanceof HTMLInputElement) {
      if ($event.currentTarget.checked) {
        this.requiredSpiritsArray.push(spirit)
      } else {
        const i = this.requiredSpiritsArray.indexOf(spirit);
        if (i > -1) {
          this.requiredSpiritsArray.splice(i, 1);
        }
      }
    }
    this.plandoFormGroup.get('required_spirits').setValue(this.requiredSpiritsArray);
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
