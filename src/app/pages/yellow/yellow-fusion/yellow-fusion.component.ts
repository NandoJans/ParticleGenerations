import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Num} from "../../../num";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-yellow-fusion',
  templateUrl: './yellow-fusion.component.html',
  styleUrls: ['./yellow-fusion.component.css']
})
export class YellowFusionComponent implements OnInit {
  upgrades: Upgrade[] = [];
  effect: any[] = ['power', 'yellowFusion', 'yellowFusionPower', 'holdingPower'];
  redEffect: any[] = ['power', 'yellowFusion', new Num(1, 1), ''];
  hasUpgrade: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.upgrades = UpgradeService.getUpgrades('yellow-fusion')
    this.hasUpgrade = UpgradeService.getValue('fusion-boost-red-generators', 'bought').greq(new Num(1, 0));
    BackgroundService.setBackground('yellow')
  }
}
