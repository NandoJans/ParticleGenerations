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
