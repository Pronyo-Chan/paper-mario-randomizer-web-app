import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlandoBadgesComponent } from './plando-badges.component';

describe('PlandoBadgesComponent', () => {
  let component: PlandoBadgesComponent;
  let fixture: ComponentFixture<PlandoBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlandoBadgesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlandoBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
