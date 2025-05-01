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
    'Yellow is the second phase of the universe. It is a phase of energy and power. Yellow is the color of the sun and the stars. It is a phase of light and heat. Yellow is the color of life and growth.'
  )
    .addTimelineEvent(
      'yellow-phase-lock',
      'Yellow Phase Lock',
      'Yellow phase is locked. You need to unlock yellow power to open it.',
      HoldingRecord.yellowPrestiges,
      new Num(1, 0)
    )
    .addMilestone(MilestoneRecord.keepFirstRedGenAuto)
    .build()
    .build()

  static list: Timeline[] = [
    TimelineService.redTimeline,
    TimelineService.yellowTimeline
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
}
