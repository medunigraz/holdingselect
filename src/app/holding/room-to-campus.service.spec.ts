import { TestBed, inject } from '@angular/core/testing';

import { RoomToCampusService } from './room-to-campus.service';

describe('RoomToCampusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomToCampusService]
    });
  });

  it('should be created', inject([RoomToCampusService], (service: RoomToCampusService) => {
    expect(service).toBeTruthy();
  }));
});
