import { TestBed } from '@angular/core/testing';

import { CampgroundsService } from './campgrounds.service';

describe('CampgroundsService', () => {
  let service: CampgroundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampgroundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
