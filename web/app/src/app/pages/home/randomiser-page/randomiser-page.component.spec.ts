import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomiserPageComponent } from './randomiser-page.component';

describe('RandomiserPageomponent', () => {
  let component: RandomiserPageComponent;
  let fixture: ComponentFixture<RandomiserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomiserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomiserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
