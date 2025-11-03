import { Component, OnInit } from '@angular/core';
import {Timeline} from "../../../classes/features/timeline/timeline";
import {TimelineService} from "../../../services/timeline.service";

@Component({
    selector: 'app-yellow-timeline',
    templateUrl: './yellow-timeline.component.html',
    styleUrls: ['./yellow-timeline.component.css'],
    standalone: false
})
export class YellowTimelineComponent implements OnInit {
  timeline: Timeline = TimelineService.yellowTimeline;
  infoText: string[] = [
    'The Yellow Timeline chronicles your achievements in the yellow layer.',
    'This timeline tracks your progression through yellow generators, upgrades, fusion, and stellar challenges.',
    'Each entry represents a major milestone in advancing beyond the basic red layer.',
    'Review your yellow layer journey and see the progression path you\'ve taken.',
    'Future features may include timeline comparisons and progression analytics.'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
