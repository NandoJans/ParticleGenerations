import { Component, OnInit } from '@angular/core';
import {Timeline} from "../../../classes/features/timeline/timeline";
import {TimelineService} from "../../../services/timeline.service";

@Component({
  selector: 'app-yellow-timeline',
  templateUrl: './yellow-timeline.component.html',
  styleUrls: ['./yellow-timeline.component.css']
})
export class YellowTimelineComponent implements OnInit {
  timeline: Timeline = TimelineService.yellowTimeline;
  constructor() { }

  ngOnInit(): void {
  }

}
