import { Component, OnInit } from '@angular/core';
import {OfflineService} from "../../../services/offline.service";
import {Holding} from "../../../classes/features/holding";
import {Num} from "../../../num";
import {LocalStorageHelper} from "../../../classes/helpers/local-storage-helper";

@Component({
    selector: 'app-offline',
    templateUrl: './offline.component.html',
    styleUrls: ['./offline.component.css'],
    standalone: false
})
export class OfflineComponent implements OnInit {
  private localStorageHelper: LocalStorageHelper = new LocalStorageHelper('settings', 'autoFullscreen');
  autoFullscreenEnabled: boolean = true;

  constructor(
    private offlineService: OfflineService
  ) { }

  ngOnInit(): void {
    // Load the auto-fullscreen preference from localStorage
    this.autoFullscreenEnabled = this.localStorageHelper.load(true);
  }

  getOfflineProgress(): number {
    if (this.offlineService.getTotalTicks() === 0) {
      return 100;
    }
    const progress = this.offlineService.getTickProgress() / this.offlineService.getTotalTicks() * 100;
    return 100 - Math.min(progress, 100);
  }

  getTickProgress(): number {
    return this.offlineService.getTicksDone();
  }

  getTotalTicks(): number {
    return this.offlineService.getTotalTicks();
  }

  close() {
    if (this.offlineService.isDone()) {
      if (this.autoFullscreenEnabled) {
        document.documentElement.requestFullscreen({ navigationUI: 'hide' })
          .then(() => {
            console.log('Fullscreen mode activated successfully.');
          })
          .catch((error) => {
            console.error('Failed to activate fullscreen mode:', error);
          });
      }
      this.offlineService.close();
    }
  }

  toggleAutoFullscreen() {
    this.autoFullscreenEnabled = !this.autoFullscreenEnabled;
    this.localStorageHelper.save(this.autoFullscreenEnabled);
    this.localStorageHelper.store();
  }

  isDone() {
    return this.offlineService.isDone();
  }

  getGeneratedHoldings(): {holding: Holding, startAmount: Num, generated: Num}[] {
    return this.offlineService.getGeneratedHoldings();
  }

  stopClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
