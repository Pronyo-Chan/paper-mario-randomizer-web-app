import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlandoPartyComponent } from './plando-party.component';

describe('PlandoPartyComponent', () => {
  let component: PlandoPartyComponent;
  let fixture: ComponentFixture<PlandoPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlandoPartyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlandoPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
