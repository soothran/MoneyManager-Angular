import { TestBed } from '@angular/core/testing';

import { CommunityService } from './community.service';

describe('CommunityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunityService = TestBed.get(CommunityService);
    expect(service).toBeTruthy();
  });
});
