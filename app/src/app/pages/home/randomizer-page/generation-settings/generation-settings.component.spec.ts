import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationSettingsComponent } from './generation-settings.component';

describe('SpoilerSettingsComponent', () => {
  let component: GenerationSettingsComponent;
  let fixture: ComponentFixture<GenerationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
