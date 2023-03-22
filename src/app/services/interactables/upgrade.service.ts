import { Injectable } from '@angular/core';
import {Upgrade} from "../../globals";
import {Num} from "../../num";
import {HoldingsService} from "../holdings.service";
import {redUpgrades} from "./upgrades/red/upgrade";
import {redGeneratorUpgrades} from "./upgrades/red/generator";
import {redAccelerators} from "./upgrades/red/accelerator";
import {yellowUpgrades} from "./upgrades/yellow/upgrade";
import {yellowFusionUpgrades} from "./upgrades/yellow/fusion";
import {greenSacrifice} from "./upgrades/green/sacrifice";
import {limitedGreenUpgrades} from "./upgrades/green/limited";
import {Action} from "../../action";
import {darkenergyUpgrades} from "./upgrades/green/darkenergy";
import {greenUpgrades} from "./upgrades/green/upgrade";
import {Searcher} from "../../Searcher";
import {Sorter} from "../../Sorter";
import {nuclearDecayUpgrades} from "./upgrades/green/nucleardecay";
import {blueNeutronUpgrades} from "./upgrades/blue/neutrons";
import {blueNeutronStars} from "./upgrades/blue/neutronStars";
import {GlobalMultipliersService} from "../globals/global-multipliers.service";
import {blueUpgrades} from "./upgrades/blue/upgrades";
import {prePurpleUpgrades} from "./upgrades/purple/prePurple";
import {NewAction} from "../../NewAction";
import {ArrayType} from "@angular/compiler";
import {blackHoleUpgrades} from "./upgrades/purple/blackHole";

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {
  static upgrades: Upgrade[] =
    redUpgrades.concat(
      blueUpgrades,
      blueNeutronStars,
      blueNeutronUpgrades,
      nuclearDecayUpgrades,
      greenSacrifice,
      greenUpgrades,
      darkenergyUpgrades,
      limitedGreenUpgrades,
      yellowFusionUpgrades,
      yellowUpgrades,
      redGeneratorUpgrades,
      redAccelerators,
      prePurpleUpgrades,
      blackHoleUpgrades
  )
  static sortedUpgrades: Upgrade[] =
    Sorter.sort(redUpgrades.concat(
      blueUpgrades,
      blueNeutronStars,
      blueNeutronUpgrades,
      nuclearDecayUpgrades,
      greenSacrifice,
      greenUpgrades,
      darkenergyUpgrades,
      limitedGreenUpgrades,
      yellowFusionUpgrades,
      yellowUpgrades,
      redGeneratorUpgrades,
      redAccelerators,
      prePurpleUpgrades,
      blackHoleUpgrades
    ), 'name');

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
    const retValue = Searcher.search(this.sortedUpgrades, 'name', name)
    if (retValue === undefined) return 0
    else return retValue[value]
  }

  static getUpgrade(name: string) {
    return Searcher.search(this.sortedUpgrades, 'name', name);
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
    const upgrade = Searcher.search(this.sortedUpgrades, 'name', name)
    if (upgrade !== undefined && upgrade[value] !== undefined) {
      upgrade[value] = set;
    }
  }

  static increaseBuffer(name: string, add: any) {
    const upgrade = Searcher.search(this.sortedUpgrades, 'name', name)
    if (upgrade !== undefined && upgrade['buffer'] !== undefined) {
      upgrade['buffer'] = upgrade['buffer'].add(add, false);
    }
  }

  static correctBuffer() {
    this.upgrades.forEach((upgrade) => {
      upgrade['buffer'] = upgrade['baseBuffer'].copy();
    })
  }

  static unlock() {
    this.upgrades.forEach((upgrade) => {
      if (upgrade.limit !== undefined) {
        upgrade.oneTime = upgrade.bought.greq(upgrade.limit);
      }

      if (upgrade.requirement[0] !== 'none' && upgrade.requirement[0] !== 'never') {
        if (HoldingsService.get(upgrade.requirement[0]).greq(upgrade.requirement[1])) {
          upgrade.unlocked = true;
        } else {
          upgrade.unlocked = false;
        }
      } else if (upgrade.requirement[0] === 'never') {
        upgrade.unlocked = false;
      } else if (upgrade.requirement[0] === 'none') {
        upgrade.unlocked = true;
      }
    })
  }

  static action() {
    this.upgrades.forEach((upgrade) => {
      if ((upgrade.action !== undefined && upgrade.bought.greq(new Num(1, 0))) || upgrade.name === 'red-generator-booster') {
        if (upgrade.action instanceof Action) {
          upgrade.action.execute()
        } else if (upgrade.action instanceof NewAction) {
          upgrade.action.execute(upgrade);
        } else if (upgrade.action instanceof Array){
          upgrade.action.forEach(action => {
            if (action instanceof Action) action.execute();
            else if (action instanceof NewAction) action.execute(upgrade);
          })
        }
      }
    })
  }
}
