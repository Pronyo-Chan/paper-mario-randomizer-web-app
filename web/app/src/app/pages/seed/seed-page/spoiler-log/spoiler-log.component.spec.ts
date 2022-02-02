import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoilerLogComponent } from './spoiler-log.component';

describe('SpoilerLogComponent', () => {
  let component: SpoilerLogComponent;
  let fixture: ComponentFixture<SpoilerLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpoilerLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoilerLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
