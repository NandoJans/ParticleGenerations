import {Num} from "../../num";

export type MultiplierListenerType = 'multiply' | 'add' | 'power';

export interface MultiplierListener {
  type: MultiplierListenerType;
  getValue: () => Num;
}

export class Multiplier {
  name: string
  num: Num
  originalNum: Num
  calculationOrder: number = 1150
  localHooks: { [key: string]: {
    hook: (multiplier: Multiplier) => void,
    once?: boolean
  } } = {}

  // Listener registry for multiplications, additions, and powers
  private listeners: Map<string, MultiplierListener> = new Map();

  // Cached calculated value
  private cachedValue: Num | null = null;
  private isDirty: boolean = true;

  // Global hook to transform multipliers when retrieved (e.g., Dark Galaxy Challenge)
  // It should be a pure function that returns a new Num without mutating the input.
  static globalGetHook?: (value: Num, context?: { source?: any; kind?: string }) => Num

  constructor(name: string, num: Num, calculationOrder: number = 1150) {
    this.name = name
    this.num = num.copy()
    this.originalNum = num.copy()
    this.calculationOrder = calculationOrder
  }

  /**
   * Called on tick to reset the multiplier for recalculation.
   * Resets the base value and marks the cache as dirty.
   */
  reset(): void {
    this.num = this.originalNum.copy()
    this.isDirty = true
    this.cachedValue = null
  }

  /**
   * Register a listener that provides a multiplication value.
   * @param name Unique identifier for the listener
   * @param getValue Function that returns the value to multiply by
   */
  registerMultiply(name: string, getValue: () => Num): void {
    this.listeners.set(name, { type: 'multiply', getValue });
    this.isDirty = true;
  }

  /**
   * Register a listener that provides an addition value.
   * @param name Unique identifier for the listener
   * @param getValue Function that returns the value to add
   */
  registerAdd(name: string, getValue: () => Num): void {
    this.listeners.set(name, { type: 'add', getValue });
    this.isDirty = true;
  }

  /**
   * Register a listener that provides a power value.
   * @param name Unique identifier for the listener
   * @param getValue Function that returns the power exponent
   */
  registerPower(name: string, getValue: () => Num): void {
    this.listeners.set(name, { type: 'power', getValue });
    this.isDirty = true;
  }

  /**
   * Deregister a listener by name.
   * @param name The identifier of the listener to remove
   */
  deregisterListener(name: string): void {
    if (this.listeners.delete(name)) {
      this.isDirty = true;
    }
  }

  /**
   * Check if a listener is registered.
   * @param name The identifier to check
   */
  hasListener(name: string): boolean {
    return this.listeners.has(name);
  }

  /**
   * Get all registered listener names.
   */
  getListenerNames(): string[] {
    return Array.from(this.listeners.keys());
  }

  correct(num: Num): void {
    this.num = this.num.mul(num)
    this.isDirty = true
  }

  add(num: Num): void {
    this.num = this.num.add(num)
    this.isDirty = true
  }

  static applyHook(value: Num, context?: { source?: any; kind?: string }): Num {
    if (Multiplier.globalGetHook) {
      return Multiplier.globalGetHook(value, context)
    }
    return value
  }

  /**
   * Calculate the final multiplier value by applying all listeners.
   * The result is cached until the next reset or modification.
   */
  private calculate(): Num {
    // Start with the current base value
    let result = this.num.copy();

    // Apply all registered listeners in order: additions first, then multiplications, then powers
    const additions: MultiplierListener[] = [];
    const multiplications: MultiplierListener[] = [];
    const powers: MultiplierListener[] = [];

    for (const listener of this.listeners.values()) {
      switch (listener.type) {
        case 'add':
          additions.push(listener);
          break;
        case 'multiply':
          multiplications.push(listener);
          break;
        case 'power':
          powers.push(listener);
          break;
      }
    }

    // Apply additions
    for (const listener of additions) {
      result = result.add(listener.getValue());
    }

    // Apply multiplications
    for (const listener of multiplications) {
      result = result.mul(listener.getValue());
    }

    // Apply powers
    for (const listener of powers) {
      result = result.pow(listener.getValue());
    }

    return result;
  }

  getNum(): Num {
    // Calculate and cache if dirty
    if (this.isDirty || this.cachedValue === null) {
      // First calculate from listeners
      let calculatedValue = this.calculate();

      // Then apply local hooks (if any) to the multiplier value
      // We need to temporarily set this.num for hooks that modify it
      const originalNum = this.num;
      this.num = calculatedValue;

      for (const hookName in this.localHooks) {
        this.localHooks[hookName].hook(this)
        if (this.localHooks[hookName].once) delete this.localHooks[hookName]
      }

      calculatedValue = this.num;
      this.num = originalNum;

      // Cache the result
      this.cachedValue = calculatedValue;
      this.isDirty = false;
    }

    // Apply global transformation hook (if any) when retrieving the multiplier value
    return Multiplier.applyHook(this.cachedValue, { source: this, kind: 'multiplier' })
  }

  power(effect: Num) {
    this.num = this.num.pow(effect)
    this.isDirty = true
  }

  addLocalHook(name: string, param2: (multiplier: Multiplier) => void, once: boolean = false) {
    if (this.localHooks[name]) return;

    this.localHooks[name] = {
      hook: param2,
      once: once
    }
    this.isDirty = true
  }

  /**
   * Remove a local hook by name.
   * @param name The identifier of the hook to remove
   */
  removeLocalHook(name: string): void {
    if (this.localHooks[name]) {
      delete this.localHooks[name];
      this.isDirty = true;
    }
  }
}
