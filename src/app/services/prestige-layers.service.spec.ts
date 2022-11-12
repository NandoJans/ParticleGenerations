import { TestBed } from '@angular/core/testing';

import { PrestigeLayersService } from './prestige-layers.service';

describe('PrestigeLayersService', () => {
  let service: PrestigeLayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestigeLayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
