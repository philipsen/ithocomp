import { TestBed, inject } from '@angular/core/testing';

import { HousesService } from './houses.service';

describe('HousesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HousesService]
    });
  });

  it('should be created', inject([HousesService], (service: HousesService) => {
    expect(service).toBeTruthy();
  }));
});
