import { Component, OnInit } from '@angular/core';
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Upgrade} from "../../../globals";
import {Num} from "../../../num";

@Component({
  selector: 'app-neutron-stars',
  templateUrl: './neutron-stars.component.html',
  styleUrls: ['./neutron-stars.component.css']
})
export class NeutronStarsComponent implements OnInit {
  neutronStar: Upgrade[] | undefined;
  upgrades: Upgrade[] | undefined;
  effect: any[] = ['powerOfGlobalMultiplier', 'blueLight', 'blueLightPower'];
  fusionEffect: any[] = ['basedOnHolding', '', 'yellowFusion', 'exponent', new Num(1, 0)];

  constructor() { }

  ngOnInit(): void {
    this.neutronStar = UpgradeService.getUpgrades('neutron-star-upgrade');
    this.upgrades = UpgradeService.getUpgrades('blue-light-upgrade');
  }

}
