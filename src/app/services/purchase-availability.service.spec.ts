import {PurchaseAvailabilityService} from './purchase-availability.service';
import {BluePhaseService} from './blue-phase.service';
import {HoldingRecord} from '../classes/records/holdings/holding-record';
import {Num} from '../num';

describe('PurchaseAvailabilityService', () => {
  let bluePhaseService: BluePhaseService;
  let service: PurchaseAvailabilityService;

  beforeEach(() => {
    bluePhaseService = new BluePhaseService();
    service = new PurchaseAvailabilityService(bluePhaseService);
    HoldingRecord.lithium.amount = Num.ZERO.copy();
    HoldingRecord.electrons.amount = Num.ZERO.copy();
    HoldingRecord.protons.amount = Num.ZERO.copy();
    HoldingRecord.beryllium.amount = Num.ZERO.copy();
  });

  it('highlights blue elements when a lithium battery upgrade is available', () => {
    HoldingRecord.neutronClump.amount = new Num(1, 1);
    HoldingRecord.lithium.amount = new Num(5, 0);
    const subNavigation = {
      location: 'elements',
      parent: {location: 'blue'},
      isUnlocked: () => true,
    } as any;

    expect(service.hasAvailablePurchase(subNavigation)).toBeTrue();
  });

  it('does not highlight locked blue elements even when a purchase is affordable', () => {
    HoldingRecord.neutronClump.amount = new Num(1, 1);
    HoldingRecord.lithium.amount = new Num(5, 0);
    const subNavigation = {
      location: 'elements',
      parent: {location: 'blue'},
      isUnlocked: () => false,
    } as any;

    expect(service.hasAvailablePurchase(subNavigation)).toBeFalse();
  });

  it('highlights blue elements when lithium batteries can discharge', () => {
    bluePhaseService.lithiumBatteries = new Num(1, 3);
    bluePhaseService.lithiumCharge = BluePhaseService.lithiumDischargeBaseCharge.copy();
    const subNavigation = {
      location: 'elements',
      parent: {location: 'blue'},
      isUnlocked: () => true,
    } as any;

    expect(service.hasAvailablePurchase(subNavigation)).toBeTrue();
  });
});
