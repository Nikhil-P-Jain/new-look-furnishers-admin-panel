import { TestBed } from '@angular/core/testing';

import { AnnexureDetailsService } from './annexure-details.service';

describe('AnnexureDetailsService', () => {
  let service: AnnexureDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnexureDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
