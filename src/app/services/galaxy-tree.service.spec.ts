import { TestBed } from '@angular/core/testing';

import { GalaxyTreeService } from './galaxy-tree.service';

describe('GalaxyTreeService', () => {
  let service: GalaxyTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalaxyTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
