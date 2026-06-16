import {Injectable} from '@angular/core';
import {Num} from '../num';
import {HoldingRecord} from '../classes/records/holdings/holding-record';
import {GeneratorRecord} from '../classes/records/generators/generator-record';
import {UpgradeRecord} from '../classes/records/upgrades/upgrade-record';
import {Buyable} from '../classes/features/buyable';
import {LocalStorageHelper} from '../classes/helpers/local-storage-helper';
import {ResetHelper} from '../classes/helpers/reset-helper';
import {ResetKey} from '../classes/enums/reset-key';
import {MilestoneRecord} from '../classes/records/milestones/milestone-record';
import {Multiplier} from '../classes/features/multiplier';
import {MultiplierRecord} from "../classes/records/multipliers/multiplier-record";
import {ChargerRecord} from "../classes/records/charger/charger-record";
import {Holding} from '../classes/features/holding';

export type BlueParticleMode = 'none' | 'protons' | 'electrons';

export interface BlueElementDefinition {
  requiredStage: number;
  holding: Holding;
}

@Injectable({
  providedIn: 'root'
})
export class BluePhaseService {
  static readonly unlockRequirement = new Num(1, 1000);
  static readonly neutronRestorationTarget = new Num(1, 4);
  static readonly minimumMeltdownPower = new Num(1, -1);
  private readonly storage = new LocalStorageHelper('blue-phase', 'state');
  private purchaseStates: {[key: string]: boolean} = {};
  activeParticle: BlueParticleMode = 'none';
  unlocked = false;

  readonly elementDefinitions: BlueElementDefinition[] = [
    {requiredStage: 1, holding: HoldingRecord.lithium},
    {requiredStage: 2, holding: HoldingRecord.beryllium},
    {requiredStage: 3, holding: HoldingRecord.boron},
    {requiredStage: 4, holding: HoldingRecord.carbon},
    {requiredStage: 5, holding: HoldingRecord.nitrogen}
  ];

  constructor() {
    ResetHelper.registerResetListener('blue-phase-unlock', resetKey => {
      if (resetKey === ResetKey.BLUE) {
        this.unlockFromPrestige();
      }
    });
  }

  isUnlocked(): boolean {
    return this.unlocked;
  }

  tick(speed: Num): void {
    if (!this.isUnlocked()) return;

    this.detectFirstPurchases();
    const generation = this.getParticleGeneration().mul(speed);

    if (this.activeParticle === 'protons') {
      HoldingRecord.protons.generate(generation);
    } else if (this.activeParticle === 'electrons') {
      HoldingRecord.electrons.generate(generation);
    }

    this.getActiveElementDefinitions().forEach(element => {
      element.holding.generate(this.getElementGeneration(element.requiredStage).mul(speed));
    });
  }

  applyNeutronMeltdown(): void {
    Multiplier.neutronMeltdownPower = this.isUnlocked()
      ? this.getNeutronMeltdownPower()
      : Num.ONE.copy();
  }

  getTotalNeutronMatter(): Num {
    return HoldingRecord.neutrons.amount.add(HoldingRecord.neutronClump.amount);
  }

  getNeutronRestorationTarget(): Num {
    return BluePhaseService.neutronRestorationTarget;
  }

  getNeutronMeltdownProgress(): number {
    const total = Math.max(0, this.getTotalNeutronMatter().toNumber());
    const target = BluePhaseService.neutronRestorationTarget.toNumber();
    return Math.min(1, Math.log10(total + 1) / Math.log10(target + 1));
  }

  getNeutronMeltdownProgressPercent(): number {
    return this.getNeutronMeltdownProgress() * 100;
  }

  getNeutronMeltdownPower(): Num {
    const minimum = BluePhaseService.minimumMeltdownPower.toNumber();
    const restored = minimum * Math.pow(1 / minimum, this.getNeutronMeltdownProgress());
    return new Num(restored, 0);
  }

  unlockFromPrestige(): void {
    this.unlocked = true;
    this.resetDarkStarChargers();
    this.startParticleGeneration();
    this.synchronizePurchases();
    this.applyNeutronMeltdown();
  }

  getParticleGeneration(): Num {
    let generation = new Num(1, -2);
    generation = generation.mul(MultiplierRecord.nucleusGeneration.getNum(false));
    // if (MilestoneRecord.denseParticleCollision.unlocked) generation = new Num(5, 0);
    return generation.mul(
      UpgradeRecord.blueBeamIntensity.buffer.pow(UpgradeRecord.blueBeamIntensity.amount)
    ).mul(
      UpgradeRecord.blueParticleResonance.buffer.pow(UpgradeRecord.blueParticleResonance.amount)
    );
  }

