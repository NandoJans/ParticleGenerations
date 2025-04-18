import {Upgrade} from "../upgrade";
import {Holding} from "../holding";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Num} from "../../../num";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export abstract class BlueNeutronUpgrade extends Upgrade {
  currency: Holding = HoldingRecord.blueParticles;
  nav: string = 'blue';
  subNav: string = 'blueNeutrons';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.BLUE, this);
  style: Styles = Styles.BLUE_NEUTRON;
  type: string = 'blue-neutron-upgrade';
  bought: Num = new Num(0, 0);
}
