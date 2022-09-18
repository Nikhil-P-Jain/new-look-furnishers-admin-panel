import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MaterialRequisitionService } from "../../service/material-requisition.service";

@Component({
  selector: "ngx-material-requisition-details",
  templateUrl: "./material-requisition-details.component.html",
  styleUrls: ["./material-requisition-details.component.scss"],
})
export class MaterialRequisitionDetailsComponent implements OnInit {
  materialRequisitionId: any;
  materialRequisitionData: any;
  prodInfo: any;
  constructor(
    private activatedroute: ActivatedRoute,
    private materialRequisitionService: MaterialRequisitionService
  ) {}

  ngOnInit(): void {
    this.materialRequisitionId = this.activatedroute.snapshot.params.id;
    console.log(this.materialRequisitionId, "material req id");
    this.getpoData();
  }

  settings = {
    mode: "external",
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      material_requisition_items_name: {
        title: "Product Name",
        type: "string",
      },
      order_quantity: {
        title: "Order Quantity",
        type: "string",
      },
      stock_at_site: {
        title: "Stock At Site",
        type: "string",
      },
      unit_name: {
        title: "Unit",
        type: "string",
      },
    },
  };

  getpoData() {
    this.materialRequisitionService
      .getMaterialRequisitionById(this.materialRequisitionId)
      .subscribe((res: any) => {
        this.materialRequisitionData = res.data.results[0];
        this.prodInfo = this.materialRequisitionData.info;
        console.log("Getting res", this.prodInfo);
      });
  }
}
