import { TestBed } from '@angular/core/testing';

import { ProjectLostService } from './project-lost.service';

describe('ProjectLostService', () => {
  let service: ProjectLostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectLostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
