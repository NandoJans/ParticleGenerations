import { TestBed } from '@angular/core/testing';

import { PrestigeLayersService } from './prestige-layers.service';
import { HoldingRecord } from '../classes/records/holdings/holding-record';

describe('PrestigeLayersService', () => {
  let service: PrestigeLayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestigeLayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('awards blue prestiges on blue prestige', () => {
    const bluePrestigeReward = PrestigeLayersService.bluePrestigeLayer.gainHoldings.find(
      gain => gain.holding === HoldingRecord.bluePrestiges
    );

    expect(bluePrestigeReward).toBeTruthy();
    expect(bluePrestigeReward?.basedOnRequiredHolding).toBeFalse();
    expect(bluePrestigeReward?.idleGeneration).toBeFalse();
  });
});
