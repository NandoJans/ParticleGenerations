import { TestBed } from '@angular/core/testing';

import { NumberDisplayService } from './number-display.service';

describe('NumberDisplayService', () => {
  let service: NumberDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
