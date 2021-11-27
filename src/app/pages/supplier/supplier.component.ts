import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CityService } from '../service/city.service';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'ngx-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  isSubmitted=false;
  formAddEdit:FormGroup;
  supplierData:any;
  supplierData1:any;
  cityData:any;
  resp:any;
  resp1:any;
  resp3:any;
  resp2:any;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = 'success';
  failure_status: NbComponentStatus = 'danger';
  dataYes='Yes';
  dataNo='No';
  title='Vendor';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  dataActive='Active';
  dataDeactive='Deactive';
  uniqueId:any;
  constructor(private ds:NbDialogService,
    private supplierservice:SupplierService,
    public http:HttpClient,
    private cityservice: CityService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,) { }
  
  ngOnInit(){
    this.isSubmitted=false;
    this.cityservice.getcity().subscribe(res=>{
      this.resp1=res;
      this.cityData=this.resp1.data.results;
      console.log(this.cityData,"City data");
    });
    this.supplierservice.getsupplier().subscribe(res=>{
      this.resp1=res;
      this.supplierData=this.resp1.data.results;
      console.log("supplierData",this.supplierData);
      this.supplierData.forEach(element => {
        console.log(element.supplier_status);  
        if(element.supplier_status == 0){
          element.supplier_status=this.dataDeactive
        }else if(element.supplier_status==1){
          element.supplier_status=this.dataActive
        }
      });
      this.source.load(this.supplierData);
    });
    this.formAddEdit=this.formBuilder.group({
      'supplier_name':['',[Validators.required]],
      'supplier_company':['',[Validators.required]],
      'supplier_address':['',[Validators.required]],
      'city_id':['',[Validators.required]],
      'supplier_contact_no':['',[Validators.required]],
      'supplier_email_id':[],
      'supplier_gst':[],
      'supplier_status':[]
    })
    console.log(this.formAddEdit,"formAddedit");

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
      supplier_name: {
        title: 'Vendor Name',
        type: 'string',
      },
      supplier_company: {
        title: 'Vendor Company',
        type: 'string',
      },
      supplier_address: {
        title: 'Vendor Address',
        type: 'string',
      },
      city_name:{
        title:'City',
        type:'string',
      },
      supplier_contact_no:{
        title:'Contact Number',
        type:'string',
      },
      supplier_email_id:{
        title:'Email Id',
        type:'string',
      },
      supplier_gst:{
        title:'GST No',
        type:'string',
      },
      supplier_status: {
        title: 'Vendor Status',
        type: 'string',
      },
      supplier_created_date: {
        title: 'Created Date',
        type: 'string',
      },
      supplier_updated_date: {
        title: 'Updated Date',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  open2(dialog: TemplateRef<any>,event:any) {
    
    console.log("open2 function called");
    console.log(event, "event inside dailog");
    this.uniqueId=event.data.supplier_id;
    this.supplierservice.getsupplierbyid(this.uniqueId).subscribe(res=>{
      this.resp2=res;
      this.supplierData1=this.resp2.data.results[0];
      console.log("Getting res",this.supplierData1);
      this.formAddEdit.reset({
        'supplier_name':this.supplierData1.supplier_name,
        'supplier_company':this.supplierData1.supplier_company,
        'supplier_address':this.supplierData1.supplier_address,
        'city_id':JSON.stringify(this.supplierData1.city_id),
        'supplier_contact_no':this.supplierData1.supplier_contact_no,
        'supplier_email_id':this.supplierData1.supplier_email_id,
        'supplier_gst':this.supplierData1.supplier_gst,
        'supplier_status':this.supplierData1.supplier_status==0?"Deactive":"Active"
      })
      console.log(this.formAddEdit,"formaddedit");
    })
    this.ds.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }
  
  open1(dialog:TemplateRef<any>){
    this.ngOnInit();
    this.ds.open(dialog);
  }
  

  deleteSupplier(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.supplierservice.deletesupplier(event.data.supplier_id).subscribe(res=>{
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
      }
      )
    }
    else{
      event.confirm.reject();
    }
  }

  async onSubmit(ref:any){
    console.log("Clicked on submit");
    this.isSubmitted = true;
      if (this.formAddEdit.invalid) {
        // console.log("form add edit invalid",this.formAddEdit.invalid);
        
        return;
      }else{
        console.log("inside else");
        
        if(this.formAddEdit.value.supplier_status==this.dataActive){
                this.formAddEdit.value.supplier_status=1;
        }
        else if(this.formAddEdit.value.supplier_status==this.dataDeactive){
                this.formAddEdit.value.supplier_status=0;
        }
        if(!this.uniqueId){
          var body={
            "supplier_name":this.formAddEdit.value.supplier_name,
            "supplier_company":this.formAddEdit.value.supplier_company,
            "supplier_address":this.formAddEdit.value.supplier_address,
            "city_id":this.formAddEdit.value.city_id,
            "supplier_contact_no":this.formAddEdit.value.supplier_contact_no,
            "supplier_email_id":this.formAddEdit.value.supplier_email_id,
            "supplier_gst":this.formAddEdit.value.supplier_gst,
            "supplier_status":this.formAddEdit.value.supplier_status,
            }
            console.log(body,"body");
            
          this.supplierservice.createsupplier(body).subscribe(res=>{
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
            "supplier_name":this.formAddEdit.value.supplier_name,
            "supplier_company":this.formAddEdit.value.supplier_company,
            "supplier_address":this.formAddEdit.value.supplier_address,
            "city_id":this.formAddEdit.value.city_id,
            "supplier_contact_no":this.formAddEdit.value.supplier_contact_no,
            "supplier_email_id":this.formAddEdit.value.supplier_email_id,
            "supplier_gst":this.formAddEdit.value.supplier_gst,
            "supplier_status":this.formAddEdit.value.supplier_status,
            "supplier_id":this.uniqueId 
          }
          this.supplierservice.updatesupplier(bo).subscribe(res=>{
            this.resp3 = res;
            // this.message = this.rep.message;
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

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
  closeHandle(ref:any){
    ref.close();
    this.uniqueId='';
    this.formAddEdit.reset();
  }
}
