import {Timeline} from "../features/timeline/timeline";
import {TimelineEventFactory} from "./timeline-event-factory";
import {Styles} from "../enums/styles";
import {Holding} from "../features/holding";
import {Num} from "../../num";

export class TimelineFactory {
  timeline: Timeline;

  static start(name: string, style: Styles, title: string, message: string): TimelineFactory {
    return new TimelineFactory(name, style, title, message);
  }

  constructor(name: string, style: Styles, title: string, message: string) {
    this.timeline = new Timeline(name, style, title, message);
  }

  addTimelineEvent(name: string, title: string, message: string, holdingRequirement: Holding, requiredAmount: Num): TimelineEventFactory {
    return new TimelineEventFactory(name, title, message, holdingRequirement, requiredAmount, this.timeline, this);
  }

  build(): Timeline {
    return this.timeline;
  }
}
