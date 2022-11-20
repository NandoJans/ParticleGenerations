import {Injectable} from '@angular/core';
import {HoldingsService} from "../holdings.service";
import {GeneratorService} from "./generator.service";
import {Num} from "../../num";
import {ResetService} from "./reset.service";
import {UpgradeService} from "./upgrade.service";
import {AutomatorService} from "./automator.service";
import {MilestoneService} from "./milestone.service";
import {Tester} from "../../Tester";

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
      if (buyable.name === name && HoldingsService.get(buyable.currency).greq(buyable.cost)) {
        this.buyAction(buyable)
        if (buyable.resets !== 'none') ResetService.reset(buyable.resets);
        if (buyable.noMax === undefined || !buyable.noMax) {

          while (HoldingsService.get(buyable.currency).greq(buyable.cost) && !buyable.oneTime) {
            this.buyAction(buyable);
            if (buyable.resets !== 'none') ResetService.reset(buyable.resets);
            if (buyable.limit !== undefined && buyable.bought.greq(buyable.limit)) break;
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
        //const upgradeAmount = HoldingsService.get(buyable.currency).log(buyable.increase, false);
        //console.log(upgradeAmount.toString())
        while (HoldingsService.get(buyable.currency).greq(buyable.cost)) {
          // @ts-ignore
          const futureCost: Num = buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(buyable.bought.add(new Num(1, 1), false), false), false).pow(buyable.bought.add(new Num(1, 1), false), false), false)

          Tester.add('Bought')

          if (HoldingsService.get(buyable.currency).greq(futureCost)) {
            HoldingsService.remove(buyable.currency, futureCost)
            GeneratorService.addValue(buyable.name, 'amount', new Num(1,1))
            // @ts-ignore
            buyable.bought.add(new Num(1, 1));
            this.correctCosts();
          } else {
            this.buyAction(buyable);
          }
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
        this.buyAction(buyable);
        if (buyable.resets !== 'none') ResetService.reset(buyable.resets);
        while (HoldingsService.get(buyable.currency).greq(buyable.cost) && !buyable.oneTime
          && (buyable.limit === undefined || !buyable.cost.greq(buyable.limit))) {
          this.buyAction(buyable);
          if (buyable.resets !== 'none') ResetService.reset(buyable.resets);
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
        // @ts-ignore
        buyable.cost = buyable.baseCost.mul(buyable.increase.mul(buyable.scaling.pow(buyable.bought, false), false).pow(buyable.bought, false), false)
      }
    })
  }
}
