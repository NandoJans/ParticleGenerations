import { Component, OnInit } from '@angular/core';
import {Upgrade} from "../../../globals";
import {UpgradeService} from "../../../services/interactables/upgrade.service";

@Component({
  selector: 'app-red-automators',
  templateUrl: './red-automators.component.html',
  styleUrls: ['./red-automators.component.css']
})
export class RedAutomatorsComponent implements OnInit {
  automators: Upgrade[] = [];
  constructor() { }

  ngOnInit(): void {
    this.automators = UpgradeService.getUpgrades('red-automators')
  }

}
