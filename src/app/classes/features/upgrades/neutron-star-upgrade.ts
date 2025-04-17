import {Upgrade} from "../upgrade";
import {Requirement} from "../interfaces/requirement";
import {Num} from "../../../num";
import {Holding} from "../holding";
import {ResetKey} from "../../enums/reset-key";
import {Styles} from "../../enums/styles";
import {HoldingRecord} from "../../records/holdings/holding-record";
import {GeneratorRecord} from "../../records/generators/generator-record";

export class NeutronStarUpgrade extends Upgrade {
  baseCost: Num = new Num(2, 0);
  bought: Num = new Num(0, 0);
  cost: Num = new Num(2, 0);
  currency: Holding = HoldingRecord.blueParticles;
  displayName: string = "Neutron Star";
  increase: Num = new Num(1, 0);
  name: string = "neutron-star";
  nav: string = "blue";
  requirement: Requirement[] = [
    new Requirement(HoldingRecord.blues, new Num(3, 0))
  ];
  resetId: ResetKey = ResetKey.BLUE;
  style: Styles = Styles.BLUE_STAR;
  subNav: string = "neutronStars";
  type: string = "neutron-star-upgrade";
  override oneTime: boolean = true;

  action(): undefined {
    GeneratorRecord.blueLightGenerator.amount.add(new Num(1, 0));
    return undefined;
  }

  getDescription(): string {
    return `Starts the generation of blue light`;
  }

}
