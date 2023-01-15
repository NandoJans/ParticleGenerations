import {Injectable} from '@angular/core';
import {HoldingsService} from "../holdings.service";
import {Generator} from "../../globals";
import {Num} from "../../num";
import {GlobalMultipliersService} from "../globals/global-multipliers.service";
import {UpgradeService} from "./upgrade.service";
import {ChallengeService} from "./challenge.service";
import {redParticleGenerators} from "./generators/red/particles";
import {redAcceleratorGenerators} from "./generators/red/accelerators";
import {yellowParticleGenerators} from "./generators/yellow/particles";
import {greenParticleGenerators} from "./generators/green/particles";
import {Sorter} from "../../Sorter";
import {Searcher} from "../../Searcher";
import {blueParticleGenerators} from "./generators/blue/particles";
import {blueLightGenerators} from "./generators/blue/light";

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  static generators: Generator[] = redParticleGenerators.concat(
    blueParticleGenerators,
    redAcceleratorGenerators,
    yellowParticleGenerators,
    greenParticleGenerators,
    blueLightGenerators
  )

  static sortedGenerators: Generator[] =
    Sorter.sort(redParticleGenerators.concat(
      blueParticleGenerators,
      redAcceleratorGenerators,
      yellowParticleGenerators,
      greenParticleGenerators,
      blueLightGenerators
    ), 'name')

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
    const generator = Searcher.search(this.sortedGenerators, 'name', name)
    if (generator !== undefined) {
      return generator[value]
    }
    return 0;
  }

  static increaseMultiplier(name: string, amount: Num) {
    const generator = Searcher.search(this.sortedGenerators, 'name', name)
    if (generator !== undefined) {
      generator['multiplier'] += generator['multiplier'].add(amount, false)
    }
  }

  static generate(extra: Num = new Num(1, 0)) {
    this.generators.forEach((generator) => {
      let shouldGenerate = generator.requirement[0] !== 'never'
      if (ChallengeService.activeChallenge !== undefined) shouldGenerate = shouldGenerate && generator.unlocked
      if (shouldGenerate) {
        // @ts-ignore
        let add: Num = generator.amount.mul(generator.multiplier, false).mul(new Num(1, 0), false);
        add.mul(extra);

        if (generator.type === 'yellow-fusion') {
          const hasLimit = UpgradeService.getValue('remove-fusion-limit', 'bought').greq(new Num(1, 0))
          if (HoldingsService.get('yellowFusion').greq(HoldingsService.get('yellowFusionMax')) && !hasLimit) {
            add = new Num(0, 0);
          }
        }
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
      if (generator.type === type || generator.type === 'all') {
        // @ts-ignore
        generator[value] = set;
      }
    })
  }

  static correctMultipliers() {
    this.generators.forEach((generator) => {
      if (generator.unlocked) {
        let base = generator.baseMultiplier.copy();

        if (generator.type === 'red-particles' && HoldingsService.get('blueNeutrons').greq(new Num(1, 0))) {
          base.mul(HoldingsService.get('blueNeutrons').pow(new Num(1.5, 0).mul(UpgradeService.getValue('blue-neutron-amplifier', 'buffer'), false), false))
        }

        // @ts-ignore
        generator.multiplier = base.pow(generator.bought, false)

        if (generator.type === 'red-particles') {

          generator.multiplier.mul(GlobalMultipliersService.get('redParticleGenerators'))
          const redAccelerators = HoldingsService.get('redAccelerators')

          if (UpgradeService.getValue('red-accelerator-buffer', 'bought').greq(new Num(1, 0))) {
            generator.multiplier.mul(redAccelerators.pow(new Num(1.5, 0), false))
          } else {
            generator.multiplier.mul(redAccelerators.div(new Num(1, 3), false).add(new Num(1, 0), false));
          }

          const yellowPower = HoldingsService.get('yellowPower')

          if (yellowPower.greq(new Num(1, 0))) {
            generator.multiplier.mul(yellowPower.pow(GlobalMultipliersService.get('yellowPowerPower'), false).add(new Num(1, 0), false));
          }

          if (!generator.multiplier.greq(new Num(1, 0))) {
            generator.multiplier = new Num(1, 0)
          }
        }

        if (generator.type === 'yellow-particles') {
          generator.multiplier.mul(HoldingsService.get('yellowFusion').pow(HoldingsService.get('yellowFusionPower'), false))
          generator.multiplier.mul(GlobalMultipliersService.get('yellowParticleGenerators'))
        }

        if (generator.type == 'red-accelerators') {
          generator.multiplier.mul(GlobalMultipliersService.get('redAcceleratorGenerators'))
        }

        if (generator.name == 'yellow-fusion-generator') {
          generator.multiplier.mul(GlobalMultipliersService.get('yellowFusion'));
          let yellowFusion = HoldingsService.get('yellowFusion');
          generator.multiplier.mul(yellowFusion.add(new Num(1, 0), false).div(new Num(2, 3), false));
          const hasLimit = UpgradeService.getValue('remove-fusion-limit', 'bought').greq(new Num(1, 0))
          if (hasLimit) {
            const yellowFusion = HoldingsService.get('yellowFusion')
            const yellowFusionMax = HoldingsService.get('yellowFusionMax')
            const division = new Num(yellowFusion.exp / yellowFusionMax.exp, 0)
            if (yellowFusion.greq(new Num(1, 50000))) {
              division.sub(new Num(50000 / yellowFusionMax.exp, 0))
              const mulVar = new Num(yellowFusion.exp / 50000, 0)
              // @ts-ignore
              generator.multiplier.div(division.pow(division.mul(mulVar, false), false))
            }
            if (division.greq(new Num(1, 0))) {
              // @ts-ignore
              generator.multiplier.div(new Num(1.5, 0).pow(division.sub(new Num(1, 0), false), false))
            }
          } else if (yellowFusion.greq(HoldingsService.get('yellowFusionMax'))) {
            HoldingsService.set('yellowFusion', HoldingsService.get('yellowFusionMax').copy())
          }
        }

        if (generator.type === 'green-particles') {
          generator.multiplier.mul(GlobalMultipliersService.get('greenParticleGenerators'))
          generator.multiplier.mul(HoldingsService.get('blueLight').pow(GlobalMultipliersService.get('blueLightPower'), false).add(new Num(1, 0), false))
        }

        if (generator.type === 'nuclear-decay') {
          generator.multiplier.mul(GlobalMultipliersService.get('nuclearDecayGenerators'))
        }

        if (generator.type === 'blue-neutrons') {
          generator.multiplier.mul(GlobalMultipliersService.get('blueNeutronGenerators'))
        }

        if (generator.type === 'blue-light') {
          generator.multiplier.mul(HoldingsService.get('blueHydrogen').pow(new Num(2, 0), false))
          generator.multiplier.mul(GlobalMultipliersService.get('blueLightGenerators'))
          // @ts-ignore
          generator.multiplier.mul(new Num(HoldingsService.get('yellowFusion').exp+1, 0).pow(GlobalMultipliersService.get('yellowFusionBlueLightEffect'), false))
        }

        if (ChallengeService.activeChallenge?.name === 'dark-age' && generator.name !== 'yellow-fusion-generator') {
          generator.multiplier.pow(new Num(0.46, 0))
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
