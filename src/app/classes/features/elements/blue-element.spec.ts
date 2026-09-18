import {ElementCardEffects, LithiumElement, restoreBlueElement} from './blue-element';

describe('ElementCardEffects', () => {
  it('resets every element effect to its neutral value', () => {
    ElementCardEffects.heliumPower = ElementCardEffects.heliumPower.mul(2);
    ElementCardEffects.lithiumChargeMultiplier = ElementCardEffects.lithiumChargeMultiplier.mul(3);

    ElementCardEffects.reset();

    expect(ElementCardEffects.heliumPower.toNumber()).toBe(1);
    expect(ElementCardEffects.lithiumChargeMultiplier.toNumber()).toBe(1);
    expect(ElementCardEffects.berylliumExtensionStrength.toNumber()).toBe(1);
    expect(ElementCardEffects.boronFreeExtensions.toNumber()).toBe(0);
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
});
