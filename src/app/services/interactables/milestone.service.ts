import { Injectable } from '@angular/core';
import {Milestone} from "../../globals";
import {HoldingsService} from "../holdings.service";
import {yellowMilestones} from "./milestones/yellow";
import {greenMilestones} from "./milestones/green";
import {blueMilestones} from "./milestones/blue";
import {Action} from "../../action";
import {NewAction} from "../../NewAction";

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  static milestones: Milestone[] =
    yellowMilestones.concat(greenMilestones, blueMilestones)

  static save() {
    const save = {};
    this.milestones.forEach((milestone) => {
      // @ts-ignore
      save[milestone.name] = {unlocked: milestone.unlocked}
    })
    localStorage['milestones'] = JSON.stringify(save);
  }

  static load() {
    const milestones = JSON.parse(localStorage['milestones']);
    this.milestones.forEach((milestone) => {
      if (milestones[milestone.name] !== undefined) {
        Object.entries(milestones[milestone.name]).forEach((value) => {
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

  static isReached(name: string) {
    for (let i = 0; i < this.milestones.length; i++) {
      const milestone = this.milestones[i];
      if (milestone.name === name) {
        // @ts-ignore
        return HoldingsService.get(milestone.currency).greq(milestone.cost);
      }
    }
    return false;
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
        milestone[value] = set;
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
      if (milestone.action !== undefined && HoldingsService.get(milestone.currency).greq(milestone.cost)) {
        if (typeof milestone.action === 'function') milestone.action(milestone);
        if (milestone.action instanceof Action) milestone.action.execute();
        if (milestone.action instanceof NewAction) milestone.action.execute(milestone);
        const button = (<HTMLButtonElement> document.getElementById('buyable-'+milestone.name))
        if (button !== null) {
          button.className = 'maxed';
          button.innerHTML = 'Reached';
        }
      }
    })
  }
}
