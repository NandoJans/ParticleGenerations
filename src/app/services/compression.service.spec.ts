import { TestBed } from '@angular/core/testing';

import { CompressionService } from './compression.service';
import { App } from '../App';
import { Num } from '../num';
import { UpgradeRecord } from '../classes/records/upgrades/upgrade-record';

describe('CompressionService', () => {
  let service: CompressionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompressionService);
    UpgradeRecord.reduceStarKeyCompressionRequirementNuclear.bought = Num.ZERO;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should accumulate progress during offline calculation using simulated time', () => {
    // Arrange: Set up offline calculation mode
    App.offlineCalculation = true;
    const speed = new Num(1, 1); // 10x speed
    
    // Access private properties using bracket notation for testing
    (service as any).compressing = true;
    (service as any).started = Date.now();
    (service as any).lastUpdate = Date.now();
    (service as any).goal = 1000; // Set a goal
    (service as any).progress = 0;
    
    const initialProgress = (service as any).progress;
    
    // Act: Call tick which should use simulated time (50ms * 10 = 500ms)
    service.tick(speed);
    
    const progressAfterFirstTick = (service as any).progress;
    
    // Call tick again
    service.tick(speed);
    
    const progressAfterSecondTick = (service as any).progress;
    
    // Assert: Progress should increase by a significant amount each tick
    // because dt is simulated as 500ms per tick (50ms * speed of 10)
    expect(progressAfterFirstTick).toBeGreaterThan(initialProgress);
    expect(progressAfterSecondTick).toBeGreaterThan(progressAfterFirstTick);
    
    // Cleanup
    App.offlineCalculation = false;
  });

  it('should accumulate progress during normal gameplay using real elapsed time', () => {
    // Arrange: Set up normal gameplay mode
    App.offlineCalculation = false;
    const speed = new Num(1, -1); // Normal speed
    
    (service as any).compressing = true;
    (service as any).started = Date.now();
    (service as any).lastUpdate = Date.now() - 100; // Simulate 100ms elapsed
    (service as any).goal = 1000;
    (service as any).progress = 0;
    
    const initialProgress = (service as any).progress;
    
    // Act: Call tick which should use real elapsed time
    service.tick(speed);
    
    const progressAfterTick = (service as any).progress;
    
    // Assert: Progress should increase based on real elapsed time
    expect(progressAfterTick).toBeGreaterThan(initialProgress);
  });

  it('should require only 1,000 Yellow Keys after buying Compact Stellar Press', () => {
    expect(service.getNeededKeys().equals(new Num(1, 8))).toBeTrue();

    UpgradeRecord.reduceStarKeyCompressionRequirementNuclear.bought = Num.ONE;

    expect(service.getNeededKeys().equals(new Num(1, 3))).toBeTrue();
  });
});
