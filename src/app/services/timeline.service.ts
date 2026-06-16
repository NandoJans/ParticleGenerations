import { Injectable } from '@angular/core';
import {Timeline} from "../classes/features/timeline/timeline";
import {TimelineFactory} from "../classes/factories/timeline-factory";
import {Styles} from "../classes/enums/styles";
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {Num} from "../num";
import {MilestoneRecord} from "../classes/records/milestones/milestone-record";

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  static redTimeline: Timeline = TimelineFactory.start(
    'red-timeline',
    Styles.RED,
    'Red Timeline',
    'Red is the first phase of the universe. Only atoms exist at this level. Atoms need to be collected in order to progress. See your collection progress below.'
  )
    .addTimelineEvent(
      'red-particle-generators',
      'Particle Generators',
      'Particle generators are here to generate red particles and collect atoms.',
      HoldingRecord.redParticles,
      new Num(1, 0)
    )
    .build()
    .addTimelineEvent(
      'red-accelerators',
      'Particle Accelerators',
      'Things need to go faster, red accelerators tend to behave that way.',
      HoldingRecord.redParticles,
      new Num(1, 75)
    )
    .build()
    .addTimelineEvent(
      'yellow-phase-unlock',
      'Unlock yellow phase',
      'What do we do with all these red particles? We need to unlock the yellow phase.',
      HoldingRecord.redParticles,
      new Num(1, 1000)
    )
    .build()
    .build()

  static yellowTimeline: Timeline = TimelineFactory.start(
    'yellow-timeline',
    Styles.YELLOW,
    'Yellow Timeline',
    'Yellow is the second phase of the universe.'
  )
    .addTimelineEvent(
      'yellow-phase-lock',
      'Yellow Phase Lock',
      'Yellow phase is locked. You need to unlock yellow power to open it. Yellow prestiges are here to help you.',
      HoldingRecord.yellowPrestiges,
      new Num(1, 0)
    )
    .addMilestone(MilestoneRecord.keepFirstRedGenAuto)
    .addMilestone(MilestoneRecord.keepSecondRedGenAuto)
    .addMilestone(MilestoneRecord.keepThirdRedGenAuto)
    .addMilestone(MilestoneRecord.keepFourthRedGenAuto)
    .addMilestone(MilestoneRecord.keepFifthRedGenAuto)
    .addMilestone(MilestoneRecord.keepRedGenBoosterAuto)
    .addMilestone(MilestoneRecord.keepRedExtensionAuto)
    .addMilestone(MilestoneRecord.keepFasterAccelerationAuto)
    .addMilestone(MilestoneRecord.generate5PercentYellowParticles)
    .addMilestone(MilestoneRecord.keepMultiplyAcceleratorEffectAuto)
    .addMilestone(MilestoneRecord.keepBetterAccelerationEffectAuto)
    .addMilestone(MilestoneRecord.keepBetterRedParticleToAcceleratorEffectAuto)
    .addMilestone(MilestoneRecord.generate10PercentYellowParticles)
    .addMilestone(MilestoneRecord.keepBoosterAccelerationAuto)
    .addMilestone(MilestoneRecord.generate15PercentYellowParticles)
    .addMilestone(MilestoneRecord.generate20PercentYellowParticles)
    .addMilestone(MilestoneRecord.generate25PercentYellowParticles)
    .addMilestone(MilestoneRecord.generate30PercentYellowParticles)
    .addMilestone(MilestoneRecord.generate35PercentYellowParticles)
    .addMilestone(MilestoneRecord.generate40PercentYellowParticles)
    .addMilestone(MilestoneRecord.generate45PercentYellowParticles)
    .addMilestone(MilestoneRecord.generate50PercentYellowParticles)
    .addMilestone(MilestoneRecord.breakYellowBarrier)
    .build()
    .addTimelineEvent(
      'break-yellow-barrier',
      'Break yellow\'s barrier',
      'Yellow protects it\'s generators. With the yellow barrier broken, you have access to yellow\'s power.',
      HoldingRecord.yellowPrestiges,
      new Num(5, 2)
    )
    .build()
    .addTimelineEvent(
      'yellow-stars',
      'Yellow Stars',
      'Yellow stars hold energy that can be used to power up yellow generators. Finish yellow stars to unlock different yellow upgrades.',
      HoldingRecord.yellowPrestiges,
      new Num(1, 3)
    )
    .build()
    .addTimelineEvent(
      'yellow-fusion',
      'Yellow Fusion',
      'We have discovered a lot of stars. It is time we made our own.',
      HoldingRecord.yellowParticles,
      new Num(1, 10)
    )
    .build()
    .addTimelineEvent(
      'yellow-star-keys',
      'Yellow Star Keys',
      'Unlocking greater star-power',
      HoldingRecord.yellowParticles,
      new Num(1, 350)
    )
    .build()
    .build()

  static greenTimeline: Timeline = TimelineFactory.start(
    'green-timeline',
    Styles.GREEN,
    'Green Timeline',
    'Green is the third phase of the universe. It is a place of galaxies and stars.'
  )
    .addTimelineEvent(
      'green-galaxy-tree',
      'Galaxy Tree',
      'Galaxy tree is a place where galaxies are born. It is a place of creation.',
      HoldingRecord.greenPrestiges,
      new Num(1, 0)
    )
    .addMilestone(MilestoneRecord.initialGreenMilestone)
    .addMilestone(MilestoneRecord.keepYellowPrestigeAutomator)
    .addMilestone(MilestoneRecord.breakGreenBarrier)
    .addMilestone(MilestoneRecord.keepRepeatableYellowUpgradeAutomators)
    .addMilestone(MilestoneRecord.keepFirstYellowAutomator)
    .addMilestone(MilestoneRecord.keepSecondYellowAutomator)
    .addMilestone(MilestoneRecord.keepThirdYellowAutomator)
    .addMilestone(MilestoneRecord.keepFourthYellowAutomator)
    .addMilestone(MilestoneRecord.keepFifthYellowAutomator)
    .addMilestone(MilestoneRecord.startWith1000YellowPrestiges)
    .addMilestone(MilestoneRecord.keepAllYellowUpgrades)
    .addMilestone(MilestoneRecord.keepPostBreakYellowUpgrades)
    .addMilestone(MilestoneRecord.keepYellowFusionUpgradesAutomator)
    .addMilestone(MilestoneRecord.keepStarChallengeAutomators)
    .addMilestone(MilestoneRecord.keepFusionBoosterAccelerationAutomator)
    .addMilestone(MilestoneRecord.keepStarKeyAutomators)
    .addMilestone(MilestoneRecord.keepIncreaseYellowPowerUpgradeAutomator)
    .addMilestone(MilestoneRecord.generate5PercentGreenParticles)
    .addMilestone(MilestoneRecord.generate10PercentGreenParticles)
    .addMilestone(MilestoneRecord.generate15PercentGreenParticles)
    .addMilestone(MilestoneRecord.generate20PercentGreenParticles)
    .addMilestone(MilestoneRecord.generate25PercentGreenParticles)
    .addMilestone(MilestoneRecord.generate30PercentGreenParticles)
    .addMilestone(MilestoneRecord.generate35PercentGreenParticles)
    .addMilestone(MilestoneRecord.generate40PercentGreenParticles)
    .addMilestone(MilestoneRecord.generate45PercentGreenParticles)
    .addMilestone(MilestoneRecord.generate50PercentGreenParticles)
    .addMilestone(MilestoneRecord.keepGreenPrestigeAutomator)
    .addMilestone(MilestoneRecord.fusionAccelerationBoosterDivideYellowFusion)
    .addMilestone(MilestoneRecord.startWithStarKeyCompressionUnlocked)
    .addMilestone(MilestoneRecord.fusionBoosterAccelerationNoReset)
    .build()
    .addTimelineEvent(
      'green-dark-galaxy',
      'Dark galaxy',
      'After a great galaxy comes a dark one',
      HoldingRecord.greenParticles,
      new Num(1, 5)
    )
    .build()
    .build()

  static blueTimeline: Timeline = TimelineFactory.start(
    'blue-timeline',
    Styles.BLUE,
    'Blue Timeline',
    'Blue is the fourth phase of the universe. Matter is separated, collided, and compressed into the first heavy elements.'
  )
    .addTimelineEvent(
      'blue-particle-beams',
      'Particle Beams',
      'First-time generator and upgrade purchases alternate the active beam between Protons and Electrons.',
      HoldingRecord.bluePrestiges,
      Num.ONE
    )
    .addMilestone(MilestoneRecord.stableParticleBeam)
    .addMilestone(MilestoneRecord.denseParticleCollision)
    .build()
    .addTimelineEvent(
      'blue-first-collision',
      'First Collision',
      'Collide matching Protons and Electrons to create persistent Neutrons and reset the Blue run.',
      HoldingRecord.neutrons,
      Num.ONE
    )
    .build()
    .addTimelineEvent(
      'blue-neutron-clump',
      'Neutron Clump',
      'Commit Neutrons to a growing clump. The first logarithmic stage begins Lithium production, establishing the path toward heavier elements.',
      HoldingRecord.neutronClump,
      new Num(1, 1)
    )
    .build()
    .build()

  static list: Timeline[] = [
    TimelineService.redTimeline,
    TimelineService.yellowTimeline,
    TimelineService.greenTimeline,
    TimelineService.blueTimeline,
  ]

  getList(): Timeline[] {
    return TimelineService.list;
  }

  tick() {
    this.getList().forEach(timeline => {
      timeline.run();
    })
  }

  save() {
    this.getList().forEach(timeline => {
      timeline.save();
    })
  }

  load() {
    this.getList().forEach(timeline => {
      timeline.tryLoad();
    })
  }

  init() {
    this.getList().forEach(timeline => {
      timeline.init();
    })
  }

  reset() {
    this.getList().forEach(timeline => {
      timeline.reset();
    })
  }
}
