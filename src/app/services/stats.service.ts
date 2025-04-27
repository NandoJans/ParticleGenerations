import { Injectable } from '@angular/core';
import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";
import {Num} from "../num";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private static getCategory(): string {
    return 'stats';
  }

  private getCategory(): string {
    return StatsService.getCategory();
  }

  static set(item: string, key: string, value: any): void {
    const localStorageHelper = new LocalStorageHelper(this.getCategory(), item);
    localStorageHelper.save(value, key);
  }

  static setNum(item: string, key: string, value: Num): void {
    const localStorageHelper = new LocalStorageHelper(this.getCategory(), item);
    localStorageHelper.saveNum(value, key);
  }

  set(item: string, key: string, value: any): void {
    StatsService.set(item, key, value);
  }

  setNum(item: string, key: string, value: Num): void {
    StatsService.setNum(item, key, value);
  }

  static get(item: string, key: string): any {
    const localStorageHelper = new LocalStorageHelper(this.getCategory(), item);
    return localStorageHelper.load(null, key);
  }

  static getNum(item: string, key: string): Num {
    const localStorageHelper = new LocalStorageHelper(this.getCategory(), item);
    return localStorageHelper.loadNum(new Num(0, 0), key);
  }

  get(item: string, key: string): any {
    return StatsService.get(item, key);
  }

  getNum(item: string, key: string): Num {
    return StatsService.getNum(item, key);
  }

  static addNum(item: string, key: string, value: Num) {
    const localStorageHelper = new LocalStorageHelper(this.getCategory(), item);
    let currentValue = localStorageHelper.loadNum(new Num(0, 0), key);
    currentValue = currentValue.add(value);
    localStorageHelper.saveNum(currentValue, key);
  }
}
