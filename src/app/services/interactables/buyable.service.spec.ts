import { TestBed } from '@angular/core/testing';

import { BuyableService } from './buyable.service';

describe('BuyableService', () => {
  let service: BuyableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
