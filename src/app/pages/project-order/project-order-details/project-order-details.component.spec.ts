import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOrderDetailsComponent } from './project-order-details.component';

describe('ProjectOrderDetailsComponent', () => {
  let component: ProjectOrderDetailsComponent;
  let fixture: ComponentFixture<ProjectOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectOrderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
