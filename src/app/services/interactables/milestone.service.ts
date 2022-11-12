import { Injectable } from '@angular/core';
import {Milestone, Upgrade} from "../../globals";
import {Num} from "../../num";
import {HoldingsService} from "../holdings.service";
import {yellowMilestones} from "./milestones/yellow";
import {UpgradeService} from "./upgrade.service";

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  static milestones: Milestone[] =
    yellowMilestones

  static save() {
    const save = {};
    this.milestones.forEach((milestone) => {
      // @ts-ignore
      save[upgrade.name] = {unlocked: upgrade.unlocked}
    })
    localStorage['upgrades'] = JSON.stringify(save);
  }

  static load() {
    const upgrades = JSON.parse(localStorage['upgrades']);
    this.milestones.forEach((milestone) => {
      if (upgrades[milestone.name] !== undefined) {
        Object.entries(upgrades[milestone.name]).forEach((value) => {
          // @ts-ignore
          upgrade[value[0]] = value[1];
        })
      }
    })
  }

  static getMilestones(type: string) {
    const ret_arr: Milestone[] = [];

    this.milestones.forEach((milestone) => {
      if (milestone.type === type) { // @ts-ignore
        ret_arr.push(milestone);
      }
    })

    return ret_arr;
  }

  static getValue(name: string, value: string) {
    for (let i = 0; i < this.milestones.length; i++) {
      const milestone = this.milestones[i];
      if (milestone.name === name) {
        // @ts-ignore
        return milestone[value];
      }
    }
    return 0;
  }

  static setValues(type: string, value: string, set: any) {
    this.milestones.forEach((milestone) => {
      if (milestone.type === type) {
        // @ts-ignore
        milestone[value] = set;
      }
    })
  }

  static setValue(name: string, value: string, set: any) {
    this.milestones.forEach((milestone) => {
      if (milestone.name === name) {
        // @ts-ignore
        upgrade[value] = set;
      }
    })
  }

  static unlock() {
    this.milestones.forEach((milestone) => {
      if (milestone.requirement[0] !== 'none') {
        if (HoldingsService.get(milestone.requirement[0]).greq(milestone.requirement[1])) {
          milestone.unlocked = true;
        }
      }
    })
  }

  static action() {
    this.milestones.forEach((milestone) => {
      /*if (upgrade.name === 'red-generator-extension') {
        for (let i = 2; i <= upgrade.bought.num+1; i++) {
          GeneratorService.setValue('red-generator-'+i, 'unlocked', true);
        }
      }*/
      if (milestone.action !== undefined && HoldingsService.get(milestone.requirement[0]).greq(milestone.requirement[1])) {
        // @ts-ignore
        milestone.action.execute();
      }
    })
  }
}
