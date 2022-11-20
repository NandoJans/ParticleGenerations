
export class Tester {
  static subjects = {}

  static add(subject: string) {
    // @ts-ignore
    if (this.subjects[subject] === undefined) this.subjects[subject] = 0;
    // @ts-ignore
    this.subjects[subject] += 1;
  }

  static reset() {
    this.subjects = {};
  }

  static print() {
    Object.entries(this.subjects).forEach(entry => {
      console.log('Name  : '+entry[0])
      console.log('Value : '+entry[1])
      console.log('')
    })
  }
}
