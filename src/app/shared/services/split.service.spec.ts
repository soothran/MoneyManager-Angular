import { TestBed } from '@angular/core/testing';

import { SplitService } from './split.service';

describe('SplitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SplitService = TestBed.get(SplitService);
    expect(service).toBeTruthy();
  });
});
