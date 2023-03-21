import { Injectable } from '@angular/core';
import {Combiner} from "../../globals";
import {GlobalMultipliersService} from "../globals/global-multipliers.service";
import {combinerTarget} from "./combiners/target";
import {HoldingsService} from "../holdings.service";
import {combinerSubject} from "./combiners/subject";
import {Num} from "../../num";

@Injectable({
  providedIn: 'root'
})
export class CombinerService {
  static combiners: Combiner[] = combinerTarget.concat(combinerSubject)
  static combinations: any[] = [
    ['empty', 'empty', 1],
    ['empty', 'empty', 2],
    ['empty', 'empty', 3],
    ['empty', 'empty', 4],
    ['empty', 'empty', 5],
    ['empty', 'empty', 6],
  ];
  static currentCombinationSession: number | undefined;

  static getCombiner(name: string) {
    for (let i = 0; i < this.combiners.length; i++) {
      if (this.combiners[i]['name'] === name) {
        return this.combiners[i];
      }
    }
    return 0;
  }

  static getCombiners(type: string) {
    let ret_value: Combiner[] = []
    this.combiners.forEach(combiner => {
      if (combiner.type === type) {
        ret_value.push(combiner)
      }
    })
    return ret_value;
  }

  static save() {
    const save_1: any[] = []
    this.combinations.forEach(combination => {
      const push: any[] = []
      if (combination[0] === 'empty') {
        push.push('empty')
      } else {
        push.push(combination[0].name)
      }
      if (combination[1] === 'empty') {
        push.push('empty')
      } else {
        push.push(combination[1].name)
      }
      save_1.push(push)
    })
    localStorage['combinations'] = JSON.stringify(save_1)
    const save_2 = {}
    this.combiners.forEach(combiner => {
      // @ts-ignore
      save_2[combiner.name] = {bought: combiner['bought'], active: combiner['active']}
    })
    localStorage['combiners'] = JSON.stringify(save_2)
  }

  static load() {
    const combinations = JSON.parse(localStorage['combinations'])
    let index = 1;
    combinations.forEach((combination: any[]) => {
      if (combination[0] === 'empty') {
        this.combinations[index-1][0] = 'empty'
      } else {
        this.combinations[index-1][0] = this.getCombiner(combination[0])
      }
      if (combination[1] === 'empty') {
        this.combinations[index-1][1] = 'empty'
      } else {
        this.combinations[index-1][1] = this.getCombiner(combination[1])
      }
      this.combinations[index-1][2] = index
      index += 1;
    })
    const combiners = JSON.parse(localStorage['combiners'])
    this.combiners.forEach((combiner) => {
      if (combiners[combiner.name] !== undefined && combiners[combiner.name]['bought'] !== undefined && combiners[combiner.name]['active'] !== undefined) {
        combiner['bought'] = new Num(combiners[combiner.name]['bought']['num'], combiners[combiner.name]['bought']['exp'])
        combiner['active'] = combiners[combiner.name]['active']
      }
    })
  }

  static getValue(name: string, type: string) {
    for (let i = 0; i < this.combiners.length; i++) {
      const combiner = this.combiners[i]
      if (combiner.name === name) {
        // @ts-ignore
        return combiner[type]
      }
    }
    return 0
  }

  static assignSubjectSession(combination: any) {
    this.currentCombinationSession = combination
    const subjects = this.getCombiners('blue-subject')
    subjects.forEach((subject) => {
      if (subject.bought.greq(new Num(1, 0))) {
        const doc = <HTMLElement> document.getElementById('assign-button-'+subject.name)
        doc.style.display = 'unset';
      }
    })
  }

  static assignTargetSession(combination: any) {
    this.currentCombinationSession = combination
    const targets = this.getCombiners('blue-target')
    targets.forEach((target) => {
      if (target.bought.greq(new Num(1, 0))) {
        const doc = <HTMLElement>document.getElementById('assign-button-' + target.name)
        doc.style.display = 'unset';
      }
    })
  }

  static assignCombiner(combiner: Combiner | undefined) {
    if (combiner === undefined || this.currentCombinationSession === undefined) return;
    if (combiner.type === 'blue-subject') {
      this.combinations[this.currentCombinationSession-1][0] = combiner;
      const subjects = this.getCombiners('blue-subject')
      combiner.active = true;
      subjects.forEach((subject) => {
        const doc = <HTMLElement> document.getElementById('assign-button-'+subject.name)
        console.log(doc)
        doc.style.display = 'none';
      })
      this.save()
    } else if (combiner.type === 'blue-target') {
      this.combinations[this.currentCombinationSession-1][1] = combiner;
      const subjects = this.getCombiners('blue-target')
      combiner.active = true;
      subjects.forEach((subject) => {
        const doc = <HTMLElement> document.getElementById('assign-button-'+subject.name)
        console.log(doc)
        doc.style.display = 'none';
      })
      this.save()
    }
  }

  static execute() {
    this.combinations.forEach(combination => {
      if (combination[0] !== 'empty' && combination[1] !== 'empty') {
        const subject = HoldingsService.get(combination[0]['element'])
        const target = combination[1]['element']
        let effect: Num = subject.pow(combination[0]['buffer'], false).pow(combination[1]['buffer'], false)
        if (effect.greq(combination[1]['maxBuffer'])) effect = combination[1]['maxBuffer'].copy();
        GlobalMultipliersService.correct(target, effect);
        const effectDoc = <HTMLElement> document.getElementById('effect-display-'+combination[2]);
        if (effectDoc !== null) {effectDoc.innerHTML = 'Effect: ' + effect.toString(true);}
      }
    })
  }

  static clearCombinations() {
    this.combinations = [
      ['empty', 'empty', 1],
      ['empty', 'empty', 2],
      ['empty', 'empty', 3],
      ['empty', 'empty', 4],
      ['empty', 'empty', 5],
      ['empty', 'empty', 6],
    ];
    this.combiners.forEach(combiner => {
      combiner.active = false;
    })
  }
}
