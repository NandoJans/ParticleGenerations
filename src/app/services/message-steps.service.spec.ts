import { TestBed } from '@angular/core/testing';

import { MessageStepsService } from './message-steps.service';

describe('MessageStepsService', () => {
  let service: MessageStepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageStepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
