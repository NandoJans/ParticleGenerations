import {Num} from "src/app/num";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {PrestigeLayer} from "../prestiges/prestige-layer";
import {PrestigeAutomator} from "./prestige-automator";
import {PrestigeLayersService} from "../../../services/prestige-layers.service";
import {ResetHelper} from "../../helpers/reset-helper";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {Requirement} from "../interfaces/requirement";

export class GreenPrestigeAutomator extends PrestigeAutomator {
  name: string = 'green-prestige-automator';
  displayName: string = 'Green Prestige Automator';

  override requirement: Requirement[] = [
    new Requirement(HoldingRecord.greenPrestiges, new Num(1, 0), this)
  ];
  prestigeLayer: PrestigeLayer = PrestigeLayersService.greenPrestigeLayer;
  style: Styles = Styles.GREEN;
  resetId: ResetKey = ResetHelper.registerReset(ResetKey.GREEN, this);
  goal: Num = new Num(5, 1);
  goalString: string = 'Reach a total of 50 green prestiges.';

  task(): Num {
    return HoldingRecord.greenPrestiges.amount
  }
}
