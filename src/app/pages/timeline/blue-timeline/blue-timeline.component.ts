import { Component, OnInit } from '@angular/core';
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-blue-timeline',
  templateUrl: './blue-timeline.component.html',
  styleUrls: ['./blue-timeline.component.css']
})
export class BlueTimelineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    BackgroundService.setBackground('blue')
  }

}
