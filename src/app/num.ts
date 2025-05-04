export class Num {
  mantissa: number;   // in [1,10) or 0
  exponent: number;   // integer power of 10
  static ZERO: Num = new Num(0, 0);
  static ONE: Num = new Num(1, 0);
  static TWO: Num = new Num(2, 0);
  static THREE: Num = new Num(3, 0);
  static FOUR: Num = new Num(4, 0);


  constructor(mantissa: number, exponent: number) {
    this.mantissa = mantissa;
    this.exponent = exponent;
    this.normalize();
  }

  /** Normalize mantissa into [1,10) (or zero) and adjust exponent */
  private normalize(): void {
    if (!isFinite(this.mantissa) || isNaN(this.mantissa) || this.mantissa === 0) {
      // zero out
      this.mantissa = 0;
      this.exponent = 0;
      return;
    }
    // shift so mantissa in [1,10)
    const shift = Math.floor(Math.log10(Math.abs(this.mantissa)));
    this.mantissa /= Math.pow(10, shift);
    this.exponent += shift;
    // guard: if mantissa pushed to 10 by rounding
    if (this.mantissa >= 10) {
      this.mantissa /= 10;
      this.exponent += 1;
    }
  }

  /** Create a fresh copy */
  copy(): Num {
    return new Num(this.mantissa, this.exponent);
  }

  /** For serializing back to storage */
  saveData(): { mantissa: number; exponent: number } {
    return { mantissa: this.mantissa, exponent: this.exponent };
  }

  /** Reverse of saveData */
  static fromStorage(obj: { mantissa: number; exponent: number }): Num {
    return new Num(obj.mantissa, obj.exponent);
  }

  /** JS number (may overflow or lose precision if exponent is large) */
  toNumber(): number {
    return this.mantissa * Math.pow(10, this.exponent);
  }

  /** String with optional decimals and comma‐grouping */
  toString(decimals: number = 0, exponentDecimals: number = 2): string {
    if (this.mantissa === 0) return "0";
    // scientific if too big or too small
    if (this.exponent >= 6 || this.exponent <= -4) {
      return `${this.mantissa.toFixed(exponentDecimals)}e${this.exponent}`;
    }
    // otherwise full number with commas
    const str = this.toNumber().toFixed(decimals);
    const parts = str.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  /** a + b */
  add(b: Num): Num {
    // zero‐short‐circuit
    if (this.mantissa === 0) return b.copy();
    if (b.mantissa === 0) return this.copy();

    // align exponents
    const diff = this.exponent - b.exponent;
    if (diff === 0) {
      return new Num(this.mantissa + b.mantissa, this.exponent);
    } else if (diff > 0) {
      // this is larger
      return new Num(this.mantissa + b.mantissa / Math.pow(10, diff), this.exponent);
    } else {
      // b is larger
      return new Num(this.mantissa / Math.pow(10, -diff) + b.mantissa, b.exponent);
    }
  }

  /** a - b */
  sub(b: Num): Num {
    return this.add(b.negate());
  }

  /** a * b */
  mul(b: Num): Num {
    if (this.mantissa === 0 || b.mantissa === 0) {
      return new Num(0, 0);
    }
    return new Num(this.mantissa * b.mantissa, this.exponent + b.exponent);
  }

  /** a / b */
  div(b: Num): Num {
    if (b.mantissa === 0) {
      throw new Error("Division by zero in Num.div");
    }
    if (this.mantissa === 0) {
      return new Num(0, 0);
    }
    return new Num(this.mantissa / b.mantissa, this.exponent - b.exponent);
  }

  /** a ^ x, where x can be a Num or raw number */
  pow(x: Num | number): Num {
    // get the real exponent value
    const expVal = x instanceof Num ? x.toNumber() : x;
    if (this.mantissa < 0) {
      throw new Error("Negative base in Num.pow");
    }
    if (this.mantissa === 0) {
      return new Num(0, 0);
    }
    // log10(this)
    const log10this = this.exponent + Math.log10(this.mantissa);
    // multiply by exponent
    const resultLog = log10this * expVal;
    const newExp  = Math.floor(resultLog);
    const newMan  = Math.pow(10, resultLog - newExp);
    return new Num(newMan, newExp);
  }

  /** natural log ln(a) */
  ln(): Num {
    if (this.mantissa <= 0) {
      // clamp non-positive to zero
      return new Num(0, 0);
    }
    // ln(a) = log10(a)*ln(10)
    const log10this = this.exponent + Math.log10(this.mantissa);
    return new Num(log10this * Math.LN10, 0);
  }

  /** log base 10 */
  log10(): Num {
    const log10this = this.exponent + Math.log10(this.mantissa);
    return new Num(log10this, 0);
  }

  /** log base b (b can be Num or number) */
  log(b: Num | number): Num {
    const lnA = this.ln().toNumber();
    const lnB = (b instanceof Num ? b.ln() : new Num(Math.log(b as number), 0)).toNumber();
    return new Num(lnA / lnB, 0);
  }

  /** sqrt(a) = a^(1/2) */
  sqrt(): Num {
    return this.pow(0.5);
  }

  /** floor(a) → integer part */
  floor(): Num {
    // if too small, floor is zero
    if (this.exponent < 0) return new Num(0, 0);
    // if exponent is modest, we can safely toNumber + Math.floor
    if (this.exponent <= 15) {
      return new Num(Math.floor(this.toNumber()), 0);
    }
    // number is ≥ 1e16; fractional part is in the mantissa:
    // floor just truncates mantissa * 10^exponent to integer,
    // but since exponent>>, we can drop any <1 unit in mantissa:
    return new Num(this.mantissa, this.exponent);
  }

  /** ≥ comparison */
  greq(b: Num): boolean {
    // Check if mantissa is negative
    if (this.mantissa < 0 && b.mantissa > 0) {
      return false;
    }
    if (this.mantissa > 0 && b.mantissa < 0) {
      return true;
    }
    if (this.mantissa === 0 && b.mantissa === 0) return true;
    if (this.exponent !== b.exponent) {
      return this.exponent > b.exponent;
    }
    return this.mantissa >= b.mantissa;
  }

  /** true if this > other */
  gt(other: Num): boolean {
    // Check if mantissa is negative
    if (this.mantissa === 0) return false;
    if (other.mantissa === 0) return true;
    if (this.mantissa < 0 && other.mantissa > 0) {
      return false;
    }
    if (this.mantissa > 0 && other.mantissa < 0) {
      return true;
    }
    if (this.exponent !== other.exponent) {
      return this.exponent > other.exponent;
    }
    return this.mantissa > other.mantissa;
  }


  /** < comparison */
  lt(b: Num): boolean {
    return !this.greq(b) && !this.equals(b);
  }

  /** equals */
  equals(b: Num): boolean {
    return this.exponent === b.exponent && this.mantissa === b.mantissa;
  }

  /** negate sign */
  negate(): Num {
    return new Num(-this.mantissa, this.exponent);
  }

  lte(b: Num) {
    return this.lt(b) || this.equals(b);
  }
}
