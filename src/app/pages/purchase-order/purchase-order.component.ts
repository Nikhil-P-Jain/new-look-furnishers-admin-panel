import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ProjectOrderService } from '../service/project-order.service';
import { ProjectQuotationService } from '../service/project-quotation.service';
import { PurchaseOrderServiceService } from '../service/purchase-order-service.service';
import { SiteService } from '../service/site.service';
import { SupplierService } from '../service/supplier.service';

@Component({
  selector: 'ngx-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {
  isSubmitted=false;
  formAddEdit:FormGroup;
  products:FormArray;
  poData:any;
  poData1:any;
  proData:any;
  siteData:any;
  pqData:any;
  prodData:any;
  unitData:any;
  supData:any;
  psData:any;
  resp:any;
  resp1:any;
  resp3:any;
  resp4:any;
  resp5:any;
  resp6:any;
  resp2:any;
  resp9:any;
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
  title='Purchase Order';
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
    private proservice:ProjectOrderService,
    private poservice:PurchaseOrderServiceService,
    public http:HttpClient,
    private siteservice: SiteService,
    private supservice: SupplierService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,) { }
  
  ngOnInit(){
    this.isSubmitted=false;
    this.poservice.getproduct().subscribe(res=>{
      this.resp1=res;
      this.prodData=this.resp1.data.results;
      console.log("Getting ProdData", this.prodData);
    })
    this.proservice.getprojectorder().subscribe(res=>{
      this.resp9=res;
      this.proData=this.resp9.data.results;
      console.log("proData",this.proData);
      
    })
    this.poservice.getunit().subscribe(res=>{
      this.resp2=res;
      this.unitData=this.resp2.data.results;
    })
    this.siteservice.getsite().subscribe(res=>{
      this.resp3=res;
      this.siteData=this.resp3.data.results;
      console.log(this.siteData,"Site data");
    });
    this.supservice.getsupplier().subscribe(res=>{
      this.resp3=res;
      this.supData=this.resp3.data.results;
      console.log(this.supData,"Sup data");
    });
    this.formAddEdit=this.formBuilder.group({
      'project_order_id':['',[Validators.required]],
      'po_number':['',[Validators.required]],
      'purchase_order_date':['',[Validators.required]],
      'purchase_order_description':['',[Validators.required]],
      'site_id':['',[Validators.required]],
      'supplier_id':['',[Validators.required]],
      'purchase_order_status':[],
      'products':this.formBuilder.array([this.createProducts()]),
    })
    this.poservice.getpurchaseorder().subscribe(res=>{
      this.resp5=res;
      this.poData=this.resp5.data.results;
      console.log("poData",this.poData);
      this.poData.forEach(element => {
        console.log(element.purchase_order_status);  
        if(element.purchase_order_status == 0){
          element.purchase_order_status=this.dataDeactive
        }else if(element.purchase_order_status==1){
          element.purchase_order_status=this.dataActive
        }
      });
      console.log(this.formAddEdit,"formAddEdor");
      
      this.source.load(this.poData);
    });
  }

  createProducts():FormGroup{
    return this.formBuilder.group({
      product_id:'',
      specification_id:'',
      quantity:'',
      unit:''
    })
  }
  get products1():FormArray{
    return this.formAddEdit.get('products') as FormArray;
  }
  addProduct(){
    this.products=this.formAddEdit.get('products') as FormArray;
    this.products.push(this.createProducts());
    }
  removeProducts()
  {
    (this.formAddEdit.get('products') as FormArray).removeAt(length-1);
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
      New1: //or something
      {
        title:'Annexures',
        type:'html',
        valuePrepareFunction:(cell,row)=>{
          return `<a href=http://localhost:4200/#/pages/annexure/${row.purchase_order_id}>Annexure</a>`
          // return `<a href=http://veritrack.co.in/newlook/#/pages/annexure/${row.purchase_order_id}>Annexure</a>`
        },
      },
      project_lead_name: {
        title: 'Project',
        type: 'string',
      },
      po_number:{
        title: 'PO Number',
        type:'string'
      },
      purchase_order_date: {
        title: 'Order Date',
        type: 'string',
      },
      purchase_order_description: {
        title: 'Order Description',
        type: 'string',
      },
      site_name:{
        title:'Site',
        type:'string',
      },
      supplier_name:{
        title:'Vendor',
        type:'string',
      },
      // product_specification_name:{
      //   title:'Product Specification',
      //   type:'string',
      // },
      purchase_order_status: {
        title: 'Order Status',
        type: 'string',
      },
      purchase_order_created_date: {
        title: 'Created Date',
        type: 'string',
      },
      purchase_order_updated_date: {
        title: 'Updated Date',
        type: 'string',
      },
      New: //or something
      {
      title:'Details',
      type:'html',
      valuePrepareFunction:(cell,row)=>{
        return `<a href=http://localhost:4200/#/pages/purchase-order-details/${row.purchase_order_id}> Product Details</a>`
        // return `<a href=http://veritrack.co.in/newlook/#/pages/purchase-order-details/${row.purchase_order_id}>Product Details</a>`

      },
      filter:false       
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  open2(dialog: TemplateRef<any>,event:any) {
    
    console.log("open2 function called");
    console.log(event, "event inside dailog");
    this.uniqueId=event.data.purchase_order_id;
    this.poservice.getpurchaseorderbyid(this.uniqueId).subscribe(res=>{
      this.resp2=res;
      this.poData1=this.resp2.data.results[0];
      var prodInfo=this.poData1.productinfo;
      console.log("Getting res",this.poData1.productinfo);
      this.formAddEdit.reset({
        'project_order_id':JSON.stringify(this.poData1.project_order_id),
        'po_number':this.poData1.po_number,
        'purchase_order_date':this.poData1.purchase_order_date,
        'purchase_order_description':this.poData1.purchase_order_description,
        'site_id':JSON.stringify(this.poData1.site_id),
        'supplier_id':JSON.stringify(this.poData1.supplier_id),
        'purchase_order_status':this.poData1.purchase_order_status==0?"Deactive":"Active"
      })

      this.poservice.getallspecification().subscribe(res=>{
        this.resp6=res;
        this.psData=this.resp6.data.results;
        console.log("Getting Spesification Data", this.psData)
      })

      for(var i=1;i<prodInfo.length;i++){
        this.products1.push(this.createProducts());
      }

      for(var j=0;j<=this.products1.length;j++){
              this.products1.controls[j].get('product_id').patchValue(JSON.stringify(prodInfo[j].product_id));
              this.products1.controls[j].get('specification_id').patchValue(JSON.stringify(prodInfo[j].specification_id));
              this.products1.controls[j].get('quantity').patchValue(prodInfo[j].purchase_order_specified_product_quantity);
              this.products1.controls[j].get('unit').patchValue(JSON.stringify(prodInfo[j].unit_id));
    }
      console.log(this.formAddEdit,"formaddedit");
    })
    this.ds.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  changeprod(e:any){
    console.log("Getting selected id", e);
      this.poservice.getproductspecificationbyproductid(e).subscribe(res=>{
      this.resp6=res;
      this.psData=this.resp6.data.results;
      console.log("Getting Spesification Data", this.psData)
    })
  }
  
  open1(dialog:TemplateRef<any>){
    // this.formAddEdit.reset();
    this.ds.open(dialog);
  }
  

  deletePurchaseOrder(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.poservice.deletepurchaseorder(event.data.purchase_order_id).subscribe(res=>{
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
        var prodinfo=[];
        this.formAddEdit.get('products').value.forEach(x => {
          prodinfo.push({
            specification_id:parseInt(x.specification_id),
            purchase_order_specified_product_quantity:parseInt(x.quantity),
            unit_id:parseInt(x.unit)
          })
        });
        if(this.formAddEdit.value.purchase_order_status==this.dataActive){
                this.formAddEdit.value.purchase_order_status=1;
        }
        else if(this.formAddEdit.value.purchase_order_status==this.dataDeactive){
                this.formAddEdit.value.purchase_order_status=0;
        }
        if(!this.uniqueId){
          var body={
            "project_order_id":this.formAddEdit.value.project_order_id,
            "po_number":this.formAddEdit.value.po_number,
            "purchase_order_date":this.formAddEdit.value.purchase_order_date,
            "purchase_order_description":this.formAddEdit.value.purchase_order_description,
            "site_id":this.formAddEdit.value.site_id,
            "supplier_id":this.formAddEdit.value.supplier_id,
            "purchase_order_status":this.formAddEdit.value.purchase_order_status,
            "productsinfo":prodinfo
            }
            console.log(body,"body");
            
          this.poservice.createpurchaseorder(body).subscribe(res=>{
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
            "project_order_id":this.formAddEdit.value.project_order_id,
            "po_number":this.formAddEdit.value.po_number,
            "purchase_order_date":this.formAddEdit.value.purchase_order_date,
            "purchase_order_description":this.formAddEdit.value.purchase_order_description,
            "site_id":this.formAddEdit.value.site_id,
            "supplier_id":this.formAddEdit.value.supplier_id,
            "purchase_order_status":this.formAddEdit.value.purchase_order_status,
            "purchase_order_id":this.uniqueId ,
            "productsinfo":prodinfo
          }
          this.poservice.updatepurchaseorder(bo).subscribe(res=>{
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
    this.formAddEdit=this.formBuilder.group({
      'project_order_id':['',[Validators.required]],
      'po_number':['',[Validators.required]],
      'purchase_order_date':['',[Validators.required]],
      'purchase_order_description':['',[Validators.required]],
      'site_id':['',[Validators.required]],
      'supplier_id':['',[Validators.required]],
      'purchase_order_status':[],
      'products':this.formBuilder.array([this.createProducts()]),
    })
    this.formAddEdit.reset();
  }
  
}
