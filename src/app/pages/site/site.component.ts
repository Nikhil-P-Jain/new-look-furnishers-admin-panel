import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CityService } from '../service/city.service';
import { SiteService } from '../service/site.service';

@Component({
  selector: 'ngx-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  isSubmitted=false;
  formAddEdit:FormGroup;
  siteData:any;
  siteData1:any;
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
  title='Site';
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
    private siteservice:SiteService,
    public http:HttpClient,
    private cityservice: CityService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,) { }
  // open() {
  //   this.ds.open(AddPermissionComponent, {
  //   });
  // }
  // openEdit(event){
  //   console.log(event,"OPEN")
  //   this.ds.open(EditPermissionComponent)
  // }
  
  ngOnInit(){
    this.isSubmitted=false;
    this.cityservice.getcity().subscribe(res=>{
      this.resp1=res;
      this.cityData=this.resp1.data.results;
      console.log(this.cityData,"City data");
    });
    this.siteservice.getsite().subscribe(res=>{
      this.resp1=res;
      this.siteData=this.resp1.data.results;
      console.log("siteData",this.siteData);
      this.siteData.forEach(element => {
        console.log(element.site_status);  
        if(element.site_status == 0){
          element.site_status=this.dataDeactive
        }else if(element.site_status==1){
          element.site_status=this.dataActive
        }
      });
      // console.log(res,"PERMISSION");
      this.source.load(this.siteData);
    });
    this.formAddEdit=this.formBuilder.group({
      'site_name':['',[Validators.required]],
      'site_address':['',[Validators.required]],
      'site_city_id':['',[Validators.required]],
      'site_status':[]
    })
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
      site_name: {
        title: 'Site  Name',
        type: 'string',
      },
      site_address:{
        title:'Address',
        type:'string',
      },
      city_name:{
        title:'City',
        type:'string',
      },
      site_status: {
        title: 'Site Status',
        type: 'string',
      },
      site_created_date: {
        title: 'Created Date',
        type: 'string',
      },
      site_updated_date: {
        title: 'Updated Date',
        type: 'string',
      },
    },
  };
  // open3() {
  //   this.dialogService.open(DialogNamePromptComponent)
  //     .onClose.subscribe(name => name && this.names.push(name));
  // }

  source: LocalDataSource = new LocalDataSource();
  open2(dialog: TemplateRef<any>,event:any) {
    
    console.log("open2 function called");
    console.log(event, "event inside dailog");
    this.uniqueId=event.data.site_id;
    this.siteservice.getsitebyid(this.uniqueId).subscribe(res=>{
      this.resp2=res;
      this.siteData1=this.resp2.data.results[0];
      console.log("Getting res",this.siteData);
      this.formAddEdit.reset({
        'site_name':this.siteData1.site_name,
        'site_address':this.siteData1.site_address,
        'site_city_id':JSON.stringify(this.siteData1.site_city_id),
        'site_status':this.siteData1.site_status==0?"Deactive":"Active"
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
  

  deleteSite(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.siteservice.deletesite(event.data.site_id).subscribe(res=>{
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
        
        if(this.formAddEdit.value.site_status==this.dataActive){
                this.formAddEdit.value.site_status=1;
        }
        else if(this.formAddEdit.value.site_status==this.dataDeactive){
                this.formAddEdit.value.site_status=0;
        }
        if(!this.uniqueId){
          var body={
            "site_name":this.formAddEdit.value.site_name,
            "site_address":this.formAddEdit.value.site_address,
            "site_city_id":this.formAddEdit.value.site_city_id,
            "site_status":this.formAddEdit.value.site_status,
            }
            console.log(body,"body");
            
          this.siteservice.createsite(body).subscribe(res=>{
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
            "site_name":this.formAddEdit.value.site_name,
            "site_address":this.formAddEdit.value.site_address,
            "site_city_id":this.formAddEdit.value.site_city_id,
            "site_status":this.formAddEdit.value.site_status,
            "site_id":this.uniqueId 
          }
          this.siteservice.updatesite(bo).subscribe(res=>{
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
}
