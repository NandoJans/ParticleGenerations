import { Component, OnInit } from '@angular/core';
import {Timeline} from "../../../classes/features/timeline/timeline";
import {TimelineService} from "../../../services/timeline.service";

@Component({
  selector: 'app-green-timeline',
  templateUrl: './green-timeline.component.html',
  styleUrls: ['./green-timeline.component.css']
})
export class GreenTimelineComponent implements OnInit {
  timeline: Timeline = TimelineService.greenTimeline;
  constructor() { }

  ngOnInit(): void {
  }

}
