import {Component, OnInit} from '@angular/core';
import {TickService} from "./services/tick.service";
import {DataManagerService} from "./services/data-manager.service";
import {UpgradeService} from "./services/interactables/upgrade.service";
import {App} from "./App";
import {Router} from "@angular/router";
import {NavigationsService} from "./services/navigations.service";
import {GeneratorService} from "./services/interactables/generator.service";
import {ChallengeService} from "./services/interactables/challenge.service";
import {HoldingRecord} from "./classes/records/holdings/holding-record";

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
    private holdingsRecord: HoldingRecord
  ) {
    NavigationsService.setRouter(router);
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
    this.holdingsRecord.load();
    UpgradeService.resetUpgrades();
    GeneratorService.resetGenerators();
    ChallengeService.resetChallenges();
    DataManagerService.load();

    console.log(this.holdingsRecord.getRedParticles())

    if (!this.isTicking) {
      this.tick.tick();
      this.isTicking = true;
    }
  }

  getActiveChallengeStyle() {
    return this.challengeService.getActiveChallengeStyle() || '';
  }
}
