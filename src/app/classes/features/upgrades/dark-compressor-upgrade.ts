import {SetHoldingUpgrade} from "./set-holding-upgrade";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {Multiplier} from "../multiplier";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {SettableHolding} from "../holdings/settable-holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";
import {ResetHelper} from "../../helpers/reset-helper";

export class DarkCompressorUpgrade extends SetHoldingUpgrade {
  name: string = 'dark-energy-compressor';
  displayName: string = 'Dark Energy Compressor';

  cost: Num = new Num(1, 1);
  baseCost: Num = new Num(1, 1);
  increase: Num = new Num(1, 1);
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.greenEnergy;

  nav: string = 'green';
  subNav: string = 'darkEnergy';

  multiplier: Multiplier = MultiplierRecord.darkEnergyGain;
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.greenParticles, new Num(1, 10))
  ];

  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  style: Styles = Styles.DARK;
  targetHolding: SettableHolding = HoldingRecord.darkEnergy;
  type: string = 'dark-energy';

  getDescription(): string {
    return "Compresses Green Energy into Dark Energy";
  }

}
