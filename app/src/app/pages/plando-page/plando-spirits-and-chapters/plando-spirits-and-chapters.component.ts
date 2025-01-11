import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { pascalToVerboseString } from "src/app/utilities/stringFunctions";

type Boss = {
  id: string;
  displayName: string;
}

@Component({
  selector: 'app-plando-spirits-and-chapters',
  templateUrl: './plando-spirits-and-chapters.component.html',
  styleUrls: ['../plando-page.component.scss']
})
export class PlandoSpiritsAndChaptersComponent {
  @Input() plandoFormGroup: FormGroup;

  public readonly SPRIT_POWERS: Array<string> = ['Refresh', 'Lullaby', 'StarStorm', 'ChillOut', 'Smooch', 'TimeOut', 'UpAndAway'];
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
  public requiredSpiritsArray = Array<string>();
  
  public toDisplayString = pascalToVerboseString;

  updateSpiritSelection($event: InputEvent, spirit: string) {
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
    this.plandoFormGroup.get('required_spirits').setValue(this.requiredSpiritsArray)
  }

  getChapterDifficulty(chapter_number: number) {
    return this.plandoFormGroup.get('difficulty').get('chapter ' + chapter_number).value;
  }

  setChapterDifficulty(chapter_number: number, value: number) {
    this.plandoFormGroup.get('difficulty').get('chapter ' + chapter_number).setValue(value);
  }

  getStarPowerCost(id: string) {
    const val = this.plandoFormGroup.get('move_costs').get('starpower').get(id).value
    return val === null ? -1 : val;
  }

  setStarPowerCost(id: string, cost: number) {
    this.plandoFormGroup.get('move_costs').get('starpower').get(id).setValue(cost);
  }
}
