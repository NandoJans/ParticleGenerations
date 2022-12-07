import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {Generator, Upgrade} from "../../../globals";
import {Num} from "../../../num";
import {UpgradeService} from "../../../services/interactables/upgrade.service";

@Component({
  selector: 'app-blue-neutrons',
  templateUrl: './blue-neutrons.component.html',
  styleUrls: ['./blue-neutrons.component.css']
})
export class BlueNeutronsComponent implements OnInit {
  generators: Generator[] = [];
  upgrades: Upgrade[] = [];
  redEffect: any[] = ['powerWithUpgrade', 'blueNeutrons', new Num(1.5, 0), 'blue-neutron-amplifier']
  yellowEffect: any[] = ['powerWithUpgrade', 'blueNeutrons', new Num(4, -2), 'blue-neutron-amplifier']
  unlockedYellowEffect: boolean = false;
  greenEffect: any[] = ['powerWithUpgrade', 'blueNeutrons', new Num(3, -2), 'blue-neutron-amplifier']
  unlockedGreenEffect: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.generators = GeneratorService.getGenerators('blue-neutrons');
    this.upgrades = UpgradeService.getUpgrades('blue-neutron-upgrade');
    this.unlockedYellowEffect = UpgradeService.getValue('unlock-yellow-neutron-effect', 'bought').greq(new Num(1, 0))
    this.unlockedGreenEffect = UpgradeService.getValue('unlock-green-neutron-effect', 'bought').greq(new Num(1, 0))
  }

}
