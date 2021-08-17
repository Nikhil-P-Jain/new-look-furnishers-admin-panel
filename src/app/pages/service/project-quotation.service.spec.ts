import { TestBed } from '@angular/core/testing';

import { ProjectQuotationService } from './project-quotation.service';

describe('ProjectQuotationService', () => {
  let service: ProjectQuotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectQuotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
