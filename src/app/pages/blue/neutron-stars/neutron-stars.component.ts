import { Component } from '@angular/core';
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Num} from "../../../num";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {Upgrade} from "../../../classes/features/upgrade";

@Component({
  selector: 'app-neutron-stars',
  templateUrl: './neutron-stars.component.html',
  styleUrls: ['./neutron-stars.component.css']
})
export class NeutronStarsComponent {
  neutronStar: Upgrade = UpgradeRecord.neutronStar;
  upgrades: Upgrade[] = [
    UpgradeRecord.blueLightAmplifier,
    UpgradeRecord.blueLightIncreaser,
    UpgradeRecord.yellowFusionAccelerator,
    UpgradeRecord.yellowFusionEffectIncreaser
  ];
  onetimeUpgrades: Upgrade[] = [
    UpgradeRecord.lightNeutronMultiplier,
    UpgradeRecord.buffNuclearDecay
  ];
  fusionEffect: any[] = ['yellowBlueLightEffect'];
  displayBlueLight: any = true;

  constructor(
    public holdingRecord: HoldingRecord
  ) { }

  getYellowFusionToBlueLightEffect() {
    return new Num(1, 0).toString()
  }
}
