import { TestBed } from '@angular/core/testing';

import { ProjectLeadService } from './project-lead.service';

describe('ProjectLeadService', () => {
  let service: ProjectLeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectLeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
