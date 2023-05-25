import {Observable} from "rxjs";

export class App {
  static shouldReload: boolean = false;
  static isIdling: boolean = false;
  static haltNuclearDecay: boolean = false;
  static purplePhase: boolean = false;

  static observable: Observable<any> = new Observable<any>(subscriber => {
    setInterval(() => {
      subscriber.next(this.shouldReload)
      this.shouldReload = false;
    }, 50);
  });


  static subscribe() {
    return this.observable;
  }

  static next() {
    this.shouldReload = true;
  }
}
