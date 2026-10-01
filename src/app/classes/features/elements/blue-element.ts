import {Num} from '../../../num';

export type ElementCardKind = 'helium' | 'lithium' | 'beryllium' | 'boron' | 'carbon' | 'nitrogen' | 'oxygen' | 'fluorine'
  | 'neon' | 'sodium' | 'magnesium' | 'aluminum';

export interface StoredBlueElement {
  id: string;
  kind: ElementCardKind;
  level: number;
  rarity: number;
}

export class ElementCardEffects {
  static readonly HELIUM_POWER_LIMIT = 1.99;
  static heliumPower = Num.ONE.copy();
  static lithiumChargeRate = Num.ZERO.copy();
  static lithiumChargeMultiplier = Num.ONE.copy();
  static berylliumExtensionStrength = Num.ONE.copy();
  static boronFreeExtensions = Num.ZERO.copy();
  static boronExtensionRate = Num.ZERO.copy();
  static carbonAcceleratorGeneration = Num.ONE.copy();
  static nitrogenAcceleratorEffect = Num.ONE.copy();
  static oxygenRedParticleEffect = Num.ONE.copy();
  static fluorineBoosterAccelerationRate = Num.ZERO.copy();
  static fluorineFreeBoosterAccelerations = Num.ZERO.copy();
  static neonYellowGeneratorPower = Num.ONE.copy();
  static sodiumYellowPowerPower = Num.ONE.copy();
  static magnesiumYellowParticleGain = Num.ONE.copy();
  static aluminumYellowGeneratorBuyMultiplier = Num.ONE.copy();

  static addPower(currentPower: Num, additionalPower: Num): Num {
    return currentPower.add(additionalPower.sub(Num.ONE));
  }

  static addHeliumPower(currentPower: Num, additionalPower: Num): Num {
    const currentBonus = Math.max(0, currentPower.toNumber() - 1);
    const additionalBonus = Math.max(0, additionalPower.toNumber() - 1);
    const maximumBonus = this.HELIUM_POWER_LIMIT - 1;
    const remainingBonus = Math.max(0, maximumBonus - currentBonus);

    // Each card contributes a fraction of the room left below the cap. This
    // keeps duplicate Helium cards useful without allowing them to reach ^2.
    const combinedBonus = currentBonus + remainingBonus * Math.min(1, additionalBonus / maximumBonus);
    return new Num(1 + Math.min(combinedBonus, maximumBonus), 0);
  }

  static reset(): void {
    this.heliumPower = Num.ONE.copy();
    this.lithiumChargeRate = Num.ZERO.copy();
    this.lithiumChargeMultiplier = Num.ONE.copy();
    this.berylliumExtensionStrength = Num.ONE.copy();
    this.boronFreeExtensions = Num.ZERO.copy();
    this.boronExtensionRate = Num.ZERO.copy();
    this.carbonAcceleratorGeneration = Num.ONE.copy();
    this.nitrogenAcceleratorEffect = Num.ONE.copy();
    this.oxygenRedParticleEffect = Num.ONE.copy();
    this.fluorineBoosterAccelerationRate = Num.ZERO.copy();
    this.fluorineFreeBoosterAccelerations = Num.ZERO.copy();
    this.neonYellowGeneratorPower = Num.ONE.copy();
    this.sodiumYellowPowerPower = Num.ONE.copy();
    this.magnesiumYellowParticleGain = Num.ONE.copy();
    this.aluminumYellowGeneratorBuyMultiplier = Num.ONE.copy();
  }
}

/** One independently rolled and stored element. Concrete element classes own
 * their identity and effect instead of being discriminated data objects. */
export abstract class BlueElement {
  abstract readonly kind: ElementCardKind;
  abstract readonly name: string;
  abstract readonly symbol: string;
  abstract readonly primaryColor: string;

  constructor(
    public readonly id: string,
    public readonly level: number,
    public readonly rarity: number
  ) {}

  protected get quality(): number { return 1 + this.rarity / 100; }

  /**
   * Generation effects are the engine of their respective phase, so their
   * rolled level and rarity should remain meaningful well beyond the first
   * few coins. Squaring level and cubing the rarity bonus preserves every
   * common level-one effect while letting strong rolls scale decisively.
   */
  protected get generationStrength(): number {
    return Math.pow(Math.max(1, this.level), 2) * Math.pow(this.quality, 3);
  }
  abstract getEffect(): Num;
  abstract getEffectDescription(): string;
  abstract applyEffect(): void;

