import {Num} from "../../../num";
import {GlobalMultipliersService} from "../../globals/global-multipliers.service";
import {UpgradeService} from "../upgrade.service";

export const redHoldings: any = {
  redParticles: {amount: new Num(1, 2), effect: new Num(1, 0)},
  redParticlesStart: {amount: new Num(1, 2), effect: new Num(1, 0)},
  redAccelerators: {amount: new Num(1, 0), effect: new Num(1, 0),
    action: (amount: Num) => {
      // @ts-ignore
      let buffer: Num = (UpgradeService.getValue('red-accelerator-buffer', 'bought').greq(new Num(1, 0))) ? amount.pow(new Num(1.5, 0), false) : amount.div(new Num(1, 3), false).add(new Num(1, 0), false);
      GlobalMultipliersService.correct('redParticleGenerators', buffer)
      return buffer.copy();
    }},
  redAcceleratorsStart: {amount: new Num(1, 0), effect: new Num(1, 0)},
}
