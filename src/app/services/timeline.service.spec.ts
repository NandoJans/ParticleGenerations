import { TestBed } from '@angular/core/testing';

import { TimelineService } from './timeline.service';
import { HoldingRecord } from '../classes/records/holdings/holding-record';

describe('TimelineService', () => {
  let service: TimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('requires one blue prestige for the first blue timeline event', () => {
    const firstBlueEvent = TimelineService.blueTimeline.events[0];

    expect(firstBlueEvent.holdingRequirement).toBe(HoldingRecord.bluePrestiges);
    expect(firstBlueEvent.requiredAmount.mantissa).toBe(1);
    expect(firstBlueEvent.requiredAmount.exponent).toBe(0);
  });
});
