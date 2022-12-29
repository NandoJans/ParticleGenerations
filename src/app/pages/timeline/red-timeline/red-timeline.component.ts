import { Component, OnInit } from '@angular/core';
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-red-timeline',
  templateUrl: './red-timeline.component.html',
  styleUrls: ['./red-timeline.component.css']
})
export class RedTimelineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    BackgroundService.setBackground('red')
  }

}
