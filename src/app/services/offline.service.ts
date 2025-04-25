import { Injectable } from '@angular/core';
import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";
import {TickService} from "./tick.service";

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('app', 'lastSave');
  done: boolean = false;
  closed: boolean = false;
  ticksDone: number = 0;
  totalTicks: number = 0;

  constructor(
    private tickService: TickService
  ) { }

  isDone(): boolean {
    return this.done;
  }

  isClosed(): boolean {
    return this.closed;
  }

  getTickProgress(): number {
    if (this.totalTicks === 0) {
      return 0;
    }
    return this.totalTicks - this.ticksDone;
  }

  getTicksDone(): number {
    return this.ticksDone;
  }

  getTotalTicks(): number {
    return this.totalTicks;
  }

  private calculateOfflineProgress() {
    const calculatingOfflineProgress = setInterval(() => {
      if (this.ticksDone >= this.totalTicks) {
        this.done = true;
        clearInterval(calculatingOfflineProgress);
        return;
      }
      this.tickService.gameTick();
      this.ticksDone++;
    }, 0.1);
  }

  private calculateTicks(lastSave: string) {
    const dateDiff = new Date().getTime() - new Date(lastSave).getTime();
    if (dateDiff < 0) {
      this.done = true;
      return;
    }
    this.totalTicks = Math.floor((dateDiff) / 50);
    if (this.totalTicks > 1000000) {
      this.totalTicks = 1000000;
    }
  }

  load(): void {
    const lastSave = this.localStorageHelper.load(null);
    if (lastSave) {
      this.calculateTicks(lastSave);
      this.calculateOfflineProgress();
    } else {
      this.done = true;
      this.closed = true;
    }
  }

  close() {
    this.closed = true;
    this.done = true;
  }
}
