import { TestBed } from '@angular/core/testing';

import { RandomizerService } from './randomizer.service';

describe('RandomizerService', () => {
  let service: RandomizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
