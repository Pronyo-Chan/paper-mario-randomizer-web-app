import { SettingsResponse } from './../../../entities/settingsResponse';
import { LoadingComponent } from './../../../common/loading/loading.component';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedPageComponent } from './seed-page.component';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

describe('SeedPageComponent', () => {
  let component: SeedPageComponent;
  let fixture: ComponentFixture<SeedPageComponent>;

  beforeEach(async () => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    httpClientSpy.post.and.returnValue({ status: 200, data: {} });
    httpClientSpy.get.and.returnValue({ status: 200, data: {} });

    await TestBed.configureTestingModule({
      declarations: [ SeedPageComponent],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: ActivatedRoute, useValue: {queryParams: of(null)}},
        {provide: RandomizerService, useValue: { getSeedInfo: () => {WriteSpoilerLog: false} }}
      ],
      imports: [MatCardModule, MatExpansionModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SeedPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
