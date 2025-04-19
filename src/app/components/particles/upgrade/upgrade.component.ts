import {Component, Input} from '@angular/core';
import {BuyableService} from "../../../services/interactables/buyable.service";
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent {
  @Input() upgrade: Upgrade = UpgradeRecord.redGeneratorExtension;

  constructor(
    private buyableService: BuyableService
  ) { }

  buy() {
    this.upgrade.buy()
  }
}
