import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  NbToastrConfig,
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbComponentStatus,
  NbDialogService,
  NbToastrService,
} from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { environment } from "../../../environments/environment";
import { MaterialRequisitionItemsService } from "../service/material-requisition-items.service";
import { MaterialRequisitionService } from "../service/material-requisition.service";
import { SiteService } from "../service/site.service";
import { UnitService } from "../service/unit.service";
import { UserService } from "../service/user.service";

@Component({
  selector: "ngx-material-requisition",
  templateUrl: "./material-requisition.component.html",
  styleUrls: ["./material-requisition.component.scss"],
})
export class MaterialRequisitionComponent implements OnInit {
  isSubmitted = false;
  products: FormArray;
  materialRequisitionData: any;
  materialRequisitionData1: any;
  siteData: any;
  unitData: any;
  userData: any;
  annexureId: any;
  materialRequisitionItemData: any;
  formAddEdit: FormGroup;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = "success";
  failure_status: NbComponentStatus = "danger";
  dataYes = "Yes";
  dataNo = "No";
  title = "Material Requisition";
  edit_success_content = "Edited Successfully!";
  edit_failure_content = "Could not be edited!";
  delete_success_content = "Deleted Successfully!";
  delete_failure_content = "Could not be deleted!";
  add_success_content = "Added Successfully!";
  add_failure_content = "Could not be added!";
  dataActive = "Active";
  dataDeactive = "Deactive";
  uniqueId: any;
  constructor(
    private ds: NbDialogService,
    private activatedRoute: ActivatedRoute,
    private materialRequisitionService: MaterialRequisitionService,
    private materialRequisitionItemsService: MaterialRequisitionItemsService,
    private userService: UserService,
    private siteService: SiteService,
    private unitService: UnitService,
    public http: HttpClient,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.annexureId = this.activatedRoute.snapshot.params.id;
    this.isSubmitted = false;
    this.materialRequisitionService
      .getMaterialRequisitionByAnnexureId(this.annexureId)
      .subscribe((res: any) => {
        this.materialRequisitionData = res.data.results;
        this.materialRequisitionData.forEach((element) => {
          if (element.status == 0) {
            element.status = this.dataDeactive;
          } else if (element.status == 1) {
            element.status = this.dataActive;
          }
        });
        this.source.load(this.materialRequisitionData);
      });
    this.unitService.getunit().subscribe((res: any) => {
      this.unitData = res.data.results;
    });
    this.materialRequisitionItemsService
      .getMaterialRequisitionItem()
      .subscribe((res: any) => {
        this.materialRequisitionItemData = res.data.results;
      });
    this.siteService.getsite().subscribe((res: any) => {
      this.siteData = res.data.results;
    });
    this.userService.getuser_name().subscribe((res: any) => {
      this.userData = res.data.results;
    });
    this.formAddEdit = this.formBuilder.group({
      site_id: ["", [Validators.required]],
      date: ["", [Validators.required]],
      store_location: ["", [Validators.required]],
      challan_no: ["", [Validators.required]],
      status: [],
      user_id: ["", [Validators.required]],
      products: this.formBuilder.array([this.createProducts()]),
    });
  }

