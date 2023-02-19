import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ItemsComponent } from './items.component';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent ],
      imports: [ MatSlideToggleModule, MatCardModule, ReactiveFormsModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;

    component.itemFormGroup = new FormGroup({
      shuffleItems: new FormControl(false),
      includeCoinsOverworld: new FormControl(false),
      includeCoinsBlocks: new FormControl(false),
      includeCoinsFavors: new FormControl(false),
      includeCoinsFoliage: new FormControl(false),
      includeShops: new FormControl(false),
      includePanels: new FormControl(false),
      includeFavors: new FormControl(false),
      keyitemsOutsideDungeon: new FormControl(false),
      includeDojo: new FormControl(false)
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
