
export class Searcher {

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
    return 'lower';
  }

  static search(list: any[], value: string, search: string, limit: number = 50): any {
    if (limit === 0) {return undefined}
    const currentItem = list[Math.floor(list.length/2)]
    if (currentItem === undefined) {return undefined}
    if (currentItem[value] === search) {return currentItem}

    switch (this.alphaBetSearch(currentItem[value], search)) {
      case 'higher': return this.search(list.slice(list.length/2), value, search, limit - 1);
      case 'lower': return this.search(list.slice(0, list.length/2), value, search, limit - 1);
    }
  }
}
