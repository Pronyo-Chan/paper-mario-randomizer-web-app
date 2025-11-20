import { FormControl, FormGroup } from '@angular/forms';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import glitchesJson from '../../../../utilities/glitches.json'
import { LogicGlitch } from 'src/app/entities/logicGlitch';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-glitches-and-tricks',
  templateUrl: './glitches-and-tricks.component.html',
  styleUrls: ['./glitches-and-tricks.component.scss']
})
export class GlitchesAndTricksComponent implements OnInit, OnDestroy {
  public readonly MIN_AMOUNT_OF_CHARS = 2;
  public readonly DEFAULT_LOCATION = "(all)";

  @Input() public formGroup: FormGroup

  public glitchesList: LogicGlitch[];
  public filteredGlitches: LogicGlitch[];
  public locationsList: string[];

  public searchText: string = "";
  public locationFilterControl: FormControl;
  public selectedLocations: string[] = [];
  public filteredLocations: string[] = [];

  private _locationFilterSubscription: Subscription;

  public constructor() { }

  public ngOnInit(): void {
    this.glitchesList = glitchesJson;
    this.filteredGlitches = this.glitchesList;

    this.locationsList = [...new Set(this.glitchesList.map(g => g.location).filter(l => l))];

    this.locationFilterControl = new FormControl('');
    this.filteredLocations = this.locationsList;

    this._locationFilterSubscription = this.locationFilterControl.valueChanges.pipe(
      tap(() => this.filterLocations())
    ).subscribe();
  }

  public ngOnDestroy(): void {
    if (this._locationFilterSubscription) {
      this._locationFilterSubscription.unsubscribe();
    }
  }

  public filter() {
    if(this.searchText?.length < this.MIN_AMOUNT_OF_CHARS && this.selectedLocations.length === 0) {
      this.filteredGlitches = this.glitchesList;
      return;
    }
    this.filteredGlitches = this.glitchesList.filter(
      g => g.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedLocations.length === 0 || this.selectedLocations.includes(g.location))
    )
  }

  public filterLocations(): void {
    const filterValue = this.locationFilterControl.value.toLowerCase();
    this.filteredLocations = this.locationsList.filter(
      location => location.toLowerCase().includes(filterValue) && 
      !this.selectedLocations.includes(location)
    );
  }

  public onLocationSelected(): void {
    const location = this.locationFilterControl.value;
    if (location && !this.selectedLocations.includes(location)) {
      this.selectedLocations.push(location);
      this.locationFilterControl.setValue('');
      this.filter();
    }
  }

  public removeLocation(location: string): void {
    this.selectedLocations = this.selectedLocations.filter(l => l !== location);
    this.filterLocations();
    this.filter();
  }

  public isGlitchInFilteredList(glitch: LogicGlitch) {
    return this.filteredGlitches.some(g => g == glitch);
  }

  public allFilteredAreSelected(): boolean {
    const selectedGlitches = this.formGroup.get('glitches').value || [];
    return this.filteredGlitches.length > 0 && 
           this.filteredGlitches.every(glitch => selectedGlitches.includes(glitch));
  }


  public toggleAllFiltered(event: MatCheckboxChange): void {
    const selectedGlitches = this.formGroup.get('glitches').value || [];
    if (event.checked) {
        const allGlitches = [...new Set([...selectedGlitches, ...this.filteredGlitches])];
        this.formGroup.get('glitches').setValue(allGlitches);
    } else {
        const remaining = selectedGlitches.filter(glitch => !this.filteredGlitches.includes(glitch));
        this.formGroup.get('glitches').setValue(remaining);
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
