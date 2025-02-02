import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlandomizersComponent } from './plandomizers.component';

describe('PlandomizersComponent', () => {
  let component: PlandomizersComponent;
  let fixture: ComponentFixture<PlandomizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlandomizersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlandomizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
