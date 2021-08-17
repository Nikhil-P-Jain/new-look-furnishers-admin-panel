import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbCalendarRange, NbComponentStatus, NbDateService, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../service/user.service';
import { DayCellComponent } from '../extra-components/calendar/day-cell/day-cell.component';
import { ProductBrandService } from '../service/product-brand.service';
import { ProductService } from '../service/product.service';
import { ProjectLeadService } from '../service/project-lead.service';
import { Router } from '@angular/router';
import { ProjectLeadUpdatesService } from '../service/project-lead-updates.service';

@Component({
  selector: 'ngx-project-lead',
  templateUrl: './project-lead.component.html',
  styleUrls: ['./project-lead.component.scss']
})
export class ProjectLeadComponent implements OnInit {
  
  constructor(
    protected dateService: NbDateService<Date>,
    private ds:NbDialogService,
    public router:Router,
    public productservice:ProductService,
    public plservice:ProjectLeadService,
    public userservice:UserService,
    public pbservice:ProductBrandService,
    public http:HttpClient,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,) {}

  isSubmitted=false;
  formAddEdit:FormGroup;
  plData:any;
  plData1:any;
  productData:any;
  userData:any;
  resp:any;
  resp1:any;
  resp3:any;
  resp2:any;
  // public msg1="OOOO";
  public event1:any;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = 'success';
  failure_status: NbComponentStatus = 'danger';
  title='Project Lead';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  dataActive='Active';
  dataDeactive='Deactive';
  uniqueId:any;
  ngOnInit(){
    this.isSubmitted=false;
    this.productservice.getproduct().subscribe(res=>{
      this.resp1=res;
      this.productData=this.resp1.data.results;
      console.log(this.productData,"Product data");
    });
    this.userservice.getuser_name().subscribe(res=>{
      this.resp1=res;
      this.userData=this.resp1.data.results;
      console.log(this.userData,"User data");
    });
    this.plservice.getprojectlead().subscribe(res=>{
      this.resp1=res;
      this.plData=this.resp1.data.results;
      console.log("plData",this.plData);
      this.plData.forEach(element => {
        console.log(element.status);  
        if(element.status == 0){
          element.status=this.dataDeactive
        }else if(element.status==1){
          element.status=this.dataActive
        }
      });
      this.formAddEdit=this.formBuilder.group({
        'project_lead_name':['',[Validators.required]],
        'architect_name':['',[Validators.required]],
        'department_name':['',[Validators.required]],
        'project_value':['',[Validators.required]],
        'user_id':['',[Validators.required]],
        'product_name':[],
        'project_lead_remarks':['',[Validators.required]],
        'project_current_status':['',[Validators.required]],
        'order_status':['',[Validators.required]],
        'project_lead_date':['',[Validators.required]],
        'status':[]
      })
      console.log(this.formAddEdit,"formaddedit");
      this.source.load(this.plData);
    });
    // this.onCustomAction(this.event1);
  }

