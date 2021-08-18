import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbCalendarRange, NbComponentStatus, NbDateService, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../service/user.service';
import { DayCellComponent } from '../extra-components/calendar/day-cell/day-cell.component';
import { ProductService } from '../service/product.service';
import { ProjectLeadService } from '../service/project-lead.service';
import { ProjectQuotationService } from '../service/project-quotation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-project-quotation',
  templateUrl: './project-quotation.component.html',
  styleUrls: ['./project-quotation.component.scss']
})
export class ProjectQuotationComponent implements OnInit {
  date = new Date();
  date2 = new Date();
  range: NbCalendarRange<Date>;
  dayCellComponent = DayCellComponent;

  constructor(
    protected dateService: NbDateService<Date>,
    private ds:NbDialogService,
    public productservice:ProductService,
    public plservice:ProjectLeadService,
    public pqservice:ProjectQuotationService,
    public userservice:UserService,
    public http:HttpClient,
    public router:Router,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,) {
  }
  isSubmitted=false;
  formAddEdit:FormGroup;
  pqData:any;
  pqData1:any;
  plData:any;
  productData:any;
  userData:any;
  resp:any;
  resp1:any;
  resp3:any;
  resp2:any;
  event1:any;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = 'success';
  failure_status: NbComponentStatus = 'danger';
  title='Project Quotation';
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
    this.plservice.getprojectnameforquotation().subscribe(res=>{
      this.resp1=res;
      this.plData=this.resp1.data.results;
      console.log(this.plData,"PL data");
    })
    this.pqservice.getprojectquotation().subscribe(res=>{
      this.resp1=res;
      this.pqData=this.resp1.data.results;
      console.log("pqData",this.pqData);
      this.pqData.forEach(element => {
        // console.log(element.status);  
        if(element.status == 0){
          element.status=this.dataDeactive
        }else if(element.status==1){
          element.status=this.dataActive
        }
      });
      this.formAddEdit=this.formBuilder.group({
        'project_lead_id':['',[Validators.required]],
        'client_name':['',[Validators.required]],
        'main_contractor':['',[Validators.required]],
        'user_id':['',[Validators.required]],
        'quotation_number':['',[Validators.required]],
        'quotation_amount':['',[Validators.required]],
        'product_name':[],
        'remarks':['',[Validators.required]],
        // 'order_status':['',[Validators.required]],
        'date':['',[Validators.required]],
        'status':['']
      })
      console.log(this.formAddEdit,"formaddedit");
      this.source.load(this.pqData);
    });
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
      client_name: {
        title: 'Client Name',
        type: 'string',
      },
      main_contractor: {
        title: 'Main Contractor',
        type: 'string',
      },
      user_name: {
        title: 'Co-ordinator Name',
        type: 'string',
      },
      quotation_number: {
        title: 'Quotation Number',
        type: 'string',
      },
      quotation_amount:{
        title:'Quotation Amount',
        type:'string',
      },
      product_name:{
        title:'Product Name',
        type:'string',
      },
      remarks:{
        title:'Remarks',
        type:'string',
      },
      // order_status:{
      //   title:'Order Status',
      //   type:'string',
      // },
      date:{
        title:'Date',
        type:'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      project_quotation_created_date: {
        title: 'Created Date',
        type: 'string',
      },
      project_quotation_updated_date: {
        title: 'Updated Date',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  open2(dialog: TemplateRef<any>,event:any) {
    console.log("open2 function called");
    console.log(event, "event inside dailog");
    this.uniqueId=event.data.project_quotation_id;
    this.pqservice.getprojectquotationbyid(this.uniqueId).subscribe(res=>{
      this.resp2=res;
      this.pqData1=this.resp2.data.results[0];
      console.log("Getting res",this.pqData1);
      this.formAddEdit.reset({
        'project_lead_id':JSON.stringify(this.pqData1.project_lead_id),
        'client_name':this.pqData1.client_name,
        'main_contractor':this.pqData1.main_contractor,
        'user_id':JSON.stringify(this.pqData1.user_id),
        'quotation_number':this.pqData1.quotation_number,
        'quotation_amount':this.pqData1.quotation_amount,
        'product_name':this.pqData1.product_id,
        'remarks':this.pqData1.remarks,
        // 'order_status':this.pqData1.order_status,
        'date':this.pqData1.date,
        'status':this.pqData1.status==0?"Deactive":"Active"
      })
      console.log(this.formAddEdit,"formaddedit");
    })
    this.ds.open(dialog);
  }
  
  open1(dialog:TemplateRef<any>){
    this.formAddEdit.reset();
    this.ds.open(dialog);
  }

  deleteProjectQuotation(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.pqservice.deleteprojectquotation(event.data.project_quotation_id).subscribe(res=>{
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
      for(var i=0;i<this.formAddEdit.value.product_name.length;i++){
        this.formAddEdit.value.product_name[i]=parseInt(this.formAddEdit.value.product_name[i])
      }
      if(!this.uniqueId){
        var body={
          "project_lead_id":this.formAddEdit.value.project_lead_id,
          "client_name":this.formAddEdit.value.client_name,
          "main_contractor":this.formAddEdit.value.main_contractor,
          "user_id":this.formAddEdit.value.user_id,
          "quotation_number":this.formAddEdit.value.quotation_number,
          "quotation_amount":this.formAddEdit.value.quotation_amount,
          "product_id":this.formAddEdit.value.product_name,
          "remarks":this.formAddEdit.value.remarks,
          // "order_status":this.formAddEdit.value.order_status,
          "date":this.formAddEdit.value.date,
          "status":this.formAddEdit.value.status,
        }
        console.log(body,"body");  
        this.pqservice.createprojectquotation(body).subscribe(res=>{
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
          "project_lead_id":this.formAddEdit.value.project_lead_id,
          "client_name":this.formAddEdit.value.client_name,
          "main_contractor":this.formAddEdit.value.main_contractor,
          "user_id":this.formAddEdit.value.user_id,
          "quotation_number":this.formAddEdit.value.quotation_number,
          "quotation_amount":this.formAddEdit.value.quotation_amount,
          "product_id":this.formAddEdit.value.product_name,
          "remarks":this.formAddEdit.value.remarks,
          // "order_status":this.formAddEdit.value.order_status,
          "date":this.formAddEdit.value.date,
          "status":this.formAddEdit.value.status,
          "project_quotation_id":this.uniqueId
        }
        this.pqservice.updateprojectquotation(bo).subscribe(res=>{
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
    console.log("Clicked");
    
    this.event1=event;
     this.router.navigate(['pages/project-quotation-updates/',this.event1.data.project_quotation_id]);
    // this.router.navigateByUrl('pages/project-lead-updates', { queryParams: event });
    // this.event1=event.data;
    // console.log("event1", this.event1) ;
  }
  closeHandle(ref:any){
    ref.close();
    this.uniqueId='';
    this.formAddEdit.reset();
  }
}