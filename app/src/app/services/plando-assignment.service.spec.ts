import { TestBed } from '@angular/core/testing';

import { PlandoAssignmentService } from './plando-assignment.service';

describe('PlandoAssignmentService', () => {
  let service: PlandoAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlandoAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
