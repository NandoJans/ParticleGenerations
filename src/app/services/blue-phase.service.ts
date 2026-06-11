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

export type BlueParticleMode = 'none' | 'protons' | 'electrons';

@Injectable({
  providedIn: 'root'
})
export class BluePhaseService {
  static readonly unlockRequirement = new Num(1, 1000);
  private readonly storage = new LocalStorageHelper('blue-phase', 'state');
  private purchaseStates: {[key: string]: boolean} = {};
  activeParticle: BlueParticleMode = 'none';
  unlocked = false;

  isUnlocked(): boolean {
    return this.unlocked || HoldingRecord.greenParticles.amount.greq(BluePhaseService.unlockRequirement);
  }

  tick(speed: Num): void {
    if (!this.unlocked && HoldingRecord.greenParticles.amount.greq(BluePhaseService.unlockRequirement)) {
      this.unlocked = true;
      this.activeParticle = 'none';
      ResetHelper.reset(ResetKey.BLUE);
      this.synchronizePurchases();
      return;
    }
    if (!this.isUnlocked()) return;

    this.detectFirstPurchases();
    const generation = this.getParticleGeneration().mul(speed);

    if (this.activeParticle === 'protons') {
      HoldingRecord.protons.generate(generation);
    } else if (this.activeParticle === 'electrons') {
      HoldingRecord.electrons.generate(generation);
    }

    if (this.getClumpStage() >= 1) {
      HoldingRecord.lithium.generate(this.getElementGeneration().mul(speed));
    }
  }

  getParticleGeneration(): Num {
    let generation = Num.ONE.copy();
    if (MilestoneRecord.stableParticleBeam.unlocked) generation = generation.mul(Num.TWO);
    if (MilestoneRecord.denseParticleCollision.unlocked) generation = generation.mul(new Num(2.5, 0));
    return generation.mul(
      UpgradeRecord.blueBeamIntensity.buffer.pow(UpgradeRecord.blueBeamIntensity.amount)
    );
  }

  getCollisionGain(): Num {
    const pairs = HoldingRecord.protons.amount.lt(HoldingRecord.electrons.amount)
      ? HoldingRecord.protons.amount
      : HoldingRecord.electrons.amount;
    let multiplier = MilestoneRecord.denseParticleCollision.unlocked ? Num.TWO.copy() : Num.ONE.copy();
    multiplier = multiplier.mul(
      UpgradeRecord.blueColliderEfficiency.buffer.pow(UpgradeRecord.blueColliderEfficiency.amount)
    );
    return pairs.floor().mul(multiplier).floor();
  }

  canCollide(): boolean {
    return this.getCollisionGain().greq(Num.ONE);
  }

  collide(): void {
    const gain = this.getCollisionGain();
    if (gain.lt(Num.ONE)) return;

    ResetHelper.reset(ResetKey.BLUE);
    HoldingRecord.neutrons.add(gain);
    this.activeParticle = 'none';
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

  getCurrentElementName(): string {
    return this.getClumpStage() >= 1 ? 'Lithium' : 'No element';
  }

  getNextStageRequirement(): Num {
    return new Num(1, this.getClumpStage() + 1);
  }

  private getElementGeneration(): Num {
    return new Num(this.getClumpStage(), 0);
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
  }

  init(): void {
    this.synchronizePurchases();
  }
}
