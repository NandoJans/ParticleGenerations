import { Component, OnInit } from '@angular/core';
import {OfflineService} from "../../../services/offline.service";

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.css']
})
export class OfflineComponent implements OnInit {

  constructor(
    private offlineService: OfflineService
  ) { }

  ngOnInit(): void {
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
      document.documentElement.requestFullscreen({ navigationUI: 'hide' });
      this.offlineService.close();
    }
  }

  isDone() {
    return this.offlineService.isDone();
  }
}
