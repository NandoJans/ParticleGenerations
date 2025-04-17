import {Upgrade} from "../upgrade";
import {ResetKey} from "../../enums/reset-key";
import {ResetHelper} from "../../helpers/reset-helper";
import {Styles} from "../../enums/styles";

export abstract class BlackHoleUpgrade extends Upgrade {
  nav: string = 'purple';
  subNav: string = 'black';
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.PURPLE, this);
  style: Styles = Styles.PURPLE;
  type: string = 'purple-upgrades';
}
