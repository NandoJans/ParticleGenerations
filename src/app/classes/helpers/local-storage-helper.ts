import {Num} from "../../num";

export class LocalStorageHelper {
  category: string;
  key: string;

  static STORAGE_KEY = 'particleGenerations';
  static STORAGE: any = null;

  constructor(category: string, key: string) {
    this.category = category;
    this.key = key;
    if (!LocalStorageHelper.STORAGE) {
      if (localStorage[LocalStorageHelper.STORAGE_KEY] !== undefined) {
        LocalStorageHelper.STORAGE = JSON.parse(localStorage[LocalStorageHelper.STORAGE_KEY]);
      } else {
        LocalStorageHelper.STORAGE = {};
      }
    }
    if (LocalStorageHelper.STORAGE[this.category] === undefined) {
      LocalStorageHelper.STORAGE[this.category] = {};
    }
  }

  store(): void {
    localStorage[LocalStorageHelper.STORAGE_KEY] = JSON.stringify(LocalStorageHelper.STORAGE);
  }

  exists(key: string = ''): boolean {
    if (key) {
      if (LocalStorageHelper.STORAGE[this.category][this.key] === undefined) {
        LocalStorageHelper.STORAGE[this.category][this.key] = {};
      }
      return LocalStorageHelper.STORAGE[this.category][this.key][key] !== null;
    } else {
      return LocalStorageHelper.STORAGE[this.category][this.key] !== null;
    }
  }

  save(value: any, key: string = ''): void {
    if (key) {
      if (
        typeof LocalStorageHelper.STORAGE[this.category][this.key] !== 'object' ||
        LocalStorageHelper.STORAGE[this.category][this.key] === null ||
        Array.isArray(LocalStorageHelper.STORAGE[this.category][this.key])
      ) {
        LocalStorageHelper.STORAGE[this.category][this.key] = {};
      }
      LocalStorageHelper.STORAGE[this.category][this.key][key] = value
    } else {
      LocalStorageHelper.STORAGE[this.category][this.key] = value
    }
  }

  saveMultiple(values: {[key: string]: any}): void {
    for (let key in values) {
      this.save(key, values[key]);
    }
  }

  load(ifNotSet: any, key: string = ''): any {
    if (key) {
      if (LocalStorageHelper.STORAGE[this.category][this.key] === undefined) {
        LocalStorageHelper.STORAGE[this.category][this.key] = {};
      }
      return LocalStorageHelper.STORAGE[this.category][this.key][key] ?? ifNotSet
    } else {
      return LocalStorageHelper.STORAGE[this.category][this.key] ?? ifNotSet
    }
  }

  saveNum(num: Num, key: string = 'x'): void {
    // Ensure we always have an object bucket for this.key
    if (
      LocalStorageHelper.STORAGE[this.category][this.key] === undefined ||
      typeof LocalStorageHelper.STORAGE[this.category][this.key] !== 'object'
    ) {
      LocalStorageHelper.STORAGE[this.category][this.key] = {};
    }

    // Store under the (possibly empty) key
    LocalStorageHelper.STORAGE[this.category][this.key][key] = num;        // or num.toJSON() if you need raw data
  }

  loadNum(ifNotSet: Num, key: string = 'x'): Num {
    // Ensure the bucket exists
    if (
      LocalStorageHelper.STORAGE[this.category][this.key] === undefined ||
      typeof LocalStorageHelper.STORAGE[this.category][this.key] !== 'object'
    ) {
      LocalStorageHelper.STORAGE[this.category][this.key] = {};
    }

    const bucket = LocalStorageHelper.STORAGE[this.category][this.key] as Record<string, any>;
    const stored = bucket[key];

    if (stored == null) {
      // Not set yet, write the default into storage so future loads see it
      bucket[key] = ifNotSet;         // or defaultNum.toJSON()
      return ifNotSet;
    }

    // Otherwise deserialize
    return Num.fromStorage(stored) as Num;
  }
}
