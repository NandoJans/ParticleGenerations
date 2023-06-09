import {Injectable} from '@angular/core';
import {HoldingsService} from "./holdings.service";
import {NumberDisplayService} from "./number-display.service";
import {GeneratorService} from "./interactables/generator.service";
import {BuyableService} from "./interactables/buyable.service";
import {UpgradeService} from "./interactables/upgrade.service";
import {GlobalMultipliersService} from "./globals/global-multipliers.service";
import {NavigationsService} from "./navigations.service";
import {Num} from "../num";
import {PrestigeLayersService} from "./prestige-layers.service";
import {DataManagerService} from "./data-manager.service";
import {MilestoneService} from "./interactables/milestone.service";
import {ChallengeService} from "./interactables/challenge.service";
import {AutomatorService} from "./interactables/automator.service";
import {TimelineService} from "./timeline.service";
import {App} from "../App";
import {ResetService} from "./interactables/reset.service";

@Injectable({
  providedIn: 'root'
})
export class TickService {

  constructor(private holdings: HoldingsService, private generators: GeneratorService,
              private upgrades: UpgradeService, private buyables: BuyableService
  ) { }

  mainAction(speed: Num) {
    HoldingsService.get('greenSouls').mul(new Num(0, 0))
    HoldingsService.remove('darkEnergy', HoldingsService.get('darkEnergySubtract'))
    HoldingsService.set('yellowFusionMax', new Num(1, 110))
    if (!HoldingsService.get('yellowFusion').greq(new Num(1, 0))) {
      HoldingsService.set('yellowFusion', new Num(1, 0))
    }
    if (GeneratorService.getValue('nuclear-decay-generator-1', 'bought').greq(new Num(1, 0))) {
      const generator: {} = GeneratorService.get('nuclear-decay-generator-1')
      // @ts-ignore
      const cost: Num | undefined = generator['baseCost'].mul(new Num(2, 0).pow(generator['bought'], false).sub(new Num(1, 0), false), false)
      // @ts-ignore
      HoldingsService.remove('greenSouls', cost);
    }
    if (GeneratorService.getValue('nuclear-decay-generator-2', 'bought').greq(new Num(1, 0))) {
      const generator: {} = GeneratorService.get('nuclear-decay-generator-2')
      // @ts-ignore
      const cost: Num | undefined = generator['baseCost'].mul(new Num(2, 0).pow(generator['bought'], false).sub(new Num(1, 0), false), false)
      // @ts-ignore
      HoldingsService.remove('greenSouls', cost);
    }
    if (GeneratorService.getValue('nuclear-decay-generator-3', 'bought').greq(new Num(1, 0))) {
      const generator: {} = GeneratorService.get('nuclear-decay-generator-3')
      // @ts-ignore
      const cost: Num | undefined = generator['baseCost'].mul(new Num(2, 0).pow(generator['bought'], false).sub(new Num(1, 0), false), false)
      // @ts-ignore
      HoldingsService.remove('greenSouls', cost);
    }
    if (App.purplePhase) {
      if (HoldingsService.get('redParticles').greq(new Num(1, 110))) {
        const yellowGain = PrestigeLayersService.getValue('yellow', 'gain')
        // @ts-ignore
        HoldingsService.add('yellows', new Num(1, -2).mul(speed, false).mul(yellowGain.log10(false), false));
        // @ts-ignore
        HoldingsService.add('yellowParticles', new Num(2, -2).mul(yellowGain, false).mul(speed, false));
        NavigationsService.setValue('yellow', 'unlocked', true);
      }
      if (HoldingsService.get('yellowParticles').greq(new Num(1, 110))) {
        const greenGain = PrestigeLayersService.getValue('green', 'gain')
        // @ts-ignore
        HoldingsService.add('greens', new Num(1, -2).mul(speed, false).mul(greenGain.log10(false), false));
        // @ts-ignore
        HoldingsService.add('greenParticles', new Num(2, -2).mul(greenGain, false).mul(speed, false));
        NavigationsService.setValue('green', 'unlocked', true);
      }
      if (HoldingsService.get('greenParticles').greq(new Num(1, 110))) {
        const blueGain = PrestigeLayersService.getValue('blue', 'gain')
        // @ts-ignore
        HoldingsService.add('blues', new Num(1, -2).mul(speed, false).mul(blueGain.log10(false), false));
        // @ts-ignore
        HoldingsService.add('blueParticles', new Num(2, -2).mul(blueGain, false).mul(speed, false));
        NavigationsService.setValue('blue', 'unlocked', true);
      }
      PrestigeLayersService.hide('yellow');
      PrestigeLayersService.hide('green');
      PrestigeLayersService.hide('blue');
      MilestoneService.setValue('auto-complete-yellow-challenges', 'cost', new Num(0, 0));
    }
  }

  gameTick(speed: Num = new Num(1, 0)) {
    App.setSpeed(speed);
    App.purplePhase = HoldingsService.get('purples').greq(new Num(1, 0));
    NavigationsService.resetTracker();
    UpgradeService.correctBuffer();
    GlobalMultipliersService.reset();
    this.mainAction(speed);
    ChallengeService.applyNerfs();
    ChallengeService.dynamicChallenges();

    HoldingsService.beforeAction();
    GlobalMultipliersService.resetAfter();

    ChallengeService.action();
    UpgradeService.action();
    MilestoneService.action();
    //CombinerService.execute();
    HoldingsService.action();
    ChallengeService.applyNerfs();

    GeneratorService.correctMultipliers();
    ChallengeService.applyNerfs();
    GeneratorService.generate(speed);
    //HoldingsService.set('redParticles', new Num(1, 110))
    //HoldingsService.set('yellowParticles', new Num(1, 35))
    //HoldingsService.set('greenParticles', new Num(1, 2))
    //HoldingsService.set('blueParticles', new Num(1, 110))
    //HoldingsService.set('purpleParticles', new Num(1, 0))
    //HoldingsService.set('yellows', new Num(5, 0))
    //HoldingsService.set('greens', new Num(1, 4))
    //HoldingsService.set('blues', new Num(3, 2))
    //HoldingsService.set('purples', new Num(5, 0))
    //HoldingsService.set('greenSouls', new Num(2, 0))
    //HoldingsService.set('yellowFusion', new Num(1, 1))
    //HoldingsService.set('greenEnergy', new Num(1, 0))
    //HoldingsService.set('blueLight', new Num(1, 50))
    //HoldingsService.set('darkPower', new Num(3, 0))
    //console.log(HoldingsService.get('darkEnergy').toString())

    //GeneratorService.setValue('blue-light-generator', 'bought', new Num(0, 0))
    //UpgradeService.setValues('yellow-fusion', 'bought', new Num(0, 0));
    AutomatorService.setAutos();
    ChallengeService.applyNerfs();
    this.buyables.compare();
    this.buyables.correctCosts();

    GeneratorService.unlock();
    UpgradeService.unlock();
    NavigationsService.unlock();
    PrestigeLayersService.unlock();
    MilestoneService.unlock();
    ChallengeService.unlock();
    AutomatorService.unlock();
    TimelineService.unlock();
    TimelineService.reach();

    ChallengeService.checkGoal();
    PrestigeLayersService.calculateGain();
    PrestigeLayersService.addIdleGain(speed);

    NumberDisplayService.reload();
    TimelineService.setProgress();

    AutomatorService.prestigeAutomators();
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
