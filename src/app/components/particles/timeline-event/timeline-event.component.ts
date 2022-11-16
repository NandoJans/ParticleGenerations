import {Component, Input, OnInit} from '@angular/core';
import {TimelineEvent} from "../../../globals";

@Component({
  selector: 'app-timeline-event',
  templateUrl: './timeline-event.component.html',
  styleUrls: ['./timeline-event.component.css']
})
export class TimelineEventComponent implements OnInit {
  @Input() timelineEvent: TimelineEvent | undefined;
  name: string | undefined;
  displayName: string | undefined;
  description: string | undefined;
  requirement: string | undefined;
  unlocked: boolean | undefined;
  hasProgress: boolean | undefined;
  constructor() { }

  ngOnInit(): void {
    this.name = this.timelineEvent?.name
    this.displayName = this.timelineEvent?.displayName
    this.description = this.timelineEvent?.description
    this.unlocked = this.timelineEvent?.unlocked
    this.hasProgress = this.timelineEvent?.hasProgress
    this.requirement = this.timelineEvent?.unlock[1].toString()
  }

}
