import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { SpoilerLog } from './../../../../entities/spoilerLog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoilerLogComponent } from './spoiler-log.component';

describe('SpoilerLogComponent', () => {
  let component: SpoilerLogComponent;
  let fixture: ComponentFixture<SpoilerLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpoilerLogComponent ],
      imports: [MatTableModule, MatTabsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoilerLogComponent);
    component = fixture.componentInstance;
    component.spoilerLog = {      
    } as SpoilerLog;
    component.chapterDifficulties = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
