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
import {prePurpleGenerators} from "./generators/purple/preGenerators";
import {purpleParticleGenerators} from "./generators/purple/particles";
import {App} from "../../App";

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  static generators: Generator[] = redParticleGenerators.concat(
    blueParticleGenerators,
    redAcceleratorGenerators,
    yellowParticleGenerators,
    greenParticleGenerators,
    blueLightGenerators,
    prePurpleGenerators,
    purpleParticleGenerators
  )

  static sortedGenerators: Generator[] =
    Sorter.sort(redParticleGenerators.concat(
      blueParticleGenerators,
      redAcceleratorGenerators,
      yellowParticleGenerators,
      greenParticleGenerators,
      blueLightGenerators,
      prePurpleGenerators,
      purpleParticleGenerators
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
        if (generator.name !== 'yellow-fusion-generator' || !App.isIdling) add.mul(extra);

        if (generator.type === 'yellow-fusion') {
          const hasLimit = UpgradeService.getValue('remove-fusion-limit', 'bought').greq(new Num(1, 0))
          if (HoldingsService.get('yellowFusion').greq(HoldingsService.get('yellowFusionMax')) && !hasLimit) {
            add = new Num(0, 0);
          }
        }
        if (generator.type === 'nuclear-decay' && App.haltNuclearDecay) return;
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

        base.mul(generator.baseMulMod)
        // @ts-ignore
        generator.multiplier = base.pow(generator.bought, false)

        if (generator.globalMultiplier) generator.multiplier.mul(GlobalMultipliersService.get(generator.globalMultiplier));

        if (generator.type === 'red-particles') {
          if (!generator.multiplier.greq(new Num(1, 0))) {
            generator.multiplier = new Num(1, 0)
          }
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
            const max = 50*(yellowFusionMax.exp-110)
            if (yellowFusion.greq(new Num(1, max))) {
              division.sub(new Num(max / yellowFusionMax.exp, 0))
              const mulVar = new Num(yellowFusion.exp / max, 0)
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

        if (generator.type === 'blue-light') {
          // @ts-ignore
          generator.multiplier.mul(new Num(HoldingsService.get('yellowFusion').exp+1, 0).pow(GlobalMultipliersService.get('yellowFusionBlueLightEffect'), false))
        }

        if (ChallengeService.activeChallenge?.name === 'dark-age' && generator.name !== 'yellow-fusion-generator') {
          if (UpgradeService.getValue('nerf-dark-age', 'bought').greq(new Num(1, 0))
            && !UpgradeService.getValue('more-dark-power', 'bought').greq(new Num(1, 0))) generator.multiplier.pow(new Num(0.35, 0));
          else if (UpgradeService.getValue('more-dark-power', 'bought').greq(new Num(1, 0))) generator.multiplier.pow(new Num(0.3, 0));
          else generator.multiplier.pow(new Num(0.25, 0));
        }
        if (ChallengeService.activeChallenge?.name === 'dark-age' && generator.name === 'yellow-fusion-generator') {
          generator.multiplier.pow(new Num(1, 0))
        }

        generator.baseMulMod = new Num(1, 0);
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
