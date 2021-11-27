import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductBrandService } from '../service/product-brand.service';
import { ProductSpecificationService } from '../service/product-specification.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'ngx-product-specification',
  templateUrl: './product-specification.component.html',
  styleUrls: ['./product-specification.component.scss']
})
export class ProductSpecificationComponent implements OnInit {
  isSubmitted=false;
  formAddEdit:FormGroup;
  psData:any;
  psData1:any;
  productData:any;
  productbrandData:any;
  resp:any;
  resp1:any;
  resp3:any;
  resp2:any;
  resp4:any;
  prodId:any;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = 'success';
  failure_status: NbComponentStatus = 'danger';
  title='Product Specification';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  dataActive='Active';
  dataDeactive='Deactive';
  uniqueId:any;
  constructor(
    private ds:NbDialogService,
    public productservice:ProductService,
    public psservice:ProductSpecificationService,
    public pbservice:ProductBrandService,
    public http:HttpClient,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
  ){ }
  ngOnInit(){
    this.isSubmitted=false;
    // this.productservice.getproduct().subscribe(res=>{
    //   this.resp1=res;
    //   this.productData=this.resp1.data.results;
    //   console.log(this.productData,"Product data");
    // });
     
    this.pbservice.getproduct_brand().subscribe(res=>{
      this.resp1=res;
      this.productbrandData=this.resp1.data.results;
      console.log(this.productbrandData,"Product Brand data");
    });
    this.psservice.getproductspecification().subscribe(res=>{
      this.resp1=res;
      this.psData=this.resp1.data.results;
      console.log("psData",this.psData);
      this.psData.forEach(element => {
        console.log(element.product_specification_status);  
        if(element.product_specification_status == 0){
          element.product_specification_status=this.dataDeactive
        }else if(element.product_specification_status==1){
          element.product_specification_status=this.dataActive
        }
      });
      // console.log(res,"PERMISSION");
      this.source.load(this.psData);
    });
    this.formAddEdit=this.formBuilder.group({
      'product_specification_name':['',[Validators.required]],
      'product_id':['',[Validators.required]],
      'product_brand_id':['',[Validators.required]],
      'product_specification_status':[]
    })
  }

  loadsubproduct(event:any)
  {
    console.log("Load Product",event);
    this.productservice.getsubproductbyproductid(event).subscribe(res=>{
       this.resp4=res;
       if(this.resp4.success==0)
       {
         this.productData=[];
       }
       else{
       this.productData=this.resp4.data.results;
       this.formAddEdit.value.product_id=this.productData[0].product_id;
       }
       console.log(this.productData,"Product data");
      
      });
      // event.clear();
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
      product_specification_name: {
        title: 'Product Specification',
        type: 'string',
      },
      product_name:{
        title:'Subproduct',
        type:'string',
      },
      product_brand_name:{
        title:'Product',
        type:'string',
      },
      product_specification_status: {
        title: 'Product Specification Status',
        type: 'string',
      },
      product_specification_created_date: {
        title: 'Created Date',
        type: 'string',
      },
      product_specification_updated_date: {
        title: 'Updated Date',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  open2(dialog: TemplateRef<any>,event:any) {

    console.log("open2 function called");
    console.log(event, "event inside dailog");
    this.uniqueId=event.data.product_specification_id;
    this.psservice.getproductspecificationbyid(this.uniqueId).subscribe(res=>{
      this.resp2=res;
      this.psData1=this.resp2.data.results[0];
      this.loadsubproduct(this.psData1.product_brand_id);
      console.log("Getting res",this.psData1);
      this.formAddEdit.reset({
        'product_specification_name':this.psData1.product_specification_name,
        'product_id':JSON.stringify(this.psData1.product_id),
        'product_brand_id':JSON.stringify(this.psData1.product_brand_id),
        'product_specification_status':this.psData1.product_specification_status==0?"Deactive":"Active"
      })
      console.log(this.formAddEdit,"formaddedit");
    })
    this.ds.open(dialog);
  }
  
  open1(dialog:TemplateRef<any>){
    this.ngOnInit();
    this.ds.open(dialog);
  }

  deleteProductSpecification(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.psservice.deleteproductspecification(event.data.product_specification_id).subscribe(res=>{
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
      // console.log("form add edit invalid",this.formAddEdit.invalid);
      return;
    }
    else{
      console.log("inside else");
      if(this.formAddEdit.value.product_specification_status==this.dataActive){
        this.formAddEdit.value.product_specification_status=1;
      }
      else if(this.formAddEdit.value.product_specification_status==this.dataDeactive){
        this.formAddEdit.value.product_specification_status=0;
      }
      if(!this.uniqueId){
        var body={
          "product_specification_name":this.formAddEdit.value.product_specification_name,
          "product_id":this.formAddEdit.value.product_id,
          "product_brand_id":this.formAddEdit.value.product_brand_id,
          "product_specification_status":this.formAddEdit.value.product_specification_status,
        }
        console.log(body,"body");  
        this.psservice.createproductspecification(body).subscribe(res=>{
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
          "product_specification_name":this.formAddEdit.value.product_specification_name,
          "product_id":this.formAddEdit.value.product_id,
          "product_brand_id":this.formAddEdit.value.product_brand_id,
          "product_specification_status":this.formAddEdit.value.product_specification_status,
          "product_specification_id":this.uniqueId 
        }
        this.psservice.updateproductspecification(bo).subscribe(res=>{
          this.resp3 = res;
          this.showToast(this.success_status, this.title, this.edit_success_content);
          ref.close();
          this.ngOnInit();
          this.uniqueId='';
          this.productData=[];
        },(err)=>{
          this.showToast(this.failure_status, this.title, this.edit_failure_content);
          ref.close();
          this.ngOnInit();
          this.uniqueId='';
          this.productData=[];
        });
      }       
    }
  }

  clr(event:any){
    console.log(event,"clrEvent");
    
    // event.clear();
    // this.productData=[];
    this.loadsubproduct(event);
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
    this.productData=[];
    this.formAddEdit.reset();
  }
}
