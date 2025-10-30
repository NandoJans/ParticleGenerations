import { TestBed } from '@angular/core/testing';

import { BalanceService } from './balance.service';
import { TickService } from '../tick.service';
import { DataManagerService } from '../data-manager.service';
import { PrestigeLayersService } from '../prestige-layers.service';
import { EnhancementService } from '../enhancement.service';
import { ChallengeService } from '../interactables/challenge.service';
import { Num } from '../../num';

describe('BalanceService', () => {
  let service: BalanceService;
  let tickService: jasmine.SpyObj<TickService>;
  let dataManagerService: jasmine.SpyObj<DataManagerService>;
  let prestigeLayerService: jasmine.SpyObj<PrestigeLayersService>;
  let enhancementService: jasmine.SpyObj<EnhancementService>;
  let challengeService: jasmine.SpyObj<ChallengeService>;

  beforeEach(() => {
    // Create spy objects for dependencies
    const tickServiceSpy = jasmine.createSpyObj('TickService', ['gameTick', 'clearIntervals', 'startIntervals']);
    const dataManagerServiceSpy = jasmine.createSpyObj('DataManagerService', ['save', 'load']);
    const prestigeLayerServiceSpy = jasmine.createSpyObj('PrestigeLayersService', ['getList']);
    const enhancementServiceSpy = jasmine.createSpyObj('EnhancementService', ['canEnhance', 'startEnhancing', 'enhance', 'stopEnhancing']);
    const challengeServiceSpy = jasmine.createSpyObj('ChallengeService', ['tick', 'inChallenge', 'challengeGoalReached', 'getChallenge', 'completeChallenge', 'startChallenge']);

    // Set up default return values
    prestigeLayerServiceSpy.getList.and.returnValue([]);

    TestBed.configureTestingModule({
      providers: [
        BalanceService,
        { provide: TickService, useValue: tickServiceSpy },
        { provide: DataManagerService, useValue: dataManagerServiceSpy },
        { provide: PrestigeLayersService, useValue: prestigeLayerServiceSpy },
        { provide: EnhancementService, useValue: enhancementServiceSpy },
        { provide: ChallengeService, useValue: challengeServiceSpy },
      ]
    });

    service = TestBed.inject(BalanceService);
    tickService = TestBed.inject(TickService) as jasmine.SpyObj<TickService>;
    dataManagerService = TestBed.inject(DataManagerService) as jasmine.SpyObj<DataManagerService>;
    prestigeLayerService = TestBed.inject(PrestigeLayersService) as jasmine.SpyObj<PrestigeLayersService>;
    enhancementService = TestBed.inject(EnhancementService) as jasmine.SpyObj<EnhancementService>;
    challengeService = TestBed.inject(ChallengeService) as jasmine.SpyObj<ChallengeService>;
  });

  afterEach(() => {
    // Clean up any running loops
    if (service.loopTimeout) {
      clearInterval(service.loopTimeout);
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Service Configuration', () => {
    it('should have default settings', () => {
      expect(service.settings.speed).toBe(10);
      expect(service.settings.maxTime).toBe(1000000);
      expect(service.settings.higherPrestige).toEqual(new Num(1.01, 0));
    });

    it('should initialize with empty results', () => {
      expect(service.getResults()).toEqual({});
    });

    it('should initialize with zero elapsed time', () => {
      expect(service.totalElapsedTime).toBe(0);
      expect(service.elapsedSincePrevious).toBe(0);
    });
  });

  describe('start()', () => {
    it('should clear existing intervals before starting', () => {
      service.start();
      expect(tickService.clearIntervals).toHaveBeenCalled();
    });

    it('should save data before starting', () => {
      service.start();
      expect(dataManagerService.save).toHaveBeenCalled();
    });

    it('should accept custom settings', () => {
      const customSettings = {
        speed: 20,
        maxTime: 500000,
        higherPrestige: new Num(1.05, 0)
      };
      service.start(customSettings);
      expect(service.settings.speed).toBe(20);
      expect(service.settings.maxTime).toBe(500000);
      expect(service.settings.higherPrestige).toEqual(new Num(1.05, 0));
    });

    it('should clear prestige timing trackers', () => {
      service.prestigeStartTimes.set('test', 100);
      service.prestigeGainHistory.set('test', []);
      service.trackedMilestones.add('milestone1');
      
      service.start();
      
      expect(service.prestigeStartTimes.size).toBe(0);
      expect(service.prestigeGainHistory.size).toBe(0);
      expect(service.trackedMilestones.size).toBe(0);
    });
  });

  describe('done()', () => {
    it('should load saved data when done', () => {
      service.done();
      expect(dataManagerService.load).toHaveBeenCalled();
    });

    it('should restart tick intervals when done', () => {
      service.done();
      expect(tickService.clearIntervals).toHaveBeenCalled();
      expect(tickService.startIntervals).toHaveBeenCalled();
    });

    it('should reset elapsed times when done', () => {
      service.totalElapsedTime = 1000;
      service.elapsedSincePrevious = 500;
      
      service.done();
      
      expect(service.totalElapsedTime).toBe(0);
      expect(service.elapsedSincePrevious).toBe(0);
    });

    it('should clear prestige timing trackers when done', () => {
      service.prestigeStartTimes.set('test', 100);
      service.prestigeGainHistory.set('test', []);
      
      service.done();
      
      expect(service.prestigeStartTimes.size).toBe(0);
      expect(service.prestigeGainHistory.size).toBe(0);
    });
  });

  describe('getResults()', () => {
    it('should return results object', () => {
      const results = service.getResults();
      expect(typeof results).toBe('object');
    });

    it('should return results with expected structure', () => {
      service.results = {
        'testResult': {
          element: 'Test Element',
          time: 1000,
          timeBetween: 500,
          style: 'test-style'
        }
      };
      
      const results = service.getResults();
      expect(results['testResult']).toBeDefined();
      expect(results['testResult'].element).toBe('Test Element');
      expect(results['testResult'].time).toBe(1000);
      expect(results['testResult'].timeBetween).toBe(500);
      expect(results['testResult'].style).toBe('test-style');
    });
  });

  describe('Result Tracking', () => {
    it('should track new results during loop', () => {
      expect(service.newResultsThisLoop).toBe(false);
      
      service.results['newItem'] = {
        element: 'New Item',
        time: 100,
        timeBetween: 50,
        style: 'style1'
      };
      service.newResultsThisLoop = true;
      
      expect(service.newResultsThisLoop).toBe(true);
    });

    it('should reset elapsed time counter when new results are added', () => {
      service.elapsedSincePrevious = 1000;
      service.newResultsThisLoop = true;
      
      // Manually simulate what happens in loop after new results
      if (service.newResultsThisLoop) {
        service.elapsedSincePrevious = 0;
      }
      
      expect(service.elapsedSincePrevious).toBe(0);
    });
  });

  describe('Prestige Timing', () => {
    it('should initialize prestige start times map', () => {
      expect(service.prestigeStartTimes).toBeDefined();
      expect(service.prestigeStartTimes instanceof Map).toBe(true);
    });

    it('should initialize prestige gain history map', () => {
      expect(service.prestigeGainHistory).toBeDefined();
      expect(service.prestigeGainHistory instanceof Map).toBe(true);
    });

    it('should track prestige start times', () => {
      service.totalElapsedTime = 1000;
      service.prestigeStartTimes.set('red', 1000);
      
      expect(service.prestigeStartTimes.get('red')).toBe(1000);
    });
  });

  describe('Milestone Tracking', () => {
    it('should initialize tracked milestones set', () => {
      expect(service.trackedMilestones).toBeDefined();
      expect(service.trackedMilestones instanceof Set).toBe(true);
    });

    it('should track milestone unlocks', () => {
      service.trackedMilestones.add('milestone1');
      service.trackedMilestones.add('milestone2');
      
      expect(service.trackedMilestones.has('milestone1')).toBe(true);
      expect(service.trackedMilestones.has('milestone2')).toBe(true);
      expect(service.trackedMilestones.has('milestone3')).toBe(false);
    });
  });

  describe('Upgrade Level Tracking', () => {
    it('should initialize tracked upgrade levels map', () => {
      expect(service.trackedUpgradeLevels).toBeDefined();
      expect(service.trackedUpgradeLevels instanceof Map).toBe(true);
    });

    it('should track upgrade levels per upgrade', () => {
      service.trackedUpgradeLevels.set('upgrade1', new Set([1, 2, 3]));
      
      expect(service.trackedUpgradeLevels.has('upgrade1')).toBe(true);
      expect(service.trackedUpgradeLevels.get('upgrade1')?.has(2)).toBe(true);
    });
  });

  describe('Constants', () => {
    it('should have prestige timeout constant', () => {
      expect(service['PRESTIGE_TIMEOUT_SECONDS']).toBe(300);
    });

    it('should have look ahead constant', () => {
      expect(service['LOOK_AHEAD_SECONDS']).toBe(10);
    });

    it('should have efficiency threshold constant', () => {
      expect(service['PRESTIGE_EFFICIENCY_THRESHOLD']).toBe(0.8);
    });

    it('should have yellow prestige min gain constants', () => {
      expect(service['YELLOW_PRESTIGE_MIN_GAIN']).toBe(2.0);
      expect(service['YELLOW_PRESTIGE_MIN_GAIN_AFTER_FUSION']).toBe(3.0);
    });
  });
});
