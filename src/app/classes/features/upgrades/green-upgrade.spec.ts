import { GreenUpgrade } from './green-upgrade';
import { Num } from '../../../num';

class TestGreenUpgrade extends GreenUpgrade {
  constructor() {
    super('test', 'test-green-upgrade');
  }
  
  displayName: string = 'Test Upgrade';
  baseCost: Num = new Num(1, 0);
  cost: Num = new Num(1, 0);
  
  getDescription(): string {
    return 'Test description';
  }
  
  action(): Num | undefined {
    return new Num(1, 0);
  }
}

describe('GreenUpgrade', () => {
  it('should create an instance', () => {
    expect(new TestGreenUpgrade()).toBeTruthy();
  });
});