  get f() {
    return this.formAddEdit.controls;
  }
  createProducts(): FormGroup {
    return this.formBuilder.group({
      material_requisition_items_id: "",
      unit: "",
      stock_at_site: "",
      order_quantity: "",
    });
  }
  get products1(): FormArray {
    return this.formAddEdit.get("products") as FormArray;
  }
  addProduct() {
    this.products = this.formAddEdit.get("products") as FormArray;
    this.products.push(this.createProducts());
  }
  removeProducts() {
    (this.formAddEdit.get("products") as FormArray).removeAt(length - 1);
  }
  settings = {
    mode: "external",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      material_requisition_id: {
        title: "Material Requisition Id",
        type: "string",
      },
      status: {
        title: "Status",
        type: "string",
      },
      site_name: {
        title: "Site",
        type: "string",
      },
      store_location: {
        title: "Store Location",
        type: "string",
      },
      challan_no: { title: "Challan No", type: "string" },
      user_name: { title: "User", type: "string" },
      created_at: {
        title: "Created At",
        type: "string",
      },
      updated_at: {
        title: "Updated At",
        type: "string",
      },
      New: {
        title: "Details",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          // return `<a href=http://localhost:4200/#/pages/project-order-details/${row.project_order_id}>View</a>`
          return `<a href=${environment.APP_URL}material-requisition/${row.material_requisition_id}>Material Requisition Details</a>`;
        },
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  openEditDialog(dialog: TemplateRef<any>, event: any) {
    this.formAddEdit = this.formBuilder.group({
      site_id: ["", [Validators.required]],
      date: ["", [Validators.required]],
      store_location: ["", [Validators.required]],
      challan_no: ["", [Validators.required]],
      status: [],
      user_id: ["", [Validators.required]],
      products: this.formBuilder.array([this.createProducts()]),
    });
    this.formAddEdit.reset();
    console.log("open2 function called");
    if (this.formAddEdit.value.status == this.dataActive) {
      this.formAddEdit.value.status = 1;
    } else {
      this.formAddEdit.value.status = 0;
    }
    console.log(event, "event inside dailog");
    this.uniqueId = event.data.material_requisition_id;
    this.materialRequisitionService
      .getMaterialRequisitionById(this.uniqueId)
      .subscribe((res: any) => {
        this.materialRequisitionData1 = res.data.results[0];
        var info = this.materialRequisitionData1.info;
        console.log("Getting res", this.materialRequisitionData1);
        this.formAddEdit.reset({
          site_id: JSON.stringify(this.materialRequisitionData1.site_id),
          date: this.materialRequisitionData1.date,
          store_location: this.materialRequisitionData1.store_location,
          challan_no: this.materialRequisitionData1.challan_no,
          status:
            this.materialRequisitionData1.status == 0 ? "Deactive" : "Active",
          user_id: JSON.stringify(this.materialRequisitionData1.user_id),
        });
        this.materialRequisitionItemsService
          .getMaterialRequisitionItem()
          .subscribe((res: any) => {
            this.materialRequisitionItemData = res.data.results;
          });
        for (var i = 1; i < info.length; i++) {
          this.products1.push(this.createProducts());
        }

        for (var j = 0; j < this.products1.length; j++) {
          this.products1.controls[j]
            .get("material_requisition_items_id")
            .patchValue(JSON.stringify(info[j].material_requisition_items_id));
          this.products1.controls[j]
            .get("unit")
            .patchValue(JSON.stringify(info[j].unit_id));
          this.products1.controls[j]
            .get("stock_at_site")
            .patchValue(info[j].stock_at_site);
          this.products1.controls[j]
            .get("order_quantity")
            .patchValue(info[j].order_quantity);
        }
      });
    this.ds.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }
  openCreateDialog(dialog: TemplateRef<any>) {
    this.ngOnInit();
    this.ds.open(dialog);
  }

  delete(event) {
    if (window.confirm("Are you sure you want to delete?")) {
      this.materialRequisitionService
        .deleteMaterialRequisition(event.data.material_requisition_id)
        .subscribe(
          (res: any) => {
            if (res.success == 1) {
              this.showToast(
                this.success_status,
                this.title,
                this.delete_success_content
              );
              this.ngOnInit();
            } else {
              this.showToast(
                this.failure_status,
                this.title,
                this.delete_failure_content
              );
            }
          },
          (err) => {
            this.showToast(
              this.failure_status,
              this.title,
              this.delete_failure_content
            );
          }
        );
    } else {
      event.confirm.reject();
    }
  }
  async onSubmit(ref: any) {
    this.isSubmitted = true;
    if (this.formAddEdit.invalid) {
      return;
    } else {
      var info = [];
      this.formAddEdit.get("products").value.forEach((x) => {
        info.push({
          material_requisition_items_id: parseInt(
            x.material_requisition_items_id
          ),
          unit_id: parseInt(x.unit),
          stock_at_site: parseInt(x.stock_at_site),
          order_quantity: parseInt(x.order_quantity),
        });
      });
      if (this.formAddEdit.value.status == this.dataActive) {
        this.formAddEdit.value.status = 1;
      } else {
        this.formAddEdit.value.status = 0;
      }
      if (!this.uniqueId) {
        var body = {
          site_id: this.formAddEdit.value.site_id,
          date: this.formAddEdit.value.date,
          store_location: this.formAddEdit.value.store_location,
          challan_no: this.formAddEdit.value.challan_no,
          status: this.formAddEdit.value.status,
          user_id: this.formAddEdit.value.user_id,
          annexure_id: this.annexureId,
          info: info,
        };
        console.log(body);

        this.materialRequisitionService
          .createMaterialRequisition(body)
          .subscribe(
            (res) => {
              this.showToast(
                this.success_status,
                this.title,
                this.add_success_content
              );
              ref.close();
              this.ngOnInit();
            },
            (err) => {
              this.showToast(
                this.failure_status,
                this.title,
                this.add_failure_content
              );
              this.ngOnInit();
            }
          );
      } else {
        var bo = {
          site_id: this.formAddEdit.value.site_id,
          date: this.formAddEdit.value.date,
          store_location: this.formAddEdit.value.store_location,
          challan_no: this.formAddEdit.value.challan_no,
          status: this.formAddEdit.value.status,
          user_id: this.formAddEdit.value.user_id,
          info: info,
          material_requisition_id: this.uniqueId,
        };

        this.materialRequisitionService.updateMaterialRequisition(bo).subscribe(
          (res) => {
            this.showToast(
              this.success_status,
              this.title,
              this.edit_success_content
            );
            ref.close();
            this.ngOnInit();
            this.uniqueId = "";
          },
          (err) => {
            this.showToast(
              this.failure_status,
              this.title,
              this.edit_failure_content
            );
          }
        );
      }
    }
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : "";

    this.toastrService.show(body, `${titleContent}`, config);
  }
}