  get f(){
    return this.formAddEdit.controls;
  }
  
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true,
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
        title: 'Project Name',
        type: 'string',
      },
      architect_name: {
        title: 'Architect Name',
        type: 'string',
      },
      department_name: {
        title: 'Department Name',
        type: 'string',
      },
      project_value: {
        title: 'Project Value',
        type: 'string',
      },
      user_name: {
        title: 'Co-ordinator Name',
        type: 'string',
      },
      product_name:{
        title:'Product Name',
        type:'string',
      },
      project_lead_remarks:{
        title:'Remarks',
        type:'string',
      },
      project_current_status:{
        title:'Project Current Status',
        type:'string',
      },
      order_status:{
        title:'Order Status',
        type:'string',
      },
      project_lead_date:{
        title:'Project Lead Date',
        type:'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      project_lead_created_date: {
        title: 'Created Date',
        type: 'string',
      },
      project_lead_updated_date: {
        title: 'Updated Date',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  open2(dialog: TemplateRef<any>,event:any) {
    console.log("open2 function called");
    console.log(event, "event inside dailog");
    this.uniqueId=event.data.project_lead_id;
    this.plservice.getprojectleadbyid(this.uniqueId).subscribe(res=>{
      this.resp2=res;
      this.plData1=this.resp2.data.results[0];
      console.log("Getting res",this.plData1);
      this.formAddEdit.reset({
        'project_lead_name':this.plData1.project_lead_name,
        'architect_name':this.plData1.architect_name,
        'department_name':this.plData1.department_name,
        'project_value':this.plData1.project_value,
        'user_id':JSON.stringify(this.plData1.user_id),
        'product_name':JSON.stringify(this.plData1.product_id),
        'project_lead_remarks':this.plData1.project_lead_remarks,
        'project_current_status':this.plData1.project_current_status,
        'order_status':this.plData.order_status,
        'project_lead_date':this.plData1.project_lead_date,
        'status':this.plData1.status==0?"Deactive":"Active"
      })
      console.log(this.formAddEdit,"formaddedit");
    })
    this.ds.open(dialog);
  }
  
  open1(dialog:TemplateRef<any>){
    this.ngOnInit();
    this.ds.open(dialog);
  }

  deleteProjectLead(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.plservice.deleteprojectlead(event.data.project_lead_id).subscribe(res=>{
        this.resp=res;
        if(this.resp.success==1){
          this.showToast(this.success_status, this.title, this.delete_success_content);
          this.ngOnInit();
        }
        else{
          this.showToast(this.failure_status, this.title, this.delete_failure_content);
        }
      },
      (err)=>{
        this.showToast(this.failure_status, this.title, this.edit_failure_content);
      })
    }
    else{
      event.confirm.reject();
    }
  }

  async onSubmit(ref:any){
    console.log("Clicked on submit");
    this.isSubmitted = true;
    if (this.formAddEdit.invalid) {
      console.log("form add edit invalid",this.formAddEdit.invalid);
      return;
    }
    else{
      console.log("inside else");
      if(this.formAddEdit.value.status==this.dataActive){
        this.formAddEdit.value.status=1;
      }
      else if(this.formAddEdit.value.status==this.dataDeactive){
        this.formAddEdit.value.status=0;
      }
      if(!this.uniqueId){
        var body={
          "project_lead_name":this.formAddEdit.value.project_lead_name,
          "architect_name":this.formAddEdit.value.architect_name,
          "department_name":this.formAddEdit.value.department_name,
          "project_value":this.formAddEdit.value.project_value,
          "user_id":this.formAddEdit.value.user_id,
          "product_id":this.formAddEdit.value.product_id,
          "project_lead_remarks":this.formAddEdit.value.project_lead_remarks,
          "project_current_status":this.formAddEdit.value.project_current_status,
          "order_status":this.formAddEdit.value.order_status,
          "project_lead_date":this.formAddEdit.value.project_lead_date,
          "status":this.formAddEdit.value.status,
        }
        console.log(body,"body");  
        this.plservice.createprojectlead(body).subscribe(res=>{
          this.showToast(this.success_status, this.title, this.add_success_content);
          ref.close();
          this.ngOnInit();
        },err=>{
          this.showToast(this.failure_status, this.title, this.add_failure_content);
          this.ngOnInit();
        });
      }
      else{
        var bo={
          "project_lead_name":this.formAddEdit.value.project_lead_name,
          "architect_name":this.formAddEdit.value.architect_name,
          "department_name":this.formAddEdit.value.department_name,
          "project_value":this.formAddEdit.value.project_value,
          "user_id":this.formAddEdit.value.user_id,
          "product_id":this.formAddEdit.value.product_id,
          "project_lead_remarks":this.formAddEdit.value.project_lead_remarks,
          "project_current_status":this.formAddEdit.value.project_current_status,
          "order_status":this.formAddEdit.value.order_status,
          "project_lead_date":this.formAddEdit.value.project_lead_date,
          "status":this.formAddEdit.value.status,
          "project_lead_id":this.uniqueId
        }
        this.plservice.updateprojectlead(bo).subscribe(res=>{
          this.resp3 = res;
          this.showToast(this.success_status, this.title, this.edit_success_content);
          ref.close();
          this.ngOnInit();
          this.uniqueId='';
        },(err)=>{
          this.showToast(this.failure_status, this.title, this.edit_failure_content);
        });
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
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(body,`${titleContent}`,config);
  }
  onCustomAction(event) {
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.event1=event;
     this.router.navigate(['pages/project-lead-updates/',this.event1.data.project_lead_id]);
    // this.router.navigateByUrl('pages/project-lead-updates', { queryParams: event });
    // this.event1=event.data;
    // console.log("event1", this.event1) ;
  }  
}