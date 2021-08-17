import { TestBed } from '@angular/core/testing';

import { ProjectLeadUpdatesService } from './project-lead-updates.service';

describe('ProjectLeadUpdatesService', () => {
  let service: ProjectLeadUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectLeadUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
