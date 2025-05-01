import {Component, Input, OnInit} from '@angular/core';
import { Milestone } from 'src/app/classes/features/milestone';
import {MilestoneRecord} from "../../../classes/records/milestones/milestone-record";
import {Num} from "../../../num";
import {Styles} from "../../../classes/enums/styles";

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {
  @Input() milestone: Milestone = MilestoneRecord.keepFirstRedGenAuto;

  constructor() { }

  ngOnInit(): void {
  }

  getName(): string {
    return this.milestone.name;
  }

  getStyle(): Styles {
    return this.milestone.style;
  }

  getGoal(): Num {
    return this.milestone.goal;
  }

  isUnlocked(): boolean {
    return this.milestone.unlocked;
  }

  getDisplayName(): string {
    return this.milestone.displayName;
  }

  getDescription(): string {
    return this.milestone.getDescription();
  }
}
