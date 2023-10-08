import {Component, Input, OnInit} from '@angular/core';
import {Num} from "../../../num";
import {Upgrade} from "../../../globals";
import {BuyableService} from "../../../services/interactables/buyable.service";

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  @Input() upgrade: Upgrade | undefined;
  name: string | undefined;
  description: string | undefined;
  displayName: string | undefined;
  cost: Num | undefined;
  amount: Num | undefined;
  currency: string | undefined;
  oneTime: boolean | undefined;
  style: string | undefined;
  effect: any[] | undefined;

  constructor(private buyables: BuyableService) { }

  buy() {
    this.buyables.buy(this.name);
  }

  ngOnInit(): void {
    this.name = this.upgrade?.name;
    this.description = this.upgrade?.description;
    this.displayName = this.upgrade?.displayName;
    this.cost = this.upgrade?.cost;
    this.amount = this.upgrade?.amount;
    this.currency = this.upgrade?.currency;
    this.oneTime = this.upgrade?.oneTime;
    this.style = this.upgrade?.style;
    const action = this.upgrade?.action
    if (action !== undefined && typeof action === 'function') {
      this.effect = ['upgrade', this.name]
    }
  }
}
