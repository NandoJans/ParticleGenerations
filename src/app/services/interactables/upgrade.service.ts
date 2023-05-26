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
import {darkenergyUpgrades} from "./upgrades/green/darkenergy";
import {greenUpgrades} from "./upgrades/green/upgrade";
import {Searcher} from "../../Searcher";
import {Sorter} from "../../Sorter";
import {nuclearDecayUpgrades} from "./upgrades/green/nucleardecay";
import {blueNeutronUpgrades} from "./upgrades/blue/neutrons";
import {blueNeutronStars} from "./upgrades/blue/neutronStars";
import {blueUpgrades} from "./upgrades/blue/upgrades";
import {prePurpleUpgrades} from "./upgrades/purple/prePurple";
import {blackHoleUpgrades} from "./upgrades/purple/blackHole";

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {
  static upgrades: Upgrade[] = []
  static sortedUpgrades: Upgrade[] = []

  static resetUpgrades() {
    this.upgrades = [];
    const upgrades = redUpgrades.concat(
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

    upgrades.forEach(upgrade => {
      this.upgrades.push(this.copy(upgrade));
    })
    this.sortedUpgrades = Sorter.sort(this.upgrades, 'name');
  }

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
        upgrade.unlocked = HoldingsService.get(upgrade.requirement[0]).greq(upgrade.requirement[1]);
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
        if (typeof upgrade.action === "function") {
          const buff = upgrade.action(upgrade)
          if (buff instanceof Num) {
            upgrade.effect = buff.copy();
          }
        }
      }
    })
  }

  static bought(upgrade: string) {
    return this.getValue(upgrade, 'bought').greq(new Num(1, 0));
  }

  static disableUpgrade(name: string) {
    const upgrade = this.getUpgrade(name)
    upgrade.amount = new Num(0, 0);
    upgrade.buffer = new Num(0, 0);
    upgrade.action = () => {};
    const doc = <HTMLElement> document.getElementById(upgrade.name)?.childNodes.item(4);
    if (doc !== null && doc !== undefined) {
      doc.style.display = 'flex';
    }
  }

  static disableUpgrades(type: string) {
    const upgrades = this.getUpgrades(type)
    upgrades.forEach((upgrade) => {
      upgrade.amount = new Num(0, 0);
      upgrade.buffer = new Num(0, 0);
      upgrade.action = () => {};
      const doc = <HTMLElement> document.getElementById(upgrade.name)?.childNodes.item(4);
      if (doc !== null && doc !== undefined) {
        doc.style.display = 'flex';
      }
    })
  }

  static copy(upgrade: Upgrade) {
    const save: Upgrade = {
      amount: new Num(1, 0),
      baseBuffer: new Num(1, 0),
      baseCost: new Num(1, 0),
      bought: new Num(1, 0),
      buffer: new Num(1, 0),
      cost: new Num(1, 0),
      currency: "",
      description: "",
      displayName: "",
      increase: new Num(1, 0),
      name: "",
      oneTime: false,
      requirement: [],
      resetId: "",
      resets: "",
      scaling: new Num(1, 0),
      style: "",
      type: "",
      unlocked: false
    };
    Object.entries(upgrade).forEach((entry) => {
      if (entry[1] instanceof Num) {
        // @ts-ignore
        save[entry[0]] = new Num(entry[1]['num'], entry[1]['exp'])
      } else if (entry[1] instanceof Array) {
        const arr: any[] = [];
        entry[1].forEach((arrEntry) => {
          arr.push(arrEntry);
        })
        // @ts-ignore
        save[entry[0]] = arr;
      } else {
        // @ts-ignore
        save[entry[0]] = entry[1];
      }
    })
    return save;
  }
}
