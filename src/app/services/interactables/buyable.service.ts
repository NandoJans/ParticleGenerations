import {Injectable} from '@angular/core';
import {HoldingsService} from "../holdings.service";
import {GeneratorService} from "./generator.service";
import {Num} from "../../num";
import {ResetService} from "./reset.service";
import {UpgradeService} from "./upgrade.service";

@Injectable({
  providedIn: 'root'
})
export class BuyableService {
  constructor(private reset: ResetService) { }

  buyAction (buyable: any) {
    HoldingsService.remove(buyable.currency, buyable.cost)
    GeneratorService.addValue(buyable.name, 'amount', new Num(1,0))
    // @ts-ignore
    buyable.bought.add(new Num(1, 0));
    this.correctCosts();
  }

  buy(name: string | undefined) {
    GeneratorService.generators.forEach((buyable) => {
      if (buyable.name === name) {
        while (HoldingsService.get(buyable.currency).greq(buyable.cost)) {
          this.buyAction(buyable)
        }
      }
    })
    UpgradeService.upgrades.forEach((buyable) => {
      if (buyable.name === name) {
        this.buyAction(buyable)
        if (buyable.resets !== 'none') ResetService.reset(buyable.resets);
      }
    })
  }

  compare() {
    GeneratorService.generators.forEach((buyable) => {
      if (HoldingsService.get(buyable.currency).greq(buyable.cost) && buyable['unlocked'] && buyable['auto']) {
        while (HoldingsService.get(buyable.currency).greq(buyable.cost)) {
          this.buyAction(buyable);
        }
      }

      if (buyable.unlocked && !buyable['auto']) {
        const button = (<HTMLButtonElement> document.getElementById('buyable-'+buyable.name))
        if (button !== null) {
          if (HoldingsService.get(buyable.currency).greq(buyable.cost)) {
            button.removeAttribute('disabled');
            button.className = 'buyable';
          } else {
            button.setAttribute('disabled', '');
            button.className = '';
          }
        }
      }
    })
    UpgradeService.upgrades.forEach((buyable) => {
      if (HoldingsService.get(buyable.currency).greq(buyable.cost) && buyable['unlocked'] && buyable['auto']) {
        this.buyAction(buyable);
        if (buyable.resets !== 'none') ResetService.reset(buyable.resets);
      }

      if (buyable.unlocked && !buyable['auto']) {
        const button = (<HTMLButtonElement> document.getElementById('buyable-'+buyable.name))
        if (button !== null) {
          if (buyable.oneTime && buyable.bought.greq(new Num(1, 0))) {
            button.className = 'maxed';
          } else if (HoldingsService.get(buyable.currency).greq(buyable.cost)) {
            button.removeAttribute('disabled');
            button.className = 'buyable';
          } else {
            button.setAttribute('disabled', '');
            button.className = '';
          }
        }
      }
    })
  }

  correctCosts() {
    GeneratorService.generators.forEach((buyable) => {
      if (!buyable.bought.greq(new Num(1, 0))) {
        buyable.cost = buyable.baseCost
      } else {
        // @ts-ignore
        buyable.cost = buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(buyable.bought, false), false).pow(buyable.bought, false), false)
      }
    })
    UpgradeService.upgrades.forEach((buyable) => {
      if (!buyable.bought.greq(new Num(1, 0))) {
        buyable.cost = buyable.baseCost

      } else if (buyable.oneTime) {
        const buyableDoc = (<HTMLButtonElement> document.getElementById(buyable.name))
        if (buyableDoc !== null) {
          buyableDoc.classList.add('bought');
        }
      } else {
        // @ts-ignore
        buyable.cost = buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(buyable.bought, false), false).pow(buyable.bought, false), false)
      }
    })
  }
}
