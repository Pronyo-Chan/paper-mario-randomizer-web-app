import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatcherComponent } from './patcher.component';

describe('PatcherComponent', () => {
  let component: PatcherComponent;
  let fixture: ComponentFixture<PatcherComponent>;

  beforeEach(async () => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    httpClientSpy.post.and.returnValue({ status: 200, data: {} });
    httpClientSpy.get.and.returnValue({ status: 200, data: {} });

    await TestBed.configureTestingModule({
      declarations: [ PatcherComponent ],
      providers: [{provide: HttpClient, useValue: httpClientSpy}],
      imports: [MatTooltipModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
