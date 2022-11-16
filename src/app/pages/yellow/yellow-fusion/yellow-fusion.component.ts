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
  effect: any[] = ['power', 'yellowFusion', new Num(2, -1)];
  constructor() { }

  ngOnInit(): void {
    this.upgrades = UpgradeService.getUpgrades('yellow-fusion')
  }
}
