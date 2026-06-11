import {Component, Input} from '@angular/core';
import {Num} from "../../../num";
import {Generator} from "../../../classes/features/generator";
import {GeneratorRecord} from "../../../classes/records/generators/generator-record";
import {EnhancementService} from "../../../services/enhancement.service";
import {faLock} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.css'],
    standalone: false
})
export class GeneratorComponent {
  @Input() generator: Generator = GeneratorRecord.firstRedGenerator;

  constructor(
    private enhancementService: EnhancementService
  ) {}

  getAmount(): Num {
    return this.generator.amount;
  }

  getBought(): Num {
    return this.generator.bought;
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
    if (this.isEnhancing()) {
      this.enhancementService.enhance(this.generator);
    } else if (this.getIsBuyable()) {
      this.generator.buy();
    }
  }

  getIsBuyable(): boolean {
    return this.generator.isBuyable() && !this.generator.auto;
  }

  getCurrencyAbbreviation() {
    return this.generator.currency.abbreviation;
  }

  isEnhancing(): boolean {
    return this.enhancementService.isEnhancing() && this.generator.allowedEnhancements.includes(this.enhancementService.enhancing!) && this.generator.enhancement !== this.enhancementService.enhancing;
  }

  getEnhancementStyle(): string {
    if (this.enhancementService.enhancing) {
      return this.enhancementService.enhancing.style;
    }
    return '';
  }

  isEnhanced() {
    return this.generator.enhancement !== null;
  }

  getEnhancedStyle() {
    return this.generator.enhancement?.style;
  }

  getEnhancementString(): string {
    if (this.enhancementService.enhancing?.name === 'green-enhancement') {
      return 'Use one Green Key to double this element\'s power.';
    }
    if (this.enhancementService.enhancing) {
      return this.generator.enhancementString(
        this.enhancementService.enhancing
      );
    }
    return '';
  }

  isEnabled() {
    return this.generator.isEnabled();
  }

  isUnlocked() {
    return this.generator.isUnlocked();
  }

  protected readonly faLock = faLock;
}
