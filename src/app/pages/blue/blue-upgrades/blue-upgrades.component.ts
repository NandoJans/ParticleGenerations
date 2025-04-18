import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";

@Component({
  selector: 'app-blue-upgrades',
  templateUrl: './blue-upgrades.component.html',
  styleUrls: ['./blue-upgrades.component.css']
})
export class BlueUpgradesComponent {
  upgrades: Upgrade[] = [
    UpgradeRecord.blueParticleMultiplier,
    UpgradeRecord.blueLightMultiplierRepeatable,
    UpgradeRecord.morePowerfulDarkAge,
    UpgradeRecord.lightBoostsNeutrons,
    UpgradeRecord.increasedYellowPower,
    UpgradeRecord.yellowFusionBoostsGreen,
    UpgradeRecord.extraBlueLightUpgrades,
    UpgradeRecord.greenIdleGain,
  ]
  constructor() { }

}
