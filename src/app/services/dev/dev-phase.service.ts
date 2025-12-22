import { Injectable } from '@angular/core';
import { HoldingRecord } from '../../classes/records/holdings/holding-record';
import { GeneratorRecord } from '../../classes/records/generators/generator-record';
import { UpgradeRecord } from '../../classes/records/upgrades/upgrade-record';
import { AutomatorRecord } from '../../classes/records/automators/automator-record';
import { MilestoneRecord } from '../../classes/records/milestones/milestone-record';
import { ChallengeRecord } from '../../classes/records/challenges/challenge-record';
import { EnhancementRecord } from '../../classes/records/enhancement-record';
import { Num } from '../../num';
import { DataManagerService } from '../data-manager.service';
import { PrestigeLayersService } from '../prestige-layers.service';
import { TimelineService } from '../timeline.service';
import { ChallengeService } from '../interactables/challenge.service';
import {ChargerRecord} from "../../classes/records/charger/charger-record";

export interface PhaseConfig {
  id: string;
  name: string;
  description: string;
  setup: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class DevPhaseService {
  private phases: PhaseConfig[] = [
    {
      id: 'start',
      name: 'Start',
      description: 'Beginning of the game - Red phase only',
      setup: () => {
        // Reset everything
        this.fullReset();

        // Basic starting state
        HoldingRecord.redParticles.amount = new Num(10, 0);
        GeneratorRecord.firstRedGenerator.amount = new Num(1, 0);
        GeneratorRecord.firstRedGenerator.bought = new Num(1, 0);
        GeneratorRecord.firstRedGenerator.unlocked = true;
      }
    },
    {
      id: 'early-red',
      name: 'Early Red',
      description: 'Red phase with multiple generators',
      setup: () => {
        // Reset everything
        this.fullReset();

        // Red phase progression
        HoldingRecord.redParticles.amount = new Num(1, 100);

        // Unlock and give some red generators
        GeneratorRecord.firstRedGenerator.unlocked = true;
        GeneratorRecord.firstRedGenerator.amount = new Num(10, 0);
        GeneratorRecord.firstRedGenerator.bought = new Num(10, 0);

        GeneratorRecord.secondRedGenerator.unlocked = true;
        GeneratorRecord.secondRedGenerator.amount = new Num(5, 0);
        GeneratorRecord.secondRedGenerator.bought = new Num(5, 0);

        GeneratorRecord.thirdRedGenerator.unlocked = true;
        GeneratorRecord.thirdRedGenerator.amount = new Num(1, 0);
        GeneratorRecord.thirdRedGenerator.bought = new Num(1, 0);

        // Some basic upgrades
        UpgradeRecord.redGeneratorExtension.unlocked = true;
        UpgradeRecord.redGeneratorExtension.bought = new Num(5, 0);
      }
    },
    {
      id: 'late-red',
      name: 'Late Red',
      description: 'Ready to prestige to Yellow',
      setup: () => {
        // Reset everything
        this.fullReset();

        // Late red phase - ready for yellow prestige
        HoldingRecord.redParticles.amount = new Num(1, 1000);

        // All red generators unlocked
        [
          GeneratorRecord.firstRedGenerator,
          GeneratorRecord.secondRedGenerator,
          GeneratorRecord.thirdRedGenerator,
          GeneratorRecord.fourthRedGenerator,
          GeneratorRecord.fifthRedGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(20, 0);
          gen.bought = new Num(20, 0);
        });

        // Red accelerators
        HoldingRecord.redAccelerators.amount = new Num(100, 0);
        UpgradeRecord.unlockRedAccelerators.unlocked = true;
        UpgradeRecord.unlockRedAccelerators.bought = new Num(1, 0);

        GeneratorRecord.redAcceleratorGenerator.unlocked = true;
        GeneratorRecord.redAcceleratorGenerator.amount = new Num(10, 0);
        GeneratorRecord.redAcceleratorGenerator.bought = new Num(10, 0);

        // More upgrades
        UpgradeRecord.redGeneratorExtension.unlocked = true;
        UpgradeRecord.redGeneratorExtension.bought = new Num(20, 0);
        UpgradeRecord.redGeneratorBooster.unlocked = true;
        UpgradeRecord.redGeneratorBooster.bought = new Num(10, 0);
      }
    },
    {
      id: 'early-yellow',
      name: 'Early Yellow',
      description: 'Yellow phase just unlocked',
      setup: () => {
        // Reset everything
        this.fullReset();

        // Yellow phase starting point
        HoldingRecord.redParticles.amount = new Num(1, 100);
        HoldingRecord.yellowParticles.amount = new Num(1, 3);
        HoldingRecord.yellowPrestiges.amount = new Num(1, 0);

        // Red generators
        [
          GeneratorRecord.firstRedGenerator,
          GeneratorRecord.secondRedGenerator,
          GeneratorRecord.thirdRedGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(10, 0);
          gen.bought = new Num(10, 0);
        });

        // Yellow generators
        GeneratorRecord.firstYellowGenerator.unlocked = true;
        GeneratorRecord.firstYellowGenerator.amount = new Num(1, 0);
        GeneratorRecord.firstYellowGenerator.bought = new Num(1, 0);

        // Yellow upgrades
        UpgradeRecord.multiplyRedGeneratorsYellow.unlocked = true;
        UpgradeRecord.multiplyYellowParticlesYellow.unlocked = true;
      }
    },
    {
      id: 'mid-yellow',
      name: 'Mid Yellow',
      description: 'Yellow phase with multiple generators and fusion',
      setup: () => {
        // Reset everything
        this.fullReset();

        // Mid yellow phase
        HoldingRecord.redParticles.amount = new Num(5, 500);
        HoldingRecord.yellowParticles.amount = new Num(5, 28);
        HoldingRecord.yellowPrestiges.amount = new Num(1, 4);
        HoldingRecord.yellowKeys.amount = new Num(1, 6);
        HoldingRecord.hydrogen.amount = new Num(1, 3);
        HoldingRecord.yellowFusion.amount = new Num(10, 0);

        // Red generators
        [
          GeneratorRecord.firstRedGenerator,
          GeneratorRecord.secondRedGenerator,
          GeneratorRecord.thirdRedGenerator,
          GeneratorRecord.fourthRedGenerator,
          GeneratorRecord.fifthRedGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(50, 0);
          gen.bought = new Num(50, 0);
        });

        // Yellow generators
        [
          GeneratorRecord.firstYellowGenerator,
          GeneratorRecord.secondYellowGenerator,
          GeneratorRecord.thirdYellowGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(20, 0);
          gen.bought = new Num(20, 0);
        });

