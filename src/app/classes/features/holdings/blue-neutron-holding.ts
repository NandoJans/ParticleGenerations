import {Holding} from "../holding";
import {HoldingDisplay} from "../../displays/holding-display";
import {Num} from "../../../num";
import {Styles} from "../../enums/styles";
import {HoldingDisplayFactory} from "../../factories/holding-display-factory";
import {GlobalMultipliersService} from "../../../services/globals/global-multipliers.service";
import {GeneratorService} from "../../../services/interactables/generator.service";
import {GeneratorRecord} from "../../records/generators/generator-record";
import {RedGeneratorRecord} from "../../records/generators/red-generator-record";
import {UpgradeRecord} from "../../records/upgrades/upgrade-record";

export class BlueNeutronHolding extends Holding {
  name = 'blueNeutrons';
  abbreviation: string = 'BN';
  amount: Num = new Num(0, 0);
  startAmount: Num = new Num(0, 0);
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this)
    .withAmountPrefix('You have')
    .withAmountSuffix('Blue Neutrons')
    .withEffectPrefix('Red Particle Generators are')
    .withEffectSuffix('more effective')
    .build();

  override action(): Num | undefined {
    // @ts-ignore
    let buffer: Num = amount.pow(new Num(5, 0).mul(GlobalMultipliersService.get('blueNeutronPower'), false), false);

    GeneratorRecord.firstRedGenerator.baseMulMod = buffer;
    GeneratorRecord.secondRedGenerator.baseMulMod = buffer;
    GeneratorRecord.thirdRedGenerator.baseMulMod = buffer;
    GeneratorRecord.fourthRedGenerator.baseMulMod = buffer;
    GeneratorRecord.fifthRedGenerator.baseMulMod = buffer;

    return buffer;
  }

  getStyle(): Styles {
    return Styles.BLUE;
  }

  override effectString(effect: Num): string {
    return super.effectString(effect) + 'x';
  }
}
