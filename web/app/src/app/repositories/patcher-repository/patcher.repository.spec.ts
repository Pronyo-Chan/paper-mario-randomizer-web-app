import { TestBed } from '@angular/core/testing';

import { PatcherRepository } from './patcher.repository';

describe('PatcherRepositoryService', () => {
  let service: PatcherRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatcherRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
