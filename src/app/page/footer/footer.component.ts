import { Component, OnInit } from '@angular/core';
import {NavigationsService} from "../../services/navigations.service";
import {Navigation, SubNavigation} from "../../globals";
import {Router} from "@angular/router";
import {App} from "../../App";

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
          this.setNavigation(navigationsService.getNavigation(navigationsService.selectedNavigation));
        }
      }
    )
  }

  setNavigation(event: any) {
    this.navigationsService.selectedNavigation = event['name']
    this.ngOnInit();
  }

  navigate(event: any) {
    this.navigationsService.navigate(event);
  }

  ngOnInit(): void {
    this.navigations = this.navigationsService.getNavigations();
    this.subNavigations = this.navigationsService.getSubNavigations(this.navigationsService.selectedNavigation);
    this.router.navigate([
      this.navigationsService.selectedNavigation+'/'+
      this.navigationsService.getNavigationValue(this.navigationsService.selectedNavigation, 'wasOn')
    ])
  }
}
