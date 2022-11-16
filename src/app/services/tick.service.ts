import {Host, Injectable} from '@angular/core';
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
import {PrestigeAutomatorsComponent} from "../pages/automators/prestige-automators/prestige-automators.component";
import {AutomatorService} from "./interactables/automator.service";
import {TimelineService} from "./timeline.service";

@Injectable({
  providedIn: 'root'
})
export class TickService {

  constructor(private holdings: HoldingsService, private numberDisplay: NumberDisplayService, private generators: GeneratorService,
              private upgrades: UpgradeService, private buyables: BuyableService) { }

  gameTick(speed: Num = new Num(1, 0)) {
    UpgradeService.correctBuffer();
    GlobalMultipliersService.reset();

    AutomatorService.setAutos();
    ChallengeService.applyNerfs();
    this.buyables.compare();
    this.buyables.correctCosts();

    ChallengeService.applyNerfs();

    UpgradeService.action();
    MilestoneService.action();
    ChallengeService.action();

    GeneratorService.correctMultipliers();
    ChallengeService.applyNerfs();
    GeneratorService.generate(speed);

    //HoldingsService.set('redParticles', new Num(1, 2000))
    //HoldingsService.set('yellowParticles', new Num(1, 40))
    //HoldingsService.set('yellows', new Num(5, 3))
    //HoldingsService.set('yellowFusion', new Num(1, 110))

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
