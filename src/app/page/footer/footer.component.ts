import { Component, OnInit } from '@angular/core';
import {NavigationsService} from "../../services/navigations.service";
import {Navigation, SubNavigation} from "../../globals";
import {Router} from "@angular/router";
import {NumberDisplayService} from "../../services/number-display.service";
import {App} from "../../App";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  navigations: Navigation[] = [];
  subNavigations: SubNavigation[] = [];

  constructor(private navigation: NavigationsService, private router: Router) {
    App.subscribe().subscribe(
      (data) => {
        if (!data) {
          this.setNavigation(NavigationsService.getNavigation(NavigationsService.selectedNavigation));
        }
      }
    )
  }

  setNavigation(event: any) {
    NavigationsService.selectedNavigation = event['name']
    this.ngOnInit();
  }

  navigate(event: any) {
    NavigationsService.navigate(event);
  }

  ngOnInit(): void {
    this.navigations = NavigationsService.getNavigations();
    this.subNavigations = NavigationsService.getSubNavigations(NavigationsService.selectedNavigation);
    this.router.navigate([NavigationsService.selectedNavigation+'/'+NavigationsService.getNavigationValue(NavigationsService.selectedNavigation, 'wasOn')])
  }
}
