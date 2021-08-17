import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQuotationUpdatesComponent } from './project-quotation-updates.component';

describe('ProjectQuotationUpdatesComponent', () => {
  let component: ProjectQuotationUpdatesComponent;
  let fixture: ComponentFixture<ProjectQuotationUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectQuotationUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectQuotationUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
