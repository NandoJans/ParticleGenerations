import { Component, OnInit } from '@angular/core';
import {Milestone} from "../../../globals";
import {MilestoneService} from "../../../services/interactables/milestone.service";

@Component({
  selector: 'app-blue-milestones',
  templateUrl: './blue-milestones.component.html',
  styleUrls: ['./blue-milestones.component.css']
})
export class BlueMilestonesComponent implements OnInit {
  milestones: Milestone[] = [];
  constructor() { }

  ngOnInit(): void {
    this.milestones = MilestoneService.getMilestones('blue-milestone')
  }

}
