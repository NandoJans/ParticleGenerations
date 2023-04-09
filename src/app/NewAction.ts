import {Num} from "./num";
import {UpgradeService} from "./services/interactables/upgrade.service";
import {GeneratorService} from "./services/interactables/generator.service";
import {GlobalMultipliersService} from "./services/globals/global-multipliers.service";
import {HoldingsService} from "./services/holdings.service";

export class NewAction {
  ACTION: number = 0;
  TARGET_TYPE: number = 1;
  TARGET: number = 2;
  TARGET_VALUE: number = 3;
  OPERATION: number = 4;
  SUBJECT_TYPE: number = 5;
  SUBJECT: number = 6;
  SUBJECT_VALUE: number = 7;
  ADDITION: number = 8;
  ADDITION_TYPE: number = 9;
  ADDITION_NAME: number = 10;
  ADDITION_VALUE: number = 11;
  CONDITION: number = 12;

  query: any[] = [];
  buffer: any;
  service: any;
  parent: any;

  constructor(query: string, buffer: any) {
    this.query = query.split(' ');
    if (this.query[this.TARGET_TYPE] === 'multiplier' || this.query[this.TARGET_TYPE] === 'holding') {
      this.query.splice(this.TARGET_VALUE, 0, ' ')
    }
    if (this.query[this.SUBJECT_TYPE] === 'holding' || this.query[this.SUBJECT_TYPE] === 'multiplier') {
      this.query.splice(this.SUBJECT_VALUE, 0, ' ')
    }
    if (this.query[this.ADDITION_TYPE] === 'holding' || this.query[this.ADDITION_TYPE] === 'multiplier') {
      this.query.splice(this.ADDITION_VALUE, 0, ' ')
    }
    if (this.query[this.SUBJECT_VALUE] === 'buff') {
      this.query[this.SUBJECT_VALUE] = ' ';
    }
    this.buffer = buffer;
  }

  setMethod(target: string, buffer: any, variable: string) {
    switch(this.query[this.TARGET_TYPE]) {
      case 'upgrade': UpgradeService.setValue(target, variable, buffer); break;
      case 'generator': GeneratorService.setValue(target, variable, buffer); break;
      case 'upgrades': UpgradeService.setValues(target, variable, buffer); break;
      case 'generators': GeneratorService.setValues(target, variable, buffer); break;
      case 'multiplier': GlobalMultipliersService.correct(target, buffer); break;
      case 'holding': HoldingsService.set(target, buffer); break;
    }
  }

  getMethod(name: string, service: any, subject: string, value: string = '') {
    switch (name) {
      case 'upgrade': return service.getValue(subject, value);
      case 'generator': return service.getValue(subject, value);
      case 'holding': return service.get(subject);
      case 'multiplier': return service.get(subject);
      default: return 'error';
    }
  }

  getService(name: string) {
    switch (name) {
      case 'upgrade': return UpgradeService;
      case 'upgrades': return UpgradeService;
      case 'generator': return GeneratorService;
      case 'generators': return GeneratorService;
      case 'holding': return HoldingsService;
      case 'multiplier': return GlobalMultipliersService;
      default: return 'error';
    }
  }

  action() {
    const query = this.query;
    let buffer: any = '';
    let service: any = this.getService(query[this.SUBJECT_TYPE]);
    switch (query[this.OPERATION]) {
      case 'to': buffer = this.buffer; break;
      case 'by': buffer = this.buffer; break;
      case 'basedon':
        if (query[this.SUBJECT_VALUE] === ' ') buffer = this.getMethod(query[this.SUBJECT_TYPE], service, query[this.SUBJECT], 'buffer').copy();
        if (query[this.ADDITION] !== undefined && query[this.SUBJECT_VALUE] === ' ' && buffer instanceof Num) { // @ts-ignore
          buffer[query[this.ADDITION]](this.getMethod(query[this.SUBJECT_TYPE], service, query[this.SUBJECT], 'amount'));
        }
        let tempBuff = new Num(1, 0);
        if (query[this.ADDITION_TYPE] === undefined) {
          tempBuff = this.buffer
        } else {
          if ((query[this.ADDITION_VALUE] !== ' ' && query[this.ADDITION_VALUE] !== undefined) || (query[this.ADDITION_TYPE] === 'holding' || query[this.ADDITION_TYPE] === 'multiplier')) tempBuff = this.getMethod(query[this.ADDITION_TYPE], service, query[this.ADDITION_NAME], query[this.ADDITION_VALUE]).copy();
        }
        if ((query[this.SUBJECT_VALUE] !== ' ' && query[this.SUBJECT_VALUE] !== undefined) || (query[this.SUBJECT_TYPE] === 'holding' || query[this.SUBJECT_TYPE] === 'multiplier')) buffer = this.getMethod(query[this.SUBJECT_TYPE], service, query[this.SUBJECT], query[this.SUBJECT_VALUE]).copy();
        if (((query[this.SUBJECT_VALUE] !== ' ' && query[this.SUBJECT_VALUE] !== undefined) ||(query[this.SUBJECT_TYPE] === 'holding' || query[this.SUBJECT_TYPE] === 'multiplier')) && query[this.ADDITION] !== undefined && tempBuff instanceof Num) buffer[query[this.ADDITION]](tempBuff)
        if (this.buffer instanceof Num && query[this.ADDITION] === undefined) buffer.mul(this.buffer);
        break;
    }
    if (query[this.ADDITION] === 'mul') buffer.add(new Num(1, 0))
    //console.log('Buff from '+this.parent.displayName+': '+ buffer.toString())
    if (query[this.TARGET_TYPE] === 'multiplier') this.setMethod(query[this.TARGET], buffer, query[this.TARGET_VALUE]);
    else {
      let x = this.getMethod(query[this.TARGET_TYPE], this.service, query[this.TARGET], query[this.TARGET_VALUE])
      if (x instanceof Num) {
        x = x.copy();
        this.setMethod(query[this.TARGET], buffer.mul(x, false), query[this.TARGET_VALUE])
      }
    }
    if (buffer instanceof Num && this.parent !== undefined && query[this.OPERATION] === 'basedon') {
      this.parent.effect = buffer.copy();
    }
  }

