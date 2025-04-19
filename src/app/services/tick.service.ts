import {Injectable} from '@angular/core';
import {HoldingsService} from "./holdings.service";
import {GlobalMultipliersService} from "./globals/global-multipliers.service";
import {Num} from "../num";
import {DataManagerService} from "./data-manager.service";
import {App} from "../App";

@Injectable({
  providedIn: 'root'
})
export class TickService {

  constructor() { }

  mainAction(speed: Num) {


  }

  gameTick(speed: Num = new Num(1, 0)) {

  }

  iterations: number = 0;

  tick() {
    //ResetService.reset('purple')
    //localStorage.clear();
    let lastCalled: number;
    if (localStorage['lastCalled'] === undefined) {
      localStorage['lastCalled'] = JSON.stringify(Date.now())
      lastCalled = Date.now()
    } else {
      lastCalled = JSON.parse(localStorage['lastCalled']);
      if (Date.now() - localStorage['lastCalled'] > 86400000) {
        localStorage['lastCalled'] = Date.now() - 86400000
      }
    }
    App.startHaltNuclearDecay();
    GlobalMultipliersService.resetAfter();
    App.purplePhase = HoldingsService.get('purples').greq(new Num(1, 0));

    const mainInterval = setInterval(() => {
      if (!HoldingsService.get('greenEnergy').greq(new Num(1, 0))) {HoldingsService.set('greenEnergy', new Num(1, 0))}
      if (!HoldingsService.get('redParticles').greq(new Num(2, 1))) {HoldingsService.set('redParticles', new Num(2, 1))}
      if (!HoldingsService.get('yellowParticles').greq(new Num(1, 0)) && !App.purplePhase) {HoldingsService.set('yellowParticles', new Num(0, 0))}
      if (!HoldingsService.get('greenParticles').greq(new Num(1, 0)) && !App.purplePhase) {HoldingsService.set('greenParticles', new Num(0, 0))}

      if (lastCalled+10000 < Date.now()) {
        if (!App.isIdling) {
          const idleGain = setInterval(() => {
            App.isIdling = true;
            this.gameTick(new Num(2, 3))

            lastCalled += 100000;
            localStorage['lastCalled'] = JSON.stringify(lastCalled)
            if (lastCalled >= Date.now()-100000) {
              clearInterval(idleGain);
              App.isIdling = false;
            }
            console.log('Idling')
          }, 5)
        }
      } else {
        this.iterations++;
        this.gameTick(new Num(1, 0))

        lastCalled = Date.now();
        localStorage['lastCalled'] = JSON.stringify(lastCalled)
      }
    }, 50)

    setInterval(() => {
      console.log('Iterations: '+this.iterations+'/s')
      this.iterations = 0
    }, 1000)

    setInterval(() => {
      //ParticleEmitterService.tick();
      DataManagerService.save()
    }, 5000)
  }
}
