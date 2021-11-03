import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnexureDetailsComponent } from './annexure-details.component';

describe('AnnexureDetailsComponent', () => {
  let component: AnnexureDetailsComponent;
  let fixture: ComponentFixture<AnnexureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnexureDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnexureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
