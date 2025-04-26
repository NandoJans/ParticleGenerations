import {ResetKey} from "../enums/reset-key";
import {Resetable} from "../features/interfaces/resetable";

export class ResetHelper {

  static resetList: {[key: string]: {[key: string]: Resetable}} = {

  }

  static softResetList: {[key: string]: {[key: string]: Resetable}} = {

  }

  static resetOrder: ResetKey[] = [
    ResetKey.RED_EXTENSION,
    ResetKey.RED_BOOSTER_ACCELERATION,
    ResetKey.RED,
  ];

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
    for (let resetOrderKey of this.resetOrder) {
      console.log('resetting', resetOrderKey);
      Object.values(this.resetList[resetOrderKey]).forEach(resetable => {
        resetable.reset();
      });
      if (resetOrderKey === resetKey) {
        break;
      }
    }
  }

  static softReset(resetKey: ResetKey): void {
    for (let resetOrderKey of this.resetOrder) {
      Object.values(this.softResetList[resetOrderKey]).forEach(resetable => {
        resetable.softReset();
      });
      if (resetOrderKey === resetKey) {
        break;
      }
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
