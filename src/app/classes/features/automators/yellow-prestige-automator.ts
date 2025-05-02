import {Num} from "src/app/num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {PrestigeLayer} from "../prestiges/prestige-layer";
import {PrestigeAutomator} from "./prestige-automator";
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {ResetHelper} from "../../helpers/reset-helper";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";

export class YellowPrestigeAutomator extends PrestigeAutomator {
  name: string = 'yellow-prestige-automator';
  displayName: string = 'Yellow Prestige Automator';

  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.yellowPrestiges, new Num(1, 0), this)
  ];
  prestigeLayer: PrestigeLayer = PrestigeLayersService.yellowPrestigeLayer;
  style: Styles = Styles.YELLOW;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.YELLOW, this);
  goal: Num = new Num(5, 1);
  goalString: string = 'Reach a total of 50 yellow prestiges.';

  task(): Num {
    return HoldingRecord.yellowPrestiges.amount
  }
}
