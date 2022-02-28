import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemChiplistComponent } from './item-chiplist.component';

describe('ItemChiplistComponent', () => {
  let component: ItemChiplistComponent;
  let fixture: ComponentFixture<ItemChiplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemChiplistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemChiplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
