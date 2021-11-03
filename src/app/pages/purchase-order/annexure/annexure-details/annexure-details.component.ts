import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Annexure_detailsDetailsService } from '../../../service/annexure-details.service';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'ngx-annexure-details',
  templateUrl: './annexure-details.component.html',
  styleUrls: ['./annexure-details.component.scss']
})
export class AnnexureDetailsComponent implements OnInit {
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
  title='Annexure Details';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  dataActive='Active';
  dataDeactive='Deactive';
  uniqueId:any;
  

  get f(){
    return this.formAddEdit.controls;
  }
  
  poid:any;
  poData:any;
  prodInfo:any;
  constructor(
    private activatedroute:ActivatedRoute, 
    private adservice:Annexure_detailsDetailsService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private productservice:ProductService,
    private ds:NbDialogService,
  ) { }

  ngOnInit(): void {
    this.isSubmitted=false;
    this.poid=this.activatedroute.snapshot.params.id;
    console.log(this.poid,"purchase ORder id");
    // this.getpoData();
    this.adservice.getannexure_detailsby_annexure_id(this.poid).subscribe(res=>{
      this.resp=res;
      this.poData=this.resp.data.results;
      console.log(this.poData,"PoData");
      
    })  
    this.productservice.getproduct().subscribe(res=>{
      this.resp1=res;
      this.productData=this.resp1.data.results;
      
      console.log(this.productData,"Product data");
    });
    this.source.load(this.poData);
  }

  settings = {
    mode: 'external',
    actions:false,
   columns: {
    //  annexure_id: {
    //    title: 'Annexure Id',
    //    type: 'string',
    //  },
     product_name: {
       title: 'Product Name',
       type: 'string',
     },
     length:{
       title:'Length',
       type:'string'
     },
     quantity:{
       title:'quantity',
       type:'string'
     },
     total_length:{
      title:'Total Length',
      type:'string'
    },
    module:{
      title:'Module',
      type:'string'
    },
    area:{
      title:'Area',
      type:'string'
    },
    // total_area:{
    //   title:'Total Area',
    //   type:'string'
    // },
    created_date:{
      title:'Created Date',
      type:'string'
    },
     updated_date: {
       title: 'Updated Date',
       type: 'string',
     },
    //  status:{
    //    title:'Status',
    //    type:'string',
    //  },
   },
 };
 source: LocalDataSource = new LocalDataSource();

  open2(dialog: TemplateRef<any>,event:any) {
    console.log("open2 function called");
    console.log(event, "event inside dailog");
    this.uniqueId=event.data.project_lead_id;
    this.adservice.getAnnexure_detailsbyid(this.uniqueId).subscribe(res=>{
      this.resp2=res;
      this.plData1=this.resp2.data.results[0];
      console.log("Getting res",this.plData1);
      this.formAddEdit.reset({
        'project_lead_name':this.plData1.project_lead_name,
        'architect_name':this.plData1.architect_name,
        'department_name':this.plData1.department_name,
        'project_value':this.plData1.project_value,
        'user_id':JSON.stringify(this.plData1.user_id),
        'product_name':this.plData1.product_id,
        'project_lead_remarks':this.plData1.project_lead_remarks,
        'project_current_status':this.plData1.project_current_status,
        'order_status':this.plData1.order_status,
        'project_lead_date':this.plData1.project_lead_date,
        'status':this.plData1.status==0?"Deactive":"Active"
      })
      console.log(this.formAddEdit,"formaddedit");
    })
    this.ds.open(dialog);
  }
  
  open1(dialog:TemplateRef<any>){
    this.formAddEdit.reset();
    this.ds.open(dialog);
  }

  deleteProjectLead(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.adservice.deleteAnnexure_details(event.data.annexure_details_id).subscribe(res=>{
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

  // async onSubmit(ref:any){
  //   console.log("Clicked on submit");
  //   this.isSubmitted = true;
  //   if (this.formAddEdit.invalid) {
  //     console.log("form add edit invalid",this.formAddEdit.invalid);
  //     return;
  //   }
  //   else{
  //     console.log("inside else");
  //     if(this.formAddEdit.value.status==this.dataActive){
  //       this.formAddEdit.value.status=1;
  //     }
  //     else if(this.formAddEdit.value.status==this.dataDeactive){
  //       this.formAddEdit.value.status=0;
  //     }
  //     for(var i=0;i<this.formAddEdit.value.product_name.length;i++){
  //       this.formAddEdit.value.product_name[i]=parseInt(this.formAddEdit.value.product_name[i])
  //     }

  //     if(!this.uniqueId){
  //         var body={
  //         "project_lead_name":this.formAddEdit.value.project_lead_name,
  //         "architect_name":this.formAddEdit.value.architect_name,
  //         "department_name":this.formAddEdit.value.department_name,
  //         "project_value":this.formAddEdit.value.project_value,
  //         "user_id":this.formAddEdit.value.user_id,
  //         "product_id":this.formAddEdit.value.product_name,
  //         "project_lead_remarks":this.formAddEdit.value.project_lead_remarks,
  //         "project_current_status":this.formAddEdit.value.project_current_status,
  //         "order_status":this.formAddEdit.value.order_status,
  //         "project_lead_date":this.formAddEdit.value.project_lead_date,
  //         "status":this.formAddEdit.value.status,
  //       }
  //       console.log(body,"body");  
  //       this.plservice.createprojectlead(body).subscribe(res=>{
  //         this.showToast(this.success_status, this.title, this.add_success_content);
  //         ref.close();
  //         this.ngOnInit();
  //       },err=>{
  //         this.showToast(this.failure_status, this.title, this.add_failure_content);
  //         this.ngOnInit();
  //       });
  //     }
  //     else{
  //       var bo={
  //         "project_lead_name":this.formAddEdit.value.project_lead_name,
  //         "architect_name":this.formAddEdit.value.architect_name,
  //         "department_name":this.formAddEdit.value.department_name,
  //         "project_value":this.formAddEdit.value.project_value,
  //         "user_id":this.formAddEdit.value.user_id,
  //         "product_id":this.formAddEdit.value.product_name,
  //         "project_lead_remarks":this.formAddEdit.value.project_lead_remarks,
  //         "project_current_status":this.formAddEdit.value.project_current_status,
  //         "order_status":this.formAddEdit.value.order_status,
  //         "project_lead_date":this.formAddEdit.value.project_lead_date,
  //         "status":this.formAddEdit.value.status,
  //         "project_lead_id":this.uniqueId
  //       }
  //       this.plservice.updateprojectlead(bo).subscribe(res=>{
  //         this.resp3 = res;
  //         this.showToast(this.success_status, this.title, this.edit_success_content);
  //         ref.close();
  //         this.ngOnInit();
  //         this.uniqueId='';
  //       },(err)=>{
  //         this.showToast(this.failure_status, this.title, this.edit_failure_content);
  //       });
  //     }       
  //   }
  // }

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

  closeHandle(ref:any){
    ref.close();
    this.uniqueId='';
    this.formAddEdit.reset();
  }
}
