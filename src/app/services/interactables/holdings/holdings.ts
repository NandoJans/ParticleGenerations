import {Num} from "../../../num";
import {Action} from "../../../action";

export const holdings = {
  redParticles: {amount: new Num(1, 2)},
  redAccelerators: {amount: new Num(1, 0)/*, action: new Action('basedOnHolding', 'redParticleGenerators', new Num(1, -3))*/},
  yellowParticles: {amount: new Num(0, 0)},
  yellows: {amount: new Num(0, 0)},
  yellowPower: {amount: new Num(0, 0)},
  yellowFusion: {amount: new Num(1, 0)},
  greenParticles: {amount: new Num(0, 0)},
  greens: {amount: new Num(0, 0)},
}
