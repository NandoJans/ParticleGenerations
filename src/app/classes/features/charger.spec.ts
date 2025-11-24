import { Charger } from './charger';
import { Num } from '../../num';
import { ResetKey } from '../enums/reset-key';
import { Requirement } from './interfaces/requirement';

// Concrete test implementation of Charger
class TestCharger extends Charger {
  displayName: string = 'Test Charger';
  resetId: ResetKey = ResetKey.NONE;
  baseMaxCharge: Num = new Num(100, 0);
  maxTier: Num | undefined = new Num(5, 0);
  canInfiniteChargeAtMaxTier: boolean = false;
  requirement: Requirement[] = [];
  name: string = 'test-charger';

  override shouldCharge(): boolean {
    return true;
  }

  getChargeAmount(): Num {
    return new Num(1, 0);
  }

  action(): undefined {
    this.effect = this['getEffectiveCharge']();
  }

  applyTierDrawback(chargeValue: Num): Num {
    // Simple drawback: divide by (tier + 1)
    return chargeValue.div(this.tier.add(new Num(1, 0)));
  }
}

describe('Charger', () => {
  let charger: TestCharger;

  beforeEach(() => {
    charger = new TestCharger('test-charger');
  });

  it('should create an instance', () => {
    expect(charger).toBeTruthy();
  });

  it('should initialize with zero charge and tier 1', () => {
    expect(charger.charge.toNumber()).toBe(0);
    expect(charger.tier.toNumber()).toBe(1);
  });

  it('should apply charge when running', () => {
    charger.charging = true;
    const initialCharge = charger.charge.toNumber();
    charger.run(new Num(1, 0));
    expect(charger.charge.toNumber()).toBeGreaterThan(initialCharge);
  });

  it('should tier up manually when reaching max charge', () => {
    charger.charge = new Num(100, 0);
    expect(charger.canTierUp()).toBe(true);
    charger.tierUp();
    expect(charger.tier.toNumber()).toBe(2);
    expect(charger.charge.toNumber()).toBe(0); // charge reset to 0 after subtracting max charge
  });

  it('should not automatically tier up in run loop', () => {
    charger.charging = true;
    charger.charge = new Num(100, 0);
    charger.run(new Num(1, 0));
    // Tier should NOT automatically increase - tier up is now manual
    expect(charger.tier.toNumber()).toBe(1);
  });

  it('should not tier up beyond max tier', () => {
    charger.tier = new Num(5, 0);
    charger.charge = new Num(100, 0);
    expect(charger.canTierUp()).toBe(false);
    charger.tierUp();
    expect(charger.tier.toNumber()).toBe(5);
  });

  it('should reset charge and tier', () => {
    charger.charge = new Num(50, 0);
    charger.tier = new Num(3, 0);
    charger.reset();
    expect(charger.charge.toNumber()).toBe(0);
    expect(charger.tier.toNumber()).toBe(1);
  });

  it('should apply tier drawback to effective charge', () => {
    charger.charge = new Num(100, 0);
    charger.tier = new Num(1, 0);
    const effectiveCharge = charger['getEffectiveCharge']();
    expect(effectiveCharge.toNumber()).toBe(50); // 100 / (1 + 1)
  });

  it('should return max charge based on base max charge by default', () => {
    expect(charger.maxCharge.toNumber()).toBe(100);
  });
});
