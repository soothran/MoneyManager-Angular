import { TestBed } from '@angular/core/testing';

import { IncomeService } from './income.service';

describe('IncomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncomeService = TestBed.get(IncomeService);
    expect(service).toBeTruthy();
  });
});
