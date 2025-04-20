import {Num} from "../../num";

export class LocalStorageHelper {
  category: string;
  key: string;
  storage: { [key: string]: any };

  constructor(category: string, key: string) {
    this.category = category;
    this.key = key;
    if (localStorage[this.category] === undefined) {
      localStorage[this.category] = JSON.stringify({ [this.key]: {} });
    }
    this.storage = JSON.parse(localStorage[this.category]);
  }

  protected store(): void {
    localStorage[this.category] = JSON.stringify(this.storage);
  }

  exists(key: string = ''): boolean {
    if (key) {
      return this.storage[this.key][key] !== null;
    } else {
      return this.storage[this.key] !== null;
    }
  }

  save(value: any, key: string = ''): void {
    if (key) {
      this.storage[this.key][key] = value
    } else {
      this.storage[this.key] = value
    }
    this.store()
  }

  saveMultiple(values: {[key: string]: any}): void {
    for (let key in values) {
      this.save(key, values[key]);
    }
  }

  load(ifNotSet: any, key: string = ''): any {
    if (key) {
      return this.storage[this.key][key] || ifNotSet
    } else {
      return this.storage[this.key] || ifNotSet
    }
  }

  saveNum(num: Num, key: string = ''): void {
    if (key) {
      this.storage[this.key][key] = num
    } else {
      this.storage[this.key] = num
    }
    this.store()
  }

  loadNum(ifNotSet: Num, key: string = ''): Num {
    if (this.storage[this.key] === undefined) {
      this.storage[this.key] = ifNotSet
    }
    if (key) {
      return Num.fromStorage(this.storage[this.key][key]) || ifNotSet
    } else {
      return Num.fromStorage(this.storage[this.key]) || ifNotSet
    }
  }
}
