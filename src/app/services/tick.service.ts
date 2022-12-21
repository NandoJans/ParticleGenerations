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
import {mainActions} from "./interactables/action/mainActions";
import {Action} from "../action";
import {CombinerService} from "./interactables/combiner.service";

@Injectable({
  providedIn: 'root'
})
export class TickService {

  constructor(private holdings: HoldingsService, private numberDisplay: NumberDisplayService, private generators: GeneratorService,
              private upgrades: UpgradeService, private buyables: BuyableService) { }

  mainAction() {
    mainActions.forEach((action) => {
      action.execute();
    })
    HoldingsService.remove('darkEnergy', HoldingsService.get('darkEnergySubtract'))
    HoldingsService.set('yellowFusionMax', new Num(1, 110))
    HoldingsService.set('maxDarkPower', new Num(6.66, 2))
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
    // @ts-ignore
    if (HoldingsService.get('blues').greq(new Num(1, 2)) && new Num(Math.floor(HoldingsService.get('yellowParticles').pow(new Num(0.12, 0), false).exp/110) , 0).add(new Num(0, 0), false).greq(HoldingsService.get('darkPower'))) {
      // @ts-ignore
      HoldingsService.set('darkPower', new Num(Math.floor(HoldingsService.get('yellowParticles').pow(new Num(0.1, 0), false).exp/110) , 0).add(new Num(0, 0), false))
    }
    if (HoldingsService.get('darkPower').greq(HoldingsService.get('maxDarkPower'))) {
      HoldingsService.set('darkPower', HoldingsService.get('maxDarkPower').copy())
    }
  }

  gameTick(speed: Num = new Num(1, 0)) {
    this.mainAction();

    UpgradeService.correctBuffer();
    GlobalMultipliersService.reset();

    ChallengeService.applyNerfs();

    UpgradeService.action();
    MilestoneService.action();
    ChallengeService.action();
    CombinerService.execute();

    GeneratorService.correctMultipliers();
    ChallengeService.applyNerfs();
    GeneratorService.generate(speed);

    //HoldingsService.set('redParticles', new Num(1, 110))
    //HoldingsService.set('yellowParticles', new Num(3, 100))
    //HoldingsService.set('greenParticles', new Num(5, 1))
    //HoldingsService.set('blueParticles', new Num(1, 3))
    //HoldingsService.set('yellows', new Num(5, 3))
    //HoldingsService.set('greens', new Num(1, 3))
    //HoldingsService.set('blues', new Num(3, 2))
    //HoldingsService.set('greenSouls', new Num(2, 0))
    //HoldingsService.set('yellowFusion', new Num(1, 110))
    //HoldingsService.set('greenEnergy', new Num(1, 0))
    //console.log(HoldingsService.get('darkEnergy').toString())


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

    this.numberDisplay.reload();
    TimelineService.setProgress();

    AutomatorService.prestigeAutomators();
  }

  tick() {
    let lastCalled: number;
    if (localStorage['lastCalled'] === undefined) {
      localStorage['lastCalled'] = JSON.stringify(Date.now())
      lastCalled = Date.now()
    } else {
      lastCalled = JSON.parse(localStorage['lastCalled']);
    }
    setInterval(() => {
      if (!HoldingsService.get('greenEnergy').greq(new Num(1, 0))) {HoldingsService.set('greenEnergy', new Num(1, 0))}
      if (!HoldingsService.get('redParticles').greq(new Num(2, 1))) {HoldingsService.set('redParticles', new Num(2, 1))}
      if (!HoldingsService.get('yellowParticles').greq(new Num(1, 0))) {HoldingsService.set('yellowParticles', new Num(0, 0))}
      if (!HoldingsService.get('greenParticles').greq(new Num(1, 0))) {HoldingsService.set('greenParticles', new Num(0, 0))}
      /*while (lastCalled+1000 < Date.now()) {
        const difference = Date.now() - lastCalled;
        this.gameTick(new Num(0.5*(difference / 2)/25, 0))

        lastCalled -= difference / 2;
        localStorage['lastCalled'] = JSON.stringify(lastCalled)
      }*/
      this.gameTick(new Num(0.5, 0))

      lastCalled = Date.now();
      localStorage['lastCalled'] = JSON.stringify(lastCalled)
    }, 25)

    setInterval(() => {
      DataManagerService.save()
    }, 1000)
  }
}
