import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { AnyMxRecord } from 'dns';
import { LocalDataSource } from 'ng2-smart-table';
import { Annexure_detailsDetailsService } from '../../service/annexure-details.service';
import { AnnexureService } from '../../service/annexure.service';
import { ProductService } from '../../service/product.service';
import { PurchaseOrderServiceService } from '../../service/purchase-order-service.service';

@Component({
  selector: 'ngx-annexure',
  templateUrl: './annexure.component.html',
  styleUrls: ['./annexure.component.scss']
})
export class AnnexureComponent implements OnInit {
  poid:any;
  resp:any;
  resp1:any;
  resp3:any;
  isSubmitted=false;
  productData:any;
  resp2:any;
  anData:any;
  resp4:any;
  uniqueId1:any;
  adData:any;
  adData3:any;
  resp6:any;
  poData:any;
  prodInfo:any;
  adData1:any;
  uniqueId:any;
  products:FormArray;
  formAddEdit:FormGroup;
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
  totalLength:any=[];
  areadata:any=[];

  constructor(
    private activatedroute:ActivatedRoute, 
    private annexureservice:AnnexureService,
    private adservice:Annexure_detailsDetailsService,
    private poservice:PurchaseOrderServiceService,
    private ds:NbDialogService,
    public productservice:ProductService,
    public http:HttpClient,
    public router:Router,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.poid=this.activatedroute.snapshot.params.id;
    console.log(this.poid,"project ORder id");
    // this.getpoData();
    this.annexureservice.getannexureby_poid(this.poid).subscribe(res=>{
      this.resp=res;
      this.anData=this.resp.data.results;
    })
    // this.productservice.getproduct().subscribe(res=>{
    //   this.resp1=res;
    //   this.productData=this.resp1.data.results;
    //   console.log(this.productData,"Product data");
    // });
    this.poservice.getpurchaseorderbyid(this.poid).subscribe(res=>{
      this.resp=res;
      this.poData=this.resp.data.results[0];
      this.prodInfo=this.poData.productinfo;
      console.log("Getting res",this.prodInfo);
    })
    this.formAddEdit=this.formBuilder.group({
      'products':this.formBuilder.array([this.createProducts()]),
    })
    console.log(this.formAddEdit,"formaddedit");
    // this.source.load(this.pqData);
  }
  get f(){
    return this.formAddEdit.controls;
  }
  createProducts():FormGroup{
    return this.formBuilder.group({
      product_id:'',
      length:'',
      quantity:'',
      total_length:'',
      module:'',
      area:'',
      // total_area:'',
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
     
     annexure_id: {
       title: 'Annexure Id',
       type: 'string',
     },
     created_date: {
       title: 'created date',
       type: 'string',
     },
     updated_date: {
       title: 'updated date',
       type: 'string',
     },
     status:{
       title:'status',
       type:'string',
     },
     New: //or something
      {
      title:'Details',
      type:'html',
      valuePrepareFunction:(cell,row)=>{
        return `<a href=http://localhost:4200/#/pages/annexure-details/${row.annexure_id}>Annexure Details</a>`
        // return `<a href=http://veritrack.co.in/newlook/#/pages/annexure-details/${row.annexure_id}>Annexure Details</a>`

        },
      },
    }
  }
  open2(dialog: TemplateRef<any>,event:any) {
    // console.log("open2 function called");
    // console.log(event, "event inside dailog");
    this.uniqueId1=event.data.annexure_id;
    // console.log(this.uniqueId1,"uid1");
    
    this.adservice.get_annexure_details_json(this.uniqueId1).subscribe(res=>{
      this.resp4=res;
      // console.log(this.resp4,"resp4");
      
      this.adData1=this.resp4.data.results[0];
      var adInfo=this.adData1.prodinfo;
      console.log("Getting res11",adInfo);
      for(var i=1;i<adInfo.length;i++){
        this.products1.push(this.createProducts());
      }

      for(var j=0;j<=this.products1.length;j++){
              this.products1.controls[j].get('product_id').patchValue(JSON.stringify(adInfo[j].product_id));
              this.products1.controls[j].get('length').patchValue(adInfo[j].length);
              this.products1.controls[j].get('quantity').patchValue(adInfo[j].quantity);
              this.products1.controls[j].get('total_length').patchValue(adInfo[j].total_length);
              this.products1.controls[j].get('module').patchValue(adInfo[j].module);
              this.products1.controls[j].get('area').patchValue(adInfo[j].area);
              // this.products1.controls[j].get('total_area').patchValue(adInfo[j].total_area);
      }
      console.log(this.formAddEdit,"formaddedit");
    })
    // this.pqservice.getallspecification().subscribe(res=>{
    //   this.resp6=res;
    //   this.psData=this.resp6.data.results;
    //   console.log("Getting Specification Data", this.psData)
    // })
    this.ds.open(dialog);
  }

  source: LocalDataSource = new LocalDataSource();

  // changeprod(e:any){
  //   console.log("Getting selected id", e);
  //     this.adservice.getannexure_detailsby_annexure_id(e).subscribe(res=>{
  //     this.resp6=res;
  //     this.adData3=this.resp6.data.results;
  //     console.log("Getting Spesification Data", this.adData3)
  //   })
  // }
  
  open1(dialog:TemplateRef<any>){
    this.formAddEdit.reset();
    this.ds.open(dialog);
  }

  deleteProjectLead(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.adservice.delete_annexure_and_details(event.data.annexure_id).subscribe(res=>{
        this.resp=res;
        if(this.resp.success==1){
          this.showToast(this.success_status, this.title, this.delete_success_content);
          this.ngOnInit();
        }
        else{
          this.showToast(this.failure_status, this.title, this.delete_failure_content);
          this.ngOnInit();
        }
      },
      (err)=>{
        this.showToast(this.failure_status, this.title, this.delete_failure_content);
        this.ngOnInit();
      })
    }
    else{
      event.confirm.reject();
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

  findLength(){
      this.totalLength=[];
      this.formAddEdit.get('products').value.forEach((element,i) => {
        if(element.length != null && element.quantity != null){
          this.totalLength.push(parseFloat(element.length) * parseFloat(element.quantity))
          // get('total_length').patchValue()
        }else{
          this.totalLength.push('')
        }
        
      });
  }

  findArea(){
    this.areadata=[];
    this.formAddEdit.get('products').value.forEach((element,i) => {
      if(element.module != null && this.totalLength.length != 0){
        this.areadata.push((parseFloat(element.module) * parseFloat(this.totalLength[i]))/100)
        // get('total_length').patchValue()
      }else{
        this.areadata.push('')
      }
      
    });
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
    var prodinfo=[];
      this.formAddEdit.get('products').value.forEach(x => {
        prodinfo.push({
          product_id:parseInt(x.product_id),
          length:parseFloat(x.length),
          quantity:parseFloat(x.quantity),
          total_length:parseFloat(x.total_length),
          module:parseFloat(x.module),
          area:parseFloat(x.area)
        })
      });
    // for(var i=0;i<this.formAddEdit.value.product_name.length;i++){
    //   this.formAddEdit.value.product_name[i]=parseInt(this.formAddEdit.value.product_name[i])
    // }
    if(!this.uniqueId1){
      var body={
        "purchase_order_id":this.poid,
        "productinfo":prodinfo
      }
      console.log(body,"body");  
      this.adservice.createAnnexure_details(body).subscribe(res=>{
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
        "productinfo":prodinfo,
        "annexure_id":this.uniqueId1
      }
      this.adservice.updateAnnexure_details(bo).subscribe(res=>{
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


  closeHandle(ref:any){
    ref.close();
    this.uniqueId='';
    this.uniqueId1='';
    this.totalLength=[];
    this.areadata=[];
    this.formAddEdit.reset();
  }

}