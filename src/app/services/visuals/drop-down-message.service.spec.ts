import { TestBed } from '@angular/core/testing';

import { DropDownMessageService } from './drop-down-message.service';

describe('DropDownMessageService', () => {
  let service: DropDownMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropDownMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
