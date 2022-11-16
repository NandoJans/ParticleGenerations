import { Injectable } from '@angular/core';
import {Navigation, SubNavigation} from "../globals";
import {HoldingsService} from "./holdings.service";
import {Num} from "../num";
import {FooterComponent} from "../page/footer/footer.component";
import {Router} from "@angular/router";
import {TickService} from "./tick.service";
import {DataManagerService} from "./data-manager.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationsService {
  static navigations: Navigation[] = [
    { name: 'red', displayName: 'Red', location: 'red', unlocked: true, requirement: 'none' },
    { name: 'yellow', displayName: 'Yellow', location: 'yellow', unlocked: false, requirement: ['yellows', new Num(1, 0)] },
    { name: 'automators', displayName: 'Automators', location: 'automators', unlocked: false, requirement: ['yellows', new Num(1, 0)] },
    { name: 'timeline', displayName: 'Timeline', location: 'timeline', unlocked: true, requirement: 'none' },
  ]

  static subNavigations: SubNavigation[] = [
    { name: 'redParticles', displayName: 'Particles', location: 'particles', parent: 'red', unlocked: true, requirement: 'none' },
    { name: 'redAccelerators', displayName: 'Accelerators', location: 'accelerators', parent: 'red', unlocked: false, requirement: ['redParticles', new Num(1, 20)]  },
    { name: 'redUpgrades', displayName: 'Upgrades', location: 'upgrades', parent: 'red', unlocked: false, requirement: ['redParticles', new Num(1, 40)]  },

    { name: 'yellowUpgrades', displayName: 'Upgrades', location: 'upgrades', parent: 'yellow', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },
    { name: 'yellowGenerators', displayName: 'Generators', location: 'generators', parent: 'yellow', unlocked: false, requirement: ['yellowParticles', new Num(1, 2)]  },
    { name: 'yellowChallenges', displayName: 'Challenges', location: 'challenges', parent: 'yellow', unlocked: false, requirement: ['yellowParticles', new Num(1, 5)]  },
    { name: 'yellowFusion', displayName: 'Fusion', location: 'fusion', parent: 'yellow', unlocked: false, requirement: ['yellows', new Num(1, 100)]  },
    { name: 'yellowMilestones', displayName: 'Milestones', location: 'milestones', parent: 'yellow', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },

    { name: 'redAutomators', displayName: 'Red', location: 'red', parent: 'automators', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },
    { name: 'prestigeAutomators', displayName: 'Prestige', location: 'prestige', parent: 'automators', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },
  ]

  static selectedNavigation: string = 'red';

  static save() {
    const save: any = {}
    const navigations: any[] = [];
    navigations.concat(this.subNavigations, this.navigations).forEach((navigation) => {
      save[navigation.name] = navigation.unlocked;
    })
    localStorage['navigations'] = JSON.stringify(save)
    localStorage['selectedNavigation'] = JSON.stringify(this.selectedNavigation);
  }

  static load() {
    this.selectedNavigation = JSON.parse(localStorage['selectedNavigation']);
    const loadedNavigations = JSON.parse(localStorage['navigations'])
    const navigations: any[] = [];
    navigations.concat(this.subNavigations, this.navigations).forEach((navigation) => {
      if (loadedNavigations[navigation.name] !== undefined) navigation.unlocked = loadedNavigations[navigation.name];
    })
  }

  static getLocation(subNavigation: SubNavigation) {
    let parentLocation: string = '';
    this.navigations.forEach((nav) => {
      if (nav.name === subNavigation.parent) parentLocation = nav.location;
    })
    return '?/' + parentLocation + '/' + subNavigation.location;
  }

  constructor() { }

  static getNavigations() {
    let ret_arr: Navigation[] = [];
    this.navigations.forEach((navigation) => {
      if (navigation.unlocked) ret_arr.push(navigation);
    })
    return ret_arr;
  }

  static getSubNavigations(navigation: string) {
    let ret_arr: SubNavigation[] = []
    this.subNavigations.forEach((subNavigation) => {
      if (subNavigation.parent === navigation && subNavigation.unlocked) ret_arr.push(subNavigation);
    })
    return ret_arr;
  }

  static unlock() {
    this.navigations.concat(this.subNavigations).forEach((navigation) => {
      if (navigation.requirement !== 'none' && !navigation.unlocked) {
        if (HoldingsService.get(navigation.requirement[0]).greq(navigation.requirement[1])) {
          navigation.unlocked = true;
          DataManagerService.save()
          window.location.reload();
        }
      }
    })
  }
}
