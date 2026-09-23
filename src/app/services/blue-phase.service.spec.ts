import {BluePhaseService} from './blue-phase.service';
import {HoldingRecord} from '../classes/records/holdings/holding-record';
import {GeneratorRecord} from '../classes/records/generators/generator-record';
import {MilestoneRecord} from '../classes/records/milestones/milestone-record';
import {UpgradeRecord} from '../classes/records/upgrades/upgrade-record';
import {ResetHelper} from '../classes/helpers/reset-helper';
import {ResetKey} from '../classes/enums/reset-key';
import {Num} from '../num';
import {Multiplier} from '../classes/features/multiplier';
import {Automator} from '../classes/features/automator';
import {PrestigeLayersService} from './prestige-layers.service';
import {ChargerRecord} from '../classes/records/charger/charger-record';
import {MultiplierRecord} from '../classes/records/multipliers/multiplier-record';
import {createBlueElement, ElementCardEffects} from '../classes/features/elements/blue-element';
import {StrangeQuarkEffects} from '../classes/features/strange-quark-effects';

describe('BluePhaseService', () => {
  let service: BluePhaseService;

  beforeEach(() => {
    service = new BluePhaseService();
    ElementCardEffects.reset();
    StrangeQuarkEffects.reset();
    service.unlocked = true;
    service.activeParticle = 'none';

    HoldingRecord.protons.amount = Num.ZERO.copy();
    HoldingRecord.electrons.amount = Num.ZERO.copy();
    HoldingRecord.neutrons.amount = Num.ZERO.copy();
    HoldingRecord.neutronClump.amount = Num.ZERO.copy();
    HoldingRecord.greenParticles.amount = Num.ZERO.copy();
    HoldingRecord.redParticles.amount = Num.ONE.copy();
    HoldingRecord.yellowPrestiges.amount = Num.ZERO.copy();
    HoldingRecord.yellowParticles.amount = Num.ZERO.copy();
    HoldingRecord.yellowKeys.amount = Num.ZERO.copy();

    GeneratorRecord.firstRedGenerator.bought = Num.ZERO.copy();
    GeneratorRecord.firstRedGenerator.multiplierUpgrade.bought = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.amount = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.bought = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.amount = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.bought = Num.ZERO.copy();
    UpgradeRecord.blueParticleResonance.amount = Num.ZERO.copy();
    UpgradeRecord.blueParticleResonance.bought = Num.ZERO.copy();
    UpgradeRecord.blueCollisionCalibration.amount = Num.ZERO.copy();
    UpgradeRecord.blueCollisionCalibration.bought = Num.ZERO.copy();
    UpgradeRecord.redGeneratorExtension.amount = Num.ZERO.copy();
    UpgradeRecord.redGeneratorExtension.bought = Num.ZERO.copy();
    UpgradeRecord.redGeneratorExtension.effect = undefined;
    MilestoneRecord.stableParticleBeam.unlocked = false;
    MilestoneRecord.denseParticleCollision.unlocked = false;
    service.synchronizePurchases();
    MultiplierRecord.redAcceleratorGenerators.reset();
    MultiplierRecord.redGeneratorExtensionBuffer.reset();
    MultiplierRecord.nucleusGeneration.reset();
  });

  it('keeps an active element selected through Blue phase resets', () => {
    const element = createBlueElement('helium', 'coin-1', 2, 15);
    service.elements = [element];

    service.equipElementCard(element);
    service.toggleElementCard(element);

    expect(service.activeElementCardIds).toEqual(['coin-1']);
    ResetHelper.reset(ResetKey.BLUE);
    expect(service.activeElementCardIds).toEqual(['coin-1']);
  });

  it('clears active elements only on request and triggers a Blue phase reset', () => {
    const element = createBlueElement('helium', 'coin-1', 2, 15);
    service.elements = [element];
    service.equipElementCard(element);
    const resetSpy = spyOn(ResetHelper, 'reset').and.callThrough();

    service.clearActiveElementCards();

    expect(service.activeElementCardIds).toEqual([]);
    expect(resetSpy).toHaveBeenCalledOnceWith(ResetKey.BLUE);
  });

  it('does not equip more element coins than there are active slots', () => {
    service.elements = [
      createBlueElement('helium', 'coin-1', 1, 1),
      createBlueElement('lithium', 'coin-2', 1, 1),
      createBlueElement('beryllium', 'coin-3', 1, 1)
    ];

    service.elements.forEach(element => service.equipElementCard(element));

    expect(service.activeElementCardIds).toEqual(['coin-1', 'coin-2']);
  });

  it('gives every unlocked element an equal quarter of the fusion roll', () => {
    const rolls = [0, 0.249999, 0.25, 0.499999, 0.5, 0.749999, 0.75, 0.999999];
    const generatedKinds: string[] = [];

    rolls.forEach(roll => {
      HoldingRecord.neutrons.amount = new Num(1, 4);
      const randomValues = [roll, 0, 0];
      const element = service.fuseElement(() => randomValues.shift() as number);
      generatedKinds.push(element?.kind as string);
    });

    expect(generatedKinds).toEqual([
      'helium', 'helium',
      'lithium', 'lithium',
      'beryllium', 'beryllium',
      'boron', 'boron'
    ]);
  });

  it('unlocks Carbon, Nitrogen, and Oxygen at neutron stages five through seven', () => {
    HoldingRecord.neutrons.amount = new Num(1, 5);
    expect(service.getUnlockedCardKinds()).toEqual(['helium', 'lithium', 'beryllium', 'boron', 'carbon']);

    HoldingRecord.neutrons.amount = new Num(1, 6);
    expect(service.getUnlockedCardKinds()).toEqual(['helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen']);

    HoldingRecord.neutrons.amount = new Num(1, 7);
    expect(service.getUnlockedCardKinds()).toEqual(['helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen']);
  });

  it('applies active Carbon, Nitrogen, and Oxygen accelerator boosts', () => {
    const carbon = createBlueElement('carbon', 'carbon-1', 5, 20);
    const nitrogen = createBlueElement('nitrogen', 'nitrogen-1', 6, 20);
    const oxygen = createBlueElement('oxygen', 'oxygen-1', 7, 20);
    service.neutronStarUpgrades.activeSlots = 1;
    service.elements = [carbon, nitrogen, oxygen];

    service.elements.forEach(element => service.equipElementCard(element));

    expect(ElementCardEffects.carbonAcceleratorGeneration.toNumber()).toBeCloseTo(carbon.getEffect().toNumber(), 10);
    expect(ElementCardEffects.nitrogenAcceleratorEffect.toNumber()).toBeCloseTo(nitrogen.getEffect().toNumber(), 10);
    expect(ElementCardEffects.oxygenRedParticleEffect.toNumber()).toBeCloseTo(oxygen.getEffect().toNumber(), 10);
  });

  it('applies active Helium and Beryllium effects to their red upgrade calculations', () => {
    const helium = createBlueElement('helium', 'helium-1', 10, 25);
    const beryllium = createBlueElement('beryllium', 'beryllium-1', 10, 25);
    service.elements = [helium, beryllium];

    service.equipElementCard(helium);
    service.equipElementCard(beryllium);

    expect(ElementCardEffects.heliumPower.toNumber()).toBeCloseTo(helium.getEffect().toNumber(), 10);
    expect(UpgradeRecord.redGeneratorExtension.getEffectiveBuffer().toNumber()).toBeCloseTo(
      UpgradeRecord.redGeneratorExtension.buffer
        .mul(MultiplierRecord.redGeneratorExtensionBuffer.getNum())
        .mul(beryllium.getEffect())
        .toNumber(),
      10
    );
  });

  it('charges a level-one Lithium red generator multiplier to 1e10 in one hour', () => {
    const lithium = createBlueElement('lithium', 'lithium-1', 1, 0);
    service.elements = [lithium];
    service.equipElementCard(lithium);

    service.tick(new Num(3.6, 3));

    expect(service.getLithiumCardMultiplier().log10().toNumber()).toBeCloseTo(10, 8);
  });

  it('formats a Lithium multiplier above 1e6 with an integer scientific exponent', () => {
    service.lithiumCardChargeSeconds = new Num(1, 2);

    const multiplier = service.getLithiumCardMultiplier();

    expect(multiplier.exponent).toBe(Math.floor(multiplier.exponent));
    expect(multiplier.toString(3)).toMatch(/^\d\.\d{2}e\d+$/);
  });

  it('generates an early Boron extension quickly and scales later extension times by amount^1.1', () => {
    const boron = createBlueElement('boron', 'boron-1', 1, 0);
    service.elements = [boron];
    service.equipElementCard(boron);

    service.tick(new Num(3, 1));
    expect(service.getBoronCardProgressPercent()).toBeCloseTo(50, 8);
    expect(UpgradeRecord.redGeneratorExtension.effectString()).not.toContain('free from Boron');

    service.tick(new Num(3, 1));
    expect(UpgradeRecord.redGeneratorExtension.effectString()).toContain('1 free from Boron');

    service.tick(new Num(6, 1));
    expect(ElementCardEffects.boronFreeExtensions.toNumber()).toBe(1);
    expect(service.getBoronCardProgressPercent()).toBeCloseTo(100 / Math.pow(2, 1.1), 8);
  });

  it('keeps the extension multiplier visible alongside Boron free extensions', () => {
    const extension = UpgradeRecord.redGeneratorExtension;
    extension.amount = new Num(2, 0);
    extension.effect = new Num(8, 0);
    ElementCardEffects.boronFreeExtensions = new Num(1, 0);

    expect(extension.effectString()).toBe('8x (2 purchased + 1 free from Boron)');
  });

  it('turns sacrificed elements into neutron-star mass based on weight, level, and rarity', () => {
    const boron = createBlueElement('boron', 'boron-sacrifice', 2, 50);
    service.elementsDiscovered = 10;
    service.elements = [boron];
    service.equipElementCard(boron);

    service.sacrificeElement(boron);

    expect(service.neutronStarMass.toNumber()).toBeCloseTo(33, 8);
    expect(service.elements).toEqual([]);
    expect(service.activeElementCardIds).toEqual([]);
    expect(ElementCardEffects.boronExtensionRate.toNumber()).toBe(0);
  });

  it('bases neutron meltdown power on the highest neutron amount reached', () => {
    HoldingRecord.neutrons.amount = new Num(1, 10);
    expect(service.getNeutronMeltdownPower().toNumber()).toBeCloseTo(1, 8);

    HoldingRecord.neutrons.amount = Num.ZERO.copy();

    expect(service.highestNeutrons.equals(new Num(1, 10))).toBeTrue();
    expect(service.getNeutronMeltdownPower().toNumber()).toBeCloseTo(1, 8);
  });

  it('starts Blue runs with one of each Yellow resource after the first mass milestone', () => {
    service.neutronStarMass = new Num(1, 1);

    service.unlockFromPrestige();

    expect(HoldingRecord.yellowPrestiges.amount.equals(Num.ONE)).toBeTrue();
    expect(HoldingRecord.yellowParticles.amount.equals(Num.ONE)).toBeTrue();
    expect(HoldingRecord.yellowKeys.amount.equals(Num.ONE)).toBeTrue();
  });

  it('generates strange quarks from the square root of neutron-star mass', () => {
    service.neutronStarMass = new Num(1, 2);

    service.tick(new Num(1, 1));

    expect(service.strangeQuarks.toNumber()).toBeCloseTo(10, 8);
    expect(service.getStrangeQuarkGeneration().toNumber()).toBeCloseTo(1, 8);
  });

  it('raises strange quarks to the 0.25 power for the red generator buy multiplier', () => {
    service.strangeQuarks = new Num(1.6, 1);

    service.applyStrangeQuarkEffect();

    expect(service.getStrangeQuarkEffect().toNumber()).toBeCloseTo(2, 8);
    expect(StrangeQuarkEffects.redGeneratorBuyMultiplier.toNumber()).toBeCloseTo(2, 8);
  });

  it('keeps the strange-quark buy multiplier at one below one strange quark', () => {
    service.strangeQuarks = new Num(6.25, -2);

    service.applyStrangeQuarkEffect();

    expect(StrangeQuarkEffects.redGeneratorBuyMultiplier.equals(Num.ONE)).toBeTrue();
  });

  it('spends strange quarks on blue boosts and capacity upgrades', () => {
    const protonUpgrade = service.neutronStarUpgradeDefinitions.find(upgrade => upgrade.key === 'protons')!;
    const activeSlotUpgrade = service.neutronStarUpgradeDefinitions.find(upgrade => upgrade.key === 'activeSlots')!;
    service.strangeQuarks = new Num(1, 8);
    service.activeParticle = 'protons';
    const generationBefore = service.getParticleGeneration();

    service.buyNeutronStarUpgrade(protonUpgrade);
    service.buyNeutronStarUpgrade(activeSlotUpgrade);

    expect(service.getParticleGeneration().div(generationBefore).toNumber()).toBeCloseTo(2, 8);
    expect(service.getActiveElementSlots()).toBe(3);
  });

  it('resets accumulated Lithium and Boron card effects on a Blue reset', () => {
    service.lithiumCardChargeSeconds = new Num(3.6, 3);
    service.boronCardExtensionProgress = new Num(2.5, 0);

    ResetHelper.reset(ResetKey.BLUE);

    expect(service.lithiumCardChargeSeconds.toNumber()).toBe(0);
    expect(service.boronCardExtensionProgress.toNumber()).toBe(0);
  });

  afterEach(() => {
    Automator.keepOnReset = false;
    PrestigeLayersService.yellowPrestigeLayer.passivePrestige = false;
    PrestigeLayersService.greenPrestigeLayer.passivePrestige = false;
    PrestigeLayersService.yellowPrestigeLayer.limitPhaseBelow = true;
    PrestigeLayersService.greenPrestigeLayer.limitPhaseBelow = true;
    Multiplier.neutronMeltdownPower = Num.ONE.copy();
    HoldingRecord.protons.amount = Num.ZERO.copy();
    HoldingRecord.electrons.amount = Num.ZERO.copy();
    HoldingRecord.neutrons.amount = Num.ZERO.copy();
    HoldingRecord.neutronClump.amount = Num.ZERO.copy();
    HoldingRecord.greenParticles.amount = Num.ZERO.copy();
    HoldingRecord.redParticles.amount = Num.ONE.copy();
    HoldingRecord.yellowPrestiges.amount = Num.ZERO.copy();
    HoldingRecord.yellowParticles.amount = Num.ZERO.copy();
    HoldingRecord.yellowKeys.amount = Num.ZERO.copy();
    GeneratorRecord.firstRedGenerator.bought = Num.ZERO.copy();
    GeneratorRecord.firstRedGenerator.multiplierUpgrade.bought = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.amount = Num.ZERO.copy();
    UpgradeRecord.blueBeamIntensity.bought = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.amount = Num.ZERO.copy();
    UpgradeRecord.blueColliderEfficiency.bought = Num.ZERO.copy();
    UpgradeRecord.blueParticleResonance.amount = Num.ZERO.copy();
    UpgradeRecord.blueParticleResonance.bought = Num.ZERO.copy();
    UpgradeRecord.blueCollisionCalibration.amount = Num.ZERO.copy();
    UpgradeRecord.blueCollisionCalibration.bought = Num.ZERO.copy();
    MultiplierRecord.redAcceleratorGenerators.reset();
    MultiplierRecord.redGeneratorExtensionBuffer.reset();
    MultiplierRecord.nucleusGeneration.reset();
  });

  it('does not automatically enter Blue when the unlock threshold is reached', () => {
    service.unlocked = false;
    HoldingRecord.greenParticles.amount = BluePhaseService.unlockRequirement.copy();
    spyOn(ResetHelper, 'reset');

    service.tick(Num.ONE);

    expect(service.unlocked).toBeFalse();
    expect(ResetHelper.reset).not.toHaveBeenCalled();
  });

  it('enters Blue only after an explicit prestige', () => {
    service.unlocked = false;

    service.unlockFromPrestige();

    expect(service.unlocked).toBeTrue();
    expect(service.activeParticle).toBe('protons');
  });

  it('starts generating protons immediately and alternates the active particle on every generator and upgrade purchase', () => {
    service.unlockFromPrestige();
    service.tick(Num.ONE);
    expect(HoldingRecord.protons.amount.toNumber()).toBeGreaterThan(0);

    GeneratorRecord.firstRedGenerator.bought = Num.ONE.copy();
    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('electrons');

    GeneratorRecord.firstRedGenerator.bought = Num.TWO.copy();
    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('protons');

    GeneratorRecord.firstRedGenerator.multiplierUpgrade.bought = Num.ONE.copy();
    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('electrons');

    service.tick(Num.ZERO);
    expect(service.activeParticle).toBe('electrons');
  });

  it('collides matched pairs into persistent neutrons', () => {
    HoldingRecord.protons.amount = new Num(8, 0);
    HoldingRecord.electrons.amount = new Num(5, 0);
    spyOn(ResetHelper, 'reset');

    service.collide();

    expect(ResetHelper.reset).toHaveBeenCalledWith(ResetKey.BLUE);
    expect(HoldingRecord.neutrons.amount.toNumber()).toBe(5);
    expect(service.activeParticle).toBe('protons');
  });

  it('resets dark star chargers when Blue is unlocked from prestige', () => {
    const charger = ChargerRecord.redGeneratorDarkCharger;
    charger.unlocked = true;
    charger.charge = new Num(5, 0);
    charger.tier = new Num(3, 0);
    charger.highestTier = new Num(3, 0);
    charger.startCharging();

    service.unlockFromPrestige();

    expect(charger.charge.equals(charger.startCharge)).toBeTrue();
    expect(charger.tier.equals(charger.startTier)).toBeTrue();
    expect(charger.highestTier.equals(charger.startTier)).toBeTrue();
    expect(charger.isUnlocked()).toBeFalse();
  });

  it('uses Blue Particles for Blue Particle research upgrades', () => {
    expect(UpgradeRecord.blueParticleResonance.currency).toBe(HoldingRecord.blueParticles);
    expect(UpgradeRecord.blueCollisionCalibration.currency).toBe(HoldingRecord.blueParticles);
    expect(UpgradeRecord.blueBeamIntensity.currency).toBe(HoldingRecord.neutrons);
  });

  it('boosts beam generation by red particle orders of magnitude from a lower base rate', () => {
    expect(service.getParticleGeneration().toNumber()).toBeCloseTo(0.001, 8);

    HoldingRecord.redParticles.amount = new Num(1, 6);

    expect(service.getRedParticleGenerationBoost().toNumber()).toBe(6);
    expect(service.getParticleGeneration().toNumber()).toBeCloseTo(0.006, 8);
  });

  it('squares the red-particle electron and proton multiplier at 250 neutron-star mass', () => {
    HoldingRecord.redParticles.amount = new Num(1, 6);
    service.neutronStarMass = new Num(2.49, 2);
    expect(service.getRedParticleGenerationBoost().toNumber()).toBe(6);

    service.neutronStarMass = new Num(2.5, 2);

    expect(service.getRedParticleGenerationBoost().toNumber()).toBe(36);
    service.activeParticle = 'protons';
    expect(service.getParticleGeneration().toNumber()).toBeCloseTo(0.036, 8);
    service.activeParticle = 'electrons';
    expect(service.getParticleGeneration().toNumber()).toBeCloseTo(0.036, 8);
  });

  it('applies Blue Particle research to beam generation and collision gain', () => {
    UpgradeRecord.blueParticleResonance.amount = Num.ONE.copy();
    UpgradeRecord.blueCollisionCalibration.amount = Num.ONE.copy();
    HoldingRecord.redParticles.amount = new Num(1, 3);
    HoldingRecord.protons.amount = new Num(8, 0);
    HoldingRecord.electrons.amount = new Num(5, 0);

    expect(service.getParticleGeneration().toNumber()).toBeCloseTo(0.009, 8);
    expect(service.getCollisionGain().toNumber()).toBe(2);
  });
  it('merges legacy neutron clump matter back into persistent neutrons', () => {
    HoldingRecord.neutrons.amount = new Num(4, 0);
    HoldingRecord.neutronClump.amount = new Num(6, 0);

    service.mergeLegacyNeutronClump();

    expect(HoldingRecord.neutrons.amount.toNumber()).toBe(10);
    expect(HoldingRecord.neutronClump.amount.toNumber()).toBe(0);
  });


  it('advances one neutron stage for every power of ten', () => {
    HoldingRecord.neutrons.amount = new Num(9, 0);
    expect(service.getNeutronStage()).toBe(0);

    HoldingRecord.neutrons.amount = new Num(1, 1);
    expect(service.getNeutronStage()).toBe(1);

    HoldingRecord.neutrons.amount = new Num(1, 3);
    expect(service.getNeutronStage()).toBe(3);
  });


  it('starts the neutron meltdown at ^0.001 and fully restores at 10,000 neutron matter', () => {
    expect(service.getNeutronMeltdownPower().toNumber()).toBeCloseTo(0.001, 8);

    HoldingRecord.neutrons.amount = new Num(1, 4);

    expect(service.getTotalNeutronMatter().toNumber()).toBe(10000);
    expect(service.getNeutronMeltdownPower().toNumber()).toBeCloseTo(1, 8);
  });

  it('raises non-Blue multipliers to the meltdown power while Blue multipliers remain immune', () => {
    service.applyNeutronMeltdown();
    const normal = new Multiplier('normal', new Num(1, 3));
    const blue = new Multiplier('blue', new Num(1, 3), 1150, true);

    expect(normal.getNum().toNumber()).toBeCloseTo(Math.pow(1000, 0.001), 8);
    expect(normal.getNum(false).toNumber()).toBe(1000);
    expect(blue.getNum().toNumber()).toBe(1000);
  });

  it('applies the meltdown once to a generator local and global multiplier combined', () => {
    service.applyNeutronMeltdown();
    const localMultiplier = new Num(1, 2);
    const globalMultiplier = new Multiplier('generator-global', new Num(1, 3));
    const combined = localMultiplier.mul(globalMultiplier.getNum(false));

    expect(Multiplier.applyNeutronMeltdown(combined).toNumber())
      .toBeCloseTo(Math.pow(100000, 0.001), 8);
  });

  it('turns the first Blue milestone into permanent automation and passive earlier prestiges', () => {
    MilestoneRecord.stableParticleBeam.action();

    expect(Automator.keepOnReset).toBeTrue();
    expect(PrestigeLayersService.yellowPrestigeLayer.passivePrestige).toBeTrue();
    expect(PrestigeLayersService.greenPrestigeLayer.passivePrestige).toBeTrue();
    expect(PrestigeLayersService.yellowPrestigeLayer.limitPhaseBelow).toBeFalse();
    expect(PrestigeLayersService.greenPrestigeLayer.limitPhaseBelow).toBeFalse();
  });
});
