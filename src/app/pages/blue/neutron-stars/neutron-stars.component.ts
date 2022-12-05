import { Component, OnInit } from '@angular/core';
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Upgrade} from "../../../globals";

@Component({
  selector: 'app-neutron-stars',
  templateUrl: './neutron-stars.component.html',
  styleUrls: ['./neutron-stars.component.css']
})
export class NeutronStarsComponent implements OnInit {
  upgrades: Upgrade[] | undefined;

  constructor() { }

  ngOnInit(): void {
    this.upgrades = UpgradeService.getUpgrades('neutron-star-upgrade');
  }

}
