import {Record} from "../record";
import {Milestone} from "../../features/milestone";
import {ChangeResetKeyYellowMilestone} from "../../features/milestones/change-reset-key-yellow-milestone";
import {Num} from "../../../num";
import {AutomatorRecord} from "../automators/automator-record";
import {Injectable} from "@angular/core";
import {ChangeHoldingGeneratePercentage} from "../../features/milestones/change-holding-generate-percentage";
import {MultiplierRecord} from "../multipliers/multiplier-record";
import {BreakYellowBarrierMilestone} from "../../features/milestones/break-yellow-barrier-milestone";
import {ChangeResetKeyGreenMilestone} from "../../features/milestones/change-reset-key-green-milestone";
import {GeneratorRecord} from "../generators/generator-record";
import {InitialGreenMilestone} from "../../features/milestones/initial-green-milestone";
import {BreakGreenBarrierMilestone} from "../../features/milestones/break-green-barrier-milestone";

@Injectable({
  providedIn: 'root'
})
export class MilestoneRecord extends Record {

  // Keep Red Generator Automators
  static keepFirstRedGenAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepFirstRedGenAuto',
    'Keep First Red Generator Automator',
    new Num(1, 0),
    AutomatorRecord.firstRedGenerator
  )
  static keepSecondRedGenAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepSecondRedGenAuto',
    'Keep Second Red Generator Automator',
    new Num(2, 0),
    AutomatorRecord.secondRedGenerator
  )
  static keepThirdRedGenAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepThirdRedGenAuto',
    'Keep Third Red Generator Automator',
    new Num(3, 0),
    AutomatorRecord.thirdRedGenerator
  )
  static keepFourthRedGenAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepFourthRedGenAuto',
    'Keep Fourth Red Generator Automator',
    new Num(4, 0),
    AutomatorRecord.fourthRedGenerator
  )
  static keepFifthRedGenAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepFifthRedGenAuto',
    'Keep Fifth Red Generator Automator',
    new Num(5, 0),
    AutomatorRecord.fifthRedGenerator
  )

  // Keep Other Automators
  static keepRedGenBoosterAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepRedGenBoosterAuto',
    'Keep Red Generator Booster Automator',
    new Num(6, 0),
    AutomatorRecord.redGeneratorBooster
  )
  static keepRedExtensionAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepRedExtensionAuto',
    'Keep Red Extension Automator',
    new Num(1, 1),
    AutomatorRecord.redGeneratorExtension
  )

  // Keep red accelerator automators
  static keepFasterAccelerationAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepFasterAccelerationAuto',
    'Keep Faster Acceleration Automator',
    new Num(1.2, 1),
    AutomatorRecord.multiplyRedAccelerationGeneration
  )
  static keepMultiplyAcceleratorEffectAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepMultiplyAcceleratorEffectAuto',
    'Keep Multiply Accelerator Effect Automator',
    new Num(1.7, 1),
    AutomatorRecord.multiplyRedAcceleratorEffect
  )
  static keepBetterAccelerationEffectAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepBetterAccelerationEffectAuto',
    'Keep Red Accelerator Automator',
    new Num(2, 1),
    AutomatorRecord.improveRedAcceleratorsEffect
  )
  static keepBetterRedParticleToAcceleratorEffectAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepBetterRedParticleToAcceleratorEffectAuto',
    'Keep Better Red Particle to Accelerator Effect Automator',
    new Num(2.2, 1),
    AutomatorRecord.improveRedParticlesToAccelerators
  )
  static keepBoosterAccelerationAuto: ChangeResetKeyYellowMilestone = new ChangeResetKeyYellowMilestone(
    'keepBoosterAccelerationAuto',
    'Keep Booster Acceleration Automator',
    new Num(2.7, 1),
    AutomatorRecord.boosterAcceleration
  )

  // Generate Star Particles

  static generate5PercentYellowParticles: ChangeHoldingGeneratePercentage = new ChangeHoldingGeneratePercentage(
    'generate5PercentYellowParticles',
    '5% Star Particles',
    new Num(15, 0),
    MultiplierRecord.yellowParticleIdleGeneration,
    new Num(0.05, 0)
  )
  static generate10PercentYellowParticles: ChangeHoldingGeneratePercentage = new ChangeHoldingGeneratePercentage(
    'generate10PercentYellowParticles',
    '10% Star Particles',
    new Num(25, 0),
    MultiplierRecord.yellowParticleIdleGeneration,
    new Num(0.1, 0)
  )
  static generate15PercentYellowParticles: ChangeHoldingGeneratePercentage = new ChangeHoldingGeneratePercentage(
    'generate15PercentYellowParticles',
    '15% Star Particles',
    new Num(35, 0),
    MultiplierRecord.yellowParticleIdleGeneration,
    new Num(0.15, 0)
  )
  static generate20PercentYellowParticles: ChangeHoldingGeneratePercentage = new ChangeHoldingGeneratePercentage(
    'generate20PercentYellowParticles',
    '20% Star Particles',
    new Num(45, 0),
    MultiplierRecord.yellowParticleIdleGeneration,
    new Num(0.2, 0)
  )
  static generate25PercentYellowParticles: ChangeHoldingGeneratePercentage = new ChangeHoldingGeneratePercentage(
    'generate25PercentYellowParticles',
    '25% Star Particles',
    new Num(75, 0),
    MultiplierRecord.yellowParticleIdleGeneration,
    new Num(0.25, 0)
  )
  static generate30PercentYellowParticles: ChangeHoldingGeneratePercentage = new ChangeHoldingGeneratePercentage(
    'generate30PercentYellowParticles',
    '30% Star Particles',
    new Num(100, 0),
    MultiplierRecord.yellowParticleIdleGeneration,
    new Num(0.3, 0)
  )
  static generate35PercentYellowParticles: ChangeHoldingGeneratePercentage = new ChangeHoldingGeneratePercentage(
    'generate35PercentYellowParticles',
    '35% Star Particles',
    new Num(150, 0),
    MultiplierRecord.yellowParticleIdleGeneration,
    new Num(0.35, 0)
  )
  static generate40PercentYellowParticles: ChangeHoldingGeneratePercentage = new ChangeHoldingGeneratePercentage(
    'generate40PercentYellowParticles',
    '40% Star Particles',
    new Num(200, 0),
    MultiplierRecord.yellowParticleIdleGeneration,
    new Num(0.4, 0)
  )
  static generate45PercentYellowParticles: ChangeHoldingGeneratePercentage = new ChangeHoldingGeneratePercentage(
    'generate45PercentYellowParticles',
    '45% Star Particles',
    new Num(300, 0),
    MultiplierRecord.yellowParticleIdleGeneration,
    new Num(0.45, 0)
  )
  static generate50PercentYellowParticles: ChangeHoldingGeneratePercentage = new ChangeHoldingGeneratePercentage(
    'generate50PercentYellowParticles',
    '50% Star Particles',
    new Num(400, 0),
    MultiplierRecord.yellowParticleIdleGeneration,
    new Num(0.5, 0)
  )

  // Break yellow barrier
  static breakYellowBarrier: BreakYellowBarrierMilestone = new BreakYellowBarrierMilestone('breakYellowBarrier');

  static initialGreenMilestone: InitialGreenMilestone = new InitialGreenMilestone(
    'initialGreenMilestone',
    'Initial Green Milestone',
    new Num(1, 0),
    [
      AutomatorRecord.firstRedGenerator,
      AutomatorRecord.secondRedGenerator,
      AutomatorRecord.thirdRedGenerator,
      AutomatorRecord.fourthRedGenerator,
      AutomatorRecord.fifthRedGenerator,
      AutomatorRecord.redGeneratorBooster,
      AutomatorRecord.redGeneratorExtension,
      AutomatorRecord.multiplyRedAccelerationGeneration,
      AutomatorRecord.multiplyRedAcceleratorEffect,
      AutomatorRecord.improveRedAcceleratorsEffect,
      AutomatorRecord.improveRedParticlesToAccelerators,
      AutomatorRecord.boosterAcceleration,
    ],
    'red phase automators'
  )

  static keepYellowPrestigeAutomator: ChangeResetKeyGreenMilestone = new ChangeResetKeyGreenMilestone(
    'keepYellowPrestigeAutomator',
    'Keep Yellow Prestige Automator',
    new Num(2, 0),
    [
      AutomatorRecord.yellowPrestige,
    ],
    'yellow prestige automator'
  );

  static breakGreenBarrier: BreakGreenBarrierMilestone = new BreakGreenBarrierMilestone('breakGreenBarrier');

  // Green Phase

  // Blue Phase

  // Purple Phase

  static override list: Milestone[] = [
    // Keep Red Generator Automators
    MilestoneRecord.keepFirstRedGenAuto,
    MilestoneRecord.keepSecondRedGenAuto,
    MilestoneRecord.keepThirdRedGenAuto,
    MilestoneRecord.keepFourthRedGenAuto,
    MilestoneRecord.keepFifthRedGenAuto,

    // Keep Other Automators
    MilestoneRecord.keepRedGenBoosterAuto,
    MilestoneRecord.keepRedExtensionAuto,

    // Keep red accelerator automators
    MilestoneRecord.keepFasterAccelerationAuto,
    MilestoneRecord.keepMultiplyAcceleratorEffectAuto,
    MilestoneRecord.keepBetterAccelerationEffectAuto,
    MilestoneRecord.keepBetterRedParticleToAcceleratorEffectAuto,
    MilestoneRecord.keepBoosterAccelerationAuto,

    // Generate Star Particles
    MilestoneRecord.generate5PercentYellowParticles,
    MilestoneRecord.generate10PercentYellowParticles,
    MilestoneRecord.generate15PercentYellowParticles,
    MilestoneRecord.generate20PercentYellowParticles,
    MilestoneRecord.generate25PercentYellowParticles,
    MilestoneRecord.generate30PercentYellowParticles,
    MilestoneRecord.generate35PercentYellowParticles,
    MilestoneRecord.generate40PercentYellowParticles,
    MilestoneRecord.generate45PercentYellowParticles,
    MilestoneRecord.generate50PercentYellowParticles,

    // Break yellow barrier
    MilestoneRecord.breakYellowBarrier,

    // Keep all red automators
    MilestoneRecord.initialGreenMilestone,
    MilestoneRecord.keepYellowPrestigeAutomator,
    MilestoneRecord.breakGreenBarrier,
  ];

  getList(): Milestone[] {
    return MilestoneRecord.list;
  }

  save() {
    this.getList().forEach((milestone: Milestone) => {
      milestone.save()
    })
  }

  load() {
    this.getList().forEach((milestone: Milestone) => {
      milestone.tryLoad()
    })
  }

  init() {
    this.getList().forEach((milestone: Milestone) => {
      milestone.init()
    })
  }

  run() {
    this.getList().forEach((milestone: Milestone) => {
      milestone.run()
    })
  }

  tick() {
    this.getList().forEach((milestone: Milestone) => {
      milestone.tick()
    })
  }
}