  toStorage(): StoredBlueElement {
    return {id: this.id, kind: this.kind, level: this.level, rarity: this.rarity};
  }
}

export class HeliumElement extends BlueElement {
  readonly kind = 'helium'; readonly name = 'Helium'; readonly symbol = 'He'; readonly primaryColor = '#8be9fd';
  getEffect(): Num {
    const power = 1.03 + Math.log10(Math.max(1, this.level)) * this.quality * .01;
    return new Num(Math.min(power, ElementCardEffects.HELIUM_POWER_LIMIT), 0);
  }
  getEffectDescription(): string { return `Raises red generator multiplier upgrades to ^${this.getEffect().toString(3)}`; }
  applyEffect(): void {
    ElementCardEffects.heliumPower = ElementCardEffects.addHeliumPower(ElementCardEffects.heliumPower, this.getEffect());
  }
}

export class LithiumElement extends BlueElement {
  readonly kind = 'lithium'; readonly name = 'Lithium'; readonly symbol = 'Li'; readonly primaryColor = '#d8b4fe';
  getEffect(): Num { return new Num(this.generationStrength, 0); }
  getEffectDescription(): string { return `Charges a growing red generator multiplier at ${this.getEffect().toString(3)}x speed (level 1 reaches 1e10x in one hour)`; }
  applyEffect(): void { ElementCardEffects.lithiumChargeRate = ElementCardEffects.lithiumChargeRate.add(this.getEffect()); }
}

export class BerylliumElement extends BlueElement {
  readonly kind = 'beryllium'; readonly name = 'Beryllium'; readonly symbol = 'Be'; readonly primaryColor = '#86efac';
  getEffect(): Num { return new Num(1 + Math.log10(this.level + 1) * this.quality * 2, 0); }
  getEffectDescription(): string { return `Multiplies red extension strength by ${this.getEffect().toString(3)}x`; }
  applyEffect(): void { ElementCardEffects.berylliumExtensionStrength = ElementCardEffects.berylliumExtensionStrength.mul(this.getEffect()); }
}

export class BoronElement extends BlueElement {
  readonly kind = 'boron'; readonly name = 'Boron'; readonly symbol = 'B'; readonly primaryColor = '#fca5a5';
  getEffect(): Num { return new Num(this.generationStrength, 0); }
  getEffectDescription(): string { return `Generates free red extensions at ${this.getEffect().toString(3)}x speed; the first is quick, then each one takes amount^1.1 longer until the next Blue reset`; }
  applyEffect(): void { ElementCardEffects.boronExtensionRate = ElementCardEffects.boronExtensionRate.add(this.getEffect()); }
}

abstract class RedAcceleratorElement extends BlueElement {
  getEffect(): Num { return new Num(1 + Math.log10(this.level + 1) * this.quality * .2, 0); }
}

export class CarbonElement extends RedAcceleratorElement {
  readonly kind = 'carbon'; readonly name = 'Carbon'; readonly symbol = 'C'; readonly primaryColor = '#64748b';
  override getEffect(): Num { return new Num(1, this.generationStrength).sqrt(); }
  getEffectDescription(): string { return `Multiplies Red Accelerator generation by ${this.getEffect().toString(3)}x`; }
  applyEffect(): void { ElementCardEffects.carbonAcceleratorGeneration = ElementCardEffects.carbonAcceleratorGeneration.mul(this.getEffect()); }
}

export class NitrogenElement extends RedAcceleratorElement {
  readonly kind = 'nitrogen'; readonly name = 'Nitrogen'; readonly symbol = 'N'; readonly primaryColor = '#60a5fa';
  getEffectDescription(): string { return `Improves the Red Accelerator to Red Generator effect formula from RA^0.5 to RA^${this.getEffect().div(new Num(2, 0)).toString(3)}`; }
  applyEffect(): void {
    ElementCardEffects.nitrogenAcceleratorEffect = ElementCardEffects.addPower(
      ElementCardEffects.nitrogenAcceleratorEffect,
      this.getEffect()
    );
  }
}

export class OxygenElement extends RedAcceleratorElement {
  readonly kind = 'oxygen'; readonly name = 'Oxygen'; readonly symbol = 'O'; readonly primaryColor = '#f87171';
  getEffectDescription(): string { return `Improves the Red Particle to Red Accelerator formula from log10(RP / 1e75)^1 to ^${this.getEffect().toString(3)}`; }
  applyEffect(): void {
    ElementCardEffects.oxygenRedParticleEffect = ElementCardEffects.addPower(
      ElementCardEffects.oxygenRedParticleEffect,
      this.getEffect()
    );
  }
}

