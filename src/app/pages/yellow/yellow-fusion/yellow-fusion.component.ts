import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Num} from "../../../num";

@Component({
  selector: 'app-yellow-fusion',
  templateUrl: './yellow-fusion.component.html',
  styleUrls: ['./yellow-fusion.component.css']
})
export class YellowFusionComponent implements OnInit {
  upgrades: Upgrade[] = [];
  effect: any[] = ['power', 'yellowFusion', 'yellowFusionPower', 'holdingPower'];
  redEffect: any[] = ['basedOnHolding', new Num(3, 0), 'fusion-boost-red-generators', 'power'];
  hasUpgrade: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.upgrades = UpgradeService.getUpgrades('yellow-fusion')
    this.hasUpgrade = UpgradeService.getValue('fusion-boost-red-generators', 'bought').greq(new Num(1, 0));
  }
}
