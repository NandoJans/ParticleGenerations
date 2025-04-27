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

    if (ret_num >= 10) {
      let arr = ret_num.toString().split('e');
      if (arr[1] !== undefined) {
        ret_num = parseFloat(arr[0])
        ret_exp = parseInt(arr[1].slice(1))
      } else {
        let buff = Math.floor(ret_num).toString().length
        ret_exp += buff
        ret_num *= 10 ** -buff
      }
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

  toString = (decimals = 0) => {
    if (this.exp >= 1e9) {
      let expNum = this.exp;
      let expExp = 0;
      let arr = this.exp.toString().split('e');
      if (arr[1] !== undefined) {
        expNum = parseFloat(arr[0])
        expExp = parseInt(arr[1].slice(1))
      } else {
        let buff = Math.floor(this.exp).toString().length-1
        expExp += buff
        expNum *= 10 ** -buff
      }

      return String(this.num.toFixed(2)) + 'e' + String((expNum.toFixed(2)+'e'+expExp).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    }
    if (this.exp >= 6) {
      return String(this.num.toFixed(2)) + 'e' + String(Math.round(this.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    } else if (this.exp == 0) {
      if (decimals) {
        return String(this.num.toFixed(decimals))
      } else {
        return String(Math.floor(this.num))
      }
    } else {
      if (decimals) {
        return String((this.num * 10 ** this.exp).toFixed(decimals)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      } else {
        return String(Math.floor(this.num * 10 ** this.exp)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    }
  }

  toNumber = () => {
    return this.exp+Math.log10(this.num);
  }

  convertToNumber = () => {
    return this.num * 10 ** this.exp;
  }

  copy = () => {
    return new Num(this.num, this.exp)
  }

  // @ts-ignore
  add = (x: Num, overwrite = true, depth: number = 0): Num => {
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

    if (ret_num < 0.0001 && ret_num > 0) {
      ret_num = 0.0001
    }

    while (ret_num >= 10 || ret_num <= -10 && ret_num !== 0) {
      ret_exp += 1
      ret_num /= 10
    }
    while (ret_num < 1 && ret_num !== 0 && ret_num > 0) {
      ret_num *= 10
      ret_exp -= 1
    }

    if (overwrite) {
      this.num = ret_num
      this.exp = ret_exp
      return this
    } else {
      return new Num(ret_num, ret_exp)
    }
  }

  // @ts-ignore
  sub = (x, overwrite = true): Num => {
    let ret_exp;
    let ret_num;
    let div;

    div = x.exp - this.exp;
    ret_exp = this.exp;
    if (div > 10) {
      ret_exp = x.exp
      ret_num = -x.num;

    } else if (div < -10) {
      ret_num = this.num
    } else {
      ret_num = this.num - x.num * 10 ** div
    }

    while (ret_num >= 10 || ret_num <= -10 && ret_num !== 0) {
      ret_exp += 1
      ret_num /= 10
    }
    while (ret_num < 1 && ret_num !== 0 && ret_num > 0) {
      ret_exp -= 1
      ret_num *= 10
    }

    if (ret_num === 0) ret_exp = 0;

    if (overwrite) {
      this.num = Number(ret_num.toFixed(10))
      this.exp = ret_exp
      return this
    } else {
      return new Num(Number(ret_num.toFixed(10)), ret_exp)
    }
  }

  // @ts-ignore
  mul = (x: Num, overwrite = true): Num => {
    let ret_num = this.num * x.num
    let ret_exp = this.exp + x.exp

    if (ret_num === 0) {
      ret_exp = 0;
    }

    if (ret_num < 0.0001 && ret_exp > 1) {
      ret_num = 0.0001
    }

    if (ret_num >= 10 || ret_num <= -10) {
      ret_exp += 1
      ret_num /= 10
    }

    if (overwrite) {
      this.num = Number(ret_num.toFixed(10))
      this.exp = ret_exp
      return this
    } else {
      return new Num(Number(ret_num.toFixed(10)), ret_exp)
    }
  }

  // @ts-ignore
  div = (x: Num, overwrite = true): Num => {
    let ret_num;
    let ret_exp;
    if (x.num === 0 || this.num === 0) {
      ret_num = this.num;
      ret_exp = this.exp;
    } else {
      ret_num = this.num / x.num;
      ret_exp = this.exp - x.exp;

      if (ret_num < 1 && ret_exp > 0 && ret_num > 0) {
        ret_exp -= 1
        ret_num *= 10
      }
    }

    if (overwrite) {
      this.num = Number(ret_num.toFixed(10))
      this.exp = ret_exp
      return this
    } else {
      return new Num(Number(ret_num.toFixed(10)), ret_exp)
    }
  }

  // @ts-ignore
  pow = (x: Num, overwrite: boolean = true): Num => {
    let ret_exp: number;
    let ret_num: number;
    if (this.num === 0 && this.exp === 0) {
      ret_exp = 0;
      ret_num = 1;
    } else {
      ret_exp = this.exp * (x.num * 10 ** x.exp);
      ret_num = this.num ** (x.num * 10 ** x.exp)
    }

    if (ret_num > 1) {
      ret_num = Math.log10(this.num) * (x.num * 10 ** x.exp)
      ret_exp += Math.floor(ret_num)
      ret_num = Math.pow(10, Number('0.'+ret_num.toString().split('.')[1]))
    }

    if (ret_num >= 10) {
      let arr = ret_num.toString().split('e');
      if (arr[1] !== undefined) {
        ret_num = parseFloat(arr[0])
        ret_exp = parseInt(arr[1].slice(1))
      } else {
        let buff = Math.floor(ret_num).toString().length
        ret_exp += buff
        ret_num *= 10 ** -buff
      }
    }

    if (ret_num === 0) {
      ret_num = 1;
      ret_exp += 10;
    }

    while (ret_num < 1 && ret_num !== 0) {
      ret_exp -= 1
      ret_num *= 10
    }

    if (overwrite) {
      this.exp = ret_exp
      this.num = ret_num
      return this
    } else {
      return new Num(ret_num, ret_exp)
    }
  }

  // @ts-ignore
  log = (x: Num, overwrite: boolean = true): Num => {
    let ret_num = (this.exp * 10 + Math.log10(this.num) * 10) / (x.num * 10 ** x.exp);
    let ret_exp = 0;

    if (ret_num >= 10) {
      let arr = ret_num.toString().split('e');
      if (arr[1] !== undefined) {
        ret_num = parseFloat(arr[0])
        ret_exp = parseInt(arr[1].slice(1))
      } else {
        let buff = Math.floor(ret_num).toString().length-1
        ret_exp += buff
        ret_num *= 10 ** -buff
      }
    }

    if (overwrite) {
      this.exp = ret_exp
      this.num = ret_num
      return this
    } else {
      return new Num(ret_num, ret_exp)
    }
  }

  // @ts-ignore
  log10 = (overwrite: boolean = true): Num => {
    let ret_num = this.exp + Math.log10(this.num);
    let ret_exp = 0

    if (overwrite) {
      this.exp = ret_exp
      this.num = ret_num
      return this
    } else {
      return new Num(ret_num, ret_exp)
    }
  }

  // @ts-ignore
  ln = (overwrite: boolean = true): Num => {
    let ret_exp = 0
    let ret_num = Math.log(10) * (this.exp + Math.log10(this.num))

    if (ret_num === Infinity || ret_num === -Infinity) {
      ret_num = 0;
    }

    if (overwrite) {
      this.exp = ret_exp
      this.num = ret_num
      return this
    } else {
      return new Num(ret_num, ret_exp)
    }
  }

  // @ts-ignore
  negate = (overwrite: boolean = true): Num => {
    const ret_exp = this.exp
    const ret_num = -this.num

    if (overwrite) {
      this.exp = ret_exp
      this.num = ret_num
      return this
    } else {
      return new Num(ret_num, ret_exp)
    }
  }

  // @ts-ignore
  floor = (overwrite: boolean = true): Num => {
    let ret_exp = this.exp
    let ret_num = this.num
    if (ret_exp <= 10 ) {
      ret_num = Math.floor(ret_num * 10 ** ret_exp);
      ret_exp = 0;
    }

    while ((ret_num >= 10 || ret_num <= -10)) {
      ret_exp += 1
      ret_num /= 10
    }

    if (overwrite) {
      this.exp = ret_exp
      this.num = ret_num
      return this
    } else {
      return new Num(ret_num, ret_exp)
    }
  }

  // @ts-ignore
  sqrt = (overwrite: boolean = true): Num => {
    let ret_num = this.num;
    let ret_exp = this.exp;

    if (ret_exp % 2 === 0) {
      ret_num = Math.sqrt(this.num)
    } else {
      ret_num = Math.sqrt(this.num * 10)
    }

    ret_exp /= 2;

    if (ret_num >= 10) {
      ret_exp += 1
      ret_num /= 10
    }

    if (overwrite) {
      this.exp = Math.floor(ret_exp)
      this.num = ret_num
      return this
    } else {
      return new Num(ret_num, Math.floor(ret_exp))
    }
  }


  greq = (x: Num) => {
    //if (this.num === 0 && x.num !== 0) return false;
    //if (x.num === 0 && this.num !== 0) return true;
    if (isNaN(this.num)) {
      this.num = 1
    }
    if (isNaN(x.num)) {
      x.num = 1
    }
    if (x.num < 1) {
      x.num *= 10
      x.exp -= 1
    }
    if (this.num < 1) {
      this.num *= 10
      this.exp -= 1
    }
    if (x.num >= 10) {
      x.num /= 10
      x.exp += 1
    }
    if (this.num >= 10) {
      this.num /= 10
      this.exp += 1
    }
    this.exp = Math.round(this.exp)
    x.exp = Math.round(x.exp)
    if (x.num < 0 && this.num > 0) {
      return true
    } else if (x.num > 0 && this.num < 0) {
      return false
    } else if (this.exp > x.exp) {
      return true
    } else if (this.exp === x.exp) {
      return this.num >= x.num;
    } else {
      return false
    }
  }

  eqto = (x: Num) => {
    return this.exp == x.exp && this.num == x.num;
  }

  setValue = (num: Num) => {
    this.num = num.num;
    this.exp = num.exp;
  }

  getExponent = () => {
    return this.exp;
  }

  saveData = () => {
    return [this.exp, this.num];
  }

  static fromStorage(storageValue: { num: number, exp: number }) {
    if (storageValue === undefined) {
      return undefined;
    }
    return new Num(storageValue.num, storageValue.exp)
  }
}
