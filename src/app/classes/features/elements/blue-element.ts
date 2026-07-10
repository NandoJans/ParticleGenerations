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
  description = 'Builds Lithium-ion battery storage containers.';
}

export class ElementChargerUpgrade extends ElementUpgrade {
  description = 'Generates Lithium charge while battery storage exists.';
}

export class ElementCapacityUpgrade extends ElementUpgrade {
  description = 'Increases Lithium charge capacity per battery.';
}

export class BerylliumRocketUpgrade extends ElementUpgrade {
  description = 'Builds Beryllium rocket frames that add fuel capacity for extension launches.';
}

export class BerylliumFuelUpgrade extends ElementUpgrade {
  description = 'Adds Proton refineries that generate Beryllium rocket fuel over time.';
}

export class BerylliumLogicUpgrade extends ElementUpgrade {
  description = 'Adds Electron guidance logic that multiplies rocket thrust.';
}

export class BoronFiberUpgrade extends ElementUpgrade {
  description = 'Pulls Boron fiber spools that generate fiberglass accelerator sleeves.';
}

export class BoronResinUpgrade extends ElementUpgrade {
  description = 'Bonds fiberglass with Proton resin for stronger composites.';
}

export class BoronWeaveUpgrade extends ElementUpgrade {
  description = 'Weaves fiberglass with Electron looms for stronger accelerator conduits.';
}

export class CarbonLandUpgrade extends ElementUpgrade {
  description = 'Buys Proton-seeded land plots where Carbon Life can grow.';
}

export class CarbonLandAreaUpgrade extends ElementUpgrade {
  description = 'Uses Electrons to expand usable area on each Carbon land plot.';
}

export abstract class BlueElement {
  protected constructor(
    public holding: Holding,
    public theme: string,
    public componentName: string
  ) {}

  abstract initializeUpgrades(host: ElementUpgradeHost, protons: Holding, electrons: Holding): void;
  abstract getUpgrades(): ElementUpgrade[];

  get visualComponent(): string { return this.componentName; }
}

export class LithiumElement extends BlueElement {
  batteries: Holding;
  batteryCharge: Holding;
  batteryTier: Holding;
  batteryUpgrade!: ElementBatteryUpgrade;
  chargerUpgrade!: ElementChargerUpgrade;
  capacityUpgrade!: ElementCapacityUpgrade;

  constructor(holding: Holding, theme: string, componentName: string) {
    super(holding, theme, componentName);
    this.batteries = new ElementResourceHolding(`${holding.name}-batteries`, `${holding.displayName} Batteries`, `${holding.abbreviation} Bat`);
    this.batteryCharge = new ElementResourceHolding(`${holding.name}-battery-charge`, `${holding.displayName} Battery Charge`, `${holding.abbreviation} Charge`);
    this.batteryTier = new ElementResourceHolding(`${holding.name}-battery-tier`, `${holding.displayName} Battery Tier`, `${holding.abbreviation} Tier`);
  }

  initializeUpgrades(host: ElementUpgradeHost, protons: Holding, electrons: Holding): void {
    this.batteryUpgrade = new ElementBatteryUpgrade(this, host, `${this.holding.name}-battery`, `${this.holding.displayName} Batteries`, new Num(5, 0), new Num(5, 0), this.holding);
    this.chargerUpgrade = new ElementChargerUpgrade(this, host, `${this.holding.name}-charger`, `${this.holding.displayName} Chargers`, new Num(1, 1), new Num(1, 1), electrons);
    this.capacityUpgrade = new ElementCapacityUpgrade(this, host, `${this.holding.name}-capacity`, `${this.holding.displayName} Capacity`, new Num(1, 1), new Num(1, 1), protons);
  }

