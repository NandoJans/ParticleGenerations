import {Injectable} from '@angular/core';
import {HoldingsService} from "../holdings.service";
import {GeneratorService} from "./generator.service";
import {Num} from "../../num";
import {ResetService} from "./reset.service";
import {UpgradeService} from "./upgrade.service";
import {AutomatorService} from "./automator.service";
import {Generator, Upgrade} from "../../globals";
import {CombinerService} from "./combiner.service";
import {NavigationsService} from "../navigations.service";

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
    const c = buyable.bought
    let x = HoldingsService.get(buyable.currency).div(split, false)
    const y = buyable.baseCost
    const two = new Num(2, 0)
    const four = new Num(4, 0)
    let futureBuying: Num;
    let futureCost: Num;

    if (buyable.scalingStart !== undefined) {
      futureBuying = x.div(y, false).ln(false).div(a.ln(false), false).floor(false)
      // @ts-ignore
      futureCost = y.mul(a.pow(futureBuying, false), false)
      if (futureCost.greq(buyable.scalingStart)) {
        x = buyable.scalingStart
        let buyUntilScaling = x.div(y, false).ln(false).div(a.ln(false), false).floor(false)
        // @ts-ignore
        futureCost = y.mul(buyable.increase.pow(buyUntilScaling, false), false)
        let leftOverCurrency = HoldingsService.get(buyable.currency).div(futureCost, false)
        // @ts-ignore
        let postScalingBuying = a.ln(false).sub(a.ln(false).pow(two, false).add(four.mul(b.ln(false), false).mul(leftOverCurrency.div(y, false).ln(false), false), false).sqrt(false), false).div(two.mul(b.ln(false), false), false)
        // @ts-ignore
        postScalingBuying = postScalingBuying.negate(false).floor(false)
        // @ts-ignore
        futureBuying = buyUntilScaling.add(postScalingBuying, false)
        // @ts-ignore
        futureCost = futureCost.mul(a.mul(b.pow(postScalingBuying, false), false).pow(postScalingBuying, false), false)
      }
    } else {
      if (b.greq(new Num(1.1, 0))) {
        // @ts-ignore
        futureBuying = a.ln(false).sub(a.ln(false).pow(two, false).add(four.mul(b.ln(false), false).mul(x.div(y, false).ln(false), false), false).sqrt(false), false).div(two.mul(b.ln(false), false), false)
        // @ts-ignore
        futureBuying = futureBuying.negate(false).floor(false)
      } else {
        futureBuying = x.div(y, false).ln(false).div(a.ln(false), false).floor(false)
      }
      // @ts-ignore
      futureCost = y.mul(a.mul(b.pow(futureBuying, false), false).pow(futureBuying, false), false)
    }
    // @ts-ignore
    futureBuying = futureBuying.sub(c, false).add(new Num(1, 0), false)
    return [futureBuying, futureCost]
  }

  buy(name: string | undefined) {
    GeneratorService.generators.forEach((buyable) => {
      if (buyable.name === name) {
        if (buyable.noMax !== undefined && buyable.noMax) {
          this.buyAction(buyable);
        } else {
          const result1 = this.calculateBulk(buyable)
          // @ts-ignore
          if (result1[0].greq(new Num(1, 0)) && HoldingsService.get(buyable.currency).greq(result1[1])) {
            // @ts-ignore
            this.bulkBuyAction(buyable, result1[1], result1[0]);
          }
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
            if (buyable.limit !== undefined && result[0].greq(buyable.limit)) result[0] = buyable.limit;
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
    CombinerService.combiners.forEach((buyable) => {
      if (buyable.name === name) {
        this.buyAction(buyable)
      }
    })
  }

  compare() {
    GeneratorService.generators.forEach((buyable) => {
      if (HoldingsService.get(buyable.currency).greq(buyable.cost) && buyable['unlocked']
        && buyable['auto']) {
        const result1 = this.calculateBulk(buyable)
        // @ts-ignore
        if (result1[0].greq(new Num(1, 0)) && HoldingsService.get(buyable.currency).greq(result1[1])) {
          // @ts-ignore
          this.bulkBuyAction(buyable, result1[1], result1[0]);
        }
      }

      if (buyable.unlocked && !buyable['auto']) {
        const button = (<HTMLButtonElement> document.getElementById('buyable-'+buyable.name))
        if (HoldingsService.get(buyable.currency).greq(buyable.cost)) {
          if (button !== null) {
            button.removeAttribute('disabled');
            button.className = 'buyable';
          }
          if (buyable.subNav !== undefined && buyable.nav !== undefined) NavigationsService.markBuyable(buyable.subNav, buyable.nav);
        } else {
          if (button !== null) {
            button.setAttribute('disabled', '');
            button.className = '';
          }
          if (buyable.subNav !== undefined && buyable.nav !== undefined) NavigationsService.removeBuyable(buyable.subNav, buyable.nav);
        }
      }
    })
    UpgradeService.upgrades.forEach((buyable) => {
      if (HoldingsService.get(buyable.currency).greq(buyable.cost) && buyable['unlocked'] && buyable['auto'] &&
        // @ts-ignore
        (buyable.limit === undefined || !buyable.bought.greq(buyable.limit.sub(new Num(1, 0), false)))) {
        if (buyable.resets !== 'none') {
          this.buyAction(buyable);
          ResetService.reset(buyable.resets);
        } else {
          const result = this.calculateBulk(buyable)
          if (buyable.type === 'dark-upgrade') result[0].sub(new Num(1, 0));

          // @ts-ignore
          if (result[0].greq(new Num(1, 0)) && HoldingsService.get(buyable.currency).greq(result[1])) {
            // @ts-ignore
            this.bulkBuyAction(buyable, result[1], result[0]);
          }
        }
      }


      if (buyable.unlocked) {
        const button = (<HTMLButtonElement> document.getElementById('buyable-'+buyable.name))
        if (buyable.oneTime && buyable.bought.greq(new Num(1, 0))) {
          if (button !== null) {
            button.setAttribute('disabled', '');
            button.className = 'maxed';
            button.innerHTML = 'Bought';
          }
          if (buyable.subNav !== undefined && buyable.nav !== undefined) NavigationsService.removeBuyable(buyable.subNav, buyable.nav);

        } else if (HoldingsService.get(buyable.currency).greq(buyable.cost)) {
          if (button !== null) {
            button.removeAttribute('disabled');
            button.className = 'buyable';
          }
          if (buyable.subNav !== undefined && buyable.nav !== undefined) NavigationsService.markBuyable(buyable.subNav, buyable.nav);

        } else {
          if (button !== null) {
            button.setAttribute('disabled', '');
            button.className = '';
          }
          if (buyable.subNav !== undefined && buyable.nav !== undefined) NavigationsService.removeBuyable(buyable.subNav, buyable.nav);

        }

      }
    })
    AutomatorService.automators.forEach((buyable) => {
      if (buyable.unlocked) {
        const button = (<HTMLButtonElement> document.getElementById('buyable-'+buyable.name))
        if (buyable.bought.greq(new Num(1, 0))) {
          if (button !== null) {
            button.setAttribute('disabled', '');
            button.className = 'maxed';
            button.innerHTML = 'Bought';
          }
          if (buyable.subNav !== undefined && buyable.nav !== undefined) NavigationsService.removeBuyable(buyable.subNav, buyable.nav);
        } else if (HoldingsService.get(buyable.currency).greq(buyable.cost)) {
          if (button !== null) {
            button.removeAttribute('disabled');
            button.className = 'buyable';
          }
          if (buyable.subNav !== undefined && buyable.nav !== undefined) NavigationsService.markBuyable(buyable.subNav, buyable.nav);
        } else {
          if (button !== null) {
            button.setAttribute('disabled', '');
            button.className = '';
          }
          if (buyable.subNav !== undefined && buyable.nav !== undefined) NavigationsService.removeBuyable(buyable.subNav, buyable.nav);
        }
      }
    })
    CombinerService.combiners.forEach((buyable) => {
      const button = (<HTMLButtonElement> document.getElementById('buyable-'+buyable.name))
      if (buyable.bought.greq(new Num(1, 0))) {
        if (button !== null) {
          button.setAttribute('disabled', '');
          button.className = 'maxed';
          button.innerHTML = 'Bought';
        }
        if (buyable.subNav !== undefined && buyable.nav !== undefined) NavigationsService.removeBuyable(buyable.subNav, buyable.nav);
      } else if (HoldingsService.get(buyable.currency).greq(buyable.cost)) {
        if (button !== null) {
          button.removeAttribute('disabled');
          button.className = 'buyable';
        }
        if (buyable.subNav !== undefined && buyable.nav !== undefined) NavigationsService.markBuyable(buyable.subNav, buyable.nav);
      } else {
        if (button !== null) {
          button.setAttribute('disabled', '');
          button.className = '';
        }
        if (buyable.subNav !== undefined && buyable.nav !== undefined) NavigationsService.removeBuyable(buyable.subNav, buyable.nav);
      }
    })
  }

  correctCosts() {
    GeneratorService.generators.forEach((buyable) => {
      if (!buyable.bought.greq(new Num(1, 0))) {
        buyable.cost = buyable.baseCost
      } else {
        if (buyable.scalingStart === undefined) {
          // @ts-ignore
          buyable.cost = buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(buyable.bought, false), false).pow(buyable.bought, false), false)
        } else {
          // @ts-ignore
          buyable.cost = buyable.baseCost.mul(buyable.increase.pow(buyable.bought, false), false)
          if (buyable.cost.greq(buyable.scalingStart)) {
            // @ts-ignore
            let buyableAmount = buyable.scalingStart.div(buyable.baseCost, false).ln(false).div(buyable.increase.ln(false), false).floor(false)
            // @ts-ignore
            buyable.cost = buyable.baseCost.mul(buyable.increase.pow(buyableAmount, false), false)
            /*
            let leftOverCurrency = HoldingsService.get(buyable.currency).div(buyable.cost, false)
            const two = new Num(2, 0)
            const four = new Num(4, 0)

            // @ts-ignore
            let postScalingAmount = buyable.increase.ln(false).sub(buyable.increase.ln(false).pow(two, false).add(four.mul(buyable.scaling.ln(false), false).mul(leftOverCurrency.div(buyable.baseCost, false).ln(false), false), false).sqrt(false), false).div(two.mul(buyable.scaling.ln(false), false), false)
            // @ts-ignore
            postScalingAmount = postScalingAmount.negate(false).floor(false).add(new Num(1, 0), false)

             */

            let postBought = buyable.bought.sub(buyableAmount, false);
            // @ts-ignore
            buyable.cost.mul(buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(postBought, false), false).pow(postBought, false), false))
          }
        }
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
        if (buyable.scalingStart === undefined) {
          // @ts-ignore
          buyable.cost = buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(buyable.bought, false), false).pow(buyable.bought, false), false)
        } else {
          // @ts-ignore
          buyable.cost = buyable.baseCost.mul(buyable.increase.pow(buyable.bought, false), false)
          if (buyable.cost.greq(buyable.scalingStart)) {
            // @ts-ignore
            let buyableAmount = buyable.scalingStart.div(buyable.baseCost, false).ln(false).div(buyable.increase.ln(false), false).floor(false)
            // @ts-ignore
            buyable.cost = buyable.baseCost.mul(buyable.increase.pow(buyableAmount, false), false)
            /*
            let leftOverCurrency = HoldingsService.get(buyable.currency).div(buyable.cost, false)
            const two = new Num(2, 0)
            const four = new Num(4, 0)

            // @ts-ignore
            let postScalingAmount = buyable.increase.ln(false).sub(buyable.increase.ln(false).pow(two, false).add(four.mul(buyable.scaling.ln(false), false).mul(leftOverCurrency.div(buyable.baseCost, false).ln(false), false), false).sqrt(false), false).div(two.mul(buyable.scaling.ln(false), false), false)
            // @ts-ignore
            postScalingAmount = postScalingAmount.negate(false).floor(false).add(new Num(1, 0), false)

             */

            let postBought = buyable.bought.sub(buyableAmount, false);
            // @ts-ignore
            buyable.cost.mul(buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(postBought, false), false).pow(postBought, false), false))
          }
        }
      }
    })
  }
}
