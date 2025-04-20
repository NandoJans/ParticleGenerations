import {Component, Input} from '@angular/core';
import {Num} from "../../../num";
import {Generator} from "../../../classes/features/generator";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent {
  @Input() generator: Generator = GeneratorRecord.firstRedGenerator;

  constructor() {}


  getAmount(): Num {
    return this.generator.amount;
  }

  getDisplayName(): string {
    return this.generator.displayName;
  }

  getCost(): Num {
    return this.generator.cost;
  }

  getMultiplier(): Num {
    return this.generator.multiplier;
  }

  buy() {
    if (this.getIsBuyable()) {
      this.generator.buy();
    }
  }

  getIsBuyable(): boolean {
    return this.generator.isBuyable();
  }

  getCurrencyAbbreviation() {
    return this.generator.currency.abbreviation;
  }
}
