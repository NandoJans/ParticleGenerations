import { Injectable } from '@angular/core';
import {Upgrade} from "../../globals";
import {Num} from "../../num";
import {HoldingsService} from "../holdings.service";
import {redUpgrades} from "./upgrades/red/upgrade";
import {redGeneratorUpgrades} from "./upgrades/red/generator";
import {redAccelerators} from "./upgrades/red/accelerator";
import {yellowUpgrades} from "./upgrades/yellow/upgrade";
import {redAutomators} from "./upgrades/automators/red";
import {yellowFusionUpgrades} from "./upgrades/yellow/fusion";
import {prestigeAutomators} from "./upgrades/automators/prestige";
import {PrestigeLayersService} from "../prestige-layers.service";
import {PrestigeAutomatorsComponent} from "../../pages/automators/prestige-automators/prestige-automators.component";
import {DataManagerService} from "../data-manager.service";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {
  static upgrades: Upgrade[] =
    redUpgrades.concat(
      yellowFusionUpgrades,
      yellowUpgrades,
      redGeneratorUpgrades,
      redAccelerators,
  )

  static save() {
    const save = {};
    this.upgrades.forEach((upgrade) => {
      // @ts-ignore
      save[upgrade.name] = {amount: upgrade.amount, bought: upgrade.bought, cost: upgrade.cost}
    })
    localStorage['upgrades'] = JSON.stringify(save);
  }

  static load() {
    const upgrades = JSON.parse(localStorage['upgrades']);
    this.upgrades.forEach((upgrade) => {
      if (upgrades[upgrade.name] !== undefined) {
        Object.entries(upgrades[upgrade.name]).forEach((value) => {
          // @ts-ignore
          upgrade[value[0]] = new Num(value[1]['num'], value[1]['exp']);
        })
      }
    })
  }

  static getUpgrades(type: string) {
    const ret_arr: Upgrade[] = [];

    this.upgrades.forEach((upgrade) => {
      if (upgrade.type === type) { // @ts-ignore
        ret_arr.push(upgrade);
      }
    })

    return ret_arr;
  }

  static getValue(name: string, value: string) {
    for (let i = 0; i < this.upgrades.length; i++) {
      const upgrade = this.upgrades[i];
      if (upgrade.name === name) {
        // @ts-ignore
        return upgrade[value];
      }
    }
    return 0;
  }

  static setValues(type: string, value: string, set: any) {
    this.upgrades.forEach((upgrade) => {
      if (upgrade.type === type) {
        // @ts-ignore
        upgrade[value] = set;
      }
    })
  }

  static setValue(name: string, value: string, set: any) {
    this.upgrades.forEach((upgrade) => {
      if (upgrade.name === name) {
        // @ts-ignore
        upgrade[value] = set;
      }
    })
  }

  static increaseBuffer(name: string, add: any) {
    this.upgrades.forEach((upgrade) => {
      if (upgrade.name === name) {
        // @ts-ignore
        upgrade['buffer'] = upgrade['buffer'].add(add, false);
      }
    })
  }

  static correctBuffer() {
    this.upgrades.forEach((upgrade) => {
      upgrade['buffer'] = upgrade['baseBuffer'].copy();
    })
  }

  static unlock() {
    this.upgrades.forEach((upgrade) => {
      if (upgrade.requirement[0] !== 'none') {
        if (HoldingsService.get(upgrade.requirement[0]).greq(upgrade.requirement[1])) {
          upgrade.unlocked = true;
        }
      }
    })
  }

  static action() {
    this.upgrades.forEach((upgrade) => {
      if (upgrade.action !== undefined && upgrade.bought.greq(new Num(1, 0))) {
        // @ts-ignore
        upgrade.action.execute();
      }
    })
  }
}
