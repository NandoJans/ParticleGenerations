import { Num } from "src/app/num";
import {Generatable} from "../interfaces/generatable";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {RedGenerator} from "./red-generator";
import {RedGeneratorBuyMultiplierUpgrade} from "../upgrades/red-generator-buy-multiplier-upgrade";
import {RedGeneratorMultiplierUpgrade} from "../upgrades/red-generator-multiplier-upgrade";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";

export class FirstRedGenerator extends RedGenerator {
  baseCost: Num = new Num(1, 1);
  cost: Num = new Num(1, 1);
  displayName: string = 'Red Generator 1';
  generates: Generatable = HoldingRecord.redParticles;
  name: string = 'red-generator-1';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.RED_EXTENSION, this);
  softResetId: ResetKey = ResetHelper.registerSoftReset(ResetKey.RED_EXTENSION, this);
  increase: Num = new Num(1, 1);
  override unlocked: boolean = true;

  multiplierUpgrade: RedGeneratorMultiplierUpgrade = new RedGeneratorMultiplierUpgrade(
    1,
    "First",
    new Num(1, 2),
    new Num(1, 2),
    new Num(1, 1),
    new Num(1.25, 0),
    this
  );
  buyMultiplierUpgrade: RedGeneratorBuyMultiplierUpgrade = new RedGeneratorBuyMultiplierUpgrade(
    1,
    "First",
    new Num(1, 3),
    new Num(1, 3),
    new Num(1, 1),
    new Num(1.05, 0),
    this
  );
}
