import {Observable} from "rxjs";
import {Num} from "./num";

export class App {
  static shouldReload: boolean = false;
  static haltNuclearDecay: boolean = false;
  static purplePhase: boolean = false;
  static halting: boolean = false;
  static currentCalculationOrder?: number;

  static gameSpeed: Num = new Num(1, -1);

  static observable: Observable<any> = new Observable<any>(subscriber => {
    setInterval(() => {
      subscriber.next(this.shouldReload)
      this.shouldReload = false;
    }, 50);
  });
  static offlineCalculation: boolean;
  static isDev(): boolean {
    return window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1');
  };

  static startHaltNuclearDecay() {
    this.haltNuclearDecay = true;
    setTimeout(() => {
      this.haltNuclearDecay = false;
    }, 250)
  }

  static subscribe() {
    return this.observable;
  }

  static next() {
    this.shouldReload = true;
  }

  static setSpeed(speed: Num) {
    this.gameSpeed = speed.copy();
  }

  static getSpeed() {
    return this.gameSpeed.copy();
  }

  static haltTicking(): boolean {
    return this.halting = true;
  }

  static resumeTicking(): boolean {
    return this.halting = false;
  }

  static isHalting(): boolean {
    return this.halting;
  }
}
