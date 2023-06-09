import {Observable} from "rxjs";
import {Num} from "./num";

export class App {
  static shouldReload: boolean = false;
  static isIdling: boolean = false;
  static haltNuclearDecay: boolean = false;
  static purplePhase: boolean = false;

  static gameSpeed: Num = new Num(1, 0);

  static observable: Observable<any> = new Observable<any>(subscriber => {
    setInterval(() => {
      subscriber.next(this.shouldReload)
      this.shouldReload = false;
    }, 50);
  });

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
}
