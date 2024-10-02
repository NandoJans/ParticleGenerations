import {RedUpgrade} from "./red-upgrade";
import {Num} from "../../../num";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {Styles} from "../../enums/styles";
import {Requirement} from "../interfaces/requirement";
import {HoldingRecord} from "../../records/holdings/holding-record";

export abstract class RedAcceleratorMultiplierUpgrade extends RedUpgrade {
  increase = new Num(1, 1);
  override scaling = new Num(1, 1);
  bought = new Num(0, 0);

  override baseBuffer: Num = new Num(3, 0);
  override buffer: Num = new Num(3, 0);

  override subNav: string = 'redAccelerators';
  override style: Styles = Styles.RED_ACCELERATOR;
  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.redParticles, new Num(1, 20), false)
  ];

  override action(): Num {
    const buff: Num = this.buffer.pow(this.bought, false);
    MultiplierRecord.redAcceleratorGenerators.correct(buff);
    return buff;
  }

  override getDescription(): string {
    return 'Multiply red accelerator generators by '+this.buffer.toString(true)+'x';
  }

  override effectString(): string {
    return super.effectString()+'x';
  }
}
