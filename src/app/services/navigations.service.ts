import { Injectable } from '@angular/core';
import {Navigation, SubNavigation} from "../globals";
import {HoldingsService} from "./holdings.service";
import {Router} from "@angular/router";
import {App} from "../App";
import {DropDownMessageService} from "./visuals/drop-down-message.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationsService {
  navigations: Navigation[] = [
    { name: 'red', displayName: 'R', location: 'red', unlocked: true, requirement: 'none', wasOn: 'particles' }
  ]

  subNavigations: SubNavigation[] = [
    { name: 'redParticles', displayName: 'Gen', location: 'particles', parent: 'red', unlocked: true, requirement: 'none' }
  ]

  selectedNavigation: string = 'red';
  selectedSubNavigation: string = 'particles';

  constructor(
    private router: Router,
    private dropDownMessageService: DropDownMessageService
  ) {
    this.load();
    this.unlock();
  }


  save() {
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

  load() {
    this.selectedNavigation = (localStorage['selectedNavigation'] !== undefined)
      ? JSON.parse(localStorage['selectedNavigation'])
      : this.navigations[0].name;
    this.selectedSubNavigation = (localStorage['selectedSubNavigation'] !== undefined)
      ? JSON.parse(localStorage['selectedSubNavigation'])
      : this.subNavigations[0].name;
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

  getNavigationValue(name: string, value: string) {
    let retValue = undefined
    this.navigations.forEach((nav) => {
      if (nav.name === name) {
        // @ts-ignore
        return retValue = nav[value];
      }
    })
    return retValue
  }

  getLocation(subNavigation: SubNavigation) {
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

  getNavigations() {
    let ret_arr: Navigation[] = [];
    this.navigations.forEach((navigation) => {
      if (navigation.unlocked) ret_arr.push(navigation);
    })
    return ret_arr;
  }

  getSubNavigations(navigation: string) {
    let ret_arr: SubNavigation[] = []
    this.subNavigations.forEach((subNavigation) => {
      if (subNavigation.parent === navigation && subNavigation.unlocked) ret_arr.push(subNavigation);
    })
    return ret_arr;
  }

  getSubNavigation(navigation: string) {
    for (let i = 0; i < this.subNavigations.length; i++) {
      if (this.subNavigations[i].name === navigation) return this.subNavigations[i];
    }
    return 0;
  }

  getNavigation(navigation: string) {
    for (let i = 0; i < this.navigations.length; i++) {
      if (this.navigations[i].name === navigation) return this.navigations[i];
    }
    return 0;
  }

  capString(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  unlock() {
    const perm: any[] = [];
    perm.concat(this.subNavigations, this.navigations).forEach((navigation) => {
      if (navigation.requirement !== 'none' && !navigation.unlocked) {
        if (HoldingsService.get(navigation.requirement[0]).greq(navigation.requirement[1])) {
          navigation.unlocked = true;

          if (navigation.parent !== undefined && navigation.location !== undefined) {
            const displayTitle = this.capString(navigation.parent) + ' ' + this.capString(navigation.location)
            this.dropDownMessageService.dropDown( displayTitle + ' Unlocked', 'You have unlocked the '+navigation.name+' tab.')
          }

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

  markBuyable(navigation: string, parent: string) {
    const navigationDoc = <HTMLElement> document.getElementById(navigation);
    if (navigationDoc !== null) navigationDoc.classList.add('buyable-nav');
    const parentDoc = <HTMLElement> document.getElementById(parent);
    if (parentDoc !== null) parentDoc.classList.add('buyable-nav');
    this.trackMakeBuyable[navigation] = false;
    this.trackMakeBuyable[parent] = false;
  }

  trackMakeBuyable: any = {};

  resetTracker() {
    this.trackMakeBuyable = {};
  }

  removeBuyable(navigation: string, parent: string) {
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

  navigate(event: any = this.subNavigations[0]) {
    let currentUrl: string[] = this.router.url.split('/')
    if (currentUrl[1] !== event.parent || currentUrl[2] !== event.location) {
      let navigation = this.getLocation(event);
      this.save();
      this.router.navigate([navigation])
    }
  }

  lockNavigation(nav: string) {
    for (let i = 0; i < this.navigations.length; i++) {
      if (this.navigations[i].name === nav) this.navigations[i].unlocked = false;
    }
  }

  setValue(nav: string, key: string, value: any) {
    this.navigations.forEach((navigation) => {
      if (navigation.name === nav) { // @ts-ignore
        navigation[key] = value;
      }
    })
  }
}
