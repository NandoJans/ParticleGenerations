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
  }

  gameTick(speed: Num = new Num(1, 0)) {
    this.mainAction();

    UpgradeService.correctBuffer();
    GlobalMultipliersService.reset();

    ChallengeService.applyNerfs();

    UpgradeService.action();
    MilestoneService.action();
    ChallengeService.action();

    GeneratorService.correctMultipliers();
    ChallengeService.applyNerfs();
    GeneratorService.generate(speed);

    //HoldingsService.set('redParticles', new Num(1, 2000000))
    //HoldingsService.set('yellowParticles', new Num(3, 12100))
    //HoldingsService.set('greenParticles', new Num(5, 100))
    //HoldingsService.set('yellows', new Num(5, 3))
    //HoldingsService.set('greens', new Num(1, 3))
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
    let lastCalled = Date.now();
    setInterval(() => {
      if (!HoldingsService.get('greenEnergy').greq(new Num(1, 0))) {HoldingsService.set('greenEnergy', new Num(1, 0))}
      if (!HoldingsService.get('redParticles').greq(new Num(2, 1))) {HoldingsService.set('redParticles', new Num(2, 1))}
      if (!HoldingsService.get('yellowParticles').greq(new Num(1, 0))) {HoldingsService.set('yellowParticles', new Num(0, 0))}
      if (!HoldingsService.get('greenParticles').greq(new Num(1, 0))) {HoldingsService.set('greenParticles', new Num(0, 0))}
      while (lastCalled+5000 < Date.now()) {
        this.gameTick(new Num(1, 2))

        lastCalled += 5000;
      }
      this.gameTick(new Num(0.5, 0))

      lastCalled = Date.now();
    }, 25)

    setInterval(() => {
      DataManagerService.save()
    }, 5000)
  }
}
