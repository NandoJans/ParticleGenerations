import {LocalStorageHelper} from "../classes/helpers/local-storage-helper";

export class MigrateNumAndExpValues {
  up(): void {
    const data = LocalStorageHelper.STORAGE

    // Recursive walker
    function traverse(obj: any): void {
      if (Array.isArray(obj)) {
        obj.forEach(traverse);
      } else if (obj && typeof obj === 'object') {
        // If this object is a legacy Num
        if ('num' in obj && 'exp' in obj) {
          obj.mantissa = obj.num;
          obj.exponent = obj.exp;
          delete obj.num;
          delete obj.exp;
        }
        // Then recurse into all its properties
        for (const key of Object.keys(obj)) {
          traverse(obj[key]);
        }
      }
    }

    traverse(data);
    LocalStorageHelper.STORAGE = data;
  }
}
