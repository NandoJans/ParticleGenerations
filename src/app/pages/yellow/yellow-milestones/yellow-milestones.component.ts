import { Component, OnInit } from '@angular/core';
import {MilestoneService} from "../../../services/interactables/milestone.service";
import {Milestone} from "../../../globals";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-yellow-milestones',
  templateUrl: './yellow-milestones.component.html',
  styleUrls: ['./yellow-milestones.component.css']
})
export class YellowMilestonesComponent implements OnInit {
  milestones: Milestone[] = [];
  constructor() { }

  ngOnInit(): void {
    this.milestones = MilestoneService.getMilestones('yellow-milestone')
    BackgroundService.setBackground('yellow')
  }
}
