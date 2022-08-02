import { FormGroup } from '@angular/forms';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import glitchesJson from '../../../../utilities/glitches.json'
import { LogicGlitch } from 'src/app/entities/logicGlitch';

@Component({
  selector: 'app-glitches-and-tricks',
  templateUrl: './glitches-and-tricks.component.html',
  styleUrls: ['./glitches-and-tricks.component.scss']
})
export class GlitchesAndTricksComponent implements OnInit {
  // TODO: There's a bug where ctrl+A will toggle all, even hidden

  public readonly MIN_AMOUNT_OF_CHARS = 2;
  public readonly DEFAULT_LOCATION = "(all)";

  @Input() public formGroup: FormGroup

  public glitchesList: LogicGlitch[];
  public filteredGlitches: LogicGlitch[];
  public locationsList: string[];

  public searchText: string;
  public selectedLocation: string;

  public constructor() { }

  public ngOnInit(): void {
    this.glitchesList = glitchesJson;
    this.filteredGlitches = this.glitchesList;

    this.selectedLocation = this.DEFAULT_LOCATION;
    this.locationsList = [this.DEFAULT_LOCATION].concat(this.glitchesList.map(g => g.location));
    this.locationsList= [...new Set(this.locationsList)] // Remove duplicates
    this.locationsList.sort((a, b) => a.localeCompare(b)) // Sort alphabetically
    
  }

  public filter() {
    if(this.searchText.length < this.MIN_AMOUNT_OF_CHARS) {
      this.filteredGlitches = this.glitchesList;
      return;
    }
    this.filteredGlitches = this.glitchesList.filter(g => g.name.toLowerCase().includes(this.searchText.toLowerCase()))
  }

  public isGlitchInFilteredList(glitch: LogicGlitch) {
    return this.filteredGlitches.some(g => g == glitch) && (glitch.location == this.selectedLocation || this.selectedLocation == this.DEFAULT_LOCATION);
  }

  public enableAll() {
    let glitchesFormControl = this.formGroup.get('glitches')
    for (const filteredGlitch of this.filteredGlitches) {
      if(!glitchesFormControl.value.some(g => g == filteredGlitch)) {
        glitchesFormControl.setValue([...glitchesFormControl.value, filteredGlitch])
      }
    }
  }

  public disableAll() {
    let glitchesFormControl = this.formGroup.get('glitches')
    let newGlitchesArray = [...glitchesFormControl.value]

    newGlitchesArray = newGlitchesArray.filter(enabledGlitch => !this.filteredGlitches.some(filteredGlitch => filteredGlitch == enabledGlitch))
    glitchesFormControl.setValue(newGlitchesArray)
  }

  public disableGlitch(glitch: LogicGlitch) {
    let glitchesFormControl = this.formGroup.get('glitches')

    let newGlitchesArray = glitchesFormControl.value.filter(enabledGlitch => enabledGlitch != glitch)
    glitchesFormControl.setValue(newGlitchesArray)
  }
}
