import { TestBed, inject } from '@angular/core/testing';

import { PostHoldingService } from './post-holding.service';

describe('PostHoldingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostHoldingService]
    });
  });

  it('should be created', inject([PostHoldingService], (service: PostHoldingService) => {
    expect(service).toBeTruthy();
  }));
});
