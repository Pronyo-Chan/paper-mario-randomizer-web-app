import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RandomizerRepository } from './randomizer.repository';

describe('RandomizerRepository', () => {
  let service: RandomizerRepository;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    httpClientSpy.post.and.returnValue({ status: 200, data: {} });
    httpClientSpy.get.and.returnValue({ status: 200, data: {} });
    
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(RandomizerRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
