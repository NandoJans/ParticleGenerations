import {Component} from '@angular/core';
import {HoldingRecord} from '../../../classes/records/holdings/holding-record';
import {Holding} from '../../../classes/features/holding';
import {BluePhaseService} from '../../../services/blue-phase.service';
import {Num} from '../../../num';
import {UpgradeRecord} from '../../../classes/records/upgrades/upgrade-record';
import {BlueUpgrade} from '../../../classes/features/upgrades/blue-upgrade';
import {GeneratorRecord} from '../../../classes/records/generators/generator-record';
import {GeneratorUpgrade} from '../../../classes/features/upgrades/generator-upgrade';

@Component({
  selector: 'app-blue-particles',
  templateUrl: './blue-particles.component.html',
  styleUrl: './blue-particles.component.css',
  standalone: false
})
export class BlueParticlesComponent {
  protons: Holding = HoldingRecord.protons;
  electrons: Holding = HoldingRecord.electrons;
  neutrons: Holding = HoldingRecord.neutrons;
  neutronClump: Holding = HoldingRecord.neutronClump;
  lithium: Holding = HoldingRecord.lithium;
  neutronUpgrades: BlueUpgrade[] = [
    UpgradeRecord.blueBeamIntensity,
    UpgradeRecord.blueColliderEfficiency
  ];
  blueParticleUpgrades: BlueUpgrade[] = [
    UpgradeRecord.blueParticleResonance,
    UpgradeRecord.blueCollisionCalibration
  ];

  constructor(public bluePhase: BluePhaseService) {}

  getActiveParticleName(): string {
    if (this.bluePhase.activeParticle === 'protons') return 'PROTON BEAM';
    if (this.bluePhase.activeParticle === 'electrons') return 'ELECTRON BEAM';
    return 'BEAM IDLE';
  }

  getCollisionGain(): Num {
    return this.bluePhase.getCollisionGain();
  }

  collide(): void {
    this.bluePhase.collide();
  }

  depositAllNeutrons(): void {
    this.bluePhase.depositAllNeutrons();
  }

  getProtonBufferEffect(phase: 'red' | 'yellow' | 'green'): string {
    const generators = phase === 'red'
      ? GeneratorRecord.redGenerators
      : phase === 'yellow'
        ? GeneratorRecord.yellowGenerators
        : GeneratorRecord.greenGenerators;
    const multiplier = phase === 'red'
      ? HoldingRecord.protons.getRedEffect()
      : phase === 'yellow'
        ? HoldingRecord.protons.getYellowEffect()
        : HoldingRecord.protons.getGreenEffect();

    return this.formatBufferEffect(
      generators.map(generator => generator.multiplierUpgrade),
      multiplier
    );
  }

  getElectronBufferEffect(phase: 'red' | 'yellow' | 'green'): string {
    const generators = phase === 'red'
      ? GeneratorRecord.redGenerators
      : phase === 'yellow'
        ? GeneratorRecord.yellowGenerators
        : GeneratorRecord.greenGenerators;
    const multiplier = phase === 'red'
      ? HoldingRecord.electrons.getRedEffect()
      : phase === 'yellow'
        ? HoldingRecord.electrons.getYellowEffect()
        : HoldingRecord.electrons.getGreenEffect();

    return this.formatBufferEffect(
      generators.map(generator => generator.buyMultiplierUpgrade),
      multiplier
    );
  }

  private formatBufferEffect(upgrades: GeneratorUpgrade[], multiplier: Num): string {
    const baseBuffers = upgrades.map(upgrade => upgrade.baseBuffer);
    const modifiedBuffers = baseBuffers.map(buffer => buffer.mul(multiplier));
    return `${this.formatRange(baseBuffers)}x * ${multiplier.toString(3)} = ${this.formatRange(modifiedBuffers)}x`;
  }

  private formatRange(values: Num[]): string {
    if (values.length === 0) return '1';

    const min = values.reduce((current, value) => value.lt(current) ? value : current);
    const max = values.reduce((current, value) => value.gt(current) ? value : current);
    return min.equals(max)
      ? min.toString(3)
      : `${min.toString(3)}-${max.toString(3)}`;
  }
}
