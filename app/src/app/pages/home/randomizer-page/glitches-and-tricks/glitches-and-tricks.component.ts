import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import glitchesJson from '../../../../utilities/glitches.json'
import { LogicGlitch } from 'src/app/entities/logicGlitch';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { map, startWith, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-glitches-and-tricks',
  templateUrl: './glitches-and-tricks.component.html',
  styleUrls: ['./glitches-and-tricks.component.scss']
})
export class GlitchesAndTricksComponent implements OnInit, OnDestroy {
  public readonly MIN_AMOUNT_OF_CHARS = 2;
  public readonly DEFAULT_LOCATION = "(all)";
  private readonly DIFFICULTY_ORDER = ['Trivial', 'Beginner', 'Intermediate', 'Advanced', 'Expert', 'Extreme', 'Kooper Skip'];


  @Input() public formGroup: FormGroup

  public glitchesList: LogicGlitch[];
  public filteredGlitches: LogicGlitch[];

  public searchText: string = "";

  public locationFilterControl = new FormControl('');
  public selectedLocations: string[] = [];
  public filteredLocations: string[] = [];

  public tagsFilterControl = new FormControl('');
  public selectedTags: string[] = [];
  public filteredTags: string[] = [];

  public difficultyFilterControl = new FormControl('');
  public selectedDifficulties: string[] = [];
  public filteredDifficulties: string[] = [];

  public sortOptions = [
    { label: 'Name ↑', value: 'nameAsc' },
    { label: 'Name ↓', value: 'nameDesc' },
    { label: 'Difficulty ↑', value: 'difficultyAsc' },
    { label: 'Difficulty ↓', value: 'difficultyDesc' },
    { label: 'Location ↑', value: 'locationAsc' },
    { label: 'Location ↓', value: 'locationDesc' }
  ];
  public selectedSort = 'nameAsc';

  private _locationFilterSubscription: Subscription;
  private _tagsFilterSubscription: Subscription;
  private _difficultyFilterSubscription: Subscription;

  public constructor() { }

