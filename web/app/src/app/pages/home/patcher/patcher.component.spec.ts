import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatcherComponent } from './patcher.component';

describe('PatcherComponent', () => {
  let component: PatcherComponent;
  let fixture: ComponentFixture<PatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
