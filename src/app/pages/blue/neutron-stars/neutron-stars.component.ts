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
  onetimeUpgrades: Upgrade[] | undefined;
  fusionEffect: any[] = ['yellowBlueLightEffect'];
  displayBlueLight: boolean = UpgradeService.getValue('neutron-star', 'bought').greq(new Num(1, 0));

  constructor() { }

  ngOnInit(): void {
    this.neutronStar = UpgradeService.getUpgrades('neutron-star-upgrade');
    this.upgrades = UpgradeService.getUpgrades('blue-light-upgrade');
    this.onetimeUpgrades = UpgradeService.getUpgrades('blue-light-upgrade-onetime');
    BackgroundService.setBackground('blue')
  }

}
