import { TestBed, inject } from '@angular/core/testing';

import { PersonToCampusService } from './person-to-campus.service';

describe('PersonToCampusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonToCampusService]
    });
  });

  it('should be created', inject([PersonToCampusService], (service: PersonToCampusService) => {
    expect(service).toBeTruthy();
  }));
});
