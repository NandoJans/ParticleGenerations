import {Num} from '../../num';
import {ResetKey} from '../enums/reset-key';
import {Styles} from '../enums/styles';
import {Automator} from './automator';
import {Buyable} from './buyable';

class TestAutomator extends Automator {
  name = 'test-automator';
  displayName = 'Test Automator';
  style = Styles.RED;
  resetId = ResetKey.NONE;
  goal = new Num(1, 0);
  goalString = 'Test goal';
  requirement = [];

  constructor(private readonly buyable: Buyable) {
    super('test-automator');
  }

  buyables(): Buyable[] {
    return [this.buyable];
  }

  task(): Num {
    return new Num(0, 0);
  }
}

describe('Automator', () => {
  let buyable: jasmine.SpyObj<Buyable> & {auto: boolean};
  let automator: TestAutomator;

  beforeEach(() => {
    buyable = jasmine.createSpyObj<Buyable>('Buyable', ['isUnlocked', 'isBuyable', 'buy']) as jasmine.SpyObj<Buyable> & {auto: boolean};
    buyable.auto = false;
    buyable.isUnlocked.and.returnValue(true);
    buyable.isBuyable.and.returnValue(true);

    automator = new TestAutomator(buyable);
    automator.unlocked = true;
    automator.completed = true;
  });

  it('restores automation for its buyables while active', () => {
    automator.active = true;

    automator.run();

    expect(buyable.auto).toBeTrue();
    expect(buyable.buy).toHaveBeenCalled();
  });

  it('does not restore automation while inactive', () => {
    automator.active = false;

    automator.run();

    expect(buyable.auto).toBeFalse();
    expect(buyable.buy).not.toHaveBeenCalled();
  });
});
