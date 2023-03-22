import { Component, OnInit } from '@angular/core';
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-purple-timeline',
  templateUrl: './purple-timeline.component.html',
  styleUrls: ['./purple-timeline.component.css']
})
export class PurpleTimelineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    BackgroundService.setBackground('purple')
  }

}
