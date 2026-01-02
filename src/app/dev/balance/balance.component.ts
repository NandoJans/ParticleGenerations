import { Component } from '@angular/core';
import {BalanceService} from "../../services/dev/balance.service";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
  standalone: false,
})
export class BalanceComponent {
  selectedPhaseId: string = '';

  constructor(
    private balanceService: BalanceService,
  ) {}

  start() {
    const settings: any = {};
    if (this.selectedPhaseId) {
      settings.phaseId = this.selectedPhaseId;
    }
    this.balanceService.start(settings);
  }

  getPhases() {
    return this.balanceService.getPhases();
  }

  getResults() {
    return Object.values(this.balanceService.getResults()).reverse();
  }

  // --- Snapshots UI helpers ---
  getSnapshots() {
    return this.balanceService.getSnapshots()?.slice().reverse();
  }

  backtrackTo(id: string) {
    this.balanceService.backtrackTo(id);
  }

  playFrom(id: string) {
    this.balanceService.startRealFromSnapshot(id);
  }

  saveSnapshot(label: string = 'Manual') {
    this.balanceService.saveSnapshot(label);
  }

  getColorCode(timeBetween: number) {
    const fast = 3600;
    const balanced = 3600 * 24;

    if (timeBetween < fast) {
      return 'green';
    } else if (timeBetween < balanced) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  formatTime(timeBetween: number) {
    timeBetween = Number(timeBetween);
    const d = Math.floor(timeBetween / (3600*24));
    const h = Math.floor(timeBetween % (3600*24) / 3600);
    const m = Math.floor(timeBetween % 3600 / 60);
    const s = Math.floor(timeBetween % 60);

    const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }
}
