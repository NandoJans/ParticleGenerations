
export class Sorter {

  private static alphaBetSearch(item: any, search: any): any {
    for (let i = 0; i < item.length; i++) {
      const searchChar = search.toLowerCase().charCodeAt(i);
      const itemChar = item.toLowerCase().charCodeAt(i);
      if (searchChar > itemChar) {
        return 'higher';
      } else if (itemChar > searchChar) {
        return 'lower'
      }
    }
    return 'higher';
  }

  static sort(list: any[], value: string): any[] {
    if (list.length === 1) return list;

    const pivot = list[list.length-1]
    const lowerHalf: any[] = [];
    const higherHalf: any[] = [];

    for (let i = 0; i < list.length-1; i++) {
      switch (this.alphaBetSearch(pivot[value], list[i][value])) {
        case 'higher': higherHalf.push(list[i]); break;
        case 'lower': lowerHalf.push(list[i]); break;
      }
    }

    const retArr: any[] = []
    if (lowerHalf.length > 0) {
      this.sort(lowerHalf, value).forEach((item) => {retArr.push(item)})
    }

    retArr.push(pivot)
    if (higherHalf.length > 0) {
      this.sort(higherHalf, value).forEach((item) => {retArr.push(item)})
    }

    return retArr
  }
}
