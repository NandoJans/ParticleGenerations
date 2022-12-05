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
    { name: 'red', displayName: 'R', location: 'red', unlocked: true, requirement: 'none', wasOn: 'particles' },
    { name: 'yellow', displayName: 'Y', location: 'yellow', unlocked: false, requirement: ['yellows', new Num(1, 0)], wasOn: 'upgrades' },
    { name: 'green', displayName: 'G', location: 'green', unlocked: false, requirement: ['greens', new Num(1, 0)], wasOn: 'generators' },
    { name: 'blue', displayName: 'B', location: 'blue', unlocked: false, requirement: ['blues', new Num(1, 0)], wasOn: 'neutrons' },
    { name: 'automators', displayName: 'A', location: 'automators', unlocked: false, requirement: ['yellows', new Num(1, 0)], wasOn: 'red' },
    { name: 'timeline', displayName: 'T', location: 'timeline', unlocked: true, requirement: 'none', wasOn: 'red' },
  ]

  static subNavigations: SubNavigation[] = [
    { name: 'redParticles', displayName: 'Gen', location: 'particles', parent: 'red', unlocked: true, requirement: 'none' },
    { name: 'redAccelerators', displayName: 'Accelerators', location: 'accelerators', parent: 'red', unlocked: false, requirement: ['redParticles', new Num(1, 20)]  },
    { name: 'redUpgrades', displayName: 'Upgrades', location: 'upgrades', parent: 'red', unlocked: false, requirement: ['redParticles', new Num(1, 40)]  },

    { name: 'yellowUpgrades', displayName: 'Up', location: 'upgrades', parent: 'yellow', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },
    { name: 'yellowGenerators', displayName: 'Gen', location: 'generators', parent: 'yellow', unlocked: false, requirement: ['yellowParticles', new Num(1, 2)]  },
    { name: 'yellowChallenges', displayName: 'Chal', location: 'challenges', parent: 'yellow', unlocked: false, requirement: ['yellowParticles', new Num(1, 5)]  },
    { name: 'yellowFusion', displayName: 'Fuse', location: 'fusion', parent: 'yellow', unlocked: false, requirement: ['yellowParticles', new Num(1, 32)]  },
    { name: 'yellowMilestones', displayName: 'Mile', location: 'milestones', parent: 'yellow', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },

    { name: 'greenGenerators', displayName: 'Gen', location: 'generators', parent: 'green', unlocked: false, requirement: ['greens', new Num(1, 0)]  },
    { name: 'greenSacrifice', displayName: 'Sac', location: 'sacrifice', parent: 'green', unlocked: false, requirement: ['greens', new Num(1, 0)]  },
    { name: 'darkEnergy', displayName: 'DE', location: 'darkenergy', parent: 'green', unlocked: false, requirement: ['greens', new Num(1, 1)]  },
    { name: 'darkAge', displayName: 'DA', location: 'darkage', parent: 'green', unlocked: false, requirement: ['greenParticles', new Num(1, 10)]  },
    { name: 'nuclearDecay', displayName: 'ND', location: 'nucleardecay', parent: 'green', unlocked: false, requirement: ['greenParticles', new Num(1, 30)]  },
    { name: 'greenMilestones', displayName: 'Mile', location: 'milestones', parent: 'green', unlocked: false, requirement: ['greens', new Num(1, 0)]  },

    { name: 'blueNeutrons', displayName: 'Neutrons', location: 'neutrons', parent: 'blue', unlocked: false, requirement: ['blues', new Num(1, 0)]  },
    { name: 'neutronStars', displayName: 'Neutron Stars', location: 'neutronstars', parent: 'blue', unlocked: false, requirement: ['blues', new Num(5, 0)]  },
    { name: 'blueMilestones', displayName: 'Milestones', location: 'milestones', parent: 'blue', unlocked: false, requirement: ['blues', new Num(1, 0)]  },

    { name: 'redAutomators', displayName: 'Red', location: 'red', parent: 'automators', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },
    { name: 'yellowAutomators', displayName: 'Yellow', location: 'yellow', parent: 'automators', unlocked: false, requirement: ['greens', new Num(1, 0)]  },
    { name: 'greenAutomators', displayName: 'Green', location: 'green', parent: 'automators', unlocked: false, requirement: ['blues', new Num(1, 0)]  },
    { name: 'prestigeAutomators', displayName: 'Prestige', location: 'prestige', parent: 'automators', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },

    { name: 'redTimeline', displayName: 'Red', location: 'red', parent: 'timeline', unlocked: true, requirement: 'none'},
    { name: 'yellowTimeline', displayName: 'Yellow', location: 'yellow', parent: 'timeline', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },
    { name: 'greenTimeline', displayName: 'Green', location: 'green', parent: 'timeline', unlocked: false, requirement: ['greens', new Num(1, 0)]  },
    { name: 'blueTimeline', displayName: 'Blue', location: 'blue', parent: 'timeline', unlocked: false, requirement: ['blues', new Num(1, 0)]  },
  ]

  static selectedNavigation: string = 'red';
  static selectedSubNavigation: string = 'particles';

  static save() {
    const save: any = {}
    this.navigations.forEach((navigation) => {
      save[navigation.name] = {unlocked: navigation.unlocked, wasOn: navigation.wasOn};
    })
    this.subNavigations.forEach((navigation) => {
      save[navigation.name] = {unlocked: navigation.unlocked};
    })
    localStorage['navigations'] = JSON.stringify(save)
    localStorage['selectedNavigation'] = JSON.stringify(this.selectedNavigation);
    localStorage['selectedSubNavigation'] = JSON.stringify(this.selectedSubNavigation);
  }

  static load() {
    if (localStorage['selectedNavigation'] !== undefined) this.selectedNavigation = JSON.parse(localStorage['selectedNavigation']);
    if (localStorage['selectedSubNavigation'] !== undefined) this.selectedSubNavigation = JSON.parse(localStorage['selectedSubNavigation']);
    const loadedNavigations = JSON.parse(localStorage['navigations'])
    const navigations: any[] = [];
    navigations.concat(this.subNavigations, this.navigations).forEach((navigation) => {
      if (loadedNavigations[navigation.name] !== undefined) {
        navigation.unlocked = loadedNavigations[navigation.name]['unlocked']
        if (loadedNavigations[navigation.name]['wasOn'] !== undefined) {
          navigation.wasOn = loadedNavigations[navigation.name]['wasOn']
        }
      }
    })
  }

  static getNavigationValue(name: string, value: string) {
    let retValue = undefined
    this.navigations.forEach((nav) => {
      if (nav.name === name) {
        // @ts-ignore
        return retValue = nav[value];
      }
    })
    return retValue
  }

  static getLocation(subNavigation: SubNavigation) {
    let parentLocation: string = '';
    this.selectedSubNavigation = subNavigation.location;
    this.navigations.forEach((nav) => {
      if (nav.name === subNavigation.parent) {
        parentLocation = nav.location
        this.selectedNavigation = nav.location
        nav.wasOn = subNavigation.location
      }
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
    const perm: any[] = [];
    perm.concat(this.subNavigations, this.navigations).forEach((navigation) => {
      if (navigation.requirement !== 'none' && !navigation.unlocked) {
        if (HoldingsService.get(navigation.requirement[0]).greq(navigation.requirement[1])) {
          navigation.unlocked = true;
          DataManagerService.save()
          window.location.reload();
        }
      } else if (navigation.requirement === 'none') {
        navigation.unlocked = true;
      }
    })
  }
}