export class FluorineElement extends BlueElement {
  readonly kind = 'fluorine'; readonly name = 'Fluorine'; readonly symbol = 'F'; readonly primaryColor = '#a3e635';
  getEffect(): Num { return new Num(this.generationStrength, 0); }
  getEffectDescription(): string { return `Generates free Booster Accelerations at ${this.getEffect().toString(3)}x speed; the first takes one hour and later accelerations take amount^1.1 longer until the next Blue reset`; }
  applyEffect(): void { ElementCardEffects.fluorineBoosterAccelerationRate = ElementCardEffects.fluorineBoosterAccelerationRate.add(this.getEffect()); }
}

abstract class YellowPhaseElement extends BlueElement {
  getEffect(): Num { return new Num(1 + Math.log10(this.level + 1) * this.quality * .2, 0); }
}

export class NeonElement extends YellowPhaseElement {
  readonly kind = 'neon'; readonly name = 'Neon'; readonly symbol = 'Ne'; readonly primaryColor = '#fb7185';
  getEffectDescription(): string { return `Raises the total Yellow Generator multiplier to ^${this.getEffect().toString(3)}`; }
  applyEffect(): void {
    ElementCardEffects.neonYellowGeneratorPower = ElementCardEffects.addPower(
      ElementCardEffects.neonYellowGeneratorPower,
      this.getEffect()
    );
  }
}

export class SodiumElement extends YellowPhaseElement {
  readonly kind = 'sodium'; readonly name = 'Sodium'; readonly symbol = 'Na'; readonly primaryColor = '#fbbf24';
  override getEffect(): Num { return new Num(1 + Math.log10(this.level + 1) * this.quality * .01, 0); }
  getEffectDescription(): string { return `Raises the Yellow Power effect to ^${this.getEffect().toString(3)}`; }
  applyEffect(): void {
    ElementCardEffects.sodiumYellowPowerPower = ElementCardEffects.addPower(
      ElementCardEffects.sodiumYellowPowerPower,
      this.getEffect()
    );
  }
}

export class MagnesiumElement extends YellowPhaseElement {
  readonly kind = 'magnesium'; readonly name = 'Magnesium'; readonly symbol = 'Mg'; readonly primaryColor = '#e2e8f0';
  override getEffect(): Num { return new Num(1 + Math.log10(this.level + 1) * this.quality * 2, 0); }
  getEffectDescription(): string { return `Multiplies Yellow Particle gain by ${this.getEffect().toString(3)}x`; }
  applyEffect(): void {
    ElementCardEffects.magnesiumYellowParticleGain = ElementCardEffects.magnesiumYellowParticleGain.mul(this.getEffect());
  }
}

export class AluminumElement extends YellowPhaseElement {
  readonly kind = 'aluminum'; readonly name = 'Aluminum'; readonly symbol = 'Al'; readonly primaryColor = '#94a3b8';
  getEffectDescription(): string { return `Multiplies Yellow Generator buy multipliers by ${this.getEffect().toString(3)}x`; }
  applyEffect(): void {
    ElementCardEffects.aluminumYellowGeneratorBuyMultiplier = ElementCardEffects.aluminumYellowGeneratorBuyMultiplier.mul(this.getEffect());
  }
}

export function createBlueElement(kind: ElementCardKind, id: string, level: number, rarity: number): BlueElement {
  switch (kind) {
    case 'helium': return new HeliumElement(id, level, rarity);
    case 'lithium': return new LithiumElement(id, level, rarity);
    case 'beryllium': return new BerylliumElement(id, level, rarity);
    case 'boron': return new BoronElement(id, level, rarity);
    case 'carbon': return new CarbonElement(id, level, rarity);
    case 'nitrogen': return new NitrogenElement(id, level, rarity);
    case 'oxygen': return new OxygenElement(id, level, rarity);
    case 'fluorine': return new FluorineElement(id, level, rarity);
    case 'neon': return new NeonElement(id, level, rarity);
    case 'sodium': return new SodiumElement(id, level, rarity);
    case 'magnesium': return new MagnesiumElement(id, level, rarity);
    case 'aluminum': return new AluminumElement(id, level, rarity);
  }
}

export function restoreBlueElement(stored: StoredBlueElement): BlueElement {
  return createBlueElement(stored.kind, stored.id, stored.level, stored.rarity);
}
