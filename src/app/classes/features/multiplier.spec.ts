import { Multiplier, MultiplierListener, MultiplierListenerType } from './multiplier';
import { Num } from '../../num';

describe('Multiplier', () => {
  let multiplier: Multiplier;

  beforeEach(() => {
    multiplier = new Multiplier('test-multiplier', new Num(1, 0));
    // Clear any global hook from previous tests
    Multiplier.globalGetHook = undefined;
  });

  describe('Basic functionality', () => {
    it('should create an instance', () => {
      expect(multiplier).toBeTruthy();
    });

    it('should initialize with the given value', () => {
      expect(multiplier.getNum().toNumber()).toBe(1);
    });

    it('should multiply using correct()', () => {
      multiplier.correct(new Num(2, 0));
      expect(multiplier.getNum().toNumber()).toBe(2);
    });

    it('should add using add()', () => {
      multiplier.add(new Num(5, 0));
      expect(multiplier.getNum().toNumber()).toBe(6);
    });

    it('should apply power using power()', () => {
      multiplier.correct(new Num(2, 0));
      multiplier.power(new Num(3, 0));
      expect(multiplier.getNum().toNumber()).toBe(8);
    });

    it('should reset to original value', () => {
      multiplier.correct(new Num(5, 0));
      multiplier.reset();
      expect(multiplier.getNum().toNumber()).toBe(1);
    });
  });

  describe('Listener registration', () => {
    it('should register a multiply listener', () => {
      multiplier.registerMultiply('test-multiply', () => new Num(2, 0));
      expect(multiplier.hasListener('test-multiply')).toBe(true);
      expect(multiplier.getListenerNames()).toContain('test-multiply');
    });

    it('should register an add listener', () => {
      multiplier.registerAdd('test-add', () => new Num(5, 0));
      expect(multiplier.hasListener('test-add')).toBe(true);
    });

    it('should register a power listener', () => {
      multiplier.registerPower('test-power', () => new Num(2, 0));
      expect(multiplier.hasListener('test-power')).toBe(true);
    });

    it('should deregister a listener', () => {
      multiplier.registerMultiply('test-multiply', () => new Num(2, 0));
      expect(multiplier.hasListener('test-multiply')).toBe(true);
      
      multiplier.deregisterListener('test-multiply');
      expect(multiplier.hasListener('test-multiply')).toBe(false);
    });

    it('should return all listener names', () => {
      multiplier.registerMultiply('multiply-1', () => new Num(2, 0));
      multiplier.registerAdd('add-1', () => new Num(3, 0));
      multiplier.registerPower('power-1', () => new Num(2, 0));
      
      const names = multiplier.getListenerNames();
      expect(names).toContain('multiply-1');
      expect(names).toContain('add-1');
      expect(names).toContain('power-1');
    });
  });

  describe('Listener calculation', () => {
    it('should apply multiply listener on getNum()', () => {
      multiplier.registerMultiply('double', () => new Num(2, 0));
      expect(multiplier.getNum().toNumber()).toBe(2);
    });

    it('should apply add listener on getNum()', () => {
      multiplier.registerAdd('add-five', () => new Num(5, 0));
      expect(multiplier.getNum().toNumber()).toBe(6);
    });

    it('should apply power listener on getNum()', () => {
      multiplier.correct(new Num(2, 0)); // base value is now 2
      multiplier.registerPower('square', () => new Num(2, 0));
      expect(multiplier.getNum().toNumber()).toBe(4);
    });

    it('should apply listeners in order: add, multiply, power', () => {
      // Base: 1
      // After add 2: 3
      // After multiply 2: 6
      // After power 2: 36
      multiplier.registerAdd('add-two', () => new Num(2, 0));
      multiplier.registerMultiply('times-two', () => new Num(2, 0));
      multiplier.registerPower('square', () => new Num(2, 0));
      
      expect(multiplier.getNum().toNumber()).toBe(36);
    });

    it('should combine multiple listeners of the same type', () => {
      multiplier.registerMultiply('double', () => new Num(2, 0));
      multiplier.registerMultiply('triple', () => new Num(3, 0));
      // 1 * 2 * 3 = 6
      expect(multiplier.getNum().toNumber()).toBe(6);
    });
  });

  describe('Caching', () => {
    it('should cache the calculated value', () => {
      let callCount = 0;
      multiplier.registerMultiply('counted', () => {
        callCount++;
        return new Num(2, 0);
      });
      
      // First call calculates
      multiplier.getNum();
      expect(callCount).toBe(1);
      
      // Second call should use cache
      multiplier.getNum();
      expect(callCount).toBe(1);
    });

    it('should invalidate cache on reset()', () => {
      let callCount = 0;
      multiplier.registerMultiply('counted', () => {
        callCount++;
        return new Num(2, 0);
      });
      
      multiplier.getNum();
      expect(callCount).toBe(1);
      
      multiplier.reset();
      multiplier.getNum();
      expect(callCount).toBe(2);
    });

    it('should invalidate cache when adding listener', () => {
      let callCount = 0;
      multiplier.registerMultiply('first', () => {
        callCount++;
        return new Num(2, 0);
      });
      
      multiplier.getNum();
      expect(callCount).toBe(1);
      
      // Adding a new listener should invalidate cache
      multiplier.registerMultiply('second', () => new Num(3, 0));
      multiplier.getNum();
      expect(callCount).toBe(2);
    });

    it('should invalidate cache when removing listener', () => {
      let callCount = 0;
      multiplier.registerMultiply('counted', () => {
        callCount++;
        return new Num(2, 0);
      });
      multiplier.registerMultiply('other', () => new Num(3, 0));
      
      multiplier.getNum();
      expect(callCount).toBe(1);
      
      // Removing a listener should invalidate cache
      multiplier.deregisterListener('other');
      multiplier.getNum();
      expect(callCount).toBe(2);
    });

    it('should invalidate cache when calling correct()', () => {
      let callCount = 0;
      multiplier.registerMultiply('counted', () => {
        callCount++;
        return new Num(2, 0);
      });
      
      multiplier.getNum();
      expect(callCount).toBe(1);
      
      multiplier.correct(new Num(1.5, 0));
      multiplier.getNum();
      expect(callCount).toBe(2);
    });
  });

  describe('Local hooks', () => {
    it('should add and apply local hook', () => {
      multiplier.addLocalHook('double', (m) => {
        m.num = m.num.mul(new Num(2, 0));
      });
      
      expect(multiplier.getNum().toNumber()).toBe(2);
    });

    it('should remove local hook', () => {
      multiplier.addLocalHook('double', (m) => {
        m.num = m.num.mul(new Num(2, 0));
      });
      
      multiplier.removeLocalHook('double');
      expect(multiplier.getNum().toNumber()).toBe(1);
    });

    it('should apply once-only hooks only once', () => {
      let hookCallCount = 0;
      multiplier.addLocalHook('once-hook', (m) => {
        hookCallCount++;
        m.num = m.num.mul(new Num(2, 0));
      }, true);
      
      // First call should apply hook
      expect(multiplier.getNum().toNumber()).toBe(2);
      
      // Reset and call again - hook should be removed
      multiplier.reset();
      expect(multiplier.getNum().toNumber()).toBe(1);
      expect(hookCallCount).toBe(1);
    });
  });

  describe('Global hook', () => {
    it('should apply global hook on getNum()', () => {
      Multiplier.globalGetHook = (value: Num) => value.mul(new Num(10, 0));
      
      expect(multiplier.getNum().toNumber()).toBe(10);
    });

    it('should apply global hook after all other calculations', () => {
      Multiplier.globalGetHook = (value: Num) => value.mul(new Num(10, 0));
      
      multiplier.correct(new Num(2, 0));
      multiplier.registerMultiply('another-double', () => new Num(2, 0));
      
      // Base: 2, listener: *2 = 4, global: *10 = 40
      expect(multiplier.getNum().toNumber()).toBe(40);
    });
  });

  describe('Reset behavior', () => {
    it('should reset base value but keep listeners', () => {
      multiplier.correct(new Num(5, 0));
      multiplier.registerMultiply('double', () => new Num(2, 0));
      
      // Before reset: 5 * 2 = 10
      expect(multiplier.getNum().toNumber()).toBe(10);
      
      // After reset: 1 * 2 = 2 (base reset to 1, listener still active)
      multiplier.reset();
      expect(multiplier.getNum().toNumber()).toBe(2);
      expect(multiplier.hasListener('double')).toBe(true);
    });

    it('should preserve listeners after reset', () => {
      multiplier.registerMultiply('persistent', () => new Num(3, 0));
      multiplier.registerAdd('also-persistent', () => new Num(2, 0));
      
      multiplier.reset();
      
      expect(multiplier.hasListener('persistent')).toBe(true);
      expect(multiplier.hasListener('also-persistent')).toBe(true);
    });
  });
});
