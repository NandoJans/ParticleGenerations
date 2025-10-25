import {Component, Input, OnInit} from '@angular/core';
import {Timeline} from "../../../classes/features/timeline/timeline";
import {TimelineService} from "../../../services/timeline.service";
import {TimelineEvent} from "../../../classes/features/timeline/timeline-event";

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css'],
    standalone: false
})
export class TimelineComponent implements OnInit {
  @Input() timeline: Timeline = TimelineService.redTimeline
  constructor() { }

  ngOnInit(): void {
  }

  getEvents(): TimelineEvent[] {
    return this.timeline.events
  }
}
