import { Component, OnInit } from '@angular/core';
import {Milestone} from "../../../globals";
import {MilestoneService} from "../../../services/interactables/milestone.service";

@Component({
  selector: 'app-green-milestones',
  templateUrl: './green-milestones.component.html',
  styleUrls: ['./green-milestones.component.css']
})
export class GreenMilestonesComponent implements OnInit {
  milestones: Milestone[] = [];
  constructor() { }

  ngOnInit(): void {
    this.milestones = MilestoneService.getMilestones('green-milestone')
  }
}
