import {
  BerylliumElement,
  BoronElement,
  CarbonElement,
  ElementCardEffects,
  HeliumElement,
  LithiumElement,
  NitrogenElement,
  OxygenElement,
  restoreBlueElement
} from './blue-element';

describe('ElementCardEffects', () => {
  it('resets every element effect to its neutral value', () => {
    ElementCardEffects.heliumPower = ElementCardEffects.heliumPower.mul(2);
    ElementCardEffects.lithiumChargeMultiplier = ElementCardEffects.lithiumChargeMultiplier.mul(3);

    ElementCardEffects.reset();

    expect(ElementCardEffects.heliumPower.toNumber()).toBe(1);
    expect(ElementCardEffects.lithiumChargeMultiplier.toNumber()).toBe(1);
    expect(ElementCardEffects.berylliumExtensionStrength.toNumber()).toBe(1);
    expect(ElementCardEffects.boronFreeExtensions.toNumber()).toBe(0);
    expect(ElementCardEffects.carbonAcceleratorGeneration.toNumber()).toBe(1);
    expect(ElementCardEffects.nitrogenAcceleratorEffect.toNumber()).toBe(1);
    expect(ElementCardEffects.oxygenRedParticleEffect.toNumber()).toBe(1);
  });

  it('creates independently stored concrete element instances', () => {
    const first = new LithiumElement('lithium-1', 2, 12);
    const second = new LithiumElement('lithium-2', 5, 47);

    expect(first).toEqual(jasmine.any(LithiumElement));
    expect(second).toEqual(jasmine.any(LithiumElement));
    expect(first.id).not.toBe(second.id);
    expect(first.getEffect().toNumber()).not.toBe(second.getEffect().toNumber());
  });

  it('rehydrates saved element data as the correct class', () => {
    const element = restoreBlueElement({id: 'saved-lithium', kind: 'lithium', level: 3, rarity: 25});

    expect(element).toEqual(jasmine.any(LithiumElement));
    expect(element.toStorage()).toEqual({id: 'saved-lithium', kind: 'lithium', level: 3, rarity: 25});
  });

  it('applies the Helium multiplier-upgrade power', () => {
    const element = new HeliumElement('helium-1', 10, 25);

    element.applyEffect();

    expect(ElementCardEffects.heliumPower.toNumber()).toBeCloseTo(element.getEffect().toNumber(), 10);
  });

  it('applies the Lithium charge rate', () => {
    const element = new LithiumElement('lithium-1', 3, 25);

    element.applyEffect();

    expect(ElementCardEffects.lithiumChargeRate.toNumber()).toBeCloseTo(element.getEffect().toNumber(), 10);
  });

  it('applies the Beryllium extension-strength multiplier', () => {
    const element = new BerylliumElement('beryllium-1', 10, 25);

    element.applyEffect();

    expect(ElementCardEffects.berylliumExtensionStrength.toNumber()).toBeCloseTo(element.getEffect().toNumber(), 10);
  });

  it('applies the Boron free-extension generation rate', () => {
    const element = new BoronElement('boron-1', 3, 25);

    element.applyEffect();

    expect(ElementCardEffects.boronExtensionRate.toNumber()).toBeCloseTo(element.getEffect().toNumber(), 10);
  });

  it('gives Carbon a powerful exponential generation multiplier', () => {
    const commonCarbon = new CarbonElement('carbon-1', 1, 0);
    const strongerCarbon = new CarbonElement('carbon-2', 5, 20);

    expect(commonCarbon.getEffect().toNumber()).toBe(10);
    expect(strongerCarbon.getEffect().toNumber()).toBe(1e6);
  });

  it('applies Carbon, Nitrogen, and Oxygen to their Red Accelerator effects', () => {
    const elements = [
      new CarbonElement('carbon-1', 5, 20),
      new NitrogenElement('nitrogen-1', 6, 20),
      new OxygenElement('oxygen-1', 7, 20)
    ];

    elements.forEach(element => element.applyEffect());

    expect(ElementCardEffects.carbonAcceleratorGeneration.toNumber()).toBeCloseTo(elements[0].getEffect().toNumber(), 10);
    expect(ElementCardEffects.nitrogenAcceleratorEffect.toNumber()).toBeCloseTo(elements[1].getEffect().toNumber(), 10);
    expect(ElementCardEffects.oxygenRedParticleEffect.toNumber()).toBeCloseTo(elements[2].getEffect().toNumber(), 10);
  });
});
