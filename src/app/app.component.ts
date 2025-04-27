import {Component, OnInit} from '@angular/core';
import {TickService} from "./services/tick.service";
import {DataManagerService} from "./services/data-manager.service";
import {App} from "./App";
import {Router} from "@angular/router";
import {ChallengeService} from "./services/interactables/challenge.service";
import {LocalStorageHelper} from "./classes/helpers/local-storage-helper";
import {OfflineService} from "./services/offline.service";
import {HoldingRecord} from "./classes/records/holdings/holding-record";
import {Num} from "./num";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ParticleGenerations';
  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('app', 'app');

  constructor(
    private tick: TickService,
    private router: Router,
    private challengeService: ChallengeService,
    private dataManagerService: DataManagerService,
    private offlineService: OfflineService,
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
      this.localStorageHelper.save("V0.1");
      this.dataManagerService.load();
      this.offlineService.load();
      this.dataManagerService.save();
      this.tick.startIntervals();
    }

    window.onblur = () => {
      this.tick.clearIntervals();
      this.localStorageHelper.save("V0.1");
      this.dataManagerService.save();
    }
  }

  isTicking = false;

  ngOnInit(): void {
    this.dataManagerService.load();
    this.offlineService.load();
    this.dataManagerService.save();
    this.localStorageHelper.save("V0.1");

    HoldingRecord.redParticles.add(new Num(1, 101))
    HoldingRecord.redAccelerators.add(new Num(1, 16))

    if (!this.isTicking) {
      this.tick.startIntervals();
      this.isTicking = true;
    }
  }

  getActiveChallengeStyle() {
    return '';
  }

  offlineCalculating(): boolean {
    return !this.offlineService.isClosed();
  }
}