  getCollisionGain(): Num {
    const pairs = HoldingRecord.protons.amount.lt(HoldingRecord.electrons.amount)
      ? HoldingRecord.protons.amount
      : HoldingRecord.electrons.amount;
    let multiplier = MilestoneRecord.denseParticleCollision.unlocked ? Num.TWO.copy() : Num.ONE.copy();
    multiplier = multiplier.mul(
      UpgradeRecord.blueColliderEfficiency.buffer.pow(UpgradeRecord.blueColliderEfficiency.amount)
    ).mul(
      UpgradeRecord.blueCollisionCalibration.buffer.pow(UpgradeRecord.blueCollisionCalibration.amount)
    );
    return pairs.pow(new Num(5, -1))
      .sub(Num.ONE)
      .max(Num.ZERO)
      .floor()
      .mul(multiplier)
      .floor();
  }

  canCollide(): boolean {
    return this.getCollisionGain().greq(Num.ONE);
  }

  collide(): void {
    const gain = this.getCollisionGain();
    if (gain.lt(Num.ONE)) return;

    ResetHelper.reset(ResetKey.BLUE);
    HoldingRecord.neutrons.add(gain);
    this.startParticleGeneration();
    this.synchronizePurchases();
  }

  depositAllNeutrons(): void {
    if (HoldingRecord.neutrons.amount.lt(Num.ONE)) return;
    HoldingRecord.neutronClump.add(HoldingRecord.neutrons.amount);
    HoldingRecord.neutrons.amount = Num.ZERO.copy();
  }

  canDepositNeutrons(): boolean {
    return HoldingRecord.neutrons.amount.greq(Num.ONE);
  }

  getClumpStage(): number {
    if (HoldingRecord.neutronClump.amount.lt(new Num(1, 1))) return 0;
    return Math.max(0, Math.floor(HoldingRecord.neutronClump.amount.log10().toNumber()));
  }

  getActiveElementDefinitions(): BlueElementDefinition[] {
    const clumpStage = this.getClumpStage();
    return this.elementDefinitions.filter(element => clumpStage >= element.requiredStage);
  }

  getCurrentElementName(): string {
    const activeElements = this.getActiveElementDefinitions();
    return activeElements.length > 0
      ? activeElements.map(element => element.holding.displayName).join(', ')
      : 'No element';
  }

  getNextStageRequirement(): Num {
    return new Num(1, this.getClumpStage() + 1);
  }

  private getElementGeneration(requiredStage: number): Num {
    return new Num(2, 0)
      .pow(HoldingRecord.neutronClump.amount.log10())
      .pow(this.getClumpStage() - requiredStage + 1)
      .mul(new Num(1, -2));
  }

  private getBuyables(): {key: string, buyable: Buyable}[] {
    const generators = GeneratorRecord.list;
    const generatorUpgrades = generators.flatMap(generator => generator.getUpgrades());
    const entries: {key: string, buyable: Buyable}[] = [];

    generators.forEach(generator => entries.push({
      key: `generator:${generator.saveName}`,
      buyable: generator
    }));
    UpgradeRecord.list.forEach(upgrade => entries.push({
      key: `upgrade:${upgrade.saveName}`,
      buyable: upgrade
    }));
    generatorUpgrades.forEach(upgrade => entries.push({
      key: `generator-upgrade:${upgrade.saveName}`,
      buyable: upgrade
    }));

    return entries;
  }

  private detectFirstPurchases(): void {
    this.getBuyables().forEach(({key, buyable}) => {
      const bought = buyable.hasBought();
      if (bought && !this.purchaseStates[key]) {
        this.toggleParticle();
      }
      this.purchaseStates[key] = bought;
    });
  }

  private toggleParticle(): void {
    this.activeParticle = this.activeParticle === 'protons' ? 'electrons' : 'protons';
  }

  private startParticleGeneration(): void {
    this.activeParticle = 'protons';
  }

  private resetDarkStarChargers(): void {
    ChargerRecord.darkStarChargerList.forEach(charger => {
      charger.reset();
      charger.save();
    });
  }

  synchronizePurchases(): void {
    this.purchaseStates = {};
    this.getBuyables().forEach(({key, buyable}) => {
      this.purchaseStates[key] = buyable.hasBought();
    });
  }

  save(): void {
    this.storage.save(this.unlocked, 'unlocked');
    this.storage.save(this.activeParticle, 'activeParticle');
    this.storage.save(this.purchaseStates, 'purchaseStates');
  }

  load(): void {
    this.unlocked = this.storage.load(this.unlocked, 'unlocked');
    this.activeParticle = this.storage.load(this.activeParticle, 'activeParticle');
    this.purchaseStates = this.storage.load({}, 'purchaseStates');
    this.synchronizePurchases();
    this.applyNeutronMeltdown();
  }

  init(): void {
    this.synchronizePurchases();
    this.applyNeutronMeltdown();
  }
}
