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

  saveNum(num: Num, key: string = 'x'): void {
    const k = this.key;

    // Ensure we always have an object bucket for this.key
    if (
      this.storage[k] === undefined ||
      typeof this.storage[k] !== 'object'
    ) {
      this.storage[k] = {};
    }

    // Store under the (possibly empty) key
    this.storage[k][key] = num;        // or num.toJSON() if you need raw data
    this.store();
  }

  loadNum(ifNotSet: Num, key: string = 'x'): Num {
    const k = this.key;

    // Ensure the bucket exists
    if (
      this.storage[k] === undefined ||
      typeof this.storage[k] !== 'object'
    ) {
      this.storage[k] = {};
    }

    const bucket = this.storage[k] as Record<string, any>;
    const stored = bucket[key];

    if (stored == null) {
      // Not set yet, write the default into storage so future loads see it
      bucket[key] = ifNotSet;         // or defaultNum.toJSON()
      this.store();
      return ifNotSet;
    }

    // Otherwise deserialize
    return Num.fromStorage(stored) as Num;
  }
}
