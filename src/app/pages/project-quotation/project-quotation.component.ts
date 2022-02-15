import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NbCalendarRange,
  NbComponentStatus,
  NbDateService,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { UserService } from "../service/user.service";
import { ProductService } from "../service/product.service";
import { ProjectLeadService } from "../service/project-lead.service";
import { ProjectQuotationService } from "../service/project-quotation.service";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { ProductCategoriesService } from "../service/product-categories.service";
import { ProductBrandService } from "../service/product-brand.service";
import { BranchService } from "../service/branch.service";
import { TermsService } from "../service/terms.service";
import { AnyRecord, resolve } from "dns";

@Component({
  selector: "ngx-project-quotation",
  templateUrl: "./project-quotation.component.html",
  styleUrls: ["./project-quotation.component.scss"],
})
export class ProjectQuotationComponent implements OnInit {
  constructor(
    private ds: NbDialogService,
    public productservice: ProductService,
    public pcservice: ProductCategoriesService,
    public plservice: ProjectLeadService,
    public pqservice: ProjectQuotationService,
    public pbservice: ProductBrandService,
    public userservice: UserService,
    public branchService: BranchService,
    public termService: TermsService,
    public http: HttpClient,
    public router: Router,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder
  ) {}
  isSubmitted = false;
  formAddEdit: FormGroup;
  pqData: any;
  pqData1: any;
  plData: any;
  pcData: any;
  pbData: any;
  branchData: any;
  termData: any;
  branchResp: any;
  termResp: any;
  products: FormArray;
  productData: any;
  userData: any;
  unitData: any;
  resp: any;
  resp1: any;
  resp3: any;
  resp2: any;
  resp4: any;
  resp5: any;
  resp6: any;
  resp7: any;
  resp8: any;
  brandCatResp: any;
  brandCatData: any;
  catProductResp: any;
  catProductData: any;
  psData: any;
  event1: any;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = "success";
  failure_status: NbComponentStatus = "danger";
  title = "Project Quotation";
  edit_success_content = "Edited Successfully!";
  edit_failure_content = "Could not be edited!";
  delete_success_content = "Deleted Successfully!";
  delete_failure_content = "Could not be deleted!";
  add_success_content = "Added Successfully!";
  add_failure_content = "Could not be added!";
  dataActive = "Active";
  dataDeactive = "Deactive";
  uniqueId: any;
  ngOnInit() {
    this.isSubmitted = false;
    this.productservice.getproduct().subscribe((res) => {
      this.resp1 = res;
      this.productData = this.resp1.data.results;
      console.log(this.productData, "Product data");
    });
    // this.productservice.getproduct().subscribe((res) => {
    //   this.resp6 = res;
    //   this.psData = this.resp6.data.results;
    //   console.log("Getting Specification Data", this.psData);
    // });
    this.pqservice.getunit().subscribe((res) => {
      this.resp2 = res;
      this.unitData = this.resp2.data.results;
    });
    this.userservice.getuser_name().subscribe((res) => {
      this.resp3 = res;
      this.userData = this.resp3.data.results;
      console.log(this.userData, "User data");
    });
    this.plservice.getprojectnameforquotation().subscribe((res) => {
      this.resp4 = res;
      this.plData = this.resp4.data.results;
      console.log(this.plData, "PL data");
    });
    this.pcservice.getproduct_category().subscribe((res) => {
      this.resp7 = res;
      this.pcData = this.resp7.data.results;
      console.log(this.pcData, "pcData");
    });
    this.pbservice.getproduct_brand().subscribe((res) => {
      this.resp8 = res;
      this.pbData = this.resp8.data.results;
      console.log(this.pbData, "pbData");
    });
    this.branchService.getBranch().subscribe((res) => {
      this.branchResp = res;
      this.branchData = this.branchResp.data.results;
    });
    this.termService.getTerms().subscribe((res) => {
      this.termResp = res;
      this.termData = this.termResp.data.results;
    });
    this.pqservice.getprojectquotation().subscribe((res) => {
      this.resp5 = res;
      this.pqData = this.resp5.data.results;
      console.log("pqData", this.pqData);
      this.pqData.forEach((element) => {
        // console.log(element.status);
        if (element.status == 0) {
          element.status = this.dataDeactive;
        } else if (element.status == 1) {
          element.status = this.dataActive;
        }
      });
      this.source.load(this.pqData);
    });
    this.formAddEdit = this.formBuilder.group({
      project_lead_id: [""],
      client_name: ["", [Validators.required]],
      main_contractor: ["", [Validators.required]],
      user_id: ["", [Validators.required]],
      quotation_number: ["", [Validators.required]],
      quotation_amount: ["", [Validators.required]],
      branch_id: ["", [Validators.required]],
      term_id: ["", [Validators.required]],
      // 'product_name':[],
      remarks: ["", [Validators.required]],
      // 'order_status':['',[Validators.required]],
      date: ["", [Validators.required]],
      status: [""],
      products: this.formBuilder.array([this.createProducts()]),
    });
    console.log(this.formAddEdit, "formaddedit");
  }

