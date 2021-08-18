import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLostComponent } from './project-lost.component';

describe('ProjectLeadComponent', () => {
  let component: ProjectLostComponent;
  let fixture: ComponentFixture<ProjectLostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