  getUpgrades(): ElementUpgrade[] { return [this.batteryUpgrade, this.chargerUpgrade, this.capacityUpgrade]; }
  getChargeCapacity(): Num { return new Num(1, 2).mul(new Num(1.6, 0).pow(this.capacityUpgrade.bought)); }
  getTotalCapacity(): Num { return this.batteryUpgrade.bought.mul(this.getChargeCapacity()); }
  getTotalCharge(): Num { return this.batteryCharge.amount.lt(this.getTotalCapacity()) ? this.batteryCharge.amount : this.getTotalCapacity(); }
  getDischargeThreshold(): Num { return new Num(1, 1).pow(this.batteryTier.amount).mul(new Num(1, 4)); }
  getTierEffect(): Num { return Num.TWO.pow(this.batteryTier.amount); }
  getChargeEffect(): Num { return this.getTotalCharge().add(Num.ONE).pow(this.getTierEffect()); }
}

export class BerylliumElement extends BlueElement {
  constructor(holding: Holding, theme: string, componentName: string) {
    super(holding, theme, componentName);
  }

  rocketUpgrade!: BerylliumRocketUpgrade;
  fuelUpgrade!: BerylliumFuelUpgrade;
  logicUpgrade!: BerylliumLogicUpgrade;

  initializeUpgrades(host: ElementUpgradeHost, protons: Holding, electrons: Holding): void {
    this.rocketUpgrade = new BerylliumRocketUpgrade(this, host, `${this.holding.name}-rocket`, 'Rocket Frames', new Num(5, 0), new Num(5, 0), this.holding);
    this.fuelUpgrade = new BerylliumFuelUpgrade(this, host, `${this.holding.name}-fuel`, 'Fuel Systems', new Num(1, 3), new Num(1, 3), protons);
    this.logicUpgrade = new BerylliumLogicUpgrade(this, host, `${this.holding.name}-logic`, 'Logic Systems', new Num(1, 3), new Num(1, 3), electrons);
  }

  getUpgrades(): ElementUpgrade[] { return [this.rocketUpgrade, this.fuelUpgrade, this.logicUpgrade]; }
}

export class BoronElement extends BlueElement {
  constructor(holding: Holding, theme: string, componentName: string) {
    super(holding, theme, componentName);
  }

  fiberUpgrade!: BoronFiberUpgrade;
  resinUpgrade!: BoronResinUpgrade;
  weaveUpgrade!: BoronWeaveUpgrade;

  initializeUpgrades(host: ElementUpgradeHost, protons: Holding, electrons: Holding): void {
    this.fiberUpgrade = new BoronFiberUpgrade(this, host, `${this.holding.name}-fiber`, 'Fiber Spools', new Num(5, 0), new Num(5, 0), this.holding);
    this.resinUpgrade = new BoronResinUpgrade(this, host, `${this.holding.name}-resin`, 'Resin Infusers', new Num(1, 5), new Num(1, 5), protons);
    this.weaveUpgrade = new BoronWeaveUpgrade(this, host, `${this.holding.name}-weave`, 'Weave Looms', new Num(1, 5), new Num(1, 5), electrons);
  }

  getUpgrades(): ElementUpgrade[] { return [this.fiberUpgrade, this.resinUpgrade, this.weaveUpgrade]; }
}

export class CarbonElement extends BlueElement {
  constructor(holding: Holding, theme: string, componentName: string) {
    super(holding, theme, componentName);
  }

  landUpgrade!: CarbonLandUpgrade;
  landAreaUpgrade!: CarbonLandAreaUpgrade;

  initializeUpgrades(host: ElementUpgradeHost, protons: Holding, electrons: Holding): void {
    this.landUpgrade = new CarbonLandUpgrade(this, host, `${this.holding.name}-land`, 'Land Plots', new Num(5, 0), new Num(5, 0), protons);
    this.landAreaUpgrade = new CarbonLandAreaUpgrade(this, host, `${this.holding.name}-land-area`, 'Land Area', new Num(2.5, 1), new Num(2.5, 1), electrons);
  }

  getUpgrades(): ElementUpgrade[] { return [this.landUpgrade, this.landAreaUpgrade]; }
}

export class ForgedBlueElement extends BlueElement {
  constructor(holding: Holding, theme: string, componentName: string) {
    super(holding, theme, componentName);
  }

  initializeUpgrades(_host: ElementUpgradeHost, _protons: Holding, _electrons: Holding): void {}
  getUpgrades(): ElementUpgrade[] { return []; }
}
