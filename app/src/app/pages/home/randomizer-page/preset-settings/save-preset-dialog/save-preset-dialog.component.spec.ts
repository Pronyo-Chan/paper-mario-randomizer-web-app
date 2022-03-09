import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePresetDialogComponent } from './save-preset-dialog.component';

describe('SavePresetDialogComponent', () => {
  let component: SavePresetDialogComponent;
  let fixture: ComponentFixture<SavePresetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePresetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePresetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
