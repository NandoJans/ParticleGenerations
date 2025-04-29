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

  constructor() { }

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
}
