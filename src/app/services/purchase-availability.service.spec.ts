import {PurchaseAvailabilityService} from './purchase-availability.service';
import {BluePhaseService} from './blue-phase.service';
import {HoldingRecord} from '../classes/records/holdings/holding-record';
import {Num} from '../num';

describe('PurchaseAvailabilityService', () => {
  let bluePhaseService: BluePhaseService;
  let service: PurchaseAvailabilityService;
  const blueElements = {
    location: 'elements',
    parent: {location: 'blue'},
    isUnlocked: () => true,
  } as any;

  beforeEach(() => {
    bluePhaseService = new BluePhaseService();
    service = new PurchaseAvailabilityService(bluePhaseService);
    HoldingRecord.neutrons.amount = Num.ZERO.copy();
  });

  it('highlights blue elements when an element can be fused', () => {
    HoldingRecord.neutrons.amount = new Num(1, 1);

    expect(service.hasAvailablePurchase(blueElements)).toBeTrue();
  });

  it('does not highlight locked blue elements when an element can be fused', () => {
    HoldingRecord.neutrons.amount = new Num(1, 1);
    const lockedBlueElements = {...blueElements, isUnlocked: () => false};

    expect(service.hasAvailablePurchase(lockedBlueElements)).toBeFalse();
  });

  it('does not highlight blue elements before fusion is available', () => {
    expect(service.hasAvailablePurchase(blueElements)).toBeFalse();
  });
});
