import {Component, OnInit} from '@angular/core';
import {TickService} from "./services/tick.service";
import {DataManagerService} from "./services/data-manager.service";
import {App} from "./App";
import {Router} from "@angular/router";
import {ChallengeService} from "./services/interactables/challenge.service";
import {LocalStorageHelper} from "./classes/helpers/local-storage-helper";
import {OfflineService} from "./services/offline.service";
import {MigrateNumAndExpValues} from "./migrations/migrate-num-and-exp-values";
import {MessageStepsService} from "./services/message-steps.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ParticleGenerations';
  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('app', 'app');
  VERSION = '0.2';

  constructor(
    private tick: TickService,
    private router: Router,
    private challengeService: ChallengeService,
    private dataManagerService: DataManagerService,
    private offlineService: OfflineService,
    private messageStepsService: MessageStepsService,
  ) {
    App.subscribe().subscribe((data) => {
      if (data) {
        setTimeout(() => {
          this.isTicking = false;
          this.ngOnInit();
        }, 50)
      }
    })

    window.onfocus = () => {
      this.localStorageHelper.save(this.VERSION);
      this.dataManagerService.load();
      this.offlineService.load();
      this.dataManagerService.save();
      this.tick.startIntervals();
    }

    window.onblur = () => {
      this.tick.clearIntervals();
      this.localStorageHelper.save(this.VERSION);
      this.dataManagerService.save();
    }
  }

  isTicking = false;

  ngOnInit(): void {
    this.updateVersion();
    this.dataManagerService.load();
    this.offlineService.load();
    this.dataManagerService.save();
    this.localStorageHelper.save(this.VERSION);

    if (!this.isTicking) {
      this.tick.startIntervals();
      this.isTicking = true;
    }
  }

  private updateVersion() {
    const version = this.localStorageHelper.load('');
    if (version !== this.VERSION) {
      const migrations = [
        new MigrateNumAndExpValues(),
      ];
      for (const migration of migrations) {
        migration.up();
      }
    }
  }

  getActiveChallengeStyle() {
    return '';
  }

  offlineCalculating(): boolean {
    return !this.offlineService.isClosed();
  }

  showMessageSteps(): boolean {
    return this.messageStepsService.showMessageSteps();
  }
}
