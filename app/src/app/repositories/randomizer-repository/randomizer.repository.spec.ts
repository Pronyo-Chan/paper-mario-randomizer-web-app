import { TestBed } from '@angular/core/testing';

import { RandomizerRepository } from './randomizer.repository';

describe('PatcherRepositoryService', () => {
  let service: RandomizerRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomizerRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
