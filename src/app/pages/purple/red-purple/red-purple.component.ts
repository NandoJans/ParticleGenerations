import { Component, OnInit } from '@angular/core';
import {GeneratorService} from "../../../services/interactables/generator.service";
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Num} from "../../../num";
import {Generator, Upgrade} from "../../../globals";
import {HoldingRecord} from "../../../classes/records/holdings/holding-record";
import {RedPurpleGeneratorRecord} from "../../../classes/records/generators/red-purple-generator-record";
import {RedPurpleUpgradeRecord} from "../../../classes/records/upgrades/red-purple-upgrade-record";

@Component({
  selector: 'app-red-purple',
  templateUrl: './red-purple.component.html',
  styleUrls: ['./red-purple.component.css']
})
export class RedPurpleComponent {
  effect: any[] = ['prePurple', 'redPurple', new Num(1, 2)];
  constructor(
    public holdingRecord: HoldingRecord,
    public redPurpleGeneratorRecord: RedPurpleGeneratorRecord,
    public redPurpleUpgradeRecord: RedPurpleUpgradeRecord,
  ) { }
}
