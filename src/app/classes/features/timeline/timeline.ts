import {TimelineEvent} from "./timeline-event";
import {Styles} from "../../enums/styles";
import {DropDownMessageService} from "../../../services/visuals/drop-down-message.service";

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
    const nextEvent = this.getNext(event);
    if (nextEvent) {
      nextEvent.show();
    }
  }

  dropDown(event: TimelineEvent) {
    DropDownMessageService.dropDown(
      'You have reached a new timeline event!',
      event.title + ': ' + event.message,
      'success'
    )
  }

  run() {
    this.events.forEach(event => {
      if (event.run()) {
        this.dropDown(event);
        this.onUnlockedEvent(event);
      }
    });
  }

  save() {
    this.events.forEach(event => {
      event.save();
    });
  }

  tryLoad() {
    this.events.forEach(event => {
      event.tryLoad();
    })
  }

  init() {}

  getNext(event: TimelineEvent) {
    const index = this.events.indexOf(event);
    if (index > -1 && index < this.events.length) {
      return this.events[index + 1];
    }
    return null;
  }
}
