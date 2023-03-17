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
import {Action} from "../action";
import {CombinerService} from "./interactables/combiner.service";
import {ParticleEmitterService} from "./visuals/particle-emitter.service";
import {BackgroundService} from "./visuals/background.service";
import {DropDownMessageService} from "./visuals/drop-down-message.service";
import {ResetService} from "./interactables/reset.service";
import {Router} from "@angular/router";
import {App} from "../App";
import {NewAction} from "../NewAction";

@Injectable({
  providedIn: 'root'
})
export class TickService {

  constructor(private holdings: HoldingsService, private generators: GeneratorService,
              private upgrades: UpgradeService, private buyables: BuyableService,
              private router: Router
  ) { }

  mainAction(speed: Num) {
    HoldingsService.get('greenSouls').mul(new Num(0, 0))
    HoldingsService.remove('darkEnergy', HoldingsService.get('darkEnergySubtract'))
    HoldingsService.set('yellowFusionMax', new Num(1, 110))
    if (!HoldingsService.get('yellowFusion').greq(new Num(1, 0))) {
      HoldingsService.set('yellowFusion', new Num(1, 0))
    }
    if (GeneratorService.getValue('nuclear-decay-generator-1', 'bought').greq(new Num(1, 0))) {
      new Action('decreaseHoldingIncremental', 'greenSouls', new Num(2, 0), 'bought', 'nuclear-decay-generator-1').execute()
    }
    if (GeneratorService.getValue('nuclear-decay-generator-2', 'bought').greq(new Num(1, 0))) {
      new Action('decreaseHoldingIncremental', 'greenSouls', new Num(2, 0), 'bought', 'nuclear-decay-generator-2').execute()
    }
    if (GeneratorService.getValue('nuclear-decay-generator-3', 'bought').greq(new Num(1, 0))) {
      new Action('decreaseHoldingIncremental', 'greenSouls', new Num(2, 0), 'bought', 'nuclear-decay-generator-3').execute()
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
    App.purplePhase = HoldingsService.get('purples').greq(new Num(1, 0));
    NavigationsService.resetTracker();
    UpgradeService.correctBuffer();
    GlobalMultipliersService.reset();
    this.mainAction(speed);
    ChallengeService.applyNerfs();

    HoldingsService.beforeAction();
    GlobalMultipliersService.resetAfter();
    UpgradeService.action();
    MilestoneService.action();
    ChallengeService.action();
    CombinerService.execute();
    HoldingsService.action();

    GeneratorService.correctMultipliers();
    ChallengeService.applyNerfs();
    GeneratorService.generate(speed);
    //HoldingsService.set('redParticles', new Num(1, 110))
    //HoldingsService.set('yellowParticles', new Num(1, 5))
    //HoldingsService.set('greenParticles', new Num(1, 10))
    //HoldingsService.set('blueParticles', new Num(1.1, 95))
    //HoldingsService.set('purpleParticles', new Num(1, 0))
    //HoldingsService.set('yellows', new Num(5, 3))
    //HoldingsService.set('greens', new Num(1, 3))
    //HoldingsService.set('blues', new Num(3, 2))
    //HoldingsService.set('purples', new Num(3, 0))
    //HoldingsService.set('greenSouls', new Num(2, 0))
    //HoldingsService.set('yellowFusion', new Num(1, 1))
    //HoldingsService.set('greenEnergy', new Num(1, 0))
    //HoldingsService.set('blueLight', new Num(1, 50))
    //HoldingsService.set('darkPower', new Num(3, 0))
    //console.log(HoldingsService.get('darkEnergy').toString())

    //GeneratorService.setValue('blue-light-generator', 'bought', new Num(0, 0))
    //UpgradeService.setValue('neutron-star', 'amount', new Num(0, 0));
    //UpgradeService.setValue('neutron-star', 'bought', new Num(0, 0));

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

    NumberDisplayService.reload();
    TimelineService.setProgress();

    AutomatorService.prestigeAutomators();
    BackgroundService.tick();
  }

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
    App.haltNuclearDecay = true;
    setTimeout(() => {
      App.haltNuclearDecay = false;
    }, 500)
    GlobalMultipliersService.resetAfter();
    App.purplePhase = HoldingsService.get('purples').greq(new Num(1, 0));
    setInterval(() => {
      if (!HoldingsService.get('greenEnergy').greq(new Num(1, 0))) {HoldingsService.set('greenEnergy', new Num(1, 0))}
      if (!HoldingsService.get('redParticles').greq(new Num(2, 1))) {HoldingsService.set('redParticles', new Num(2, 1))}
      if (!HoldingsService.get('yellowParticles').greq(new Num(1, 0)) && !App.purplePhase) {HoldingsService.set('yellowParticles', new Num(0, 0))}
      if (!HoldingsService.get('greenParticles').greq(new Num(1, 0)) && !App.purplePhase) {HoldingsService.set('greenParticles', new Num(0, 0))}
      if (lastCalled+10000 < Date.now()) {
        if (!App.isIdling) {
          const idleGain = setInterval(() => {
            App.isIdling = true;
            this.gameTick(new Num(1, 1))

            lastCalled += 10000;
            localStorage['lastCalled'] = JSON.stringify(lastCalled)
            if (lastCalled >= Date.now()-10000) clearInterval(idleGain); App.isIdling = false;
            console.log('Idling')
          }, 3)
        }
      } else {
        this.gameTick(new Num(6.6, -1))

        lastCalled = Date.now();
        localStorage['lastCalled'] = JSON.stringify(lastCalled)
      }
    }, 33)

    setInterval(() => {
      //ParticleEmitterService.tick();
      DataManagerService.save()
    }, 5000)
  }
}
