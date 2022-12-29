import { Component, OnInit } from '@angular/core';
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-green-timeline',
  templateUrl: './green-timeline.component.html',
  styleUrls: ['./green-timeline.component.css']
})
export class GreenTimelineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    BackgroundService.setBackground('green')
  }

}
