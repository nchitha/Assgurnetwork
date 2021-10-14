import { TestBed } from '@angular/core/testing';

import { EngagementService } from './engagement.service';

describe('EngagementService', () => {
  let service: EngagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
