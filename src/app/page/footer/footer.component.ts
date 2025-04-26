import { Component, OnInit } from '@angular/core';
import {NavigationsService} from "../../services/navigations.service";
import {Router} from "@angular/router";
import {App} from "../../App";
import {Navigation} from "../../classes/features/navigation";
import {SubNavigation} from "../../classes/features/sub-navigation";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
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

  ngOnInit(): void {
    this.navigations = this.navigationsService.getNavigations();
    this.subNavigations = this.navigationsService.getSubNavigations(this.navigationsService.selectedNavigation);
    this.router.navigate([
      this.navigationsService.selectedNavigation.location+'/'+
      this.navigationsService.getWasOnLocation()
    ])
  }
}
