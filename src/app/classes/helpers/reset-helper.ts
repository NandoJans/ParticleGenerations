import {ResetKey} from "../enums/reset-key";
import {Resetable} from "../features/interfaces/resetable";

export class ResetHelper {

  static resetList: {[key: string]: Resetable[]} = {

  }

  static softResetList: {[key: string]: Resetable[]} = {

  }

  static registerReset(resetKey: ResetKey, resetable: Resetable): ResetKey {
    if (!this.resetList[resetKey]) {
      this.resetList[resetKey] = [];
    }
    this.resetList[resetKey].push(resetable);
    return resetKey;
  }

  static registerSoftReset(resetKey: ResetKey, resetable: Resetable): ResetKey {
    if (!this.softResetList[resetKey]) {
      this.softResetList[resetKey] = [];
    }
    this.softResetList[resetKey].push(resetable);
    return resetKey;
  }

  static reset(resetKey: ResetKey): void {
    if (this.resetList[resetKey]) {
      this.resetList[resetKey].forEach(resetable => {
        resetable.reset();
      });
    }
  }

  static softReset(resetKey: ResetKey): void {
    if (this.softResetList[resetKey]) {
      this.softResetList[resetKey].forEach(resetable => {
        resetable.softReset();
      });
    }
  }
}
