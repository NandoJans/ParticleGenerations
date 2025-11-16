import {Automator} from "../automator";
import {Buyable} from "../buyable";
import {PrestigeLayer} from "../prestiges/prestige-layer";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export abstract class PrestigeAutomator extends Automator {
  modes: {[key: string]: {setting: Num, action: Function, prestigeStatus: Function}} = {
    atX: {
      setting: new Num(1, 0),
      action: (prestigeLayer: PrestigeLayer, setting: Num) => {
        return (prestigeLayer.holdingGain.greq(setting));
      },
      prestigeStatus: (prestigeLayer: PrestigeLayer, setting: Num) => {
        return `Current gain: ${prestigeLayer.holdingGain.toString()}`;
      }
    },
    afterXSeconds: {
      setting: new Num(1, 0),
      action: (prestigeLayer: PrestigeLayer, setting: Num) => {
        const currentTime = new Date().getTime();
        const lastTime = prestigeLayer.prestigeStarted.getTime()
        const diff = currentTime - lastTime;
        const diffSeconds = Math.floor(diff / 1000);
        return (diffSeconds >= setting.toNumber());
      },
      prestigeStatus: (prestigeLayer: PrestigeLayer, setting: Num) => {
        const currentTime = new Date().getTime();
        const lastTime = prestigeLayer.prestigeStarted.getTime()
        const diff = currentTime - lastTime;
        const diffSeconds = Math.floor(diff / 1000);
        return `${diffSeconds} seconds passed`;
      }
    },
    afterXTimesBest: {
      setting: new Num(1, 0),
      action: (prestigeLayer: PrestigeLayer, setting: Num) => {
        console.log(prestigeLayer.bestPrestige)
        const bestTimesHighest = prestigeLayer.bestPrestige.mul(setting);
        return prestigeLayer.holdingGain.greq(bestTimesHighest);
      },
      prestigeStatus: (prestigeLayer: PrestigeLayer, setting: Num) => {
        const bestTimesHighest = prestigeLayer.bestPrestige.mul(setting);
        return `Prestige at ${bestTimesHighest.toString()}`;
      }
    },
  }

  currentMode: string = 'atX';

  getModes(): string[] {
    return Object.keys(this.modes);
  }

  buyables(): Buyable[] {
      return [];
  }

  abstract prestigeLayer: PrestigeLayer;

  override save() {
    super.save();
    for (const key of this.getModes()) {
      this.localStorageHelper.saveNum(this.modes[key].setting, key);
    }
    this.localStorageHelper.save(this.currentMode, 'currentMode');
  }

  override tryLoad() {
    super.tryLoad();
    for (const key of this.getModes()) {
      this.modes[key].setting = this.localStorageHelper.loadNum(this.modes[key].setting, key);
    }
    this.currentMode = this.localStorageHelper.load(this.currentMode, 'currentMode');
  }

  override run(): boolean {
    if (this.completed && this.active) {
      this.runMode();
    } else if (!this.completed) {
      return this.checkTask();
    }
    return false
  }

  private runMode() {
    const setting = this.modes[this.currentMode].setting;
    if (this.prestigeLayer.hasReached() && this.modes[this.currentMode].action(this.prestigeLayer, setting)) {
      this.prestigeLayer.prestige();
    }
  }

  getPrestigeStatus() {
    const setting = this.modes[this.currentMode].setting;
    return this.modes[this.currentMode].prestigeStatus(this.prestigeLayer, setting);
  }
}
