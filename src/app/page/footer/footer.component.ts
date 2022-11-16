import { Component, OnInit } from '@angular/core';
import {NavigationsService} from "../../services/navigations.service";
import {Navigation, SubNavigation} from "../../globals";
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  navigations: Navigation[] = [];
  subNavigations: SubNavigation[] = [];

  constructor(private navigation: NavigationsService, private router: Router) { }

  setNavigation(event: any) {
    NavigationsService.selectedNavigation = event['name']
    this.ngOnInit();
  }

  navigate(event: any) {
    let navigation = NavigationsService.getLocation(event);
    this.router.navigate([navigation])
  }

  ngOnInit(): void {
    this.navigations = NavigationsService.getNavigations();
    this.subNavigations = NavigationsService.getSubNavigations(NavigationsService.selectedNavigation);
    this.router.navigate(['?/'+NavigationsService.selectedNavigation+'/'+NavigationsService.selectedSubNavigation])
  }
}
