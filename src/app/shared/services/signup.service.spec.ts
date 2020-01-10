import { TestBed } from '@angular/core/testing';

import { SignupServiceService } from './signup-service.service';

describe('SignupServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignupServiceService = TestBed.get(SignupServiceService);
    expect(service).toBeTruthy();
  });
});
