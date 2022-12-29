import { TestBed } from '@angular/core/testing';

import { ParticleEmitterService } from './particle-emitter.service';

describe('ParticleEmitterService', () => {
  let service: ParticleEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticleEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
