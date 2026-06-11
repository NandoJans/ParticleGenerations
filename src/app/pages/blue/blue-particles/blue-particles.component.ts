import {Component} from '@angular/core';
import {HoldingRecord} from '../../../classes/records/holdings/holding-record';
import {Holding} from '../../../classes/features/holding';
import {BluePhaseService} from '../../../services/blue-phase.service';
import {Num} from '../../../num';
import {UpgradeRecord} from '../../../classes/records/upgrades/upgrade-record';
import {BlueUpgrade} from '../../../classes/features/upgrades/blue-upgrade';

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
  upgrades: BlueUpgrade[] = [
    UpgradeRecord.blueBeamIntensity,
    UpgradeRecord.blueColliderEfficiency
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
}
