import { TestBed } from '@angular/core/testing';

import { NavigationsService } from './navigations.service';
import { HoldingRecord } from '../classes/records/holdings/holding-record';

describe('NavigationsService', () => {
  let service: NavigationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('unlocks blue elements from one blue prestige', () => {
    const requirement = service.subNavigations['blueElements'].requirement[0];

    expect(requirement.require).toBe(HoldingRecord.bluePrestiges);
    expect(requirement.amount.mantissa).toBe(1);
    expect(requirement.amount.exponent).toBe(0);
  });
});
