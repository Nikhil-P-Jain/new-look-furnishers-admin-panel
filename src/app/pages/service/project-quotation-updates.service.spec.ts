import { TestBed } from '@angular/core/testing';

import { ProjectQuotationUpdatesService } from './project-quotation-updates.service';

describe('ProjectQuotationUpdatesService', () => {
  let service: ProjectQuotationUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectQuotationUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
