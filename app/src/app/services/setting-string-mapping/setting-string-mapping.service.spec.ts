import { TestBed } from '@angular/core/testing';

import { SettingStringMappingService } from './setting-string-mapping.service';

describe('SettingStringMappingService', () => {
  let service: SettingStringMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingStringMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
