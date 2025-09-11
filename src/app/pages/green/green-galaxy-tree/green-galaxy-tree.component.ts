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
  infoText: string[] = [
    'The Green Galaxy Tree represents the ultimate progression system in Particle Generations!',
    'Dark Energy is the currency for this tree, earned through particle sacrifices.',
    'The galaxy tree features a branching upgrade system where each node unlocks new paths and possibilities.',
    'Particle Sacrifice upgrades convert your accumulated particles into Dark Energy for permanent benefits.',
    'Navigate the tree strategically - each path offers different bonuses and unlocks.',
    'This is the endgame content - master the galaxy tree to achieve maximum power!'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
