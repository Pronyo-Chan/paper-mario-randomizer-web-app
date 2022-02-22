import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ItemLocation } from './../../../../entities/itemLocation';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { SpoilerLog } from './../../../../entities/spoilerLog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoilerLogComponent } from './spoiler-log.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SpoilerLogComponent', () => {
  let component: SpoilerLogComponent;
  let fixture: ComponentFixture<SpoilerLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpoilerLogComponent ],
      imports: [MatTableModule, MatTabsModule, MatAutocompleteModule, MatCheckboxModule, BrowserAnimationsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoilerLogComponent);
    component = fixture.componentInstance;
    component.spoilerLog = {
      ['area1']: [{item: 'itemA', location: 'locationA'}, {item: 'itemB', location: 'locationB'}] as ItemLocation[],
      ['area2']: [{item: 'itemC', location: 'locationC'}, {item: 'itemA', location: 'locationD'}] as ItemLocation[],
      ['area3']: [{item: 'itemD', location: 'locationE'}, {item: 'itemE', location: 'locationF'}] as ItemLocation[],
    } as SpoilerLog;
    component.chapterDifficulties = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On Init', () => {
    it('should assign the spoiler log keys to areas', () => {
      component.ngOnInit();
      expect(component.areas).toEqual(['area1', 'area2', 'area3']);
    });

    it('should assign the spoiler log item values to items', () => {
      component.ngOnInit();
      expect(component.items).toEqual(['itemA', 'itemB', 'itemC', 'itemA', 'itemD', 'itemE']);
    });
  });

  describe('onItemSearchChange', () => {
    it('should update locationSearchResults to every location matching the item name', () => {
      component.searchText = 'itemA';
      component.onItemSearchChange();
      expect(component.locationSearchResults).toEqual(['locationA', 'locationD']);
    });

    it('should update areaSearchResults to every area matching the item name', () => {
      component.searchText = 'itemA';
      component.onItemSearchChange();
      expect(component.areaSearchResults).toEqual(['area1', 'area2']);
    });
  });

  describe('filter', () => {
    it('empty the autocomplete results if the searchText length is less than the required length', () => {
      component.searchText = 'i';
      component.filteredSearchItems = ['itemA'];
      component.filter();
      expect(component.filteredSearchItems).toEqual([]);
    });

    it('should filter ignoring case', () => {
      component.searchText = 'EMA';
      component.filter();
      expect(component.filteredSearchItems).toEqual(['itemA']);
    });

    it('should filter multiple results', () => {
      component.searchText = 'tem';
      component.filter();
      expect(component.filteredSearchItems).toEqual(['itemA', 'itemB', 'itemC', 'itemD', 'itemE']);
    });

    it('should reset the current itemSearchResult if there are no filtered results at all', () => {
      component.itemSearchresult = 'itemB';
      component.searchText = 'potato';
      component.filter();
      expect(component.itemSearchresult).toEqual(null);
    });

    it('should call onItemSearchChange if the typed name is exactly the same as an item', () => {
      spyOn(component, 'onItemSearchChange').and.callThrough();
      component.searchText = 'itemA';
      component.filter();
      expect(component.onItemSearchChange).toHaveBeenCalled();
    });

    it('should not call onItemSearchChange if the typed name is not exactly the same as an item', () => {
      spyOn(component, 'onItemSearchChange').and.callThrough();
      component.searchText = 'item';
      component.filter();
      expect(component.onItemSearchChange).not.toHaveBeenCalled();
    });
  });
});
