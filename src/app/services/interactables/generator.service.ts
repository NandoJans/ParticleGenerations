import {Injectable} from '@angular/core';
import {HoldingsService} from "../holdings.service";
import {Generator} from "../../globals";
import {Num} from "../../num";
import {GlobalMultipliersService} from "../globals/global-multipliers.service";
import {UpgradeService} from "./upgrade.service";

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  static generators: Generator[] = [
    {
      name: 'red-generator-1', displayName: 'Red Generator 1', auto: false, style: 'red-style',
      baseCost: new Num(1, 1), cost: new Num(1, 1), increase: new Num(1, 1), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
      generates: 'redParticles', baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-particles', resetId: 'redParticleGenerators', unlocked: true,
      requirement: ['none']
    },
    {
      name: 'red-generator-2', displayName: 'Red Generator 2', auto: false, style: 'red-style',
      baseCost: new Num(1, 2), cost: new Num(1, 2), increase: new Num(1, 2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
      generates: 'red-generator-1', baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-particles', resetId: 'redParticleGenerators', unlocked: false,
      requirement: ['upgrade', 'red-generator-extension', new Num(1, 0)]
    },
    {
      name: 'red-generator-3', displayName: 'Red Generator 3', auto: false, style: 'red-style',
      baseCost: new Num(1, 3), cost: new Num(1, 3), increase: new Num(1, 3), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
      generates: 'red-generator-2', baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-particles', resetId: 'redParticleGenerators', unlocked: false,
      requirement: ['upgrade', 'red-generator-extension', new Num(2, 0)]
    },
    {
      name: 'red-generator-4', displayName: 'Red Generator 4', auto: false, style: 'red-style',
      baseCost: new Num(1, 4), cost: new Num(1, 4), increase: new Num(1, 4), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
      generates: 'red-generator-3', baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-particles', resetId: 'redParticleGenerators', unlocked: false,
      requirement: ['upgrade', 'red-generator-extension', new Num(3, 0)]
    },
    {
      name: 'red-generator-5', displayName: 'Red Generator 5', auto: false, style: 'red-style',
      baseCost: new Num(1, 5), cost: new Num(1, 5), increase: new Num(1, 5), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redParticles',
      generates: 'red-generator-4', baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-particles', resetId: 'redParticleGenerators', unlocked: false,
      requirement: ['upgrade', 'red-generator-extension', new Num(4, 0)]
    },
    // Accelerators
    {
      name: 'red-accelerator-generator-1', displayName: 'Red Accelerator Generator 1', auto: false, style: 'red-style',
      baseCost: new Num(1, 0), cost: new Num(1, 0), increase: new Num(1, 1), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redAccelerators',
      generates: 'redAccelerators', baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-accelerators', resetId: 'redAccelerators', unlocked: false,
      requirement: ['holding', 'redParticles', new Num(1, 20)]
    },
    {
      name: 'red-accelerator-generator-2', displayName: 'Red Accelerator Generator 2', auto: false, style: 'red-style',
      baseCost: new Num(1, 10), cost: new Num(1, 10), increase: new Num(1, 2), scaling: new Num(1, 1), bought: new Num(0, 0), currency: 'redAccelerators',
      generates: 'red-accelerator-generator-1', baseMultiplier: new Num(2, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'red-accelerators', resetId: 'redAccelerators', unlocked: false, requirement: ['']
    },
    {
      name: 'yellow-generator-1', displayName: 'Yellow Generator 1', auto: false, style: 'yellow-style',
      baseCost: new Num(1, 2), cost: new Num(1, 2), increase: new Num(1, 1), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
      generates: 'yellowPower', baseMultiplier: new Num(20, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-particles', resetId: 'yellowParticleGenerators', unlocked: true,
      requirement: ['holding', 'yellowParticles', new Num(1, 2)]
    },
    {
      name: 'yellow-generator-2', displayName: 'Yellow Generator 2', auto: false, style: 'yellow-style',
      baseCost: new Num(1, 3), cost: new Num(1, 3), increase: new Num(1, 2), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
      generates: 'yellow-generator-1', baseMultiplier: new Num(20, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-particles', resetId: 'yellowParticleGenerators', unlocked: true,
      requirement: ['holding', 'yellowParticles', new Num(1, 2)]
    },
    {
      name: 'yellow-generator-3', displayName: 'Yellow Generator 3', auto: false, style: 'yellow-style',
      baseCost: new Num(1, 4), cost: new Num(1, 4), increase: new Num(1, 3), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
      generates: 'yellow-generator-2', baseMultiplier: new Num(20, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-particles', resetId: 'yellowParticleGenerators', unlocked: true,
      requirement: ['holding', 'yellowParticles', new Num(1, 2)]
    },
    {
      name: 'yellow-generator-4', displayName: 'Yellow Generator 4', auto: false, style: 'yellow-style',
      baseCost: new Num(1, 5), cost: new Num(1, 5), increase: new Num(1, 4), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
      generates: 'yellow-generator-3', baseMultiplier: new Num(20, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-particles', resetId: 'yellowParticleGenerators', unlocked: true,
      requirement: ['holding', 'yellowParticles', new Num(1, 2)]
    },
    {
      name: 'yellow-generator-5', displayName: 'Yellow Generator 5', auto: false, style: 'yellow-style',
      baseCost: new Num(1, 6), cost: new Num(1, 6), increase: new Num(1, 5), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
      generates: 'yellow-generator-4', baseMultiplier: new Num(20, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-particles', resetId: 'yellowParticleGenerators', unlocked: true,
      requirement: ['holding', 'yellowParticles', new Num(1, 2)]
    },
    {
      name: 'yellow-fusion-generator', displayName: 'Yellow Fusion Generator', auto: false, style: 'yellow-style',
      baseCost: new Num(1, 0), cost: new Num(1, 0), increase: new Num(1, 0), scaling: new Num(1, 0), bought: new Num(0, 0), currency: 'yellowParticles',
      generates: 'yellowFusion', baseMultiplier: new Num(1, 0), multiplier: new Num(1, 0), amount: new Num(0, 0) , type: 'yellow-fusion', resetId: 'yellowFusionGenerators', unlocked: true,
      requirement: ['upgrade', 'unlock-yellow-fusion', new Num(1, 0)]
    },
  ];

  static get(name: string) {
    for (let i = 0; i < this.generators.length; i++) {
      const generator = this.generators[i]
      if (generator.name === name) {
        return generator;
      }
    }

    return {}
  }

  static getValue(name: string, value: string) {
    for (let i = 0; i < this.generators.length; i++) {
      const generator = this.generators[i];
      if (generator.name === name) {
        // @ts-ignore
        return generator[value];
      }
    }
    return 0;
  }

  static increaseMultiplier(target: string, amount: Num) {
    this.generators.forEach((generator) => {
      if (generator.name === target) {
        // @ts-ignore
        generator.multiplier = generator.multiplier.add(amount, false);
      }
    })
  }

  static generate(extra: Num = new Num(1, 0)) {
    this.generators.forEach((generator) => {
      if (generator.requirement[0] !== 'never' && generator.unlocked) {
        // @ts-ignore
        const add: Num = generator.amount.mul(generator.multiplier, false).mul(new Num(1, 0), false);
        add.mul(extra);
        if (HoldingsService.get(generator.generates) !== undefined) HoldingsService.add(generator.generates, add)
        if (this.get(generator.generates) !== undefined) this.addValue(generator.generates, 'amount', add)
      }
    })
  }

  static save() {
    const save = {};
    this.generators.forEach((generator) => {
      // @ts-ignore
      save[generator.name] = {amount: generator.amount, bought: generator.bought, cost: generator.cost}
    })
    localStorage['generators'] = JSON.stringify(save);
  }

  static load() {
    const generators = JSON.parse(localStorage['generators']);
    this.generators.forEach((generator) => {
      if (generators[generator.name] !== undefined) {
        Object.entries(generators[generator.name]).forEach((value) => {
          // @ts-ignore
          generator[value[0]] = new Num(value[1]['num'], value[1]['exp']);
        })
      }
    })
  }

  static addValue(name: string, value: string, addition: Num) {
    this.generators.forEach((generator) => {
      if (generator.name === name) {
        // @ts-ignore
        generator[value].add(addition)
      }
    })
  }

  static setValue(name: string, value: string, set: any) {
    this.generators.forEach((generator) => {
      if (generator.name === name) {
        // @ts-ignore
        generator[value] = set;
      }
    })
  }

  static setValues(type: string, value: string, set: any) {
    this.generators.forEach((generator) => {
      if (generator.type === type) {
        // @ts-ignore
        generator[value] = set;
      }
    })
  }

  static correctMultipliers() {
    this.generators.forEach((generator) => {
      if (generator.unlocked) {
        let base = generator.baseMultiplier;
        // @ts-ignore
        generator.multiplier = base.pow(generator.bought, false)

        if (generator.type === 'red-particles') {

          generator.multiplier.mul(GlobalMultipliersService.get('redParticleGenerators'))
          const redAccelerators = HoldingsService.get('redAccelerators')
          if (redAccelerators.div(new Num(1, 3), false).greq(new Num(1, 0))) {
            generator.multiplier.mul(redAccelerators.div(new Num(1, 3), false));
          }

          const yellowPower = HoldingsService.get('yellowPower')
          if (yellowPower.greq(new Num(1, 0))) {
            generator.multiplier.mul(yellowPower.pow(new Num(5, 0), false).add(new Num(1, 0), false));
          }
        }

        if (generator.type === 'yellow-particles') {
          generator.multiplier.mul(HoldingsService.get('yellowFusion').pow(new Num(2, -1), false))
          generator.multiplier.mul(GlobalMultipliersService.get('yellowParticleGenerators'))
        }

        if (generator.type == 'red-accelerators') {
          generator.multiplier.mul(GlobalMultipliersService.get('redAcceleratorGenerators'))
        }

        if (generator.name == 'yellow-fusion-generator') {
          generator.multiplier.mul(GlobalMultipliersService.get('yellowFusion'));
          let yellowFusion = HoldingsService.get('yellowFusion');
          generator.multiplier.mul(yellowFusion.add(new Num(1, 0), false).div(new Num(2, 3), false));
          if (yellowFusion.greq(new Num(1, 110))) HoldingsService.set('yellowFusion', new Num(1, 110));
        }
      }
    })
  }

  static getGenerators(type: string) {
    const ret_arr: Generator[] = [];

    this.generators.forEach((generator) => {
      if (generator.type === type) { // @ts-ignore
        ret_arr.push(generator);
      }
    })

    return ret_arr;
  }

  static unlock() {
    this.generators.forEach(generator => {
      if (generator.requirement[0] === 'holding') {
        generator.unlocked = HoldingsService.get(generator.requirement[1]).greq(generator.requirement[2]);
      } else if (generator.requirement[0] === 'upgrade') {
        generator.unlocked = UpgradeService.getValue(generator.requirement[1], 'bought').greq(generator.requirement[2]);
      } else if (generator.requirement[0] === 'none') {
        generator.unlocked = true;
      }
    })
  }

}
