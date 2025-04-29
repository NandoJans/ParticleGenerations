import {Component, Input, OnInit} from '@angular/core';
import {TimelineEvent} from "../../../classes/features/timeline/timeline-event";
import {Timeline} from "../../../classes/features/timeline/timeline";
import {Styles} from "../../../classes/enums/styles";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {Num} from "../../../num";

@Component({
  selector: 'app-timeline-event',
  templateUrl: './timeline-event.component.html',
  styleUrls: ['./timeline-event.component.css']
})
export class TimelineEventComponent implements OnInit {
  @Input() timelineEvent: TimelineEvent = new TimelineEvent(
    "test",
    "test",
    "test",
    HoldingRecord.redParticles,
    new Num(1, 0),
    new Timeline("test", Styles.RED, "test", "test")
  );
  next: TimelineEvent | null = null;

  constructor() {}

  ngOnInit(): void {
  }

  getTitle() {
    return this.timelineEvent.title;
  }

  getMessage() {
    return this.timelineEvent.message;
  }

  getStyle() {
    return this.timelineEvent.timeline.style;
  }

  shouldShow() {
    return this.timelineEvent.shouldShow;
  }

  hasReached() {
    return this.timelineEvent.reached
  }

  getRequirement() {
    return this.timelineEvent.requiredAmount.toString();
  }

  getAbbreviation() {
    return this.timelineEvent.holdingRequirement.abbreviation;
  }

  hasNext(): boolean {
    return this.getNext() !== null && this.getNext() !== undefined;
  }

  getNext() {
    if (this.next) return this.next;
    this.next = this.timelineEvent.getNext();
    return this.next;
  }

  getProgress(): number {
    const next = this.getNext();
    if (next instanceof TimelineEvent) {
      const start = this.timelineEvent.requiredAmount;
      const goal = next.requiredAmount;
      const progress = this.timelineEvent.highestAmount.div(start);

      const percentage = progress.log(10)
        .div(goal.log(10))
        .mul(new Num(1, 2))
        .toNumber();
      if (percentage > 100) {
        return 100;
      } else if (percentage < 0) {
        return 0
      } else {
        return percentage;
      }
    }
    return 0;
  }
}
