import { Component, OnInit } from '@angular/core';
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-yellow-timeline',
  templateUrl: './yellow-timeline.component.html',
  styleUrls: ['./yellow-timeline.component.css']
})
export class YellowTimelineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    BackgroundService.setBackground('yellow')
  }

}
