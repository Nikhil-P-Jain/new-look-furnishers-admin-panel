import { TestBed } from "@angular/core/testing";

import { MaterialRequisitionItemsService } from "./material-requisition-items.service";

describe("MaterialRequisitionItemsService", () => {
  let service: MaterialRequisitionItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialRequisitionItemsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
