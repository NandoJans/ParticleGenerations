import {BlueUpgrade} from "./blue-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export class LightBoostsNeutronsUpgrade extends BlueUpgrade {
  baseCost: Num = new Num(1, 2);
  cost: Num = new Num(1, 2);
  override buffer: Num = new Num(1.5, -1);
  override baseBuffer: Num = new Num(1.5, -1);
  increase: Num = new Num(1, 0);
  displayName: string = "Blue Particle Multiplier";
  name: string = "blue-particle-multiplier";
  override oneTime: boolean = true;

  action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.blueNeutronGenerators.correct(buff);
    return buff;
  }

  getDescription(): string {
    return `Multiply blue particles by ${this.buffer.toString(true)}x`;
  }

}
