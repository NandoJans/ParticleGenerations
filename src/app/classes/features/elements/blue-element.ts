import {Num} from '../../../num';
import {Holding} from '../holding';
import {HoldingDisplay} from '../../displays/holding-display';
import {HoldingDisplayFactory} from '../../factories/holding-display-factory';
import {ResetKey} from '../../enums/reset-key';
import {Styles} from '../../enums/styles';
import {Upgrade} from '../upgrade';
import {Enhancement} from '../enhancements/enhancement';

class ElementResourceHolding extends Holding {
  amount = Num.ZERO.copy();
  startAmount = Num.ZERO.copy();
  resetId = ResetKey.PURPLE;
  holdingDisplay: HoldingDisplay = HoldingDisplayFactory.start(this).withAmountPrefix('Stored').withAmountSuffix(` ${this.displayName}`).build();

  constructor(
    public name: string,
    public displayName: string,
    public abbreviation: string
  ) { super(); }

  getStyle(): Styles { return Styles.BLUE; }
}

export interface ElementUpgradeHost {
  canBuyElementUpgrade(element: BlueElement, upgrade: ElementUpgrade): boolean;
  buyElementUpgrade(element: BlueElement, upgrade: ElementUpgrade): void;
}

export abstract class ElementUpgrade extends Upgrade {
  override amount = Num.ZERO.copy();
  override bought = Num.ZERO.copy();
  override costMultiplier = Num.ONE.copy();
  increase = Num.ONE.copy();
  startIncrease = Num.ONE.copy();
  type = 'blue-element';
  resetId = ResetKey.PURPLE;
  style = Styles.BLUE;
  nav = 'blue';
  subNav = 'blueElements';
  allowedEnhancements: Enhancement[] = [];
  requirement = [];

  constructor(
    public element: BlueElement,
    public host: ElementUpgradeHost,
    public override name: string,
    public displayName: string,
    public baseCost: Num,
    public cost: Num,
    public currency: Holding
  ) { super(name); }

  getDescription(): string { return this.description; }
  action(): Num | undefined { return this.bought; }
  enhancementString(): string { return ''; }
  canEnhance(): boolean { return false; }
  enhance(): void {}
  override isBuyable(): boolean { return this.host.canBuyElementUpgrade(this.element, this); }
  override buy(): any { this.host.buyElementUpgrade(this.element, this); return {success: true}; }

  abstract description: string;
}

export class ElementBatteryUpgrade extends ElementUpgrade {
  description = 'Builds storage containers for this element charge.';
}

export class ElementChargerUpgrade extends ElementUpgrade {
  description = 'Generates charge for this element while storage exists.';
}

export class ElementCapacityUpgrade extends ElementUpgrade {
  description = 'Increases charge capacity per storage container.';
}

export abstract class BlueElement {
  batteries: Holding;
  batteryCharge: Holding;
  batteryTier: Holding;
  batteryUpgrade!: ElementBatteryUpgrade;
  chargerUpgrade!: ElementChargerUpgrade;
  capacityUpgrade!: ElementCapacityUpgrade;

  protected constructor(
    public holding: Holding,
    public theme: string,
    public componentName: string
  ) {
    this.batteries = new ElementResourceHolding(`${holding.name}-batteries`, `${holding.displayName} Batteries`, `${holding.abbreviation} Bat`);
    this.batteryCharge = new ElementResourceHolding(`${holding.name}-battery-charge`, `${holding.displayName} Battery Charge`, `${holding.abbreviation} Charge`);
    this.batteryTier = new ElementResourceHolding(`${holding.name}-battery-tier`, `${holding.displayName} Battery Tier`, `${holding.abbreviation} Tier`);
  }

  initializeUpgrades(host: ElementUpgradeHost, protons: Holding, electrons: Holding): void {
    this.batteryUpgrade = new ElementBatteryUpgrade(this, host, `${this.holding.name}-battery`, `${this.holding.displayName} Batteries`, new Num(5, 0), new Num(5, 0), this.holding);
    this.chargerUpgrade = new ElementChargerUpgrade(this, host, `${this.holding.name}-charger`, `${this.holding.displayName} Chargers`, new Num(1, 1), new Num(1, 1), electrons);
    this.capacityUpgrade = new ElementCapacityUpgrade(this, host, `${this.holding.name}-capacity`, `${this.holding.displayName} Capacity`, new Num(1, 1), new Num(1, 1), protons);
  }

  get visualComponent(): string { return this.componentName; }
  getChargeCapacity(): Num { return new Num(1, 2).mul(new Num(1.6, 0).pow(this.capacityUpgrade.bought)); }
  getTotalCapacity(): Num { return this.batteryUpgrade.bought.mul(this.getChargeCapacity()); }
  getTotalCharge(): Num { return this.batteryCharge.amount.lt(this.getTotalCapacity()) ? this.batteryCharge.amount : this.getTotalCapacity(); }
  getDischargeThreshold(): Num { return new Num(1, 1).pow(this.batteryTier.amount).mul(new Num(1, 4)); }
  getTierEffect(): Num { return Num.TWO.pow(this.batteryTier.amount); }
  getChargeEffect(): Num { return this.getTotalCharge().add(Num.ONE).pow(this.getTierEffect()); }
}

export class ForgedBlueElement extends BlueElement {
  constructor(holding: Holding, theme: string, componentName: string) {
    super(holding, theme, componentName);
  }
}
