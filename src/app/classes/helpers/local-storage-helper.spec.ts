import { LocalStorageHelper } from './local-storage-helper';
import { Num } from '../../num';

describe('LocalStorageHelper', () => {
  beforeEach(() => {
    // Reset storage before each test
    LocalStorageHelper['STORAGE'] = {};
    localStorage.clear();
  });

  it('should create an instance', () => {
    const helper = new LocalStorageHelper('test', 'key');
    expect(helper).toBeTruthy();
  });

  it('should save and load Num correctly', () => {
    const helper = new LocalStorageHelper('holdings', 'yellow-particles');
    const original = new Num(1, 3000);
    
    // Save the Num
    helper.saveNum(original);
    
    // Store to localStorage
    helper.store();
    
    // Reload from localStorage
    LocalStorageHelper.reloadStorage();
    
    // Load the Num
    const loaded = helper.loadNum(new Num(0, 0));
    
    expect(loaded.mantissa).toBe(original.mantissa);
    expect(loaded.exponent).toBe(original.exponent);
  });

  it('should handle very large exponents correctly', () => {
    const helper = new LocalStorageHelper('holdings', 'test');
    const testCases = [
      new Num(1, 3000),
      new Num(1.5, 2500),
      new Num(2.75, 5000),
      new Num(9.99, 10000),
    ];

    testCases.forEach((testNum, index) => {
      const key = `test${index}`;
      helper.saveNum(testNum, key);
      helper.store();
      
      LocalStorageHelper.reloadStorage();
      const loaded = helper.loadNum(new Num(0, 0), key);
      
      expect(loaded.mantissa).toBeCloseTo(testNum.mantissa, 10);
      expect(loaded.exponent).toBe(testNum.exponent);
    });
  });

  it('should store Num as plain object, not class instance', () => {
    const helper = new LocalStorageHelper('holdings', 'test');
    const num = new Num(1, 3000);
    
    helper.saveNum(num);
    
    // Check that what's stored is a plain object with mantissa/exponent
    const stored = LocalStorageHelper['STORAGE']['holdings']['test']['x'];
    expect(stored).toBeDefined();
    expect(stored.mantissa).toBe(1);
    expect(stored.exponent).toBe(3000);
    expect(stored.constructor.name).not.toBe('Num');
    expect(stored.constructor.name).toBe('Object');
  });

  it('should handle save/load cycle without data corruption', () => {
    const helper = new LocalStorageHelper('holdings', 'yellow-particles');
    
    // Simulate multiple save/load cycles
    let current = new Num(1, 100);
    
    for (let i = 0; i < 10; i++) {
      // Add to the number
      current = current.add(new Num(1, 50 * i));
      
      // Save
      helper.saveNum(current);
      helper.store();
      
      // Reload
      LocalStorageHelper.reloadStorage();
      const loaded = helper.loadNum(new Num(0, 0));
      
      // Verify no data loss
      expect(loaded.mantissa).toBeCloseTo(current.mantissa, 10);
      expect(loaded.exponent).toBe(current.exponent);
    }
  });
});
