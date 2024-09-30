import {Component, Input, OnInit} from '@angular/core';
import {Milestone} from "../../../globals";
import {Num} from "../../../num";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

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

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  ngOnInit(): void {
    this.name = this.milestone?.name;
    this.description = this.milestone?.description;
    this.displayName = this.milestone?.displayName;
    this.cost = this.milestone?.cost;
    this.currency = this.milestone?.currency;
    this.style = this.milestone?.style;
  }

}
