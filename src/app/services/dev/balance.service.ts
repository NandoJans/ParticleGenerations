import { Injectable } from '@angular/core';
import {TickService} from "../tick.service";
import {DataManagerService} from "../data-manager.service";
import {UpgradeRecord} from "../../classes/records/upgrades/upgrade-record";
import {GeneratorRecord} from "../../classes/records/generators/generator-record";
import {Num} from "../../num";
import {PrestigeLayersService} from "../prestige-layers.service";
import {HoldingRecord} from "../../classes/records/holdings/holding-record";
import {AutomatorRecord} from "../../classes/records/automators/automator-record";
import {Generator} from "../../classes/features/generator";
import {Upgrade} from "../../classes/features/upgrade";
import {generate} from "rxjs";
import {EnhancementRecord} from "../../classes/records/enhancement-record";
import {EnhancementService} from "../enhancement.service";
import {App} from "../../App";
import {PrestigeLayer} from "../../classes/features/prestiges/prestige-layer";
import {Holding} from "../../classes/features/holding";

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  settings: {
    speed: number,
    maxTime: number,
    higherPrestige: Num
  } = {
    speed: 10,
    maxTime: 1000000,
    higherPrestige: new Num(1.01, 0),
  };

  loopTimeout: any;

  results: { [key: string]: {
    element: string,
    time: number,
    timeBetween: number,
    style: string,
  }} = {};

  totalElapsedTime: number = 0;
  elapsedSincePrevious: number = 0;

  constructor(
    private tickService: TickService,
    private dataManagerService: DataManagerService,
    private prestigeLayerService: PrestigeLayersService,
    private enhancementService: EnhancementService
  ) { }

  start(settings: { [key: string]: any } = {}) {
    Object.assign(this.settings, settings);

    // Stop any existing loops
    clearInterval(this.loopTimeout);

    // Stop the real game tick
    this.tickService.clearIntervals();
    this.dataManagerService.save();

    this.fullReset();
    App.gameSpeed = new Num(this.settings.speed, 0);
    App.offlineCalculation = true;

    this.loopTimeout = setInterval(this.loop.bind(this), 5);
  }

  loop() {
    this.tickService.gameTick(new Num(this.settings.speed, 0));
    this.totalElapsedTime += this.settings.speed * 5;
    this.elapsedSincePrevious += this.settings.speed * 5;

    AutomatorRecord.list.forEach(automator => {
      automator.disable();
    })

    UpgradeRecord.list.forEach(upgrade => {
      this.checkBuyable(upgrade);
      this.checkEnhancement(upgrade);
    });

    GeneratorRecord.list.forEach(generator => {
      this.checkBuyable(generator);
      this.checkEnhancement(generator);
      generator.getUpgrades().forEach(upgrade => {
        this.checkBuyable(upgrade);
        this.checkEnhancement(upgrade);
      })
    })

    this.prestigeLayerService.getList().forEach(prestigeLayer => {
      if (prestigeLayer.limitPhaseBelow && prestigeLayer.requirementsMet()) {
        prestigeLayer.prestige();

        if (!this.results[prestigeLayer.name]) {
          this.results[prestigeLayer.name] = {
            element: prestigeLayer.name,
            time: this.totalElapsedTime,
            timeBetween: this.elapsedSincePrevious,
            style: prestigeLayer.style,
          }
          this.elapsedSincePrevious = 0;
        }
      } else if (prestigeLayer.requirementsMet()) {
        const particleHolding = prestigeLayer.gainHoldings.find(holding => holding.basedOnRequiredHolding);
        if (
          particleHolding &&
          this.isWorthPrestiging(prestigeLayer, particleHolding.holding)
        ) {
          prestigeLayer.prestige();
        }
      }
    })

    if (this.elapsedSincePrevious > this.settings.maxTime) {
      this.done();
    }
  }

  private isWorthPrestiging(prestigeLayer: PrestigeLayer, holding: Holding): boolean {
    return prestigeLayer.holdingGain.greq(prestigeLayer.highestGenerationPerTick.pow(this.settings.higherPrestige))
  }

  private checkBuyable(buyable: Generator | Upgrade) {
    if (this.shouldSkipBuyable(buyable)) return;

    if (buyable.unlocked && buyable.isBuyable()) {
      buyable.buy();

      if (!this.results[buyable.name]) {
        this.results[buyable.name] = {
          element: buyable.displayName,
          time: this.totalElapsedTime,
          timeBetween: this.elapsedSincePrevious,
          style: buyable.style,
        }
        this.elapsedSincePrevious = 0;
      }
    }
  }

  private shouldSkipBuyable(buyable: Generator | Upgrade): boolean {
    // Skip if the yellow prestige amount is between 100 and 1000 to reach faster prestige rate
    if (
      HoldingRecord.yellowPrestiges.amount.greq(new Num(1, 2)) &&
      HoldingRecord.yellowPrestiges.amount.lt(new Num(1, 3))
    ) {
      if (
        !UpgradeRecord.noResetRedExtension.hasBought() &&
        buyable === UpgradeRecord.redGeneratorExtension &&
        buyable.amount.lt(new Num(5, 0))
      ) {
        return true;
      }
      if (
        buyable === UpgradeRecord.boosterAccelerationUpgrade &&
        buyable.amount.lt(new Num(3, 0))
      ) {
        return true;
      }
    }
    return false;
  }

  private checkEnhancement(enhancable: Upgrade|Generator) {
    if (!enhancable.canEnhance()) return;

    EnhancementRecord.list.forEach(enhancement => {
      if (
        enhancable.enhancement !== enhancement &&
        this.enhancementService.canEnhance(enhancement)
      ) {
        this.enhancementService.startEnhancing(enhancement);
        this.enhancementService.enhance(enhancable);
        this.results[enhancement.name+enhancable.name] = {
          element: `${enhancement.displayName} - ${enhancable.displayName}`,
          time: this.totalElapsedTime,
          timeBetween: this.elapsedSincePrevious,
          style: enhancement.style,
        }
        this.enhancementService.stopEnhancing();
        this.elapsedSincePrevious = 0;
      }
    })
  }

  done() {
    App.gameSpeed = new Num(1, -1);
    App.offlineCalculation = false;
    clearInterval(this.loopTimeout);
    this.dataManagerService.load();
    this.tickService.clearIntervals()
    this.tickService.startIntervals()
    this.elapsedSincePrevious = 0;
    this.totalElapsedTime = 0;
  }

  fullReset = () => {
    [
      ...UpgradeRecord.list,
      ...GeneratorRecord.list,
      ...HoldingRecord.getList(),
      ...AutomatorRecord.list,
      ...EnhancementRecord.list,
      ...PrestigeLayersService.list,
    ].forEach(upgrade => {
      upgrade.reset();
    })
  }

  getResults() {
    return this.results;
  }
}
