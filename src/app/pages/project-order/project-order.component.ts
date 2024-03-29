import { HttpClient } from "@angular/common/http";
import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
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
import { BranchService } from "../service/branch.service";
import { ProductBrandService } from "../service/product-brand.service";
import { ProductCategoriesService } from "../service/product-categories.service";
import { ProductService } from "../service/product.service";
import { ProjectOrderService } from "../service/project-order.service";
import { ProjectQuotationService } from "../service/project-quotation.service";
import { SiteService } from "../service/site.service";
import { TermsService } from "../service/terms.service";

@Component({
  selector: "ngx-project-order",
  templateUrl: "./project-order.component.html",
  styleUrls: ["./project-order.component.scss"],
})
export class ProjectOrderComponent implements OnInit {
  isSubmitted = false;
  formAddEdit: FormGroup;
  products: FormArray;
  poData: any;
  poData1: any;
  siteData: any;
  plData: any;
  pqData: any;
  productData: any;
  unitData: any;
  psData: any;
  brandCatResp: any;
  brandCatData: any;
  catProductResp: any;
  catProductData: any;
  resp: any;
  resp1: any;
  resp3: any;
  resp4: any;
  resp5: any;
  resp6: any;
  resp7: any;
  resp8: any;
  resp9: any;
  pbData: any;
  pcData: any;
  resp2: any;
  branchData: any;
  termData: any;
  branchResp: any;
  termResp: any;
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
  title = "Project Order";
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
    private poservice: ProjectOrderService,
    public http: HttpClient,
    private siteservice: SiteService,
    private pqservice: ProjectQuotationService,
    public productservice: ProductService,
    public pcservice: ProductCategoriesService,
    public pbservice: ProductBrandService,
    public branchService: BranchService,
    public termService: TermsService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.isSubmitted = false;
    this.poservice.getproduct().subscribe((res) => {
      this.resp1 = res;
      this.productData = this.resp1.data.results;
      console.log("Getting ProductData", this.productData);
    });
    this.poservice.getproject_lead_name().subscribe((res) => {
      this.resp7 = res;
      this.plData = this.resp7.data.results;
      console.log(this.plData, "Project Lead Name");
    });
    this.poservice.getunit().subscribe((res) => {
      this.resp2 = res;
      this.unitData = this.resp2.data.results;
    });
    this.siteservice.getsite().subscribe((res) => {
      this.resp3 = res;
      this.siteData = this.resp3.data.results;
      console.log(this.siteData, "Site data");
    });
    this.pqservice.getprojectquotation().subscribe((res) => {
      this.resp4 = res;
      this.pqData = this.resp4.data.results;
      console.log(this.pqData, "Project Quotation data");
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
    // this.productservice.getproduct().subscribe(res=>{
    //   this.resp6=res;
    //   this.psData=this.resp6.data.results;
    //   console.log("Getting Specification Data", this.psData)
    // });
    this.poservice.getprojectorder().subscribe((res) => {
      this.resp5 = res;
      this.poData = this.resp5.data.results;
      console.log("poData", this.poData);
      this.poData.forEach((element) => {
        console.log(element.project_order_status);
        if (element.project_order_status == 0) {
          element.project_order_status = this.dataDeactive;
        } else if (element.project_order_status == 1) {
          element.project_order_status = this.dataActive;
        }
      });
      this.source.load(this.poData);
    });
    this.formAddEdit = this.formBuilder.group({
      // 'project_name':[''],
      // 'project_quotation_id':['',[Validators.required]],
      project_quotation_id: [""],
      project_order_date: ["", [Validators.required]],
      project_order_description: ["", [Validators.required]],
      site_id: ["", [Validators.required]],
      branch_id: ["", [Validators.required]],
      term_id: ["", [Validators.required]],
      project_order_status: [""],
      products: this.formBuilder.array([this.createProducts()]),
    });
    console.log(this.formAddEdit, "formAddEdor");
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
    // console.log(this.formAddEdit.get('products'));
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
      quotation_number: {
        title: "Quotation Number",
        type: "string",
      },
      project_order_date: {
        title: "Order Date",
        type: "string",
      },
      project_order_description: {
        title: "Order Description",
        type: "string",
      },
      site_name: {
        title: "Site",
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
      // product_specification_name:{
      //   title:'Product Specification',
      //   type:'string',
      // },
      project_order_status: {
        title: "Order Status",
        type: "string",
      },
      project_order_created_date: {
        title: "Created Date",
        type: "string",
      },
      project_order_updated_date: {
        title: "Updated Date",
        type: "string",
      },
      //or something
      New: {
        title: "Details",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          // return `<a href=http://localhost:4200/#/pages/project-order-details/${row.project_order_id}>View</a>`
          return `<a href=${environment.APP_URL}project-order-details/${row.project_order_id}>View</a>`;
        },
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  open2(dialog: TemplateRef<any>, event: any) {
    this.formAddEdit = this.formBuilder.group({
      // 'project_name':[''],
      // 'project_quotation_id':['',[Validators.required]],
      project_quotation_id: [""],
      project_order_date: ["", [Validators.required]],
      project_order_description: ["", [Validators.required]],
      site_id: ["", [Validators.required]],
      branch_id: ["", [Validators.required]],
      term_id: ["", [Validators.required]],
      project_order_status: [""],
      products: this.formBuilder.array([this.createProducts()]),
    });
    this.formAddEdit.reset();
    console.log("open2 function called");
    console.log(event, "event inside dailog");
    this.uniqueId = event.data.project_order_id;
    this.poservice.getprojectorderbyid(this.uniqueId).subscribe((res) => {
      this.resp2 = res;
      this.poData1 = this.resp2.data.results[0];
      var prodInfo = this.poData1.productinfo;
      console.log("Getting res", prodInfo);
      this.formAddEdit.reset({
        project_quotation_id: JSON.stringify(this.poData1.project_quotation_id),
        project_order_date: this.poData1.project_order_date,
        project_order_description: this.poData1.project_order_description,
        site_id: JSON.stringify(this.poData1.site_id),
        branch_id: JSON.stringify(this.poData1.branch_id),
        term_id: JSON.stringify(this.poData1.term_id),
        project_order_status:
          this.poData1.project_order_status == 0 ? "Deactive" : "Active",
      });
      this.productservice.getproduct().subscribe((res) => {
        this.brandCatResp = res;
        this.brandCatData = this.brandCatResp.data.results;
        console.log(this.brandCatData, "brandcatdfata");

        this.catProductResp = res;
        this.catProductData = this.catProductResp.data.results;
        console.log(this.catProductData, "catProductData");
      });
      // this.poservice.getallspecification().subscribe(res=>{
      //   this.resp6=res;
      //   this.psData=this.resp6.data.results;
      //   console.log("Getting Spesification Data", this.psData)
      // })

      for (var i = 1; i < prodInfo.length; i++) {
        this.products1.push(this.createProducts());
      }

      for (var j = 0; j < this.products1.length; j++) {
        console.log(
          this.products1.controls[j],
          "value of j ",
          j,
          "products1",
          prodInfo[j]
        );

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
          .patchValue(prodInfo[j].project_order_specified_product_quantity);
        this.products1.controls[j]
          .get("unit")
          .patchValue(JSON.stringify(prodInfo[j].unit_id));
      }
      console.log(this.formAddEdit, "formaddedit");
    });
    this.ds.open(dialog, { hasScroll: true });
  }

  // changeprod(e:any){
  //   console.log("Getting selected id", e);
  //     this.poservice.getproductspecificationbyproductid(e).subscribe(res=>{
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

  deleteProjectOrder(event) {
    console.log("ID", event.data);
    if (window.confirm("Are you sure you want to delete?")) {
      this.poservice.deleteprojectorder(event.data.project_order_id).subscribe(
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
          project_order_specified_product_quantity: parseInt(x.quantity),
          unit_id: parseInt(x.unit),
        });
      });
      if (this.formAddEdit.value.project_order_status == this.dataActive) {
        this.formAddEdit.value.project_order_status = 1;
      } else if (
        this.formAddEdit.value.project_order_status == this.dataDeactive
      ) {
        this.formAddEdit.value.project_order_status = 0;
      }
      if (!this.uniqueId) {
        var body = {
          project_quotation_id:
            this.formAddEdit.value.project_quotation_id == ""
              ? 0
              : this.formAddEdit.value.project_quotation_id,
          project_order_date: this.formAddEdit.value.project_order_date,
          project_order_description:
            this.formAddEdit.value.project_order_description,
          site_id: this.formAddEdit.value.site_id,
          branch_id: this.formAddEdit.value.branch_id,
          term_id: this.formAddEdit.value.term_id,
          project_order_status: this.formAddEdit.value.project_order_status,
          productsinfo: prodinfo,
        };
        console.log(body, "body");

        this.poservice.createprojectorder(body).subscribe(
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
          project_quotation_id: this.formAddEdit.value.project_quotation_id,
          project_order_date: this.formAddEdit.value.project_order_date,
          project_order_description:
            this.formAddEdit.value.project_order_description,
          site_id: this.formAddEdit.value.site_id,
          branch_id: this.formAddEdit.value.branch_id,
          term_id: this.formAddEdit.value.term_id,
          project_order_status: this.formAddEdit.value.project_order_status,
          productsinfo: prodinfo,
          project_order_id: this.uniqueId,
        };
        this.poservice.updateprojectorder(bo).subscribe(
          (res) => {
            this.resp3 = res;
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
  closeHandle(ref: any) {
    ref.close();
    this.uniqueId = "";
  }
}
