import { HttpClient } from '@angular/common/http';
import { RandomizerRepository } from './../repositories/randomizer-repository/randomizer.repository';
import { TestBed } from '@angular/core/testing';

import { RandomizerService } from './randomizer.service';

describe('RandomizerService', () => {
  let service: RandomizerService;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    httpClientSpy.post.and.returnValue({ status: 200, data: {} });
    httpClientSpy.get.and.returnValue({ status: 200, data: {} });

    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(RandomizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
