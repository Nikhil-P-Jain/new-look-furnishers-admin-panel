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
import { BranchService } from "../service/branch.service";
import { environment } from "../../../environments/environment";
import { CityService } from "../service/city.service";
const URL = environment.BASE_URL + "upload/file";
@Component({
  selector: "ngx-branch",
  templateUrl: "./branch.component.html",
  styleUrls: ["./branch.component.scss"],
})
export class BranchComponent implements OnInit {
  hide: boolean = true;
  isSubmitted = false;
  formAddEdit: FormGroup;
  getBranchData: any;
  getBranchByIdData: any;
  getCityResp: any;
  siteData: any;
  getCityData: any;
  upataBranchResp: any;
  getBranchResp: any;
  getBranchByIdResp: any;
  deleteBranchResp: any;
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
  title = "Branch";
  edit_success_content = "Edited Successfully!";
  edit_failure_content = "Could not be edited!";
  delete_success_content = "Deleted Successfully!";
  delete_failure_content = "Could not be deleted!";
  add_success_content = "Added Successfully!";
  add_failure_content = "Could not be added!";
  dataActive = "Active";
  dataDeactive = "Deactive";
  uniqueId: any = "";
  headerURL: any;
  headerImage: any;
  headerImagePath: any;
  footerURL: any;
  footerImage: any;
  footerImagePath: any;
  constructor(
    private ds: NbDialogService,
    // private siteservice:SiteService,
    public http: HttpClient,
    private cityservice: CityService,
    private branchservice: BranchService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.isSubmitted = false;
    this.headerURL = "";
    this.footerURL = "";
    this.cityservice.getcity().subscribe((res) => {
      this.getCityResp = res;
      this.getCityData = this.getCityResp.data.results;
      console.log(this.getCityData, "getCityData");
    });
    // this.siteservice.getsite().subscribe(res=>{
    //   this.getBranchResp=res;
    //   this.siteData=this.getBranchResp.data.results;
    //   console.log(this.siteData,"site data");
    // });
    this.branchservice.getBranch().subscribe((res) => {
      this.getBranchResp = res;
      this.getBranchData = this.getBranchResp.data.results;
      console.log("getBranchData", this.getBranchData);
      this.getBranchData.forEach((element) => {
        console.log(element.status);
        if (element.status == 0) {
          element.status = this.dataDeactive;
        } else if (element.status == 1) {
          element.status = this.dataActive;
        }
      });
      this.source.load(this.getBranchData);
    });
    this.formAddEdit = this.formBuilder.group({
      branchName: ["", [Validators.required]],
      branchAddress: ["", [Validators.required]],
      gstNo: ["", [Validators.required]],
      headerImage: [""],
      footerImage: [""],
      cityId: ["", [Validators.required]],
      status: [""],
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
      branch_name: {
        title: "Branch  Name",
        type: "string",
      },
      branch_address: {
        title: "Branch Name",
        type: "string",
      },
      city_name: {
        title: "City",
        type: "string",
      },
      gst_no: {
        title: "GST Number",
        type: "string",
      },
      header: {
        title: "Header",
        // type:'string',
        type: "html",
        valuePrepareFunction: (value) => {
          return '<img height="150px" width="150px" src= ' + value + "  />";
        },
      },
      footer: {
        title: "Footer",
        // type:'string',
        type: "html",
        valuePrepareFunction: (value) => {
          return '<img height="150px" width="150px" src= ' + value + "  />";
        },
      },
      status: {
        title: "Status",
        type: "string",
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  open2(dialog: TemplateRef<any>, event: any) {
    console.log("open2 function called");
    console.log(event, "event inside dailog");
    this.uniqueId = event.data.branch_id;
    this.branchservice.getBranchById(this.uniqueId).subscribe((res) => {
      this.getBranchByIdResp = res;
      this.getBranchByIdData = this.getBranchByIdResp.data.results[0];
      console.log("Getting res", this.getBranchByIdData);
      this.headerURL = this.getBranchByIdData.header;
      this.headerImagePath = this.getBranchByIdData.header;
      this.footerURL = this.getBranchByIdData.footer;
      this.footerImagePath = this.getBranchByIdData.footer;
      this.formAddEdit.reset({
        branchName: this.getBranchByIdData.branch_name,
        branchAddress: this.getBranchByIdData.branch_address,
        gstNo: this.getBranchByIdData.gst_no,
        cityId: JSON.stringify(this.getBranchByIdData.city_id),
        status: this.getBranchByIdData.status == 0 ? "Deactive" : "Active",
      });
      console.log(this.formAddEdit, "formaddedit");
    });
    this.ds.open(dialog, {
      context: "this is some additional data passed to dialog",
    });
  }

  open1(dialog: TemplateRef<any>) {
    this.ngOnInit();
    this.ds.open(dialog);
  }

  deleteBranch(event) {
    console.log("ID", event.data);
    if (window.confirm("Are you sure you want to delete?")) {
      this.branchservice.deleteBranch(event.data.branch_id).subscribe(
        (res) => {
          this.deleteBranchResp = res;
          if (this.deleteBranchResp.success == 1) {
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

  async selectHeader(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => {
        if (event != undefined) {
          this.headerURL = event.target.result;
        }
      };
    }
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.headerImage = file;
      const formData = new FormData();
      formData.append("file", this.headerImage);
      this.http.post<any>(URL, formData).subscribe((res) => {
        console.log("file path", res.file.path);
        this.headerImagePath = environment.APP_URL+res.file.path;
        // this.headerImagePath = "http://localhost:3000/" + res.file.path;
        console.log("Getting Image :-", this.headerImagePath);
      });
    }
  }
  async selectFooter(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => {
        if (event != undefined) {
          this.footerURL = event.target.result;
        }
      };
    }
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.footerImage = file;
      const formData = new FormData();
      formData.append("file", this.footerImage);
      this.http.post<any>(URL, formData).subscribe((res) => {
        console.log("file path", res.file.path);
        this.footerImagePath = environment.APP_URL+res.file.path;
        // this.footerImagePath = "http://localhost:3000/" + res.file.path;
        console.log("Getting Image :-", this.footerImagePath);
      });
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

      if (this.formAddEdit.value.status == this.dataActive) {
        this.formAddEdit.value.status = 1;
      } else if (this.formAddEdit.value.status == this.dataDeactive) {
        this.formAddEdit.value.status = 0;
      }
      if (!this.uniqueId) {
        var body = {
          branch_name: this.formAddEdit.value.branchName,
          branch_address: this.formAddEdit.value.branchAddress,
          gst_no: this.formAddEdit.value.gstNo,
          header: this.headerImagePath,
          footer: this.footerImagePath,
          city_id: this.formAddEdit.value.cityId,
          status: this.formAddEdit.value.status == 0 ? "Deactive" : "Active",
        };
        console.log(body, "body");
        this.branchservice.createBranch(body).subscribe(
          (res) => {
            this.showToast(
              this.success_status,
              this.title,
              this.add_success_content
            );
            ref.close();
            this.headerURL = "";
            this.footerURL = "";
            this.ngOnInit();
          },
          (err) => {
            console.log(err, "error");

            this.showToast(
              this.failure_status,
              this.title,
              this.add_failure_content
            );
            this.ngOnInit();
          }
        );
      } else {
        console.log(this.formAddEdit.value, "Formaddedit inside update");

        var bo = {
          branch_name: this.formAddEdit.value.branchName,
          branch_address: this.formAddEdit.value.branchAddress,
          gst_no: this.formAddEdit.value.gstNo,
          header: this.headerImagePath,
          footer: this.footerImagePath,
          city_id: this.formAddEdit.value.cityId,
          status: this.formAddEdit.value.status,
          branch_id: this.uniqueId,
        };
        console.log("bo", bo);
        this.branchservice.updateBranch(bo).subscribe(
          (res) => {
            this.upataBranchResp = res;
            console.log("upataBranchResp", this.upataBranchResp);

            // this.message = this.rep.message;
            this.showToast(
              this.success_status,
              this.title,
              this.edit_success_content
            );
            ref.close();
            this.ngOnInit();
            this.uniqueId = "";
            this.headerURL = "";
            this.footerURL = "";
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
    this.headerURL = "";
    this.headerImagePath = "";
    this.footerURL = "";
    this.footerImagePath = "";
    this.formAddEdit.reset();
  }
}
