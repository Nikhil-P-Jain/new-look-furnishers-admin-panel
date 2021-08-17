import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLeadUpdatesComponent } from './project-lead-updates.component';

describe('ProjectLeadUpdatesComponent', () => {
  let component: ProjectLeadUpdatesComponent;
  let fixture: ComponentFixture<ProjectLeadUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLeadUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLeadUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
