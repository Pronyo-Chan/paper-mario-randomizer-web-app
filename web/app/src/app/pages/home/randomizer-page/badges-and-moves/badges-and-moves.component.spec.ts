import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesAndMovesComponent } from './badges-and-moves.component';

describe('BadgesAndMovesComponent', () => {
  let component: BadgesAndMovesComponent;
  let fixture: ComponentFixture<BadgesAndMovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgesAndMovesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesAndMovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
