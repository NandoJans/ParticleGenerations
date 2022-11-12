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

@Injectable({
  providedIn: 'root'
})
export class TickService {

  constructor(private holdings: HoldingsService, private numberDisplay: NumberDisplayService, private generators: GeneratorService,
              private upgrades: UpgradeService, private buyables: BuyableService) { }

  gameTick(speed: Num = new Num(1, 0)) {
    UpgradeService.correctBuffer();
    GlobalMultipliersService.reset();

    this.buyables.compare();
    this.buyables.correctCosts();

    UpgradeService.action();
    MilestoneService.action();

    GeneratorService.correctMultipliers();
    GeneratorService.generate(speed);

    GeneratorService.unlock();
    UpgradeService.unlock();
    NavigationsService.unlock();
    PrestigeLayersService.unlock();
    MilestoneService.unlock();

    PrestigeLayersService.calculateGain();

    this.numberDisplay.reload();
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
