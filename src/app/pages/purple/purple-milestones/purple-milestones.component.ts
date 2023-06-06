import { Component, OnInit } from '@angular/core';
import {Milestone} from "../../../globals";
import {MilestoneService} from "../../../services/interactables/milestone.service";

@Component({
  selector: 'app-purple-milestones',
  templateUrl: './purple-milestones.component.html',
  styleUrls: ['./purple-milestones.component.css']
})
export class PurpleMilestonesComponent implements OnInit {
  milestones: Milestone[] = [];

  constructor() { }

  ngOnInit(): void {
    this.milestones = MilestoneService.getMilestones('purple-milestone');
  }
}