  public ngOnInit(): void {
    this.glitchesList = glitchesJson;
    this.filteredGlitches = this.sortGlitches(this.glitchesList);

    this._locationFilterSubscription = this.locationFilterControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterLocations(value))
    ).subscribe(filtered => {
      this.filteredLocations = filtered;
    });

    this._tagsFilterSubscription = this.tagsFilterControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterTags(value))
    ).subscribe(filtered => {
      this.filteredTags = filtered;
    });

    this._difficultyFilterSubscription = this.difficultyFilterControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterDifficulties(value))
    ).subscribe(filtered => {
      this.filteredDifficulties = filtered;
  });
}

  public ngOnDestroy(): void {
    if (this._locationFilterSubscription) {
      this._locationFilterSubscription.unsubscribe();
    }
    if (this._tagsFilterSubscription) {
      this._tagsFilterSubscription.unsubscribe();
    }
    if (this._difficultyFilterSubscription) {
      this._difficultyFilterSubscription.unsubscribe();
    }
  }

  public filter() {
    let filtered = this.glitchesList.filter(
      g => g.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedDifficulties.length === 0 || this.selectedDifficulties.includes(g.difficulty)) &&
      (this.selectedLocations.length === 0 || this.selectedLocations.includes(g.location)) &&
      (this.selectedTags.length === 0 || this.selectedTags.some(tag => g.tags?.includes(tag)))
    );

    this.filteredGlitches = this.sortGlitches(filtered);
    this.scrollListToTop();
  }

  public onDifficultySelected(): void {
    const difficulty = this.difficultyFilterControl.value;
    if (difficulty && !this.selectedDifficulties.includes(difficulty)) {
        this.selectedDifficulties.push(difficulty);
        this.difficultyFilterControl.reset();
        this.filter();
    }
  }

  public removeDifficulty(difficulty: string): void {
    this.selectedDifficulties = this.selectedDifficulties.filter(d => d !== difficulty);
    this.filteredDifficulties = this.filterDifficulties(this.difficultyFilterControl.value || '');
    this.filter();
  }

  public onLocationSelected(): void {
    const location = this.locationFilterControl.value;
    if (location && !this.selectedLocations.includes(location)) {
      this.selectedLocations.push(location);
      this.locationFilterControl.reset();
      this.filter();
    }
  }

  public removeLocation(location: string): void {
    this.selectedLocations = this.selectedLocations.filter(l => l !== location);
    this.filteredLocations = this.filterLocations(this.locationFilterControl.value || '');
    this.filter();
  }

  public onTagSelected(): void {
    const tag = this.tagsFilterControl.value;
    if (tag && !this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag);
        this.tagsFilterControl.reset();
        this.filter();
    }
}

  public removeTag(tag: string): void {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
    this.filteredTags = this.filterTags(this.tagsFilterControl.value || '');
    this.filter();
  }

  public isGlitchVisible(glitch: any): boolean {
    return this.filteredGlitches.includes(glitch);
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
    glitchesFormControl.setValue([])
  }

  public disableGlitch(glitch: LogicGlitch) {
    let glitchesFormControl = this.formGroup.get('glitches')

    let newGlitchesArray = glitchesFormControl.value.filter(enabledGlitch => enabledGlitch != glitch)
    glitchesFormControl.setValue(newGlitchesArray)
  }

  public onSortChange(): void {
    this.filter();
  }

  private filterLocations(value: string): string[] {
    const filterValue = value?.toLowerCase() || '';
    const allLocations = new Set<string>();
    
    this.glitchesList.forEach(glitch => {
        if (glitch.location) {
            allLocations.add(glitch.location);
        }
    });
    
    return Array.from(allLocations).filter(location =>
        location.toLowerCase().includes(filterValue) && 
        !this.selectedLocations.includes(location)
    );
  }

  private filterDifficulties(value: string): string[] {
    const filterValue = value?.toLowerCase() || '';
    const allDifficulties = new Set<string>();
    
    this.glitchesList.forEach(glitch => {
        if (glitch.difficulty) {
            allDifficulties.add(glitch.difficulty);
        }
    });
    
    const filtered = Array.from(allDifficulties).filter(difficulty =>
        difficulty.toLowerCase().includes(filterValue) && 
        !this.selectedDifficulties.includes(difficulty)
    );

    // Sort by the predefined difficulty order
    return filtered.sort((a, b) => {
      return this.DIFFICULTY_ORDER.indexOf(a) - this.DIFFICULTY_ORDER.indexOf(b);
    });
  }

  private filterTags(value: string): string[] {
    const filterValue = value?.toLowerCase() || '';
    const allTags = new Set<string>();
    
    this.glitchesList.forEach(glitch => {
        glitch.tags?.forEach(tag => allTags.add(tag));
    });
    
    return Array.from(allTags)
      .filter(tag =>
        tag.toLowerCase().includes(filterValue) &&
        !this.selectedTags.includes(tag)
      )
      .sort((a, b) => a.localeCompare(b));
  }

  private sortGlitches(glitches: LogicGlitch[]): LogicGlitch[] {
    const sort = this.selectedSort;
    return [...glitches].sort((a, b) => {
      switch (sort) {
        case 'nameAsc':
          return (a.name || '').localeCompare(b.name || '');
        case 'nameDesc':
          return (b.name || '').localeCompare(a.name || '');
        case 'difficultyAsc':
          return this.DIFFICULTY_ORDER.indexOf(a.difficulty) - this.DIFFICULTY_ORDER.indexOf(b.difficulty);
        case 'difficultyDesc':
          return this.DIFFICULTY_ORDER.indexOf(b.difficulty) - this.DIFFICULTY_ORDER.indexOf(a.difficulty);
        case 'locationAsc':
          return (a.location || '').localeCompare(b.location || '');
        case 'locationDesc':
          return (b.location || '').localeCompare(a.location || '');
        default:
          return 0;
      }
    });
  }

  private scrollListToTop(): void {
    setTimeout(() => {
      const listElement = document.querySelector('.glitches-list');
      if (listElement) {
        listElement.scrollTop = 0;
      }
    });
  }
}
