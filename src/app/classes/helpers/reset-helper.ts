import {ResetKey} from "../enums/reset-key";
import {Resetable} from "../features/interfaces/resetable";

export class ResetHelper {

  static resetList: {[key: string]: {[key: string]: Resetable}} = {

  }

  static softResetList: {[key: string]: {[key: string]: Resetable}} = {

  }

  static registerReset(resetKey: ResetKey, resetable: Resetable): ResetKey {
    if (!this.resetList[resetKey]) {
      this.resetList[resetKey] = {};
    }
    this.resetList[resetKey][resetable.name] = resetable;
    return resetKey;
  }

  static registerSoftReset(resetKey: ResetKey, resetable: Resetable): ResetKey {
    if (!this.softResetList[resetKey]) {
      this.softResetList[resetKey] = {};
    }
    this.softResetList[resetKey][resetable.name] = resetable;
    return resetKey;
  }

  static reset(resetKey: ResetKey): void {
    if (this.resetList[resetKey]) {
      Object.values(this.resetList[resetKey]).forEach(resetable => {
        resetable.reset();
      });
    }
  }

  static softReset(resetKey: ResetKey): void {
    if (this.softResetList[resetKey]) {
      Object.values(this.softResetList[resetKey]).forEach(resetable => {
        resetable.softReset();
      });
    }
  }

  static setResetId(resetable: Resetable, resetKey: ResetKey) {

    delete this.resetList[resetable.resetId][resetable.name];

    resetable.resetId = ResetHelper.registerReset(resetKey, resetable);
  }

  static setSoftResetId(resetable: Resetable, resetKey: ResetKey) {

    delete this.softResetList[resetable.softResetId][resetable.name];

    resetable.softResetId = ResetHelper.registerSoftReset(resetKey, resetable);
  }
}
