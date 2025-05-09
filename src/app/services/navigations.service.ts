import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";
import {Navigation} from "../classes/features/navigation";
import {SubNavigation} from "../classes/features/sub-navigation";
import {
  faArrowUp,
  faAtom, faCalendar,
  faCogs, faFire,
  faForward,
  faIndustry,
  faMountain, faStar, faSun
} from "@fortawesome/free-solid-svg-icons";
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {Num} from "../num";

@Injectable({
  providedIn: 'root'
})
export class NavigationsService {
  navigations: {[key: string]: Navigation} = {
    red: new Navigation('red', faAtom, 'red', [], 'particles', true),
    yellow: new Navigation('yellow', faMountain, 'yellow', [
      {requirement: HoldingRecord.yellowPrestiges, amount: new Num(1, 0)},
    ], 'upgrades', false),
    automators: new Navigation('automators', faCogs, 'automators', [], 'red', true),
    timeline: new Navigation('timeline', faCalendar, 'timeline', [], 'red', true),
}

  subNavigations: {[key: string]: SubNavigation} = {
    // Red
    redParticles: new SubNavigation('redParticles', faIndustry, 'particles', this.navigations['red'], [], true),
    redAccelerators: new SubNavigation('redAccelerators', faForward, 'accelerators', this.navigations['red'], [
      {requirement: HoldingRecord.redParticles, amount: new Num(1, 75)},
    ], false),

    // Yellow
    yellowUpgrades: new SubNavigation('yellowUpgrades', faArrowUp, 'upgrades', this.navigations['yellow'], [
      {requirement: HoldingRecord.yellowPrestiges, amount: new Num(1, 0)},
    ], false),
    yellowGenerators: new SubNavigation('yellowGenerators', faIndustry, 'generators', this.navigations['yellow'], [
      {requirement: HoldingRecord.yellowPrestiges, amount: new Num(5, 2)},
    ], false),
    yellowStars: new SubNavigation('yellowStars', faSun, 'stars', this.navigations['yellow'], [
      {requirement: HoldingRecord.yellowPrestiges, amount: new Num(1, 3)},
    ], false),
    yellowFusion: new SubNavigation('yellowFusion', faFire, 'fusion', this.navigations['yellow'], [
      {requirement: HoldingRecord.yellowParticles, amount: new Num(1, 10)},
    ], false),

    // Automators
    redAutomators: new SubNavigation('redParticles', faAtom, 'red', this.navigations['automators'], [], true),
    yellowAutomators: new SubNavigation('yellowAutomators', faMountain, 'yellow', this.navigations['automators'], [
      {requirement: HoldingRecord.yellowPrestiges, amount: new Num(1, 0)},
    ], false),

    // Timeline
    redTimeline: new SubNavigation('redTimeline', faAtom, 'red', this.navigations['timeline'], [], true),
    yellowTimeline: new SubNavigation('yellowTimeline', faMountain, 'yellow', this.navigations['timeline'], [
      {requirement: HoldingRecord.yellowPrestiges, amount: new Num(1, 0)},
    ], false),

  }

  selectedNavigation: Navigation = this.navigations['red']
  selectedSubNavigation: SubNavigation = this.subNavigations['redParticles'];
  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('navigations', 'navigations');

  constructor(
    private router: Router
  ) {
    this.load();
    console.log('Navigations loaded:', this.navigations, this.subNavigations);
  }

  getAllNavigations(): (Navigation|SubNavigation)[] {
    return [
      ...Object.values(this.navigations),
      ...Object.values(this.subNavigations)
    ];
  }

  save(): void {
    this.getAllNavigations().forEach((navigation: Navigation|SubNavigation) => {
      navigation.save();
    });
    this.localStorageHelper.save(this.selectedNavigation.name, 'selectedNavigation');
    this.localStorageHelper.save(this.selectedSubNavigation.name, 'selectedSubNavigation');
  }

  load(): void {
    this.selectedNavigation = this.navigations[
      this.localStorageHelper.load(this.selectedNavigation.name, 'selectedNavigation')
      ]
    this.selectedSubNavigation = this.subNavigations[
      this.localStorageHelper.load(this.selectedSubNavigation.name, 'selectedSubNavigation')
      ]
    this.getAllNavigations().forEach((navigation: Navigation|SubNavigation) => {
      navigation.tryLoad();
    });
  }

  getLocation(subNavigation: SubNavigation) {
    this.selectedSubNavigation = subNavigation;
    this.selectedNavigation = subNavigation.parent;
    this.selectedNavigation.wasOn = subNavigation.location;
    return this.selectedNavigation.location + '/' + subNavigation.location;
  }

  getNavigations() {
    let ret_arr: Navigation[] = [];
    Object.values(this.navigations).forEach((navigation) => {
      if (navigation.unlocked) ret_arr.push(navigation);
    })
    return ret_arr;
  }

  getSubNavigations(navigation: Navigation): SubNavigation[] {
    let ret_arr: SubNavigation[] = []
    Object.values(this.subNavigations).forEach((subNavigation) => {
      if (subNavigation.parent === navigation && subNavigation.unlocked) ret_arr.push(subNavigation);
    })
    return ret_arr;
  }

  navigate(event: any = this.subNavigations['redParticles']) {
    let currentUrl: string[] = this.router.url.split('/')
    if (currentUrl[1] !== event.parent || currentUrl[2] !== event.location) {
      let navigation = this.getLocation(event);
      this.save();
      this.router.navigate([navigation])
    }
  }

  setNavigationByEvent(event: any) {
    if (event && event['name']) {
      this.selectedNavigation = this.navigations[event['name']];
    } else {
      this.selectedNavigation = this.navigations['red'];
    }
  }

  setSubNavigationByName(name: string) {
    this.selectedSubNavigation = this.subNavigations[name];
  }

  getWasOnLocation(): string {
    return this.selectedNavigation.wasOn;
  }
}
