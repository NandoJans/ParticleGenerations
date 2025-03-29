import {RespecializableUpgrade} from "../../classes/features/upgrades/respecializable-upgrade";
import {Num} from "../../num";
import {Holding} from "../../classes/features/holding";
import {Requirement} from "../../classes/features/interfaces/requirement";
import {ResetKey} from "../../classes/enums/reset-key";
import {Styles} from "../../classes/enums/styles";
import {HoldingRecord} from "../../classes/records/holdings/holding-record";
import {ResetHelper} from "../../classes/helpers/reset-helper";

export abstract class NuclearDecayUpgrade extends RespecializableUpgrade {
  bought: Num = new Num(0, 0);
  currency: Holding = HoldingRecord.greenSouls;
  increase: Num = new Num(2, 0);
  nav: string = 'green';
  subNav: string = 'nuclearDecay';
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.greens, new Num(1, 0)),
  ];
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  style: Styles = Styles.NUCLEAR;
  type: string = 'nuclear-decay';

  override action(): Num {
    HoldingRecord.greenSouls.sub(
      this.baseCost.mul(this.increase.pow(this.bought, false), false).sub(this.baseCost, false)
    );
    return new Num(1, 0);
  }
}
