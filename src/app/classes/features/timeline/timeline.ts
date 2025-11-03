import {TimelineEvent} from "./timeline-event";
import {Styles} from "../../enums/styles";
import {DropDownMessageService} from "../../../services/visuals/drop-down-message.service";
import {Resetable} from "../interfaces/resetable";
import { ResetKey } from "../../enums/reset-key";

export class Timeline implements Resetable {
  name: string;
  style: Styles;
  title: string;
  message: string;
  events: TimelineEvent[] = [];
  displayName: string;
  softResetId: ResetKey = ResetKey.NONE;
  resetId: ResetKey = ResetKey.NONE;

  constructor(name: string, style: Styles, title: string, message: string) {
    this.name = name;
    this.style = style;
    this.title = title;
    this.message = message;
    this.displayName = title;
  }

  softReset(): void {}

  reset(): void {
    this.events.forEach(event => {
      event.reached = false;
      event.shouldShow = false;
      event.firstTime = true;
    });
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
