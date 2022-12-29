import { Component, OnInit } from '@angular/core';
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Upgrade} from "../../../globals";
import {Num} from "../../../num";
import {BackgroundService} from "../../../services/visuals/background.service";

@Component({
  selector: 'app-neutron-stars',
  templateUrl: './neutron-stars.component.html',
  styleUrls: ['./neutron-stars.component.css']
})
export class NeutronStarsComponent implements OnInit {
  neutronStar: Upgrade[] | undefined;
  upgrades: Upgrade[] | undefined;
  effect: any[] = ['powerOfGlobalMultiplier', 'blueLight', 'blueLightPower'];
  fusionEffect: any[] = ['yellowBlueLightEffect'];
  displayBlueLight: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.neutronStar = UpgradeService.getUpgrades('neutron-star-upgrade');
    this.upgrades = UpgradeService.getUpgrades('blue-light-upgrade');
    this.displayBlueLight = UpgradeService.getValue('neutron-star', 'bought').greq(new Num(1, 0));
    BackgroundService.setBackground('blue')
  }

}
