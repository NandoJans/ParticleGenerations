import { Component, OnInit } from '@angular/core';
import {NavigationsService} from "../../services/navigations.service";
import {Router} from "@angular/router";
import {App} from "../../App";
import {Navigation} from "../../classes/features/navigation";
import {SubNavigation} from "../../classes/features/sub-navigation";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent implements OnInit {
  navigations: Navigation[] = [];
  subNavigations: SubNavigation[] = [];

  constructor(
    private navigationsService: NavigationsService,
    private router: Router
  ) {
    App.subscribe().subscribe(
      (data) => {
        if (!data) {
          this.setNavigation(navigationsService.selectedNavigation);
        }
      }
    )
  }

  setNavigation(event: any) {
    this.navigationsService.setNavigationByEvent(event);
    this.ngOnInit();
  }

  navigate(event: any) {
    this.navigationsService.navigate(event);
  }

  isNavigationActive(navigation: Navigation): boolean {
    return this.navigationsService.selectedNavigation === navigation;
  }

  isSubNavigationActive(subNavigation: SubNavigation): boolean {
    return this.navigationsService.selectedNavigation === subNavigation.parent
      && subNavigation.location === subNavigation.parent.wasOn;
  }


  ngOnInit(): void {
    this.navigations = this.navigationsService.getNavigations();
    this.subNavigations = this.navigationsService.getSubNavigations(this.navigationsService.selectedNavigation);
    // Don't redirect if we're on a dev route
    if (!this.router.url.includes('/dev/')) {
      this.router.navigate([
        this.navigationsService.selectedNavigation.location+'/'+
        this.navigationsService.getWasOnLocation()
      ])
    }
  }
}
