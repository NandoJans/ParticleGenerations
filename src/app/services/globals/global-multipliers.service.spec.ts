import { TestBed } from '@angular/core/testing';

import { GlobalMultipliersService } from './global-multipliers.service';

describe('GlobalMultipliersService', () => {
  let service: GlobalMultipliersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalMultipliersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
