import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomizerPageComponent } from './randomizer-page.component';

describe('RandomizerPageomponent', () => {
  let component: RandomizerPageComponent;
  let fixture: ComponentFixture<RandomizerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomizerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomizerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
