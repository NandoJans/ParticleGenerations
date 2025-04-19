import { Component, OnInit } from '@angular/core';
import {PrestigeLayersService} from "../../services/prestige-layers.service";
import {ChallengeService} from "../../services/interactables/challenge.service";
import {App} from "../../App";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  redParticles: string = '';

  docYellow: string | undefined;
  docGreen: string | undefined;
  docBlue: string | undefined;
  docPurple: string | undefined;

  inPurplePhase: boolean | undefined;
  constructor() {
    App.subscribe().subscribe((r) => {
      if (r) {
        this.ngOnInit();
      }
    })
  }

  ngOnInit(): void {
  }
}
