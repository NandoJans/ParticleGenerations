import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";

@Component({
  selector: 'app-red-upgrades',
  templateUrl: './red-upgrades.component.html',
  styleUrls: ['./red-upgrades.component.css']
})
export class RedUpgradesComponent implements OnInit {
  upgrades: Upgrade[] = [];
  infoText: string[] = [
    'Red upgrades are used to upgrade something. There are three main types of different upgrade effects that can be categorized.',
    'The first effect an upgrade can have is to simply alter a different upgrade or generator, often in a positive way. Some example target effects are: increment of a base multiplier, upgrade effect or holding effect.',
    'The second effect an upgrade can have is to give generators ore upgrades a multiplier based on a holding. An example here would be the upgrade "Accelerator Particles", that boost the red accelerator based on red particles. The holdings are often raised to a certain power in order to decrease or increase the power the upgrade may have.',
    'The third effect of an upgrade can be repeatable. With these upgrades you can boost something specific until the upgrade is not affordable.'
  ]
  constructor() { }

  ngOnInit(): void {
    this.upgrades = UpgradeService.getUpgrades('red-upgrades')
  }

}
