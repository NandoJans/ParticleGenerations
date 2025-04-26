import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";
import {Navigation} from "../classes/features/navigation";
import {SubNavigation} from "../classes/features/sub-navigation";
import {faAtom, faCogs, faIndustry} from "@fortawesome/free-solid-svg-icons";

@Injectable({
  providedIn: 'root'
})
export class NavigationsService {
  navigations: {[key: string]: Navigation} = {
    red: new Navigation('red', faAtom, 'red', null, 'redParticles', true),
    automators: new Navigation('automators', faCogs, 'automators', null, 'redParticles', true),
}

  subNavigations: {[key: string]: SubNavigation} = {
    redParticles: new SubNavigation('redParticles', faIndustry, 'particles', this.navigations['red'], null, true),
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
    this.localStorageHelper.save(this.selectedNavigation, 'selectedNavigation');
    this.localStorageHelper.save(this.selectedSubNavigation, 'selectedSubNavigation');
  }

  load(): void {
    this.selectedNavigation = this.localStorageHelper.load(this.selectedNavigation, 'selectedNavigation')
    this.selectedSubNavigation = this.localStorageHelper.load(this.selectedSubNavigation, 'selectedSubNavigation')
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
    const wasOn = this.selectedNavigation.wasOn;
    this.selectedSubNavigation = this.subNavigations[wasOn];
    return this.selectedSubNavigation.location
  }
}
