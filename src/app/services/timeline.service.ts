import { Injectable } from '@angular/core';
import {Timeline} from "../classes/features/timeline/timeline";
import {TimelineFactory} from "../classes/factories/timeline-factory";
import {Styles} from "../classes/enums/styles";
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {Num} from "../num";

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

  static list: Timeline[] = [
    TimelineService.redTimeline,
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
