import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import glitchesJson from '../../../../utilities/glitches.json'
import { LogicGlitch } from 'src/app/entities/logicGlitch';

@Component({
  selector: 'app-glitches-and-tricks',
  templateUrl: './glitches-and-tricks.component.html',
  styleUrls: ['./glitches-and-tricks.component.scss']
})
export class GlitchesAndTricksComponent implements OnInit {

  public readonly MIN_AMOUNT_OF_CHARS = 2;

  @Input() public formGroup: FormGroup

  public glitchesList: LogicGlitch[];
  public filteredGlitches: LogicGlitch[];

  public searchText: string;

  public constructor() { }

  public ngOnInit(): void {
    this.glitchesList = glitchesJson;
    this.filteredGlitches = this.glitchesList;
  }

  public filter() {
    if(this.searchText.length < this.MIN_AMOUNT_OF_CHARS) {
      this.filteredGlitches = this.glitchesList;
      return;
    }
    this.filteredGlitches = this.glitchesList.filter(g => g.name.toLowerCase().includes(this.searchText.toLowerCase()))
  }

  public isGlitchInFilteredList(glitch: LogicGlitch) {
    return this.filteredGlitches.some(g => g == glitch)
  }

}