        // Fusion generators
        GeneratorRecord.yellowFusionGenerator.unlocked = true;
        GeneratorRecord.yellowFusionGenerator.amount = new Num(5, 0);
        GeneratorRecord.yellowFusionGenerator.bought = new Num(5, 0);

        GeneratorRecord.hydrogenGenerator.unlocked = true;
        GeneratorRecord.hydrogenGenerator.amount = new Num(5, 0);
        GeneratorRecord.hydrogenGenerator.bought = new Num(5, 0);

        // Yellow upgrades
        UpgradeRecord.multiplyRedGeneratorsYellow.unlocked = true;
        UpgradeRecord.multiplyYellowParticlesYellow.unlocked = true;
        UpgradeRecord.yellowPower.unlocked = true;
        UpgradeRecord.yellowPower.bought = new Num(10, 0);
      }
    },
    {
      id: 'late-yellow',
      name: 'Late Yellow',
      description: 'Ready to prestige to Green',
      setup: () => {
        // Reset everything
        this.fullReset();

        // Late yellow - ready for green
        HoldingRecord.redParticles.amount = new Num(1, 800);
        HoldingRecord.yellowParticles.amount = new Num(1, 1000);
        HoldingRecord.yellowPrestiges.amount = new Num(1, 6);
        HoldingRecord.yellowKeys.amount = new Num(1, 10);
        HoldingRecord.hydrogen.amount = new Num(1, 10);
        HoldingRecord.yellowFusion.amount = new Num(100, 0);
        HoldingRecord.starKeys.amount = new Num(10, 0);

        // All red generators
        [
          GeneratorRecord.firstRedGenerator,
          GeneratorRecord.secondRedGenerator,
          GeneratorRecord.thirdRedGenerator,
          GeneratorRecord.fourthRedGenerator,
          GeneratorRecord.fifthRedGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(100, 0);
          gen.bought = new Num(100, 0);
        });

        // All yellow generators
        [
          GeneratorRecord.firstYellowGenerator,
          GeneratorRecord.secondYellowGenerator,
          GeneratorRecord.thirdYellowGenerator,
          GeneratorRecord.fourthYellowGenerator,
          GeneratorRecord.fifthYellowGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(50, 0);
          gen.bought = new Num(50, 0);
        });

        // Fusion generators
        GeneratorRecord.yellowFusionGenerator.unlocked = true;
        GeneratorRecord.yellowFusionGenerator.amount = new Num(20, 0);
        GeneratorRecord.yellowFusionGenerator.bought = new Num(20, 0);

        GeneratorRecord.hydrogenGenerator.unlocked = true;
        GeneratorRecord.hydrogenGenerator.amount = new Num(20, 0);
        GeneratorRecord.hydrogenGenerator.bought = new Num(20, 0);

        // Many yellow upgrades
        UpgradeRecord.multiplyRedGeneratorsYellow.unlocked = true;
        UpgradeRecord.multiplyYellowParticlesYellow.unlocked = true;
        UpgradeRecord.yellowPower.unlocked = true;
        UpgradeRecord.yellowPower.bought = new Num(50, 0);
        UpgradeRecord.unlockFourthYellowGenerator.unlocked = true;
        UpgradeRecord.unlockFourthYellowGenerator.bought = new Num(1, 0);
        UpgradeRecord.unlockFifthYellowGenerator.unlocked = true;
        UpgradeRecord.unlockFifthYellowGenerator.bought = new Num(1, 0);
      }
    },
    {
      id: 'early-green',
      name: 'Early Green',
      description: 'Green phase just unlocked',
      setup: () => {
        // Reset everything
        this.fullReset();

        // Early green phase
        HoldingRecord.redParticles.amount = new Num(1, 500);
        HoldingRecord.yellowParticles.amount = new Num(1, 500);
        HoldingRecord.greenParticles.amount = new Num(1, 3);
        HoldingRecord.greenPrestiges.amount = new Num(1, 0);
        HoldingRecord.darkMatter.amount = new Num(1, 0);
        HoldingRecord.darkEnergy.amount = new Num(1, 0);

        // Red generators
        [
          GeneratorRecord.firstRedGenerator,
          GeneratorRecord.secondRedGenerator,
          GeneratorRecord.thirdRedGenerator,
          GeneratorRecord.fourthRedGenerator,
          GeneratorRecord.fifthRedGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(50, 0);
          gen.bought = new Num(50, 0);
        });

        // Yellow generators
        [
          GeneratorRecord.firstYellowGenerator,
          GeneratorRecord.secondYellowGenerator,
          GeneratorRecord.thirdYellowGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(30, 0);
          gen.bought = new Num(30, 0);
        });

        // Green generators
        GeneratorRecord.firstGreenGenerator.unlocked = true;
        GeneratorRecord.firstGreenGenerator.amount = new Num(1, 0);
        GeneratorRecord.firstGreenGenerator.bought = new Num(1, 0);
      }
    },
    {
      id: 'mid-green',
      name: 'Mid Green',
      description: 'Dark galaxy just unlocked',
      setup: () => {
        // Reset everything
        this.fullReset();

        // Early green phase
        HoldingRecord.redParticles.amount = new Num(1, 500);
        HoldingRecord.yellowParticles.amount = new Num(1, 500);
        HoldingRecord.greenParticles.amount = new Num(1, 3);
        HoldingRecord.greenPrestiges.amount = new Num(1, 0);
        HoldingRecord.darkMatter.amount = new Num(1, 0);
        HoldingRecord.darkEnergy.amount = new Num(1, 0);

        // Red generators
        [
          GeneratorRecord.firstRedGenerator,
          GeneratorRecord.secondRedGenerator,
          GeneratorRecord.thirdRedGenerator,
          GeneratorRecord.fourthRedGenerator,
          GeneratorRecord.fifthRedGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(50, 0);
          gen.bought = new Num(50, 0);
        });

        // Yellow generators
        [
          GeneratorRecord.firstYellowGenerator,
          GeneratorRecord.secondYellowGenerator,
          GeneratorRecord.thirdYellowGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(30, 0);
          gen.bought = new Num(30, 0);
        });

        UpgradeRecord.redParticleSacrifice.bought = new Num(3, 1);
        UpgradeRecord.yellowParticleSacrifice.bought = new Num(3, 1);
        UpgradeRecord.greenParticleSacrifice.bought = new Num(3, 1);

        HoldingRecord.greenPrestiges.amount = new Num(1, 2);
        HoldingRecord.greenParticles.amount = new Num(1, 10);
      }
    },
    {
      id: 'dark-galaxy-start',
      name: 'Dark Galaxy Start',
      description: 'Ready to start the dark galaxy challenge with dark star chargers',
      setup: () => {
        // Reset everything
        this.fullReset();

        // Set up green phase ready for dark galaxy with very high starting values
        // for meaningful dark star gain during dark galaxy challenge
        HoldingRecord.redParticles.amount = new Num(1, 100000);
        HoldingRecord.yellowParticles.amount = new Num(1, 5000);
        HoldingRecord.greenParticles.amount = new Num(1, 1000);
        HoldingRecord.greenPrestiges.amount = new Num(1, 100);
        HoldingRecord.darkMatter.amount = new Num(1, 50);
        HoldingRecord.darkEnergy.amount = new Num(1, 100);
        HoldingRecord.starKeys.amount = new Num(1, 10);
        HoldingRecord.yellowPrestiges.amount = new Num(1, 1000);
        HoldingRecord.yellowKeys.amount = new Num(1, 500);
        HoldingRecord.yellowFusion.amount = new Num(1, 100);
        HoldingRecord.hydrogen.amount = new Num(1, 500);

        // Red generators (scaled up for very high particle phase)
        [
          GeneratorRecord.firstRedGenerator,
          GeneratorRecord.secondRedGenerator,
          GeneratorRecord.thirdRedGenerator,
          GeneratorRecord.fourthRedGenerator,
          GeneratorRecord.fifthRedGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(1, 10);
          gen.bought = new Num(1, 10);
        });

        // Red accelerators (scaled up significantly)
        HoldingRecord.redAccelerators.amount = new Num(1, 5000);
        UpgradeRecord.unlockRedAccelerators.unlocked = true;
        UpgradeRecord.unlockRedAccelerators.bought = new Num(1, 0);
        GeneratorRecord.redAcceleratorGenerator.unlocked = true;
        GeneratorRecord.redAcceleratorGenerator.amount = new Num(1, 5);
        GeneratorRecord.redAcceleratorGenerator.bought = new Num(1, 5);

        // Yellow generators (scaled up for high yellow particles)
        [
          GeneratorRecord.firstYellowGenerator,
          GeneratorRecord.secondYellowGenerator,
          GeneratorRecord.thirdYellowGenerator,
          GeneratorRecord.fourthYellowGenerator,
          GeneratorRecord.fifthYellowGenerator
        ].forEach(gen => {
          gen.unlocked = true;
          gen.amount = new Num(1, 5);
          gen.bought = new Num(1, 5);
        });

        // Fusion generators (scaled up)
        GeneratorRecord.yellowFusionGenerator.unlocked = true;
        GeneratorRecord.yellowFusionGenerator.amount = new Num(1, 3);
        GeneratorRecord.yellowFusionGenerator.bought = new Num(1, 3);

        GeneratorRecord.hydrogenGenerator.unlocked = true;
        GeneratorRecord.hydrogenGenerator.amount = new Num(1, 3);
        GeneratorRecord.hydrogenGenerator.bought = new Num(1, 3);

        // Green generators (scaled up)
        GeneratorRecord.firstGreenGenerator.unlocked = true;
        GeneratorRecord.firstGreenGenerator.amount = new Num(1, 3);
        GeneratorRecord.firstGreenGenerator.bought = new Num(1, 3);

        GeneratorRecord.secondGreenGenerator.unlocked = true;
        GeneratorRecord.secondGreenGenerator.amount = new Num(1, 2);
        GeneratorRecord.secondGreenGenerator.bought = new Num(1, 2);

        // Sacrifice upgrades (scaled up)
        UpgradeRecord.redParticleSacrifice.bought = new Num(1, 10);
        UpgradeRecord.yellowParticleSacrifice.bought = new Num(1, 10);
        UpgradeRecord.greenParticleSacrifice.bought = new Num(1, 5);

        // Key upgrades for dark galaxy (scaled up significantly)
        UpgradeRecord.redGeneratorExtension.unlocked = true;
        UpgradeRecord.redGeneratorExtension.bought = new Num(1, 5);
        UpgradeRecord.redGeneratorBooster.unlocked = true;
        UpgradeRecord.redGeneratorBooster.bought = new Num(1, 3);
        UpgradeRecord.yellowPower.unlocked = true;
        UpgradeRecord.yellowPower.bought = new Num(1, 5);

        // Unlock dark star chargers (they will start at tier 1)
        ChargerRecord.redGeneratorDarkCharger.unlocked = true;
        ChargerRecord.redAcceleratorDarkCharger.unlocked = true;
        ChargerRecord.yellowUpgradeDarkCharger.unlocked = true;
        ChargerRecord.yellowGeneratorDarkCharger.unlocked = true;
        ChargerRecord.starChallengeDarkCharger.unlocked = true;
        ChargerRecord.yellowFusionDarkCharger.unlocked = true;
        ChargerRecord.starKeyDarkCharger.unlocked = true;
        ChargerRecord.combineDarkCharger.unlocked = true;

        // Enable all dark star chargers
        ChargerRecord.darkStarChargerList.forEach(charger => {
          charger.enabled = true;
        });

        // Start with 0 dark stars (they are gained during dark galaxy challenge runs)
        HoldingRecord.darkStarHolding.amount = new Num(0, 0);

        // Set some star challenges completed
        ChallengeRecord.proximaCentauriStar.completed = new Num(3, 0);
        ChallengeRecord.lalandeStar.completed = new Num(2, 0);
        ChallengeRecord.sunStar.completed = new Num(2, 0);
        ChallengeRecord.siriusStar.completed = new Num(1, 0);
      }
    }
  ];

  constructor(
    private dataManagerService: DataManagerService,
    private challengeService: ChallengeService,
  ) {}

  private fullReset(): void {
    PrestigeLayersService.list.forEach(prestigeLayer => {
      this.challengeService.leaveChallenge(prestigeLayer.name);
    });

    [
      ...UpgradeRecord.list,
      ...GeneratorRecord.list,
      ...HoldingRecord.getList(),
      ...AutomatorRecord.list,
      ...EnhancementRecord.list,
      ...PrestigeLayersService.list,
      ...ChallengeRecord.list,
      ...MilestoneRecord.list,
      ...TimelineService.list,
      ...ChargerRecord.list,
    ].forEach(element => {
      element.reset();
    });
  }

  getPhases(): PhaseConfig[] {
    return this.phases;
  }

  loadPhase(phaseId: string): void {
    const phase = this.phases.find(p => p.id === phaseId);
    if (phase) {
      phase.setup();
      // Save the new state
      this.dataManagerService.save();
    }
  }
}
