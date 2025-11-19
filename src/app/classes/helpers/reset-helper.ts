import {ResetKey} from "../enums/reset-key";
import {Resetable} from "../features/interfaces/resetable";
import {Storable} from "../features/interfaces/storable";
import {MultiplierRecord} from "../records/multipliers/multiplier-record";
import {App} from "../../App";

export class ResetHelper {
  static resetListeners: { [key: string]: (resetKey: ResetKey) => void} = {};

  static resetList: {[key: string]: {[key: string]: Resetable}} = {

  }

  static softResetList: {[key: string]: {[key: string]: Resetable}} = {

  }

  static resetOrder: ResetKey[] = [
    ResetKey.NONE,
    ResetKey.RED_EXTENSION,
    ResetKey.RED_BOOSTER_ACCELERATION,
    ResetKey.RED,
    ResetKey.YELLOW,
    ResetKey.GREEN,
  ];

  static registerReset(resetKey: ResetKey, resetable: Resetable): ResetKey {
    if (!this.resetList[resetKey]) {
      this.resetList[resetKey] = {};
    }
    ResetHelper.removeIfResetSet(resetable);
    this.resetList[resetKey][resetable.name] = resetable;
    return resetKey;
  }

  static registerSoftReset(resetKey: ResetKey, resetable: Resetable): ResetKey {
    if (!this.softResetList[resetKey]) {
      this.softResetList[resetKey] = {};
    }
    ResetHelper.removeIfSoftResetSet(resetable);
    this.softResetList[resetKey][resetable.name] = resetable;
    return resetKey;
  }

  static removeIfResetSet(resetable: Resetable): void {
    if (
      resetable.resetId !== ResetKey.NONE &&
      this.resetList[resetable.resetId] &&
      this.resetList[resetable.resetId][resetable.name]
    ) {
      delete this.resetList[resetable.resetId][resetable.name];
    }
  }

  static removeIfSoftResetSet(resetable: Resetable): void {
    if (
      resetable.softResetId !== ResetKey.NONE &&
      this.softResetList[resetable.softResetId] &&
      this.softResetList[resetable.softResetId][resetable.name]
    ) {
      delete this.softResetList[resetable.softResetId][resetable.name];
    }
  }

  private static isStorable(object: any): object is Storable {
    return object && typeof object.getSaveKey === 'function' && typeof object.getSaveCategory === 'function';
  }

  static reset(resetKey: ResetKey): void {
    for (let resetOrderKey of this.resetOrder) {
      if (this.resetList[resetOrderKey] !== undefined) {
        Object.values(this.resetList[resetOrderKey]).forEach(resetable => {
          resetable.reset();

          if (this.isStorable(resetable)) {
            resetable.save();
          }
        });
      }
      if (resetOrderKey === resetKey) {
        break;
      }
    }
    this.runResetListeners(resetKey);
    this.softReset(resetKey);
  }

  static softReset(resetKey: ResetKey): void {
    for (let resetOrderKey of this.resetOrder) {
      if (this.softResetList[resetOrderKey] !== undefined) {
        Object.values(this.softResetList[resetOrderKey]).forEach(resetable => {
          resetable.softReset();

          if (this.isStorable(resetable)) {
            resetable.save();
          }
        });
      }
      if (resetOrderKey === resetKey) {
        break;
      }
    }
    MultiplierRecord.reset();
  }

  static registerResetListener(name: string, listener: (resetKey: ResetKey) => void): void {
    this.resetListeners[name] = listener;
  }

  static unregisterResetListener(name: string): void {
    delete this.resetListeners[name];
  }

  static listenerExists(name: string): boolean {
    return this.resetListeners[name] !== undefined;
  }

  private static runResetListeners(resetKey: ResetKey): void {
    Object.values(this.resetListeners).forEach(listener => listener(resetKey));
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
