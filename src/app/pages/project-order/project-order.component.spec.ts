import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOrderComponent } from './project-order.component';

describe('ProjectOrderComponent', () => {
  let component: ProjectOrderComponent;
  let fixture: ComponentFixture<ProjectOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
