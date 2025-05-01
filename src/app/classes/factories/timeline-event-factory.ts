import {Timeline} from "../features/timeline/timeline";
import {TimelineFactory} from "./timeline-factory";
import {TimelineEvent} from "../features/timeline/timeline-event";
import { Holding } from "../features/holding";
import {Num} from "../../num";
import {Milestone} from "../features/milestone";

export class TimelineEventFactory {
  timelineEvent: TimelineEvent;

  constructor(
    private name: string,
    private title: string,
    private message: string,
    private holdingRequirement: Holding,
    private requiredAmount: Num,
    private timeline: Timeline,
    private timelineFactory: TimelineFactory
  ) {
    this.timelineEvent = new TimelineEvent(name, title, message, holdingRequirement, requiredAmount, timeline);
  }

  build(): TimelineFactory {
    this.timeline.events.push(this.timelineEvent);
    return this.timelineFactory;
  }

  addMilestone(milestone: Milestone): TimelineEventFactory {
    this.timelineEvent.milestones.push(milestone);
    return this;
  }
}
