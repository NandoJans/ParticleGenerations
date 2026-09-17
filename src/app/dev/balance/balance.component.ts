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
  speed = 10;
  maxIdleHours = 24;

  constructor(
    private balanceService: BalanceService,
  ) {}

  start() {
    const settings: any = {
      speed: Math.max(0.1, Number(this.speed) || 10),
      maxTime: Math.max(1, Number(this.maxIdleHours) || 24) * 3600,
    };
    if (this.selectedPhaseId) {
      settings.phaseId = this.selectedPhaseId;
    }
    this.balanceService.start(settings);
  }

  getPhases() {
    return this.balanceService.getPhases();
  }

  getResults() {
    return this.balanceService.getOrderedResults().slice().reverse();
  }

  getAnalysis() { return this.balanceService.getAnalysis(); }

  getPace(timeBetween: number) { return this.balanceService.getPace(timeBetween); }

  exportCsv() {
    const blob = new Blob([this.balanceService.exportCsv()], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'particle-generations-balance.csv';
    link.click();
    URL.revokeObjectURL(link.href);
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
