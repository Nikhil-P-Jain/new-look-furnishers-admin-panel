import { TestBed } from '@angular/core/testing';

import { ProjectLostUpdatesService } from './project-lost-updates.service';

describe('ProjectLostUpdatesService', () => {
  let service: ProjectLostUpdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectLostUpdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
