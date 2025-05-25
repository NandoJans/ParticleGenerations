import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../classes/features/upgrade";
import {UpgradeRecord} from "../../../classes/records/upgrades/upgrade-record";
import {Holding} from "../../../classes/features/holding";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {GalaxyTreeUpgrade} from "../../../classes/features/upgrades/galaxy-tree-upgrade";

@Component({
  selector: 'app-green-galaxy-tree',
  templateUrl: './green-galaxy-tree.component.html',
  styleUrls: ['./green-galaxy-tree.component.css']
})
export class GreenGalaxyTreeComponent implements OnInit {
  darkEnergy: Holding = HoldingRecord.darkEnergy;
  upgrades: Upgrade[] = [
    UpgradeRecord.redParticleSacrifice,
    UpgradeRecord.yellowParticleSacrifice,
    UpgradeRecord.greenParticleSacrifice,
  ];
  galaxyTreeStarRoot: GalaxyTreeUpgrade = UpgradeRecord.unlockFirstGreenGenerator;

  constructor() { }

  ngOnInit(): void {
  }

}
