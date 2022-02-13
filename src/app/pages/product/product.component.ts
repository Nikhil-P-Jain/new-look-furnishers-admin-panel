import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductBrandService } from '../service/product-brand.service';
import { ProductCategoriesService } from '../service/product-categories.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  isSubmitted=false;
  formAddEdit:FormGroup;
  productData:any;
  productData1:any;
  categoryData:any;
  pbData:any;
  resp:any;
  resp1:any;
  resp3:any;
  resp2:any;
  resp4:any;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = 'success';
  failure_status: NbComponentStatus = 'danger';
  title='Subproduct';
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
    public pcservice:ProductCategoriesService,
    public productbrandservice:ProductBrandService,
    public http:HttpClient,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
  ){ }
  ngOnInit(){
    this.isSubmitted=false;
    this.pcservice.getproduct_category().subscribe(res=>{
      this.resp1=res;
      this.categoryData=this.resp1.data.results;
      console.log(this.categoryData,"Category data");
    });
    this.productbrandservice.getproduct_brand().subscribe(res=>{
      this.resp4=res;
      this.pbData=this.resp4.data.results;
      console.log(this.pbData,"pbdata");
      
    });
    this.productservice.getproduct().subscribe(res=>{
      this.resp1=res;
      this.productData=this.resp1.data.results;
      console.log("productData",this.productData);
      this.productData.forEach(element => {
        console.log(element.product_status);  
        if(element.product_status == 0){
          element.product_status=this.dataDeactive
        }else if(element.product_status==1){
          element.product_status=this.dataActive
        }
      });
      // console.log(res,"PERMISSION");
      this.source.load(this.productData);
    });
    this.formAddEdit=this.formBuilder.group({
      'product_name':['',[Validators.required]],
      'product_category_id':['',[Validators.required]],
      'product_specification':['',[Validators.required]],
      'product_status':[]
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
      product_name: {
        title: 'Product',
        type: 'string',
      },
      product_category_name:{
        title:'Category Name',
        type:'string',
      },
      product_specification:{
        title:'Product Specification',
        type:'string'
      },
      product_status: {
        title: 'Subproduct Status',
        type: 'string',
      },
      product_created_date: {
        title: 'Created Date',
        type: 'string',
      },
      product_updated_date: {
        title: 'Updated Date',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  open2(dialog: TemplateRef<any>,event:any) {
    console.log("open2 function called");
    console.log(event, "event inside dailog");
    this.uniqueId=event.data.product_id;
    this.productservice.getproductbyid(this.uniqueId).subscribe(res=>{
      this.resp2=res;
      this.productData1=this.resp2.data.results[0];
      console.log("Getting res",this.productData1);
      this.formAddEdit.reset({
        'product_name':this.productData1.product_name,
        'product_category_id':JSON.stringify(this.productData1.product_category_id),
        'product_specification':this.productData1.product_specification,
        'product_status':this.productData1.product_status==0?"Deactive":"Active"
      })
      console.log(this.formAddEdit,"formaddedit");
    })
    this.ds.open(dialog);
  }
  
  open1(dialog:TemplateRef<any>){
    this.ngOnInit();
    this.ds.open(dialog);
  }

  deleteProduct(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.productservice.deleteproduct(event.data.product_id).subscribe(res=>{
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
      if(this.formAddEdit.value.product_status==this.dataActive){
        this.formAddEdit.value.product_status=1;
      }
      else if(this.formAddEdit.value.product_status==this.dataDeactive){
        this.formAddEdit.value.product_status=0;
      }
      if(!this.uniqueId){
        var body={
          "product_name":this.formAddEdit.value.product_name,
          "product_category_id":this.formAddEdit.value.product_category_id,
          "product_specification":this.formAddEdit.value.product_specification,
          "product_status":this.formAddEdit.value.product_status,
        }
        console.log(body,"body");  
        this.productservice.createproduct(body).subscribe(res=>{
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
          "product_name":this.formAddEdit.value.product_name,
          "product_category_id":this.formAddEdit.value.product_category_id,
          "product_specification":this.formAddEdit.value.product_specification,
          "product_status":this.formAddEdit.value.product_status,
          "product_id":this.uniqueId 
        }
        this.productservice.updateproduct(bo).subscribe(res=>{
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