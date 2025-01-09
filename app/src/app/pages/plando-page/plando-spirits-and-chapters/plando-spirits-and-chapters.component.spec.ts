import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlandoSpiritsAndChaptersComponent } from './plando-spirits-and-chapters.component';

describe('PlandoSpiritsAndChaptersComponent', () => {
  let component: PlandoSpiritsAndChaptersComponent;
  let fixture: ComponentFixture<PlandoSpiritsAndChaptersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlandoSpiritsAndChaptersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlandoSpiritsAndChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