  get f() {
    return this.formAddEdit.controls;
  }
  createProducts(): FormGroup {
    return this.formBuilder.group({
      product_brand_id: "",
      product_category_id: "",
      product_id: "",
      // specification_id:'',
      quantity: "",
      unit: "",
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
      project_lead_name: {
        title: "Project Name",
        type: "string",
      },
      client_name: {
        title: "Client Name",
        type: "string",
      },
      main_contractor: {
        title: "Main Contractor",
        type: "string",
      },
      user_name: {
        title: "Co-ordinator Name",
        type: "string",
      },
      branch_name: {
        title: "Branch",
        type: "string",
      },
      term_name: {
        title: "Terms",
        type: "string",
      },
      quotation_number: {
        title: "Quotation Number",
        type: "string",
      },
      quotation_amount: {
        title: "Quotation Amount",
        type: "string",
      },
      // product_name:{
      //   title:'Product Name',
      //   type:'string',
      // },
      remarks: {
        title: "Remarks",
        type: "string",
      },
      // order_status:{
      //   title:'Order Status',
      //   type:'string',
      // },
      date: {
        title: "Date",
        type: "string",
      },
      status: {
        title: "Status",
        type: "string",
      },
      project_quotation_created_date: {
        title: "Created Date",
        type: "string",
      },
      project_quotation_updated_date: {
        title: "Updated Date",
        type: "string",
      },
      //or something
      New: {
        title: "Details",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          // return `<a href=http://localhost:4200/#/pages/project-quotation-updates/${row.project_quotation_id}>View</a>`
          return `<a href=${environment.APP_URL}project-quotation-updates/${row.project_quotation_id}>View</a>`;
        },
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  open2(dialog: TemplateRef<any>, event: any) {
    this.formAddEdit = this.formBuilder.group({
      project_lead_id: [""],
      client_name: ["", [Validators.required]],
      main_contractor: ["", [Validators.required]],
      user_id: ["", [Validators.required]],
      quotation_number: ["", [Validators.required]],
      quotation_amount: ["", [Validators.required]],
      branch_id: ["", [Validators.required]],
      term_id: ["", [Validators.required]],
      // 'product_name':[],
      remarks: ["", [Validators.required]],
      // 'order_status':['',[Validators.required]],
      date: ["", [Validators.required]],
      status: [""],
      products: this.formBuilder.array([this.createProducts()]),
    });
    this.formAddEdit.reset();
    // console.log(this.products1,"products1");
    console.log("open2 function called");
    console.log(event, "event inside dialog");
    this.uniqueId = event.data.project_quotation_id;

    this.pqservice.getprojectquotationbyid(this.uniqueId).subscribe((res) => {
      this.resp2 = res;
      this.pqData1 = this.resp2.data.results[0];
      var prodInfo = this.pqData1.productinfo;
      console.log("Getting res pqData1", this.pqData1);
      this.formAddEdit.reset({
        project_lead_id: JSON.stringify(this.pqData1.project_lead_id),
        client_name: this.pqData1.client_name,
        main_contractor: this.pqData1.main_contractor,
        user_id: JSON.stringify(this.pqData1.user_id),
        quotation_number: this.pqData1.quotation_number,
        quotation_amount: this.pqData1.quotation_amount,
        branch_id: JSON.stringify(this.pqData1.branch_id),
        term_id: JSON.stringify(this.pqData1.term_id),
        // 'product_name':this.pqData1.product_id,
        remarks: this.pqData1.remarks,
        // 'order_status':this.pqData1.order_status,
        date: this.pqData1.date,
        status: this.pqData1.status == 0 ? "Deactive" : "Active",
      });
      this.productservice.getproduct().subscribe((res) => {
        this.brandCatResp = res;
        this.brandCatData = this.brandCatResp.data.results;
        console.log(this.brandCatData, "brandcatdfata");

        this.catProductResp = res;
        this.catProductData = this.catProductResp.data.results;
      });
      for (var i = 1; i < prodInfo.length; i++) {
        this.products1.push(this.createProducts());
      }
      console.log(this.products1, "products1 before");

      for (var j = 0; j < this.products1.length; j++) {
        console.log(this.products1.controls[j], "value of j ", j, "products1");

        this.products1.controls[j]
          .get("product_brand_id")
          .patchValue(JSON.stringify(prodInfo[j].product_brand_id));
        this.products1.controls[j]
          .get("product_category_id")
          .patchValue(JSON.stringify(prodInfo[j].product_category_id));
        this.products1.controls[j]
          .get("product_id")
          .patchValue(JSON.stringify(prodInfo[j].product_id));
        // this.products1.controls[j].get('specification_id').patchValue(JSON.stringify(prodInfo[j].product_specification_id));
        this.products1.controls[j]
          .get("quantity")
          .patchValue(prodInfo[j].pq_specified_products_quantity);
        this.products1.controls[j]
          .get("unit")
          .patchValue(JSON.stringify(prodInfo[j].unit_id));
      }
      // console.log(this.products1,"products1 after");
      // console.log(this.formAddEdit.get('products').value,"dsfcnjfkde");
      console.log(this.formAddEdit, "formaddedit");
    });
    // this.productservice.getproduct().subscribe(res=>{
    //   this.resp6=res;
    //   this.psData=this.resp6.data.results;
    //   console.log("Getting Specification Data", this.psData)
    // })
    this.ds.open(dialog, { hasScroll: true });
  }
  // changeprod(e:any){
  //   console.log("Getting selected id", e);
  //     this.pqservice.getproductspecificationbyproductid(e).subscribe(res=>{
  //     this.resp6=res;
  //     this.psData=this.resp6.data.results;
  //     console.log("Getting Spesification Data", this.psData)
  //   })
  // }
  brandToCategory(e: any) {
    console.log("Brandtocat", e);

    this.pcservice.get_product_category_by_brand_id(e).subscribe((res) => {
      this.brandCatResp = res;
      this.brandCatData = this.brandCatResp.data.results;
      console.log("brandcatdata", this.brandCatData);
    });
  }
  catToProduct(e: any) {
    console.log("catToprod", e);
    this.productservice.get_product_by_category_id(e).subscribe((res) => {
      this.catProductResp = res;
      this.catProductData = this.catProductResp.data.results;
    });
  }

  open1(dialog: TemplateRef<any>) {
    this.ngOnInit();
    this.ds.open(dialog), { hasScroll: true };
  }

  deleteProjectQuotation(event) {
    console.log("ID", event.data);
    if (window.confirm("Are you sure you want to delete?")) {
      this.pqservice
        .deleteprojectquotation(event.data.project_quotation_id)
        .subscribe(
          (res) => {
            this.resp = res;
            if (this.resp.success == 1) {
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

  async onSubmit(ref: any) {
    console.log("Clicked on submit");
    this.isSubmitted = true;
    if (this.formAddEdit.invalid) {
      console.log("form add edit invalid", this.formAddEdit.invalid);
      return;
    } else {
      console.log("inside else");
      var prodinfo = [];
      this.formAddEdit.get("products").value.forEach((x) => {
        prodinfo.push({
          product_id: parseInt(x.product_id),
          product_category_id: parseInt(x.product_category_id),
          product_brand_id: parseInt(x.product_brand_id),
          pq_specified_products_quantity: parseInt(x.quantity),
          unit_id: parseInt(x.unit),
        });
      });
      if (this.formAddEdit.value.status == this.dataActive) {
        this.formAddEdit.value.status = 1;
      } else if (this.formAddEdit.value.status == this.dataDeactive) {
        this.formAddEdit.value.status = 0;
      }
      // for(var i=0;i<this.formAddEdit.value.product_name.length;i++){
      //   this.formAddEdit.value.product_name[i]=parseInt(this.formAddEdit.value.product_name[i])
      // }
      if (!this.uniqueId) {
        var body = {
          project_lead_id:
            this.formAddEdit.value.project_lead_id == ""
              ? 0
              : this.formAddEdit.value.project_lead_id,
          client_name: this.formAddEdit.value.client_name,
          main_contractor: this.formAddEdit.value.main_contractor,
          user_id: this.formAddEdit.value.user_id,
          quotation_number: this.formAddEdit.value.quotation_number,
          quotation_amount: this.formAddEdit.value.quotation_amount,
          branch_id: this.formAddEdit.value.branch_id,
          term_id: this.formAddEdit.value.term_id,
          // "product_id":this.formAddEdit.value.product_name,
          remarks: this.formAddEdit.value.remarks,
          // "order_status":this.formAddEdit.value.order_status,
          date: this.formAddEdit.value.date,
          status: this.formAddEdit.value.status,
          productinfo: prodinfo,
        };
        console.log(body, "body");
        this.pqservice.createprojectquotation(body).subscribe(
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
          project_lead_id: this.formAddEdit.value.project_lead_id,
          client_name: this.formAddEdit.value.client_name,
          main_contractor: this.formAddEdit.value.main_contractor,
          user_id: this.formAddEdit.value.user_id,
          quotation_number: this.formAddEdit.value.quotation_number,
          quotation_amount: this.formAddEdit.value.quotation_amount,
          branch_id: this.formAddEdit.value.branch_id,
          term_id: this.formAddEdit.value.term_id,
          // "product_id":this.formAddEdit.value.product_name,
          remarks: this.formAddEdit.value.remarks,
          // "order_status":this.formAddEdit.value.order_status,
          date: this.formAddEdit.value.date,
          status: this.formAddEdit.value.status,
          productinfo: prodinfo,
          project_quotation_id: this.uniqueId,
        };
        this.pqservice.updateprojectquotation(bo).subscribe(
          (res) => {
            this.resp3 = res;
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
  // onCustomAction(event) {
  //   // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
  //   console.log("Clicked");

  //   this.event1=event;
  //    this.router.navigate(['pages/project-quotation-updates/',this.event1.data.project_quotation_id]);
  //   // this.router.navigateByUrl('pages/project-lead-updates', { queryParams: event });
  //   // this.event1=event.data;
  //   // console.log("event1", this.event1) ;
  // }
  closeHandle(ref: any) {
    ref.close();
    this.uniqueId = "";
  }
}
