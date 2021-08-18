
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLostUpdatesComponent } from './project-lost-updates.component';

describe('ProjectLeadUpdatesComponent', () => {
  let component: ProjectLostUpdatesComponent;
  let fixture: ComponentFixture<ProjectLostUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLostUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLostUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
