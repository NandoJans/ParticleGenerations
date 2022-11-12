import {Component, Input, OnInit} from '@angular/core';
import {Milestone} from "../../../globals";
import {Num} from "../../../num";

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {
  @Input() milestone: Milestone | undefined;
  name: string | undefined;
  description: string | undefined;
  displayName: string | undefined;
  cost: Num | undefined;
  currency: string | undefined;
  style: string | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log(this.milestone)
    this.name = this.milestone?.name;
    this.description = this.milestone?.description;
    this.displayName = this.milestone?.displayName;
    this.cost = this.milestone?.cost;
    this.currency = this.milestone?.currency;
    this.style = this.milestone?.style;
  }

}
