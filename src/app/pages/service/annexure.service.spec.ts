import { TestBed } from '@angular/core/testing';

import { AnnexureService } from './annexure.service';

describe('AnnexureService', () => {
  let service: AnnexureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnexureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
