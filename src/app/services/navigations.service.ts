import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";
import {Navigation} from "../classes/features/navigation";
import {SubNavigation} from "../classes/features/sub-navigation";
import {faAtom, faCogs, faForward, faIndustry} from "@fortawesome/free-solid-svg-icons";
import {HoldingRecord} from "../classes/records/holdings/holding-record";
import {Num} from "../num";

@Injectable({
  providedIn: 'root'
})
export class NavigationsService {
  navigations: {[key: string]: Navigation} = {
    red: new Navigation('red', faAtom, 'red', [], 'particles', true),
    automators: new Navigation('automators', faCogs, 'automators', [], 'red', false),
}

  subNavigations: {[key: string]: SubNavigation} = {
    // Red
    redParticles: new SubNavigation('redParticles', faIndustry, 'particles', this.navigations['red'], [], true),
    redAccelerators: new SubNavigation('redAccelerators', faForward, 'accelerators', this.navigations['red'], [
      {requirement: HoldingRecord.redParticles, amount: new Num(1, 75)},
    ], false),

    // Automators
    redAutomators: new SubNavigation('redParticles', faAtom, 'red', this.navigations['automators'], [], true),
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
