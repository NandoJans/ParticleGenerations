import {TimelineEvent} from "./timeline-event";
import {Styles} from "../../enums/styles";

export class Timeline {
  name: string;
  style: Styles;
  title: string;
  message: string;
  events: TimelineEvent[] = [];

  constructor(name: string, style: Styles, title: string, message: string) {
    this.name = name;
    this.style = style;
    this.title = title;
    this.message = message;
  }

  onUnlockedEvent(event: TimelineEvent) {
    const index = this.events.indexOf(event);
    if (index > -1 && index < this.events.length) {
      this.events[index + 1].show();
    }
  }

  run() {

  }
}
