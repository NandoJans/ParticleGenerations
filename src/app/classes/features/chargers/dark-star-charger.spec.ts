import { DarkStarCharger } from './dark-star-charger';
import { Num } from '../../../num';
import { ResetKey } from '../../enums/reset-key';
import { Requirement } from '../interfaces/requirement';

// Concrete test implementation of DarkStarCharger
class TestDarkStarCharger extends DarkStarCharger {
  displayName: string = 'Test Dark Star Charger';
  resetId: ResetKey = ResetKey.NONE;
  baseMaxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(5, 0);
  canInfiniteChargeAtMaxTier: boolean = false;
  requirement: Requirement[] = [];
  name: string = 'test-dark-star-charger';
  nerfsApplied: boolean = false;

  getChargeAmount(): Num {
    return new Num(1, 0);
  }

  action(): void {
    this.effect = this.getEffectiveCharge();
  }

  applyTierDrawback(chargeValue: Num): Num {
    return chargeValue.div(this.tier.add(new Num(1, 0)));
  }

  applyNerfs(): void {
    this.nerfsApplied = true;
  }

  revertNerfs(): void {
    this.nerfsApplied = false;
  }

  getNerfDescription(): string {
    return 'Test nerf description';
  }

  getChargeDescription(): string {
    return 'Test charge description';
  }

  getRewardDescription(): string {
    return 'Test reward description';
  }

  getEffectDescription(): string {
    return 'Test effect description';
  }
}

describe('DarkStarCharger', () => {
  let charger: TestDarkStarCharger;

  beforeEach(() => {
    charger = new TestDarkStarCharger('test-dark-star-charger');
  });

  it('should create an instance', () => {
    expect(charger).toBeTruthy();
  });

  it('should not charge when nerf is not active', () => {
    const initialCharge = charger.charge.toNumber();
    charger.run(new Num(1, 0));
    expect(charger.charge.toNumber()).toBe(initialCharge);
  });

  it('should charge when nerf is active', () => {
    charger.activateNerf();
    const initialCharge = charger.charge.toNumber();
    charger.run(new Num(1, 0));
    expect(charger.charge.toNumber()).toBeGreaterThan(initialCharge);
  });

  it('should apply nerfs when activated', () => {
    charger.activateNerf();
    expect(charger.nerfsApplied).toBe(true);
    expect(charger.isActive()).toBe(true);
  });

  it('should revert nerfs when deactivated', () => {
    charger.activateNerf();
    charger.deactivateNerf();
    expect(charger.nerfsApplied).toBe(false);
    expect(charger.isActive()).toBe(false);
  });

  it('should toggle nerf state', () => {
    expect(charger.isActive()).toBe(false);
    charger.toggleNerf();
    expect(charger.isActive()).toBe(true);
    charger.toggleNerf();
    expect(charger.isActive()).toBe(false);
  });

  it('should reset nerf state on reset', () => {
    charger.activateNerf();
    charger.reset();
    expect(charger.isActive()).toBe(false);
  });

  it('should save and load nerf state', () => {
    charger.activateNerf();
    charger.save();
    
    const newCharger = new TestDarkStarCharger('test-dark-star-charger');
    newCharger.tryLoad();
    
    expect(newCharger.isActive()).toBe(true);
    expect(newCharger.nerfsApplied).toBe(true);
  });
});
