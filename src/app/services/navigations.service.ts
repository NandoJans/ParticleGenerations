import { Injectable } from '@angular/core';
import {Navigation, SubNavigation} from "../globals";
import {HoldingsService} from "./holdings.service";
import {Num} from "../num";
import {FooterComponent} from "../page/footer/footer.component";
import {Router} from "@angular/router";
import {TickService} from "./tick.service";
import {DataManagerService} from "./data-manager.service";
import {NumberDisplayService} from "./number-display.service";
import {App} from "../App";
import {DropDownMessageService} from "./visuals/drop-down-message.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationsService {
  static navigations: Navigation[] = [
    { name: 'red', displayName: 'R', location: 'red', unlocked: true, requirement: 'none', wasOn: 'particles' },
    { name: 'yellow', displayName: 'Y', location: 'yellow', unlocked: false, requirement: ['yellows', new Num(1, 0)], wasOn: 'upgrades' },
    { name: 'green', displayName: 'G', location: 'green', unlocked: false, requirement: ['greens', new Num(1, 0)], wasOn: 'generators' },
    { name: 'blue', displayName: 'B', location: 'blue', unlocked: false, requirement: ['blues', new Num(1, 0)], wasOn: 'neutrons' },
    { name: 'purple', displayName: 'P', location: 'purple', unlocked: false, requirement: ['purples', new Num(1, 0)], wasOn: 'generators' },
    { name: 'automators', displayName: 'A', location: 'automators', unlocked: false, requirement: ['yellows', new Num(1, 0)], wasOn: 'red' },
    { name: 'timeline', displayName: 'T', location: 'timeline', unlocked: true, requirement: 'none', wasOn: 'red' },
  ]

  static subNavigations: SubNavigation[] = [
    { name: 'redParticles', displayName: 'Gen', location: 'particles', parent: 'red', unlocked: true, requirement: 'none' },
    { name: 'redAccelerators', displayName: 'Accelerators', location: 'accelerators', parent: 'red', unlocked: false, requirement: ['redParticles', new Num(1, 20)]  },
    { name: 'redUpgrades', displayName: 'Upgrades', location: 'upgrades', parent: 'red', unlocked: false, requirement: ['redParticles', new Num(1, 40)]  },
    { name: 'redPurple', displayName: 'P', location: 'purple', parent: 'red', unlocked: false, requirement: ['purples', new Num(1, 0)]  },

    { name: 'yellowUpgrades', displayName: 'Up', location: 'upgrades', parent: 'yellow', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },
    { name: 'yellowGenerators', displayName: 'Gen', location: 'generators', parent: 'yellow', unlocked: false, requirement: ['yellowParticles', new Num(1, 2)]  },
    { name: 'yellowChallenges', displayName: 'Chal', location: 'challenges', parent: 'yellow', unlocked: false, requirement: ['yellowParticles', new Num(1, 5)]  },
    { name: 'yellowFusion', displayName: 'Fuse', location: 'fusion', parent: 'yellow', unlocked: false, requirement: ['yellowParticles', new Num(1, 32)]  },
    { name: 'yellowMilestones', displayName: 'Mile', location: 'milestones', parent: 'yellow', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },
    { name: 'yellowPurple', displayName: 'P', location: 'purple', parent: 'yellow', unlocked: false, requirement: ['purples', new Num(1, 0)]  },

    { name: 'greenGenerators', displayName: 'Gen', location: 'generators', parent: 'green', unlocked: false, requirement: ['greens', new Num(1, 0)]  },
    { name: 'greenSacrifice', displayName: 'Sac', location: 'sacrifice', parent: 'green', unlocked: false, requirement: ['greens', new Num(1, 0)]  },
    { name: 'darkEnergy', displayName: 'DE', location: 'darkenergy', parent: 'green', unlocked: false, requirement: ['greens', new Num(1, 1)]  },
    { name: 'darkAge', displayName: 'DA', location: 'darkage', parent: 'green', unlocked: false, requirement: ['greenParticles', new Num(1, 10)]  },
    { name: 'nuclearDecay', displayName: 'ND', location: 'nucleardecay', parent: 'green', unlocked: false, requirement: ['greenParticles', new Num(1, 30)]  },
    { name: 'greenMilestones', displayName: 'Mile', location: 'milestones', parent: 'green', unlocked: false, requirement: ['greens', new Num(1, 0)]  },
    { name: 'greenPurple', displayName: 'P', location: 'purple', parent: 'green', unlocked: false, requirement: ['purples', new Num(1, 0)]  },

    { name: 'blueNeutrons', displayName: 'Neu', location: 'neutrons', parent: 'blue', unlocked: false, requirement: ['blues', new Num(1, 0)]  },
    { name: 'neutronStars', displayName: 'NS', location: 'neutronstars', parent: 'blue', unlocked: false, requirement: ['blues', new Num(3, 0)]  },
    { name: 'blueUpgrades', displayName: 'Up', location: 'upgrades', parent: 'blue', unlocked: false, requirement: ['blues', new Num(5, 0)]  },
    { name: 'blueChallenges', displayName: 'BC', location: 'challenges', parent: 'blue', unlocked: false, requirement: ['blueParticles', new Num(1, 5)]  },
    { name: 'blueGenerators', displayName: 'Gen', location: 'generators', parent: 'blue', unlocked: false, requirement: ['blueParticles', new Num(1, 35)]  },
    { name: 'blueMilestones', displayName: 'Mile', location: 'milestones', parent: 'blue', unlocked: false, requirement: ['blueParticles', new Num(1, 0)]  },
    { name: 'bluePurple', displayName: 'P', location: 'purple', parent: 'blue', unlocked: false, requirement: ['purples', new Num(1, 0)]  },

    { name: 'redAutomators', displayName: 'Red', location: 'red', parent: 'automators', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },
    { name: 'yellowAutomators', displayName: 'Yellow', location: 'yellow', parent: 'automators', unlocked: false, requirement: ['greens', new Num(1, 0)]  },
    { name: 'greenAutomators', displayName: 'Green', location: 'green', parent: 'automators', unlocked: false, requirement: ['blues', new Num(1, 0)]  },
    { name: 'blueAutomators', displayName: 'Blue', location: 'blue', parent: 'automators', unlocked: false, requirement: ['purples', new Num(1, 0)]  },
    { name: 'prestigeAutomators', displayName: 'Prestige', location: 'prestige', parent: 'automators', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },

    { name: 'purpleGenerators', displayName: 'Gen', location: 'generators', parent: 'purple', unlocked: false, requirement: ['purples', new Num(1, 0)]  },
    { name: 'blackHole', displayName: 'Black Hole', location: 'blackhole', parent: 'purple', unlocked: false, requirement: ['purples', new Num(5, 0)]  },
    { name: 'purpleMilestones', displayName: 'Milestones', location: 'milestones', parent: 'purple', unlocked: false, requirement: ['purples', new Num(1, 0)]  },

    { name: 'redTimeline', displayName: 'Red', location: 'red', parent: 'timeline', unlocked: true, requirement: 'none'},
    { name: 'yellowTimeline', displayName: 'Yellow', location: 'yellow', parent: 'timeline', unlocked: false, requirement: ['yellows', new Num(1, 0)]  },
    { name: 'greenTimeline', displayName: 'Green', location: 'green', parent: 'timeline', unlocked: false, requirement: ['greens', new Num(1, 0)]  },
    { name: 'blueTimeline', displayName: 'Blue', location: 'blue', parent: 'timeline', unlocked: false, requirement: ['blues', new Num(1, 0)]  },
    { name: 'purpleTimeline', displayName: 'Purple', location: 'purple', parent: 'timeline', unlocked: false, requirement: ['purples', new Num(1, 0)]  },
  ]

  static selectedNavigation: string = 'red';
  static selectedSubNavigation: string = 'particles';

  static router: Router;

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
    return parentLocation + '/' + subNavigation.location;
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

  static getSubNavigation(navigation: string) {
    for (let i = 0; i < this.subNavigations.length; i++) {
      if (this.subNavigations[i].name === navigation) return this.subNavigations[i];
    }
    return 0;
  }

  static getNavigation(navigation: string) {
    for (let i = 0; i < this.navigations.length; i++) {
      if (this.navigations[i].name === navigation) return this.navigations[i];
    }
    return 0;
  }

  static capString(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  static unlock() {
    const perm: any[] = [];
    perm.concat(this.subNavigations, this.navigations).forEach((navigation) => {
      if (navigation.requirement !== 'none' && !navigation.unlocked) {
        if (HoldingsService.get(navigation.requirement[0]).greq(navigation.requirement[1])) {
          navigation.unlocked = true;
          DataManagerService.save()

          const displayTitle = this.capString(navigation.parent) + ' ' + this.capString(navigation.location)
          DropDownMessageService.dropDown( displayTitle + ' Unlocked', 'You have unlocked the '+navigation.name+' tab.')

          App.next();
        }
      } else if (navigation.requirement === 'none') {
        navigation.unlocked = true;
      }
      let doc = document.getElementById(navigation.name)
      if (navigation.unlocked) {
        if (doc !== null) doc.style.display = 'unset';
      } else {
        if (doc !== null) {
          doc.style.display = 'none'
        }
      }
    })
  }

  static markBuyable(navigation: string, parent: string) {
    const navigationDoc = <HTMLElement> document.getElementById(navigation);
    if (navigationDoc !== null) navigationDoc.classList.add('buyable-nav');
    const parentDoc = <HTMLElement> document.getElementById(parent);
    if (parentDoc !== null) parentDoc.classList.add('buyable-nav');
    this.trackMakeBuyable[navigation] = false;
    this.trackMakeBuyable[parent] = false;
  }

  static trackMakeBuyable: any = {};

  static resetTracker() {
    this.trackMakeBuyable = {};
  }

  static removeBuyable(navigation: string, parent: string) {
    if (this.trackMakeBuyable[navigation] === undefined) {
      const navigationDoc = <HTMLElement>document.getElementById(navigation);
      if (navigationDoc !== null) {
        navigationDoc.classList.remove('buyable-nav');
      }
    }
    if (this.trackMakeBuyable[parent] === undefined) {
      const parentDoc = <HTMLElement> document.getElementById(parent);
      if (parentDoc !== null) {
        parentDoc.classList.remove('buyable-nav');
      }
    }
  }

  static setRouter(router: Router) {
    this.router = router;
  }

  static navigate(event: any = this.subNavigations[0]) {
    let currentUrl: string[] = this.router.url.split('/')
    if (currentUrl[1] !== event.parent || currentUrl[2] !== event.location) {
      NumberDisplayService.reset();
      let navigation = this.getLocation(event);
      this.save();
      this.router.navigate([navigation])
    }
  }

  static lockNavigation(nav: string) {
    for (let i = 0; i < this.navigations.length; i++) {
      if (this.navigations[i].name === nav) this.navigations[i].unlocked = false;
    }
  }

  static setValue(nav: string, key: string, value: any) {
    this.navigations.forEach((navigation) => {
      if (navigation.name === nav) { // @ts-ignore
        navigation[key] = value;
      }
    })
  }
}
