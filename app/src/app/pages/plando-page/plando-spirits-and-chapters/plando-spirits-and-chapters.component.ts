import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

type Boss = {
  id: string;
  displayName: string;
}
type SpiritPower = {
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

  public readonly SPRIT_POWERS: Array<SpiritPower> = [
    {id: "Refresh", displayName: "Refresh"},
    {id: "Lullaby", displayName: "Lullaby"},
    {id: "StarStorm", displayName: "Star Storm"},
    {id: "ChillOut", displayName: "Chill Out"},
    {id: "Smooch", displayName: "Smooch"},
    {id: "TimeOut", displayName: "Time Out"},
    {id: "UpAndAway", displayName: "Up And Away"}
  ];
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
    if (value > 0) {
      this.plandoFormGroup.get('difficulty').get('chapter ' + chapter_number).setValue(value);
    } else {
      this.plandoFormGroup.get('difficulty').get('chapter ' + chapter_number).setValue(null);
    }
  }

  getStarPowerCost(id: string) {
    const val = this.plandoFormGroup.get('move_costs').get('starpower').get(id).value
    return val === null ? -1 : val;
  }

  setStarPowerCost(id: string, cost: number) {
    this.plandoFormGroup.get('move_costs').get('starpower').get(id).setValue(cost);
  }
}
