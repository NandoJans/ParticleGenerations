import {Num} from "../../num";

export class Multiplier {
  name: string
  num: Num
  originalNum: Num
  calculationOrder: number = 1150
  neutronMeltdownImmune: boolean
  localHooks: { [key: string]: {
    hook: (multiplier: Multiplier) => void,
    once?: boolean
  } } = {}

  // Global hook to transform multipliers when retrieved (e.g., Dark Galaxy Challenge)
  // It should be a pure function that returns a new Num without mutating the input.
  static globalGetHook?: (value: Num, context?: { source?: any; kind?: string }) => Num
  static neutronMeltdownPower: Num = Num.ONE.copy()

  constructor(
    name: string,
    num: Num,
    calculationOrder: number = 1150,
    neutronMeltdownImmune: boolean = false
  ) {
    this.name = name
    this.num = num.copy()
    this.originalNum = num.copy()
    this.calculationOrder = calculationOrder
    this.neutronMeltdownImmune = neutronMeltdownImmune
  }

  reset(): void {
    this.num = this.originalNum.copy()
  }

  correct(num: Num): void {
    this.num = this.num.mul(num)
  }

  add(num: Num): void {
    this.num = this.num.add(num)
  }

  static applyHook(value: Num, context?: { source?: any; kind?: string }): Num {
    if (Multiplier.globalGetHook) {
      return Multiplier.globalGetHook(value, context)
    }
    return value
  }

  static applyNeutronMeltdown(value: Num, immune: boolean = false): Num {
    return immune ? value : value.pow(Multiplier.neutronMeltdownPower)
  }

  getNum(applyNeutronMeltdown: boolean = true): Num {
    // First, apply local hooks (if any) to the multiplier value
    // After applying local hooks, delete if the hook is onetime-only
    for (const hookName in this.localHooks) {
      this.localHooks[hookName].hook(this)
      if (this.localHooks[hookName].once) delete this.localHooks[hookName]
    }
    // Apply global transformation hook (if any) when retrieving the multiplier value
    const value = Multiplier.applyHook(this.num, { source: this, kind: 'multiplier' })
    return applyNeutronMeltdown
      ? Multiplier.applyNeutronMeltdown(value, this.neutronMeltdownImmune)
      : value
  }

  power(effect: Num) {
    this.num = this.num.pow(effect)
  }

  addLocalHook(name: string, param2: (multiplier: Multiplier) => void, once: boolean = false) {
    if (this.localHooks[name]) return;

    this.localHooks[name] = {
      hook: param2,
      once: once
    }
  }
}
