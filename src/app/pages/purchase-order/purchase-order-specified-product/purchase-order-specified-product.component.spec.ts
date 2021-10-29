import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderSpecifiedProductComponent } from './purchase-order-specified-product.component';

describe('PurchaseOrderSpecifiedProductComponent', () => {
  let component: PurchaseOrderSpecifiedProductComponent;
  let fixture: ComponentFixture<PurchaseOrderSpecifiedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderSpecifiedProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderSpecifiedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
