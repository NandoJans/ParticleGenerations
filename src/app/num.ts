export class Num {
  num: number;
  exp: number;

  constructor(num: number, exp: number) {
    this.num = num;
    this.exp = exp;
  }

  correct = () => {
    let ret_num = this.num
    let ret_exp = this.exp

    while (ret_num >= 10 && ret_num !== 0) {
      ret_num /= 10
      ret_exp += 1
    }
    while (ret_num < 1 && ret_num !== 0 || ret_num === 0 && ret_exp > 0) {
      ret_num *= 10
      ret_exp -= 1
    }

    if (ret_num === 0) {
      ret_num = 0
    }

    this.num = ret_num
    this.exp = ret_exp
  }

  toString = (x=false) => {
    if (this.exp >= 6) {
      return String(this.num.toFixed(2)) + 'e' + String(Math.round(this.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    } else if (this.exp == 0) {
      if (x) {
        return String(this.num.toFixed(2))
      } else {
        return String(Math.floor(this.num))
      }
    } else {
      if (x) {
        return String((this.num * 10 ** this.exp).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      } else {
        return String(Math.floor(this.num * 10 ** this.exp)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    }
  }

  copy = () => {
    return new Num(this.num, this.exp)
  }

  // @ts-ignore
  add = (x: Num, overwrite = true) => {
    let ret_num = this.num
    let ret_exp = this.exp

    if (this.exp < x.exp) {
      ret_exp = x.exp
      ret_num = x.num
      ret_num += this.num / 10 ** (x.exp - this.exp)
    } else if (this.exp > x.exp) {
      ret_num += x.num / 10 ** (this.exp - x.exp)
    } else if (this.exp == x.exp) {
      ret_num = this.num + x.num
    }

    if (ret_num < 0.0001 && ret_exp > 1) {
      ret_num = 0.0001
    }

    while (ret_num >= 10 && ret_num !== 0) {
      ret_exp += 1
      ret_num /= 10
    }
    while (ret_num < 1 && ret_num !== 0) {
      ret_num *= 10
      ret_exp -= 1
    }

    if (overwrite) {
      this.num = ret_num
      this.exp = ret_exp
    } else {
      return new Num(ret_num, ret_exp)
    }
  }

  // @ts-ignore
  sub = (x, overwrite = true) => {
    let ret_exp;
    let ret_num;
    let div;

    if (this.exp >= x.exp) {
      div = this.exp - x.exp;
      ret_exp = this.exp;
      ret_num = this.num - x.num / 10 ** div
    } else {
      div = x.exp - x.exp;
      ret_exp = x.exp;
      ret_num = x.num - this.num / 10 ** div
    }

    if (ret_num < 0) {
      ret_num = 0
    }
    if (ret_exp < 0) {
      ret_exp = 0
    }

    while (ret_num >= 10 && ret_num !== 0) {
      ret_exp += 1
      ret_num /= 10
    }
    while (ret_num < 1 && ret_num !== 0) {
      ret_exp -= 1
      ret_num *= 10
    }

    if (ret_num === 0) ret_exp = 0;

    if (overwrite) {
      this.num = Number(ret_num.toFixed(10))
      this.exp = ret_exp
    } else {
      return new Num(Number(ret_num.toFixed(10)), ret_exp)
    }
  }

  // @ts-ignore
  mul = (x: Num, overwrite = true) => {
    let ret_num = this.num * x.num
    let ret_exp = this.exp + x.exp

    if (ret_num === 0) {
      ret_exp = 0;
    }

    if (ret_num < 0.0001 && ret_exp > 1) {
      ret_num = 0.0001
    }

    if (ret_num >= 10) {
      ret_exp += 1
      ret_num /= 10
    }

    if (overwrite) {
      this.num = Number(ret_num.toFixed(10))
      this.exp = ret_exp
    } else {
      return new Num(Number(ret_num.toFixed(10)), ret_exp)
    }
  }

  // @ts-ignore
  div = (x: Num, overwrite = true) => {
    let ret_num = this.num / x.num
    let ret_exp = this.exp - x.exp

    if (ret_num < 1 && ret_exp > 0) {
      ret_exp -= 1
      ret_num *= 10
    }

    if (overwrite) {
      this.num = Number(ret_num.toFixed(10))
      this.exp = ret_exp
    } else {
      return new Num(Number(ret_num.toFixed(10)), ret_exp)
    }
  }

  // @ts-ignore
  pow = (x: Num, overwrite: boolean = true) => {
    let ret_num_1: Num = new Num(1, 0);
    let ret_exp = this.exp * (x.num * 10 ** x.exp);

    if (this.num ** (x.num * 10 ** x.exp) === Infinity) {
      // @ts-ignore
      ret_num_1.mul(this.pow(x.div(new Num(2, 0), false), false))
      // @ts-ignore
      ret_num_1.mul(this.pow(x.div(new Num(2, 0), false), false))

      return ret_num_1;
    }
    let ret_num_2 = this.num ** (x.num * 10 ** x.exp)

    while (ret_num_2 >= 10 && ret_num_2 !== 0) {
      ret_exp += 1
      ret_num_2 /= 10
    }

    if (ret_num_2 < 0.001) ret_num_2 = 0.001

    while (ret_num_2 < 1 && ret_num_2 !== 0) {
      ret_exp -= 1
      ret_num_2 *= 10
    }

    if (overwrite) {
      this.exp = ret_exp
      this.num = ret_num_2
    } else {
      return new Num(ret_num_2, ret_exp)
    }
  }

  // @ts-ignore
  log = (x: Num, overwrite: boolean) => {
    let ret_num = (this.exp * 10 + this.num - 1) / (x.num * 10 ** x.exp);
    let ret_exp = 0;

    if (overwrite) {
      this.exp = ret_exp
      this.num = ret_num
    } else {
      return new Num(ret_num, ret_exp)
    }
  }


  greq = (x: Num) => {
    if (this.num === 0 && x.num !== 0) return false;
    if (x.num === 0 && this.num !== 0) return true;
    if (this.exp > x.exp) {return true}
    else if (this.exp == x.exp) {
      return this.num >= x.num;
    } else {
      return false
    }
  }

  eqto = (x: Num) => {
    return this.exp == x.exp && this.num == x.num;
  }

  setValue = (json: Num) => {
    this.num = json.num;
    this.exp = json.exp;
  }

  getExponent = () => {
    return this.exp;
  }

  saveData = () => {
    return [this.exp, this.num];
  }
}
