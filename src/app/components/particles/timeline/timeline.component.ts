import {Component, Input, OnInit} from '@angular/core';
import {TimelineEvent} from "../../../globals";
import {TimelineService} from "../../../services/timeline.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  @Input() eventType: string = '';
  events: TimelineEvent[] = []
  constructor() { }

  ngOnInit(): void {
    this.events = TimelineService.getEvents(this.eventType);
  }
}
