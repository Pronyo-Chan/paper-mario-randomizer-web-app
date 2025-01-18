import { TestBed } from '@angular/core/testing';

import { InputFilterService } from './inputfilter.service';

describe('InputfilterService', () => {
  let service: InputFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
