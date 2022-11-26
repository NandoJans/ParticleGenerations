import { Injectable } from '@angular/core';
import {Automator} from "../../globals";
import {prestigeAutomators} from "./upgrades/automators/prestige";
import {redAutomators} from "./upgrades/automators/red";
import {GeneratorService} from "./generator.service";
import {Num} from "../../num";
import {UpgradeService} from "./upgrade.service";
import {PrestigeLayersService} from "../prestige-layers.service";
import {HoldingsService} from "../holdings.service";
import {Action} from "../../action";
import {yellowAutomators} from "./upgrades/automators/yellow";
import {ChallengeService} from "./challenge.service";

@Injectable({
  providedIn: 'root'
})
export class AutomatorService {
  static automators: Automator[] = prestigeAutomators.concat(
    redAutomators,
    yellowAutomators,
  )

  static save() {
    const save = {};
    this.automators.forEach((automator) => {
      if (automator.type === 'prestige-automators') {
        // @ts-ignore
        save[automator.name] = {bought: automator.bought, unlocked: automator.unlocked, active: automator.active, waitFor: automator.waitFor}
      } else {
        // @ts-ignore
        save[automator.name] = {bought: automator.bought, unlocked: automator.unlocked, active: automator.active}
      }
    })
    localStorage['automators'] = JSON.stringify(save);
  }

  static load() {
    const automators = JSON.parse(localStorage['automators']);
    this.automators.forEach((automator) => {
      if (automators[automator.name] !== undefined) {
        Object.entries(automators[automator.name]).forEach((value) => {
          if (value[0] === 'waitFor' || value[0] === 'bought') {
            // @ts-ignore
            automator[value[0]] = new Num(value[1]['num'], value[1]['exp']);
          } else {
            // @ts-ignore
            automator[value[0]] = value[1];
          }
        })
      }
    })
  }

  static setAutos() {
    this.automators.forEach((automator) => {
      if (automator.unlocked && automator.bought.greq(new Num(1, 0)) && automator.active) {
        switch (automator.targetType) {
          case 'generators':
            GeneratorService.setValues(automator.target, 'auto', true);
            break;
          case 'generator':
            GeneratorService.setValue(automator.target, 'auto', true);
            break;
          case 'upgrades':
            UpgradeService.setValues(automator.target, 'auto', true);
            break;
          case 'upgrade':
            UpgradeService.setValue(automator.target, 'auto', true);
            break;
        }
      }  else {
        switch (automator.targetType) {
          case 'generators': GeneratorService.setValues(automator.target, 'auto', false); break;
          case 'generator': GeneratorService.setValue(automator.target, 'auto', false); break;
          case 'upgrades': UpgradeService.setValues(automator.target, 'auto', false); break;
          case 'upgrade': UpgradeService.setValue(automator.target, 'auto', false); break;
        }
      }
    })
  }

  static getValue(name: string, value: string) {
    for (let i = 0; i < this.automators.length; i++) {
      const automator = this.automators[i];
      if (automator.name === name) {
        // @ts-ignore
        return automator[value];
      }
    }
    return 0;
  }

  static setValues(type: string, value: string, set: any) {
    this.automators.forEach((automator) => {
      if (automator.type === type) {
        // @ts-ignore
        automator[value] = set
      }
    })
  }


  static getAutomators(type: string) {
    let retValue: Automator[] = []
    this.automators.forEach((automator) => {
      if (automator.type === type) {
        retValue.push(automator)
      }
    })
    return retValue;
  }

  static setWaitFor(name: string | undefined, amount: string) {
    this.automators.forEach((automator) => {
      if (automator.name === name) {
        const num: any[] = amount.split('e')
        if (num[1] === undefined) num[1] = '0';
        console.log(num)
        automator.waitFor = new Num(parseInt(num[0]), parseInt(num[1]));
      }
    })
  }

  static getWaitFor(name: string | undefined) {
    let retValue: Num = new Num(0, 0);
    this.automators.forEach((automator) => {
      if (automator.name === name && automator.waitFor !== undefined) {
        retValue = automator.waitFor;
      }
    })
    return retValue
  }

  static setActive(name: string | undefined, set: boolean) {
    this.automators.forEach((automator) => {
      if (automator.name === name) {
        automator.active = set;
      }
    })
  }

  static getActive(name: string | undefined) {
    let retValue: boolean = true;
    this.automators.forEach((automator) => {
      if (automator.name === name) {
        retValue = automator.active;
      }
    })
    return retValue
  }

  static prestigeAutomators() {
    this.automators.forEach((autoPrestige) => {
      if (autoPrestige.type === 'prestige-automators' && ChallengeService.activeChallenge === undefined) {
        // @ts-ignore
        if (autoPrestige.unlocked && autoPrestige.active && PrestigeLayersService.getValue(autoPrestige.layer, 'gain').greq(autoPrestige.waitFor)) {
          PrestigeLayersService.prestige(autoPrestige.layer);
        }
      }
    })
  }

  static unlock() {
    this.automators.forEach((automator) => {
      if (HoldingsService.get(automator.requirement[0]).greq(automator.requirement[1])) {
        automator.unlocked = true;
      }
    })
  }

  constructor() { }
}
