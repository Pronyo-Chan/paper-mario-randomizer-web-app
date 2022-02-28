import { SettingsResponse } from './../../../entities/settingsResponse';

import { RandomizerService } from 'src/app/services/randomizer.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { SeedPageComponent } from './seed-page.component';
import { of, tap } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { spoilerLogSample } from 'src/app/utilities/testSamples';

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
        {provide: ActivatedRoute, useValue: {queryParams: of({['id']: 'mockSeedId'} as Params)}},
        {provide: RandomizerService, useValue: {
           getSeedInfo: () => {WriteSpoilerLog: false} ,
           downloadSpoilerLog: (seedId: string) => of({text: () => Promise.resolve("text")})
          }
        }
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

  describe('onInit', () => {
    it('should call RandomizerService getSeedInfo with seedId from queryParams', async () => {
      spyOn((TestBed.get(RandomizerService) as RandomizerService), 'getSeedInfo');
      await component.ngOnInit()
      await component.seedInfo$.subscribe(seedInfo =>  expect((TestBed.get(RandomizerService) as RandomizerService).getSeedInfo).toHaveBeenCalledWith('mockSeedId'))
    });

    it('should call initSpoilerLog if WriteSpoilerLog is true in received seedInfo', async () => {
      spyOn((TestBed.get(RandomizerService) as RandomizerService), 'getSeedInfo').and.callFake((seedId: string) => of({WriteSpoilerLog: true} as SettingsResponse));
      component.initSpoilerLog = spyOn(component, 'initSpoilerLog').and.callFake(() => {});
      await component.ngOnInit();
      await component.seedInfo$.subscribe(seedInfo => expect((component.initSpoilerLog)).toHaveBeenCalled());
    });

    it('should not call initSpoilerLog if WriteSpoilerLog is false in received seedInfo', async () => {
      spyOn((TestBed.get(RandomizerService) as RandomizerService), 'getSeedInfo').and.callFake((seedId: string) => of({WriteSpoilerLog: false} as SettingsResponse));
      component.initSpoilerLog = spyOn(component, 'initSpoilerLog').and.callFake(() => {});
      await component.ngOnInit();
      await component.seedInfo$.subscribe(seedInfo => expect((component.initSpoilerLog)).not.toHaveBeenCalled());
    });

    it('should set isDifficultyShuffled to true if ShuffleChapterDifficulty is true in seedInfo', async () => {
      spyOn((TestBed.get(RandomizerService) as RandomizerService), 'getSeedInfo').and.callFake((seedId: string) => of({ShuffleChapterDifficulty: true} as SettingsResponse));
      component.initSpoilerLog = spyOn(component, 'initSpoilerLog').and.callFake(() => {});
      await component.ngOnInit();
      await component.seedInfo$.subscribe(seedInfo => expect((component.isDifficultyShuffled)).toBeTrue());
    });

    it('should not set isDifficultyShuffled to true if ShuffleChapterDifficulty is false in seedInfo', async () => {
      spyOn((TestBed.get(RandomizerService) as RandomizerService), 'getSeedInfo').and.callFake((seedId: string) => of({ShuffleChapterDifficulty: false} as SettingsResponse));
      component.initSpoilerLog = spyOn(component, 'initSpoilerLog').and.callFake(() => {});
      await component.ngOnInit();
      await component.seedInfo$.subscribe(seedInfo => expect((component.isDifficultyShuffled)).toBeFalse());
    });
  });

  describe('convertSpoilerFileToDict', () => {
    it('should convert spoiler log text to expected object', () => {
      component.convertSpoilerFileToDict(spoilerLogSample)
      expect(component.spoilerLog.pipe(
        tap(result => {
          expect(result['Goomba Region'][0].item).toBe('Shrink Stomp');
          expect(result['Goomba Region'][0].location).toBe('Forest Clearing - Hidden Panel');

          expect(result['Flower Fields'][4].item).toBe('Life Shroom');
          expect(result['Flower Fields'][4].location).toBe('(SW) Posie and Crystal Tree - Posie Gift 1');

          expect(result["Peach's Castle Grounds"][0].item).toBe('Repel Gel');
          expect(result["Peach's Castle Grounds"][0].location).toBe('Hijacked Castle Entrance - Hidden Block');
        })
      ).subscribe())
    });
  });

  describe('initSpoilerLog', () => {
    it('should call convertSpoilerFileToDictionary after receiving text file from server', async() => {
      component.convertSpoilerFileToDict = spyOn(component, 'convertSpoilerFileToDict').and.callFake((text: string) => {});
      await component.initSpoilerLog();
      expect(component.convertSpoilerFileToDict).toHaveBeenCalledTimes(1);
    });

    it('should set isPageLoading to false', async() => {
      component.convertSpoilerFileToDict = spyOn(component, 'convertSpoilerFileToDict').and.callFake((text: string) => {});
      component.isPageLoading = true
      await component.initSpoilerLog();
      expect(component.isPageLoading).toBeFalse();
    });
  });
});
