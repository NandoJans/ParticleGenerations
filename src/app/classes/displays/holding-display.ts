export class HoldingDisplay {
  private readonly amountPrefix: string = '';
  private readonly amountSuffix: string = '';
  private readonly effectPrefix: string = '';
  private readonly effectSuffix: string = '';
  holding: any;

  constructor(amountPrefix: string, amountSuffix: string, effectPrefix: string, effectSuffix: string) {
    this.amountPrefix = amountPrefix;
    this.amountSuffix = amountSuffix;
    this.effectPrefix = effectPrefix;
    this.effectSuffix = effectSuffix;
  }

  getAmountPrefix(): string {
    return this.amountPrefix;
  }

  getAmountSuffix(): string {
    return this.amountSuffix;
  }

  getEffectPrefix(): string {
    return this.effectPrefix;
  }

  getEffectSuffix(): string {
    return this.effectSuffix;
  }
}
