import { TestBed } from '@angular/core/testing';

import { Annexure_detailsDetailsService } from './annexure-details.service';

describe('AnnexureDetailsService', () => {
  let service: Annexure_detailsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Annexure_detailsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
