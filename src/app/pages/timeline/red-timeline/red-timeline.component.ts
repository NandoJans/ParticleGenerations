import { Component, OnInit } from '@angular/core';
import {Timeline} from "../../../classes/features/timeline/timeline";
import {TimelineService} from "../../../services/timeline.service";

@Component({
    selector: 'app-red-timeline',
    templateUrl: './red-timeline.component.html',
    styleUrls: ['./red-timeline.component.css'],
    standalone: false
})
export class RedTimelineComponent implements OnInit {
  timeline: Timeline = TimelineService.redTimeline;
  constructor() { }

  ngOnInit(): void {
  }

}
