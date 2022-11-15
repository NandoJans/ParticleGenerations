import { Injectable } from '@angular/core';
import {GeneratorService} from "./generator.service";
import {UpgradeService} from "./upgrade.service";
import {Num} from "../../num";
import {HoldingsService} from "../holdings.service";
import {DataManagerService} from "../data-manager.service";

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  static resetGenerators(type: string, filter: string = 'none') {
    GeneratorService.generators.forEach((generator) => {
      if (generator.resetId === type) {
        if (filter === 'none') generator.bought = new Num(0, 0);
        if (filter === 'none') generator.amount = new Num(0, 0);
        if (filter === 'amount') generator.amount = generator.bought.copy();
      }
    })
  }

  static resetUpgrades(type: string) {
    UpgradeService.upgrades.forEach((upgrade) => {
      if (upgrade.resetId === type) {
        upgrade.bought = new Num(0, 0);
        upgrade.amount = new Num(0, 0);
      }
    })
  }

  static reset(resets: string) {
    HoldingsService.set('redParticles', new Num(1, 2));
    HoldingsService.set('redAccelerators', new Num(1, 0));
    this.resetGenerators('redParticleGenerators')
    if (resets === 'redParticleGenerators') return;
    HoldingsService.set('yellowPower', new Num(0, 0));
    HoldingsService.set('yellowFusion', new Num(1, 0));
    this.resetGenerators('redAccelerators')
    this.resetGenerators('yellowParticleGenerators', 'amount')
    this.resetUpgrades('red-accelerators')
    this.resetUpgrades('red-particles')
    this.resetUpgrades('red-upgrades')
    DataManagerService.save()
    if (!HoldingsService.get('yellows').greq(new Num(1, 2))) window.location.reload();
    if (resets === 'yellow') return;
    HoldingsService.set('yellowParticles', new Num(0, 0));
    this.resetUpgrades('yellow-upgrades')
    if (resets === 'green') return;
  }
}
