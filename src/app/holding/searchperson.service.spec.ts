import { TestBed, inject } from '@angular/core/testing';

import { SearchpersonService } from './searchperson.service';

describe('SearchpersonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchpersonService]
    });
  });

  it('should be created', inject([SearchpersonService], (service: SearchpersonService) => {
    expect(service).toBeTruthy();
  }));
});
