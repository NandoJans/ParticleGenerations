import {Num} from "../../num";

export class LocalStorageHelper {
  category: string;
  key: string;

  static DEFAULT_STORAGE_KEY = 'particleGenerations';
  static SIM_STORAGE_KEY = 'particleGenerations-sim';
  static STORAGE_KEY = LocalStorageHelper.DEFAULT_STORAGE_KEY;
  static STORAGE: any = null;

  constructor(category: string, key: string) {
    this.category = category;
    this.key = key;
    if (!LocalStorageHelper.STORAGE) {
      LocalStorageHelper.reloadStorage();
    }
    if (LocalStorageHelper.STORAGE[this.category] === undefined) {
      LocalStorageHelper.STORAGE[this.category] = {};
    }
  }

  static reloadStorage(): void {
    if (localStorage[LocalStorageHelper.STORAGE_KEY] !== undefined) {
      LocalStorageHelper.STORAGE = JSON.parse(localStorage[LocalStorageHelper.STORAGE_KEY]);
    } else {
      LocalStorageHelper.STORAGE = {};
    }
  }

  static setSimulationMode(enabled: boolean): void {
    // Switch storage key and reload STORAGE snapshot
    LocalStorageHelper.STORAGE_KEY = enabled ? LocalStorageHelper.SIM_STORAGE_KEY : LocalStorageHelper.DEFAULT_STORAGE_KEY;
    LocalStorageHelper.reloadStorage();
  }

  static getRawStorage(): any {
    return JSON.parse(JSON.stringify(LocalStorageHelper.STORAGE));
  }

  static setRawStorage(data: any): void {
    LocalStorageHelper.STORAGE = data || {};
  }

  // --- Simulation Snapshots management using a separate browser key ---
  static SIM_SNAPSHOTS_KEY = 'particleGenerations-sim-snapshots';

  static loadSnapshots(): any[] {
    try {
      const raw = localStorage[LocalStorageHelper.SIM_SNAPSHOTS_KEY];
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  static saveSnapshots(snapshots: any[]): void {
    localStorage[LocalStorageHelper.SIM_SNAPSHOTS_KEY] = JSON.stringify(snapshots || []);
  }

  static addSnapshot(snapshot: any): void {
    // Push new snapshot and try to persist. If quota exceeded, prune oldest until it fits.
    const list = LocalStorageHelper.loadSnapshots();
    list.push(snapshot);

    // Hard cap to avoid unbounded growth (keeps most recent 50 by default)
    const MAX_SNAPSHOTS = 50;
    while (list.length > MAX_SNAPSHOTS) {
      list.shift();
    }

    try {
      LocalStorageHelper.saveSnapshots(list);
    } catch (e) {
      // Best-effort recovery from QuotaExceededError: drop oldest until it saves
      let pruned = false;
      while (list.length > 0) {
        list.shift();
        try {
          LocalStorageHelper.saveSnapshots(list);
          pruned = true;
          break;
        } catch {}
      }
      if (!pruned) {
        // As a last resort, try saving only snapshot metadata without deep storage payload
        try {
          const metaOnly = { ...snapshot };
          delete (metaOnly as any).storage;
          LocalStorageHelper.saveSnapshots([metaOnly]);
        } catch {}
      }
    }
  }

  static getSnapshot(id: string): any | null {
    const list = LocalStorageHelper.loadSnapshots();
    return list.find((s: any) => s && s.id === id) || null;
  }

  static deleteSnapshot(id: string): void {
    const list = LocalStorageHelper.loadSnapshots();
    const next = list.filter((s: any) => !(s && s.id === id));
    LocalStorageHelper.saveSnapshots(next);
  }

  store(): void {
    localStorage[LocalStorageHelper.STORAGE_KEY] = JSON.stringify(LocalStorageHelper.STORAGE);
  }

  exists(key: string = ''): boolean {
    // Ensure category bucket exists
    if (LocalStorageHelper.STORAGE[this.category] === undefined) {
      LocalStorageHelper.STORAGE[this.category] = {};
    }

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
    // Ensure category bucket exists
    if (LocalStorageHelper.STORAGE[this.category] === undefined) {
      LocalStorageHelper.STORAGE[this.category] = {};
    }

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
    // Ensure category bucket exists
    if (LocalStorageHelper.STORAGE[this.category] === undefined) {
      LocalStorageHelper.STORAGE[this.category] = {};
    }

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
    // Ensure category bucket exists
    if (LocalStorageHelper.STORAGE[this.category] === undefined) {
      LocalStorageHelper.STORAGE[this.category] = {};
    }
    // Ensure we always have an object bucket for this.key
    if (
      LocalStorageHelper.STORAGE[this.category][this.key] === undefined ||
      typeof LocalStorageHelper.STORAGE[this.category][this.key] !== 'object'
    ) {
      LocalStorageHelper.STORAGE[this.category][this.key] = {};
    }

    // Store under the (possibly empty) key
    LocalStorageHelper.STORAGE[this.category][this.key][key] = num.saveData();
  }

  loadNum(ifNotSet: Num, key: string = 'x'): Num {
    // Ensure category bucket exists
    if (LocalStorageHelper.STORAGE[this.category] === undefined) {
      LocalStorageHelper.STORAGE[this.category] = {};
    }
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
      bucket[key] = ifNotSet.saveData();
      return ifNotSet;
    }

    // Otherwise deserialize
    return Num.fromStorage(stored) as Num;
  }
}
