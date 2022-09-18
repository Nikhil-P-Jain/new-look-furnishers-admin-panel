import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialRequisitionItemsComponent } from "./material-requisition-items.component";

describe("MaterialRequisitionItemsComponent", () => {
  let component: MaterialRequisitionItemsComponent;
  let fixture: ComponentFixture<MaterialRequisitionItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialRequisitionItemsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialRequisitionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
