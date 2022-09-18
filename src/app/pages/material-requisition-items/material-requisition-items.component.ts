import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  NbToastrConfig,
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbComponentStatus,
  NbDialogService,
  NbToastrService,
} from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { MaterialRequisitionItemsService } from "../service/material-requisition-items.service";

@Component({
  selector: "ngx-material-requisition-items",
  templateUrl: "./material-requisition-items.component.html",
  styleUrls: ["./material-requisition-items.component.scss"],
})
export class MaterialRequisitionItemsComponent implements OnInit {
  isSubmitted = false;
  response: any;
  response2: any;
  response3: any;
  materialRequisitionItemData: any;
  materialRequisitionItemData1: any;
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
  title = "Material Requisition Item";
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
    private materialRequisitionItemService: MaterialRequisitionItemsService,
    public http: HttpClient,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.isSubmitted = false;
    this.materialRequisitionItemService
      .getMaterialRequisitionItem()
      .subscribe((res) => {
        this.response = res;
        this.materialRequisitionItemData = this.response.data.results;
        console.log(
          "materialRequisitionItemData",
          this.materialRequisitionItemData
        );

        this.materialRequisitionItemData.forEach((element) => {
          console.log(element.status);
          if (element.status == 0) {
            element.status = this.dataDeactive;
          } else if (element.status == 1) {
            element.status = this.dataActive;
          }
        });
        // console.log(res,"PERMISSION");
        this.source.load(this.materialRequisitionItemData);
      });
    this.formAddEdit = this.formBuilder.group({
      material_requisition_items_name: ["", [Validators.required]],
      status: [],
    });
  }

  get f() {
    return this.formAddEdit.controls;
  }
  settings = {
    mode: "external",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
      // columns: {
      //   Role_Name: {
      //     title: 'Role Name',
      //     type: 'string',
      //   },
      // },
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
      material_requisition_items_name: {
        title: "Product",
        type: "string",
      },
      status: {
        title: "Product Status",
        type: "string",
      },
      created_at: {
        title: "Created Date",
        type: "string",
      },
      updated_at: {
        title: "Updated Date",
        type: "string",
      },
    },
  };
  // open3() {
  //   this.dialogService.open(DialogNamePromptComponent)
  //     .onClose.subscribe(name => name && this.names.push(name));
  // }

  source: LocalDataSource = new LocalDataSource();
  open2(dialog: TemplateRef<any>, event: any) {
    console.log("open2 function called");
    if (this.formAddEdit.value.status == this.dataActive) {
      this.formAddEdit.value.status = 1;
    } else {
      this.formAddEdit.value.status = 0;
    }
    console.log(event, "event inside dailog");
    this.uniqueId = event.data.material_requisition_items_id;
    this.materialRequisitionItemService
      .getMaterialRequisitionItemById(this.uniqueId)
      .subscribe((res) => {
        this.response = res;
        this.materialRequisitionItemData1 = this.response.data.results[0];
        console.log("Getting res", this.materialRequisitionItemData);
        this.formAddEdit.reset({
          material_requisition_items_name:
            this.materialRequisitionItemData1.material_requisition_items_name,
          status:
            this.materialRequisitionItemData1.status == 0
              ? "Deactive"
              : "Active",
        });
        // console.log(this.formAddEdit,"formaddedit");
      });
    this.ds.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }
  open1(dialog: TemplateRef<any>) {
    this.ngOnInit();
    this.ds.open(dialog);
  }

  deletepc(event) {
    console.log("ID", event.data);
    if (window.confirm("Are you sure you want to delete?")) {
      this.materialRequisitionItemService
        .deleteMaterialRequisitionItem(event.data.material_requisition_items_id)
        .subscribe(
          (res) => {
            this.response2 = res;
            if (this.response2.success == 1) {
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
              this.edit_failure_content
            );
          }
        );
    } else {
      event.confirm.reject();
    }
  }

  // editpc(ref:any){
  //   this.isSubmitted=true;
  //   if(this.formAddEdit.invalid){
  //     return;
  //   }
  //   else{
  //     if(this.formAddEdit.value.status==this.dataActive){
  //       this.formAddEdit.value.status=1;
  //     }else{
  //       this.formAddEdit.value.status=0;
  //     }
  //     var data = {
  //     "material_requisition_items_name":this.formAddEdit.value.material_requisition_items_name,
  //     "status":this.formAddEdit.value.status,
  //     "material_requisition_items_id":this.uniqueId};
  //     console.log("Getting Data Body:-", data);
  //     this.pcservice.updateproduct_brand(data).subscribe(res=>{
  //       this.resp=res;
  //       if(this.resp.success==1){
  //         this.showToast(this.success_status, this.title, this.edit_success_content);
  //         this.ngOnInit();
  //         ref.close();
  //       }
  //       else{
  //         this.showToast(this.failure_status, this.title, this.edit_failure_content);
  //       }
  //     },
  //     (err)=>{
  //       this.showToast(this.failure_status, this.title, this.edit_failure_content);
  //     }
  //     )
  //   }
  // }

  async onSubmit(ref: any) {
    this.isSubmitted = true;
    if (this.formAddEdit.invalid) {
      return;
    } else {
      if (this.formAddEdit.value.status == this.dataActive) {
        this.formAddEdit.value.status = 1;
      } else {
        this.formAddEdit.value.status = 0;
      }
      if (!this.uniqueId) {
        var body = {
          material_requisition_items_name:
            this.formAddEdit.value.material_requisition_items_name,
          status: this.formAddEdit.value.status,
        };
        this.materialRequisitionItemService
          .createMaterialRequisitionItem(body)
          .subscribe(
            (res) => {
              this.response3 = res;
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
          material_requisition_items_name:
            this.formAddEdit.value.material_requisition_items_name,
          status: this.formAddEdit.value.status,
          material_requisition_items_id: this.uniqueId,
        };

        this.materialRequisitionItemService
          .updateMaterialRequisitionItem(bo)
          .subscribe(
            (res) => {
              this.response3 = res;
              // this.message = this.rep.message;
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
