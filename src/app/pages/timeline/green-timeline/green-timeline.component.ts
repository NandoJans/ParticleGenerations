import { Component, OnInit } from '@angular/core';
import {Timeline} from "../../../classes/features/timeline/timeline";
import {TimelineService} from "../../../services/timeline.service";

@Component({
    selector: 'app-green-timeline',
    templateUrl: './green-timeline.component.html',
    styleUrls: ['./green-timeline.component.css'],
    standalone: false
})
export class GreenTimelineComponent implements OnInit {
  timeline: Timeline = TimelineService.greenTimeline;
  infoText: string[] = [
    'The Green Timeline documents your journey through the advanced green layer.',
    'This timeline captures milestones in dark matter generation, galaxy tree progression, and green mechanics.',
    'Each entry represents mastery of increasingly complex particle generation systems.',
    'The green layer timeline shows your path to becoming a particle generation expert.',
    'Track your progress through the most advanced content currently available!'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
