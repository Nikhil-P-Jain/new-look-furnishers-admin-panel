import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectQuotationComponent } from './project-quotation.component';

describe('ProjectQuotationComponent', () => {
  let component: ProjectQuotationComponent;
  let fixture: ComponentFixture<ProjectQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
