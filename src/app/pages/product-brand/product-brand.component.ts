import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductBrandService } from '../service/product-brand.service';

@Component({
  selector: 'ngx-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.scss']
})
export class ProductBrandComponent implements OnInit {

  
  isSubmitted=false;
  formAddEdit:FormGroup;
  pcData:any;
  pcData1:any;
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
  title='Product brand';
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
    private pbservice:ProductBrandService,
    public http:HttpClient,
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
    this.pbservice.getproduct_brand().subscribe(res=>{
      this.resp1=res;
      this.pcData=this.resp1.data.results;
      console.log("pcData",this.pcData);
      
      this.pcData.forEach(element => {
        console.log(element.product_brand_status);  
        if(element.product_brand_status == 0){
          element.product_brand_status=this.dataDeactive
        }else if(element.product_brand_status==1){
          element.product_brand_status=this.dataActive
        }
      });
      this.formAddEdit=this.formBuilder.group({
        'product_brand_name':['',[Validators.required]],
        'product_brand_status':[]
      })
      // console.log(res,"PERMISSION");
      this.source.load(this.pcData);
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
      product_brand_name: {
        title: 'Brand Name',
        type: 'string',
      },
      product_brand_status: {
        title: 'Brand Status',
        type: 'string',
      },
      product_brand_created_date: {
        title: 'Created Date',
        type: 'string',
      },
      product_brand_updated_date: {
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
    if(this.formAddEdit.value.product_brand_status==this.dataActive){
      this.formAddEdit.value.product_brand_status=1;
    }else{
      this.formAddEdit.value.product_brand_status=0;
    }
    console.log(event, "event inside dailog");
    this.uniqueId=event.data.product_brand_id;
    this.pbservice.getproduct_brandbyid(this.uniqueId).subscribe(res=>{
      this.resp2=res;
      this.pcData1=this.resp2.data.results[0];
      console.log("Getting res",this.pcData);
      this.formAddEdit.reset({
        'product_brand_name':this.pcData1.product_brand_name,
        'product_brand_status':this.pcData1.product_brand_status==0?"Deactive":"Active"
      })
      // console.log(this.formAddEdit,"formaddedit");
    })
    this.ds.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }
  open1(dialog:TemplateRef<any>){
    this.ngOnInit();
    this.ds.open(dialog);
  }
  

  deletepc(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.pbservice.deleteproduct_brand(event.data.product_brand_id).subscribe(res=>{
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

  // editpc(ref:any){
  //   this.isSubmitted=true;
  //   if(this.formAddEdit.invalid){
  //     return;
  //   }
  //   else{
  //     if(this.formAddEdit.value.product_brand_status==this.dataActive){
  //       this.formAddEdit.value.product_brand_status=1;
  //     }else{
  //       this.formAddEdit.value.product_brand_status=0;
  //     }
  //     var data = {
  //     "product_brand_name":this.formAddEdit.value.product_brand_name,
  //     "product_brand_status":this.formAddEdit.value.product_brand_status,
  //     "product_brand_id":this.uniqueId};
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

  async onSubmit(ref:any){
    this.isSubmitted = true;
      if (this.formAddEdit.invalid) {
        return;
      }else{
        if(this.formAddEdit.value.product_brand_status==this.dataActive){
                this.formAddEdit.value.product_brand_status=1;
              }else{
                this.formAddEdit.value.product_brand_status=0;
              }
            if(!this.uniqueId){
              var body={
                "product_brand_name":this.formAddEdit.value.product_brand_name,
                "product_brand_status":this.formAddEdit.value.product_brand_status,
                }
              this.pbservice.createproduct_brand(body).subscribe(res=>{
               this.resp3 = res;
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
                "product_brand_name":this.formAddEdit.value.product_brand_name,
                "product_brand_status":this.formAddEdit.value.product_brand_status,
                "product_brand_id":this.uniqueId 
              }
               
              this.pbservice.updateproduct_brand(bo).subscribe(res=>{
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
