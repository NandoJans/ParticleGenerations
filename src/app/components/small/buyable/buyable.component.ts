import {Component, Input, OnInit} from '@angular/core';
import {BuyableService} from "../../../services/interactables/buyable.service";
import {Num} from "../../../num";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";

@Component({
  selector: 'app-buyable',
  templateUrl: './buyable.component.html',
  styleUrls: ['./buyable.component.css']
})
export class BuyableComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() cost: Num | undefined;
  @Input() currency: string | undefined;
  displayCost: string | undefined;

  constructor(
    private buyables: BuyableService,
    public holdingRecord: HoldingRecord
  ) { }

  buy() {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.displayCost =  this.cost.toString();
  }
}
