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
import { TermsService } from "../service/terms.service";
import "./ckeditor.loader";
import "ckeditor";

@Component({
  selector: "ngx-terms",
  templateUrl: "./terms.component.html",
  styleUrls: ["./terms.component.scss"],
})
export class TermsComponent implements OnInit {
  isSubmitted = false;
  formAddEdit: FormGroup;
  getTermsResp: any;
  getTermsData: any;
  getTermsByIdResp: any;
  getTermsByIdData: any;
  deleteTermsResp: any;
  updateTermsResp: any;
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
  title = "Terms";
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
    public http: HttpClient,
    private TermsService: TermsService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.isSubmitted = false;
    this.TermsService.getTerms().subscribe((res) => {
      this.getTermsResp = res;
      this.getTermsData = this.getTermsResp.data.results;
      console.log("getTermsData", this.getTermsData);
      this.getTermsData.forEach((element) => {
        console.log(element.status);
        if (element.status == 0) {
          element.status = this.dataDeactive;
        } else if (element.status == 1) {
          element.status = this.dataActive;
        }
      });
      this.source.load(this.getTermsData);
    });
    this.formAddEdit = this.formBuilder.group({
      term_name: ["", [Validators.required]],
      term: ["", [Validators.required]],
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
      term_name: {
        title: "Term Name",
        type: "string",
      },
      term: {
        title: "Term",
        type: "html",
      },
      status: {
        title: "Status",
        type: "string",
      },
      created_date: {
        title: "Created Date",
        type: "string",
      },
      updated_date: {
        title: "Updated Date",
        type: "string",
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  open2(dialog: TemplateRef<any>, event: any) {
    console.log("open2 function called");
    console.log(event, "event inside dailog");
    this.uniqueId = event.data.term_id;
    this.TermsService.getTermsById(this.uniqueId).subscribe((res) => {
      this.getTermsByIdResp = res;
      this.getTermsByIdData = this.getTermsByIdResp.data.results[0];
      console.log("Getting res", this.getTermsByIdData);
      this.formAddEdit.reset({
        term_name: this.getTermsByIdData.term_name,
        term: this.getTermsByIdData.term,
        status: this.getTermsByIdData.site_status == 0 ? "Deactive" : "Active",
      });
      console.log(this.formAddEdit, "formaddedit");
    });
    this.ds.open(dialog, { hasScroll: true });
  }

  open1(dialog: TemplateRef<any>) {
    this.ngOnInit();
    this.ds.open(dialog, { hasScroll: true });
  }

  deleteTerms(event) {
    console.log("ID", event.data);
    if (window.confirm("Are you sure you want to delete?")) {
      this.TermsService.deleteTerms(event.data.term_id).subscribe(
        (res) => {
          this.deleteTermsResp = res;
          if (this.deleteTermsResp.success == 1) {
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
      // console.log("form add edit invalid",this.formAddEdit.invalid);

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
          term_name: this.formAddEdit.value.term_name,
          term: this.formAddEdit.value.term,
          status: this.formAddEdit.value.status,
        };
        console.log(body, "body");

        this.TermsService.createTerms(body).subscribe(
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
          term_name: this.formAddEdit.value.term_name,
          term: this.formAddEdit.value.term,
          status: this.formAddEdit.value.status,
          term_id: this.uniqueId,
        };
        this.TermsService.updateTerms(bo).subscribe(
          (res) => {
            this.updateTermsResp = res;
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
