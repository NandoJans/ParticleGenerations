import {Component, OnInit} from '@angular/core';
import {TickService} from "./services/tick.service";
import {DataManagerService} from "./services/data-manager.service";
import {App} from "./App";
import {Router} from "@angular/router";
import {ChallengeService} from "./services/interactables/challenge.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ParticleGenerations';

  constructor(
    private tick: TickService,
    private router: Router,
    private challengeService: ChallengeService,
    private dataManagerService: DataManagerService
  ) {
    App.subscribe().subscribe((data) => {
      if (data) {
        setTimeout(() => {
          this.ngOnInit();
        }, 50)
      }
    })
  }

  isTicking = false;

  ngOnInit(): void {
    this.dataManagerService.load();

    if (!this.isTicking) {
      this.tick.tick();
      this.isTicking = true;
    }
  }

  getActiveChallengeStyle() {
    return '';
  }
}
