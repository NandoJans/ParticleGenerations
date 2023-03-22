import { Component, OnInit } from '@angular/core';
import {UpgradeService} from "../../../services/interactables/upgrade.service";
import {Upgrade} from "../../../globals";
import {BackgroundService} from "../../../services/visuals/background.service";
import {BlackHoleService} from "../../../services/black-hole.service";
import {DropDownMessageService} from "../../../services/visuals/drop-down-message.service";

@Component({
  selector: 'app-black',
  templateUrl: './black.component.html',
  styleUrls: ['./black.component.css']
})
export class BlackComponent implements OnInit {
  unlockBlackHole: Upgrade[] = [];
  hideStartButton: boolean = BlackHoleService.on;
  hideStopButton: boolean = !BlackHoleService.on;

  constructor() { }

  ngOnInit(): void {
    this.unlockBlackHole = UpgradeService.getUpgrades('unlock-black-hole');
    this.hideStartButton = !BlackHoleService.on;
    this.hideStopButton = BlackHoleService.on;
    BackgroundService.setBackground('purple')
  }

  startBlackHole() {
    BlackHoleService.on = true;
    this.ngOnInit();
  }

  stopBlackHole() {
    BlackHoleService.on = false;
    this.ngOnInit();
  }
}
