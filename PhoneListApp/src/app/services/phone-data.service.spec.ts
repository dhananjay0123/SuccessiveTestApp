import { TestBed } from '@angular/core/testing';

import { PhoneDataService } from './phone-data.service';

describe('PhoneDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhoneDataService = TestBed.get(PhoneDataService);
    expect(service).toBeTruthy();
  });
});
