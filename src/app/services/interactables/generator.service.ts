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

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  static generators: Generator[] = redParticleGenerators.concat(
    redAcceleratorGenerators,
    yellowParticleGenerators,
    greenParticleGenerators
  )

  static sortedGenerators: Generator[] =
    Sorter.sort(redParticleGenerators.concat(
      redAcceleratorGenerators,
      yellowParticleGenerators,
      greenParticleGenerators
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

          if (UpgradeService.getValue('red-accelerator-buffer', 'bought').greq(new Num(1, 0))) {
            generator.multiplier.mul(redAccelerators.pow(new Num(1.5, 0), false))
          } else if (redAccelerators.div(new Num(1, 3), false).greq(new Num(1, 0))) {
            generator.multiplier.mul(redAccelerators.div(new Num(1, 3), false));
          }

          const yellowPower = HoldingsService.get('yellowPower')

          if (yellowPower.greq(new Num(1, 0))) {
            generator.multiplier.mul(yellowPower.pow(new Num(5, 0), false).add(new Num(1, 0), false));
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
            const division = new Num(HoldingsService.get('yellowFusion').exp / HoldingsService.get('yellowFusionMax').exp, 0)
            if (division.greq(new Num(1, 0))) {
              generator.multiplier.div(division)
            }
          } else if (yellowFusion.greq(HoldingsService.get('yellowFusionMax'))) {

          }
        }

        if (generator.type === 'green-particles') {
          generator.multiplier.mul(GlobalMultipliersService.get('greenParticleGenerators'))
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
