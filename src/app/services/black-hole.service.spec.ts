import { TestBed } from '@angular/core/testing';

import { BlackHoleService } from './black-hole.service';

describe('BlackHoleService', () => {
  let service: BlackHoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackHoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
