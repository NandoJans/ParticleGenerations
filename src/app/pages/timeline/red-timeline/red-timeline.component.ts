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
  infoText: string[] = [
    'The Red Timeline shows your progression history through the red layer.',
    'Each milestone represents a significant achievement in your particle generation journey.',
    'Timeline entries track important upgrades, unlocks, and progression milestones.',
    'Use this to review your progress and see how far you\'ve come!',
    'Future timeline features may include replay functionality and detailed statistics.'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