  setAction() {
    const query = this.query;
    let x: Num = new Num(1, 0);
    let buffer: Num = new Num(1, 0);
    if ((query[this.ACTION] === 'increase' || query[this.ACTION] === 'decrease') && query[this.OPERATION] !== 'holding') {
      x = this.getMethod(query[this.TARGET_TYPE], this.service, query[this.TARGET], query[this.TARGET_VALUE]).copy();
    }

    if (query[this.OPERATION] === 'basedon') {
      buffer = this.getMethod(query[this.SUBJECT_TYPE], this.getService(query[this.SUBJECT_TYPE]), query[this.SUBJECT], query[this.SUBJECT_VALUE]).copy();
      let tempBuff = new Num(1, 0);
      if (query[this.ADDITION_TYPE] === undefined) {
        tempBuff = this.buffer
      } else {
        if ((query[this.ADDITION_VALUE] !== ' ' && query[this.ADDITION_VALUE] !== undefined) || (query[this.ADDITION_TYPE] === 'holding' || query[this.ADDITION_TYPE] === 'multiplier')) tempBuff = this.getMethod(query[this.ADDITION_TYPE], this.getService(query[this.ADDITION_TYPE]), query[this.ADDITION_NAME], query[this.ADDITION_VALUE]).copy();
      }
      if (query[this.ADDITION] === 'incremental') {
        buffer = this.buffer.pow(buffer, false).sub(new Num(1, 0), false);
        if (this.parent.baseCost instanceof Num) buffer.mul(this.parent.baseCost);
      } else {
        if (((query[this.SUBJECT_VALUE] !== ' ' && query[this.SUBJECT_VALUE] !== undefined) ||(query[this.SUBJECT_TYPE] === 'holding' || query[this.SUBJECT_TYPE] === 'multiplier')) && query[this.ADDITION] !== undefined && tempBuff instanceof Num) { // @ts-ignore
          buffer[query[this.ADDITION]](tempBuff)
        }

      }
    } else {
      buffer = this.buffer;
    }

    switch (query[this.ACTION]) {
      case 'increase':
        if (query[this.TARGET_TYPE] === 'holding') { // @ts-ignore
          HoldingsService.add(query[this.TARGET], buffer)
        }
        else this.setMethod(query[this.TARGET], buffer.add(x, false), query[this.TARGET_VALUE]);
        break;
      case 'decrease':
        if (query[this.TARGET_TYPE] === 'holding') { // @ts-ignore
          HoldingsService.remove(query[this.TARGET], buffer)
        }
        else this.setMethod(query[this.TARGET], buffer.sub(x, false), query[this.TARGET_VALUE]);
        break;
    }
  }

  execute = (parent?: any) => {
    //console.log(parent.displayName)
    if (this.query[this.SUBJECT] === 'this') {
      this.query[this.SUBJECT] = parent.name;
      this.query.splice(this.SUBJECT_VALUE, 0, ' ')
    }
    this.parent = parent;
    this.service = this.getService(this.query[this.TARGET_TYPE]);

    switch (this.query[this.ACTION]) {
      case 'set': this.setMethod(this.query[this.TARGET], this.buffer, this.query[this.TARGET_VALUE]); break;
      case 'increase': this.setAction(); break;
      case 'decrease': this.setAction(); break;
      case 'multiply': this.action(); break;
      case 'none': break;
    }
  }
}
