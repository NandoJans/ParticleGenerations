import {Num} from "src/app/num";
import {ResetKey} from "../../enums/reset-key";
import {Generatable} from "../interfaces/generatable";
import {YellowGenerator} from "./yellow-generator";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {ResetHelper} from "../../helpers/reset-helper";
import {YellowGeneratorMultiplierUpgrade} from "../upgrades/yellow-generator-multiplier-upgrade";
import {YellowGeneratorBuyMultiplierUpgrade} from "../upgrades/yellow-generator-buy-multiplier-upgrade";

export class FirstYellowGenerator extends YellowGenerator {
  constructor(saveName: string) {
    super(saveName, 'first-yellow-generator');
    this.resetId = ResetHelper.registerReset(ResetKey.YELLOW, this);
    this.softResetId = ResetHelper.registerReset(ResetKey.RED, this);
  }
  displayName: string = 'First Yellow Generator';
  generates: Generatable = HoldingRecord.yellowPower;
  resetId: ResetKey;
  softResetId: ResetKey;
  stringRank: string = '1';
  rank: number = 1;
  baseCost: Num = new Num(1, 3);
  cost: Num = new Num(1, 3);
  increase: Num = new Num(1, 1);

  multiplierUpgrade: YellowGeneratorMultiplierUpgrade = new YellowGeneratorMultiplierUpgrade(
    this.name + '.multiplierUpgrade',
    new Num(2, 3),
    new Num(1, 1),
    new Num(1, 1),
    new Num(2, 0),
    this
  );
  buyMultiplierUpgrade: YellowGeneratorBuyMultiplierUpgrade = new YellowGeneratorBuyMultiplierUpgrade(
    this.name + '.buyMultiplierUpgrade',
    new Num(1, 4),
    new Num(1, 2),
    new Num(1, 1),
    new Num(1.1, 0),
    this
  );
}
