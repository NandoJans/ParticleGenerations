import {Component, OnInit} from '@angular/core';
import {TickService} from "./services/tick.service";
import {DataManagerService} from "./services/data-manager.service";
import {App} from "./App";
import {LocalStorageHelper} from "./classes/helpers/local-storage-helper";
import {OfflineService} from "./services/offline.service";
import {MigrateNumAndExpValues} from "./migrations/migrate-num-and-exp-values";
import {MessageStepsService} from "./services/message-steps.service";
import {ChallengeRecord} from "./classes/records/challenges/challenge-record";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit{
  title = 'ParticleGenerations';
  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('app', 'app');
  VERSION = '0.2';

  constructor(
    private tick: TickService,
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
    this.dataManagerService.init();
    this.dataManagerService.load();
    this.offlineService.load();
    this.dataManagerService.save();
    this.localStorageHelper.save(this.VERSION);

    // HoldingRecord.yellowParticles.amount = new Num(1, 6); // Initialize yellowPrestiges to 1e100
    // HoldingRecord.yellowPrestiges.amount = new Num(1, 3); // Initialize yellowPrestiges to 1e100
    // HoldingRecord.yellowKeys.amount = new Num(1, 4); // Initialize yellowPrestiges to 1e100

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
    return Object.values(ChallengeRecord.currentChallenges).map(challenge => {
      return challenge.style;
    }).join(' ');
  }

  offlineCalculating(): boolean {
    return !this.offlineService.isClosed();
  }

  showMessageSteps(): boolean {
    return this.messageStepsService.showMessageSteps();
  }
}
