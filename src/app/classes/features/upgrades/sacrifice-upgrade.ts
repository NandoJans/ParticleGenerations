import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";
import {SetHoldingUpgrade} from "./set-holding-upgrade";
import {SettableHolding} from "../holdings/settable-holding";
import {Multiplier} from "../multiplier";
import {MultiplierRecord} from "../../records/multipliers/multiplier-record";

export abstract class SacrificeUpgrade extends SetHoldingUpgrade {
  nav: string = 'green';
  subNav: string = 'greenSacrifice';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.greens, new Num(1, 0))
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  style: Styles = Styles.GREEN;
  type: string = 'green-sacrifices';
  targetHolding: SettableHolding = HoldingRecord.greenSouls;
  multiplier: Multiplier = MultiplierRecord.greenSoulsGain;

  override effectString(): string {
    return '+' + super.effectString() + ' Green Souls';
  }
}
