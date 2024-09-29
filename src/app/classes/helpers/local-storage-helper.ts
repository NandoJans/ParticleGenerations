export class LocalStorageHelper {
  category: string;
  key: string;

  constructor(category: string, key: string) {
    this.category = category;
    this.key = key;
  }

  exists(key: string): boolean {
    return localStorage.getItem(`${this.category}-${this.key}-${key}`) !== null;
  }

  save(key: string, value: any): void {
    localStorage.setItem(`${this.category}-${this.key}-${key}`, JSON.stringify(value))
  }

  saveMultiple(values: {[key: string]: any}): void {
    for (let key in values) {
      this.save(key, values[key]);
    }
  }

  load(key: string, ifNotSet: any): any {
    return JSON.parse(localStorage.getItem(`${this.category}-${this.key}-${key}`) || 'null') || ifNotSet;
  }
}
