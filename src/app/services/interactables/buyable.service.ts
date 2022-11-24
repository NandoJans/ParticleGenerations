import {Injectable} from '@angular/core';
import {HoldingsService} from "../holdings.service";
import {GeneratorService} from "./generator.service";
import {Num} from "../../num";
import {ResetService} from "./reset.service";
import {UpgradeService} from "./upgrade.service";
import {AutomatorService} from "./automator.service";
import {Generator, Upgrade, Automator} from "../../globals";

@Injectable({
  providedIn: 'root'
})
export class BuyableService {
  constructor(private reset: ResetService) { }

  buyAction (buyable: any) {
    HoldingsService.remove(buyable.currency, buyable.cost)
    if (buyable.amount !== undefined) buyable.amount.add(new Num(1, 0));
    // @ts-ignore
    buyable.bought.add(new Num(1, 0));
    this.correctCosts();
  }

  bulkBuyAction (buyable: any, cost: Num, bulk: Num) {
    HoldingsService.remove(buyable.currency, cost)
    buyable.amount.add(bulk);
    // @ts-ignore
    buyable.bought.add(bulk);
    this.correctCosts();
  }

  calculateBulk(buyable: Upgrade | Generator, split: Num = new Num(1, 0)) {
    const a = buyable.increase
    const b = buyable.scaling
    const x = HoldingsService.get(buyable.currency).div(split, false)
    const y = buyable.baseCost
    const two = new Num(2, 0)
    const four = new Num(4, 0)
    let futureBuying: Num;

    if (b.greq(new Num(2, 0))) {
      // @ts-ignore
      futureBuying = a.ln(false).sub(a.ln(false).pow(two, false).add(four.mul(b.ln(false), false).mul(x.div(y, false).ln(false), false), false).sqrt(false), false).div(two.mul(b.ln(false), false), false)
      // @ts-ignore
      futureBuying = futureBuying.negate(false).floor(false)
    } else {
      futureBuying = x.div(y, false).ln(false).div(a.ln(false), false).floor(false)
    }
    // @ts-ignore
    let futureCost = buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(futureBuying, false), false).pow(futureBuying, false), false)
    // @ts-ignore
    futureBuying = futureBuying.sub(buyable.bought, false).add(new Num(1, 0), false)
    return [futureBuying, futureCost]
  }

  buy(name: string | undefined) {
    GeneratorService.generators.forEach((buyable) => {
      if (buyable.name === name) {
        const result = this.calculateBulk(buyable)

        // @ts-ignore
        if (result[0].greq(new Num(1, 0)) && HoldingsService.get(buyable.currency).greq(result[1])) {
          // @ts-ignore
          this.bulkBuyAction(buyable, result[1], result[0]);
        }
      }
    })
    UpgradeService.upgrades.forEach((buyable) => {
      if (buyable.name === name && HoldingsService.get(buyable.currency).greq(buyable.cost)) {
        if (buyable.resets !== 'none' || (buyable.noMax !== undefined && buyable.noMax) || buyable.oneTime) {
          this.buyAction(buyable);
          if (buyable.resets !== 'none') ResetService.reset(buyable.resets);
        } else {
          const result = this.calculateBulk(buyable)

          // @ts-ignore
          if (result[0].greq(new Num(1, 0)) && HoldingsService.get(buyable.currency).greq(result[1])) {
            // @ts-ignore
            this.bulkBuyAction(buyable, result[1], result[0]);
          }
        }
      }
    })
    AutomatorService.automators.forEach((buyable) => {
      if (buyable.name === name) {
        this.buyAction(buyable)
      }
    })
  }

  compare() {
    GeneratorService.generators.forEach((buyable) => {
      if (HoldingsService.get(buyable.currency).greq(buyable.cost) && buyable['unlocked']
        && buyable['auto']) {
        const result = this.calculateBulk(buyable)
        // @ts-ignore
        if (result[0].greq(new Num(1, 0)) && HoldingsService.get(buyable.currency).greq(result[1])) {
          // @ts-ignore
          this.bulkBuyAction(buyable, result[1], result[0]);
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
      if (HoldingsService.get(buyable.currency).greq(buyable.cost) && buyable['unlocked'] &&
        buyable['auto'] && (buyable.limit === undefined || !buyable.cost.greq(buyable.limit))) {
        if (buyable.resets !== 'none') {
          this.buyAction(buyable);
          ResetService.reset(buyable.resets);
        } else {
          const result = this.calculateBulk(buyable)

          // @ts-ignore
          if (result[0].greq(new Num(1, 0)) && HoldingsService.get(buyable.currency).greq(result[1])) {
            // @ts-ignore
            this.bulkBuyAction(buyable, result[1], result[0]);
          }
        }
      }


      if (buyable.unlocked && !buyable['auto']) {
        const button = (<HTMLButtonElement> document.getElementById('buyable-'+buyable.name))
        if (button !== null) {
          if (buyable.oneTime && buyable.bought.greq(new Num(1, 0))) {
            button.setAttribute('disabled', '');
            button.className = 'maxed';
            button.innerHTML = 'Bought';
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
    AutomatorService.automators.forEach((buyable) => {
      if (buyable.unlocked) {
        const button = (<HTMLButtonElement> document.getElementById('buyable-'+buyable.name))
        if (button !== null) {
          if (buyable.bought.greq(new Num(1, 0))) {
            button.setAttribute('disabled', '');
            button.className = 'maxed';
            button.innerHTML = 'Bought';
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
        if (buyable.name === 'red-generator-booster') {

        }
        // @ts-ignore
        buyable.cost = buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(buyable.bought, false), false).pow(buyable.bought, false), false)
      }
    })
  }
}
