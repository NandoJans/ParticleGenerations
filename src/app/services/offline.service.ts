import { Injectable } from '@angular/core';
import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";
import {TickService} from "./tick.service";
import {Num} from "../num";
import { HoldingRecord } from '../classes/records/holdings/holding-record';
import {Holding} from "../classes/features/holding";
import {App} from "../App";

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  localStorageHelper: LocalStorageHelper = new LocalStorageHelper('app', 'lastSave');
  done: boolean = false;
  closed: boolean = false;
  ticksDone: number = 0;
  totalTicks: number = 0;
  generatedHoldings: {holding: Holding, startAmount: Num, generated: Num}[] = [];

  constructor(
    private tickService: TickService,
    private holdingRecord: HoldingRecord
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

  getGeneratedHoldings(): {holding: Holding, startAmount: Num, generated: Num}[] {
    return this.generatedHoldings.filter(generatedHolding => {
      return generatedHolding.generated.gt(new Num(0, 0));
    })
  }

  private calculateOfflineProgress() {
    // Invert holding list
    this.generatedHoldings = this.getHoldingList();

    const calculatingOfflineProgress = setInterval(() => {
      App.gameSpeed = new Num(1, 1);
      App.offlineCalculation = true;
      if (this.ticksDone >= this.totalTicks) {
        this.done = true;
        App.gameSpeed = new Num(1, -1);
        App.offlineCalculation = false;
        clearInterval(calculatingOfflineProgress);
        return;
      }
      if (this.ticksDone + 100 > this.totalTicks) {
        const tickAmount = this.totalTicks - this.ticksDone;
        this.ticksDone = this.totalTicks;
        this.tickService.gameTick(new Num(tickAmount/10, 0));
        this.addToLastOnlineSave(tickAmount);
        this.done = true;
      } else {
        this.tickService.gameTick(new Num(1, 1));
        this.ticksDone += 100;
        this.addToLastOnlineSave(100);
      }
      this.updateGeneratedHoldings();
    }, 0);
  }

  private addToLastOnlineSave(ticks: number) {
    const lastSave = this.localStorageHelper.load(null);
    if (lastSave) {
      const newDate = new Date();
      newDate.setTime(new Date(lastSave).getTime() + (ticks * 50));
      this.localStorageHelper.save(newDate.toString());
    }
  }

  private calculateTicks(lastSave: string) {
    const dateDiff = new Date().getTime() - new Date(lastSave).getTime();
    if (dateDiff < 0) {
      this.done = true;
      return;
    }
    this.totalTicks = Math.floor((dateDiff) / 50);

    if (this.totalTicks > 1e6) {
      this.totalTicks = 1e6;
    }
  }

  load(): void {
    const lastSave = this.localStorageHelper.load(null);
    if (lastSave && !App.isDev()) {
      this.done = false;
      this.closed = false;
      this.ticksDone = 0;
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

  private getHoldingList(): {holding: Holding, startAmount: Num, generated: Num}[] {
    // Invert holding list
    const holdingList = this.holdingRecord.getList();
    let holdingListCopy: {holding: Holding, startAmount: Num, generated: Num}[] = [];
    for (const holding of holdingList) {
      holdingListCopy = [
        {holding: holding, startAmount: holding.amount.copy(), generated: new Num(0, 0)},
        ...holdingListCopy
      ];
    }
    return holdingListCopy;
  }

  private updateGeneratedHoldings() {
    for (const generatedHolding of this.generatedHoldings) {
      generatedHolding.generated = generatedHolding.holding.amount.sub(generatedHolding.startAmount);
    }
  }
}
