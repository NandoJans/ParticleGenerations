import {GalaxyTreeUpgrade} from "./galaxy-tree-upgrade";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {ChallengeRecord} from "../../records/challenges/challenge-record";

export class MitigatedDarkGalaxyChallengeGalaxyTreeUpgrade extends GalaxyTreeUpgrade {
  private readonly baseNerfPower: Num = new Num(1.5, -1);

  constructor(saveName: string) {
    super(saveName, "mitigated-dark-galaxy-challenge-galaxy-tree-upgrade");
  }

  getChildren(): GalaxyTreeUpgrade[] {
    return [];
  }

  getParents(): GalaxyTreeUpgrade[] {
    return [
      UpgradeRecord.acceleratorExpertiseGalaxyTree,
    ];
  }

  getDescription(): string {
    return "Reduces dark galaxy challenge nerf to ^0.20.";
  }

  action(): undefined {
    if (this.hasBought()) {
      ChallengeRecord.darkGalaxy.nerfPower = this.buffer.copy();
    } else {
      ChallengeRecord.darkGalaxy.nerfPower = this.baseNerfPower.copy();
    }
    return;
  }

  style: Styles = Styles.STAR_BLUE;
  displayName: string = "Mitigated Dark Galaxy";

  override buffer: Num = new Num(2, -1);
  override baseBuffer: Num = new Num(2, -1);

  cost: Num = new Num(9.96, 2);
  baseCost: Num = new Num(9.96, 2);
}
