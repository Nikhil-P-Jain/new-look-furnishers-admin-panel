import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderServiceService } from '../../service/purchase-order-service.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Annexure_detailsDetailsService } from '../../service/annexure-details.service';
import { AnnexureService } from '../../service/annexure.service';
import { ProductService } from '../../service/product.service';
import { AccessoriesService } from '../../service/accessories.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-purchase-order-specified-product',
  templateUrl: './purchase-order-specified-product.component.html',
  styleUrls: ['./purchase-order-specified-product.component.scss']
})
export class PurchaseOrderSpecifiedProductComponent implements OnInit {
  poid:any;
  po_resp:any;
  po_poData:any;
  po_prodInfo:any;
  resp:any;
  resp1:any;
  resp3:any;
  isSubmitted=false;
  productData:any;
  resp2:any;
  resp7:any;
  resp5:any;
  acData2:any;
  psData:any;
  anData:any;
  resp4:any;
  uniqueId1:any;
  adData:any;
  adData3:any;
  resp6:any;
  poData:any;
  prodInfo:any;
  acinfo;any;
  prodInfoqty:any;
  adData1:any;
  uniqueId:any;
  products:FormArray;
  accessories:FormArray;
  formAddEdit:FormGroup;
  accessoriesAddEdit:FormGroup;
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
  ac_totalLength:any=[];
  ac_areadata:any=[];
  mid:any=[];

  area:any=0;
  flag:boolean=false;
  prodInfoarea:any=0;
  selectProdId:any;
  totaldata:any=[];
  constructor(
    private activatedroute:ActivatedRoute, 
    private ds:NbDialogService,
    private poservice:PurchaseOrderServiceService,
    private annexureservice:AnnexureService,
    private adservice:Annexure_detailsDetailsService,
    public productservice:ProductService,
    public http:HttpClient,
    public router:Router,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private acservice: AccessoriesService,

  ) { }
  open(dialog: TemplateRef<any>) {
    this.ds.open(dialog, {
    });
  }
  ngOnInit(): void {
    this.poid=this.activatedroute.snapshot.params.id;
    console.log(this.poid,"purchase ORder id");
    this.mid.splice(0,0,2);
    this.anData=[];
    this.poData=[];
    this.getpoData(); 
    // for po specified product below code is for annexure
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
      // this.prodInfoqty=this.poData.productinfo.purchase_order_specified_product_quantity;
      console.log("Getting prodInfoqty",this.prodInfo);
    })
    this.formAddEdit=this.formBuilder.group({
      'products':this.formBuilder.array([this.createProducts()]),
    })
    this.accessoriesAddEdit=this.formBuilder.group({
      'accessories':this.formBuilder.array([this.createAccessories()]),
    })
    console.log(this.formAddEdit,"formaddedit");
    // this.source.load(this.pqData);
  }
  createAccessories():FormGroup{
    return this.formBuilder.group({
      accessories_name:'',
      accessories_quantity:'',
      radiobtn:2,
      accessories_length:'',
      accessories_total_length:'',
      accessories_module:'',
      accessories_area:'',
    })
  }
  get accessories1():FormArray{
    return this.accessoriesAddEdit.get('accessories') as FormArray;
  }
  addAccessory(){
    this.mid.push(2)
    this.accessories=this.accessoriesAddEdit.get('accessories') as FormArray;
    this.accessories.push(this.createAccessories());
    }
  removeAccessory()
  {
    (this.accessoriesAddEdit.get('accessories') as FormArray).removeAt(length-1);
  }
  get f1(){
    return this.accessoriesAddEdit.controls;
  }
  ac_findLength(){
    this.ac_totalLength=[];
    this.accessoriesAddEdit.get('accessories').value.forEach((element,i) => {
      if(element.accessories_length != null && element.accessories_quantity != null){
        this.ac_totalLength.push((parseFloat(element.accessories_length) * parseFloat(element.accessories_quantity))/1000)
        // get('total_length').patchValue()
      }else{
        this.ac_totalLength.push('')
      }
  
    });
}

UseQty(id:any,index:any){
  this.mid.splice(index,0,id);
}

ac_findArea(){
  // console.log("findarea");
  
  this.ac_areadata=[];
  this.accessoriesAddEdit.get('accessories').value.forEach((element,i) => {
    if(element.accessories_module != null && this.ac_totalLength.accessories_length != 0){
      var sum = ((parseFloat(element.accessories_module) * parseFloat(this.ac_totalLength[i]))/1000);
      // console.log(sum,"sum");
      
      this.ac_areadata.push(sum);
      // console.log(this.ac_areadata[i],"acareadata");
      
    }else{
      this.ac_areadata.push(0);
    }
  });
}

  
  settings = {
    mode: 'external',
    actions:{
      add:false,
      edit:false,
      delete:false
    },
   columns: {
     product_name: {
       title: 'Product Name',
       type: 'string',
     },
     product_specification: {
       title: 'Product Specification',
       type: 'string',
     },
     purchase_order_specified_product_quantity: {
       title: 'Quantity',
       type: 'string',
     },
     unit_name:{
       title:'Unit',
       type:'string',
     },
   },
 };

  getpoData(){
    this.poservice.getpurchaseorderbyid(this.poid).subscribe(res=>{
      this.po_resp=res;
      this.po_poData=this.po_resp.data.results[0];
      this.po_prodInfo=this.po_poData.productinfo;
      console.log("Getting res",this.po_poData);
    })
  }

  public convetToPDF(){
    var data = document.getElementById('content');
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)
    pdf.save('Purchase-Order.pdf'); // Generated PDF
  });
}

//below code for anexure

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


settings1 = {
  mode: 'external',
  actions:{
    edit:false
  },
  add: {
    addButtonContent: '<i class="nb-plus"></i>',
    createButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
    confirmCreate:true,
  },
  // edit: {
  //   confirmSave: true,
  //   editButtonContent: '<i class="nb-edit"></i>',
  //   saveButtonContent: '<i class="nb-checkmark"></i>',
  //   cancelButtonContent: '<i class="nb-close"></i>',
  // },
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
     title: 'Created Date',
     type: 'string',
   },
   updated_date: {
     title: 'Updated Date',
     type: 'string',
   },
   status:{
     title:'Status',
     type:'string',
   },
   New: //or something
    {
    title:'Details',
    type:'html',
    valuePrepareFunction:(cell,row)=>{
      // return `<a href=http://localhost:4200/#/pages/annexure-details/${row.annexure_id}>Annexure Details</a>`
      return `<a href=${environment.APP_URL}annexure-details/${row.annexure_id}>Annexure Details</a>`

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
    for(var i=1;i<adInfo.length;i++){
      this.products1.push(this.createProducts());
    }
    this.totalLength=[];
    this.areadata=[];

    for(var j=0;j<=this.products1.length;j++){
      this.products1.controls[j].get('product_id').patchValue(JSON.stringify(adInfo[j].product_id));
      this.products1.controls[j].get('length').patchValue(adInfo[j].length);
      this.products1.controls[j].get('quantity').patchValue(adInfo[j].quantity);
      // this.products1.controls[j].get('total_length').patchValue(adInfo[j].total_length);
      this.products1.controls[j].get('module').patchValue(adInfo[j].module);
      this.totalLength.push(adInfo[j].length);
      this.areadata.push(adInfo[j].area);
      // this.products1.controls[j].get('area').patchValue(adInfo[j].area);
    }
    console.log(this.formAddEdit,"formaddedit");
  })

  this.acservice.getaccessoriesbyid(this.uniqueId1).subscribe(res=>{
    this.resp5=res;
    this.acData2=this.resp5.data.results;
    var acinfo=this.acData2;
    console.log("Getting res11",acinfo);
    for(var i=1;i<acinfo.length;i++){
      this.accessories1.push(this.createAccessories());
    }
    this.ac_totalLength=[];
    this.ac_areadata=[];
    for(var j=0;j<this.accessories1.length;j++){
      this.accessories1.controls[j].get('accessories_name').patchValue(acinfo[j].accessories_name);
      this.accessories1.controls[j].get('accessories_length').patchValue(acinfo[j].accessories_length);
      this.accessories1.controls[j].get('accessories_quantity').patchValue(acinfo[j].accessories_quantity);
      // this.accessories1.controls[j].get('accessories_total_length').patchValue(acinfo[j].accessories_total_length);
      this.accessories1.controls[j].get('accessories_module').patchValue(acinfo[j].accessories_module);
      this.ac_totalLength.push(acinfo[j].accessories_total_length);
      this.ac_areadata.push(acinfo[j].accessories_area);
      // this.accessories1.controls[j].get('accessories_area').patchValue(acinfo[j].accessories_area);
      // this.accessories1.controls[j].get('total_area').patchValue(acinfo[j].total_area);
    }
  })
  
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
  this.ngOnInit();
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
changeprod(e:any){
  console.log("Getting selected id", e);
    this.selectProdId=e;
    this.poservice.getpurchase_orderbyproductid(e).subscribe(res=>{
    this.resp7=res;
    this.prodInfoarea=this.resp7.area;
    this.prodInfoqty=this.resp7.qty - this.prodInfoarea;
    console.log("Getting product qty Data", this.prodInfoarea)
  })
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
        this.totalLength.push((parseFloat(element.length) * parseFloat(element.quantity))/1000)
        // get('total_length').patchValue()
      }else{
        this.totalLength.push('')
      }
      
    });
}

findArea(){
  this.areadata=[];
  this.totaldata=[];
  this.formAddEdit.get('products').value.forEach((element,i) => {
    if(element.module != null && this.totalLength.length != 0){
      var sum = ((parseFloat(element.module) * parseFloat(this.totalLength[i]))/1000);
      this.areadata.push(sum);
      console.log(this.areadata,"areadata");
      
      this.totaldata.push({
        "prodid":element.product_id,
        "sum":sum
      });
    }else{
      this.areadata.push('');
      this.totaldata.push({
        "prodid":element.product_id,
        "sum":sum
      });
    }
  });
  this.area=0;
  this.totaldata.forEach(element => {
    // console.log("Geting selected Prod", this.selectProdId , element.prodid , element.sum);
    if(this.selectProdId == element.prodid){
      this.area=this.area+ element.sum
      // console.log("total area", this.area);
      if(this.area>this.prodInfoqty){
        this.flag=true;
        }else{
          this.flag=false;
        }
    }
  });
}

async onSubmit(ref:any){
console.log("Clicked on submit");

this.isSubmitted = true;
if(this.flag==false){
  if (this.formAddEdit.invalid) {
    console.log("form add edit invalid",this.formAddEdit.invalid);
    return;
  }
  else{
    console.log("inside else");
    var prodinfo=[];
    var acinfo=[];
      this.formAddEdit.get('products').value.forEach(x => {
        if(x.product_id!=""){
          prodinfo.push({
            product_id:parseInt(x.product_id),
            length:parseFloat(x.length),
            quantity:parseFloat(x.quantity),
            total_length:parseFloat(x.total_length),
            module:parseFloat(x.module),
            area:parseFloat(x.area)
          })
        }
      });
      this.accessoriesAddEdit.get('accessories').value.forEach(y => {
        if(y.accessories_name!=""){
          console.log("isnan",y.accessories_module,typeof(y.accessories_module));

          if(y.accessories_module == ''){
            console.log("isnan inside");
            
            acinfo.push({
              accessories_name:y.accessories_name,
              accessories_quantity:parseFloat(y.accessories_quantity),
              accessories_length:0,
              accessories_total_length:0,
              accessories_module:0,
              accessories_area:0
            })
          }else{
            acinfo.push({
              accessories_name:y.accessories_name,
              accessories_quantity:parseFloat(y.accessories_quantity),
              accessories_length:parseFloat(y.accessories_length),
              accessories_total_length:parseFloat(y.accessories_total_length),
              accessories_module:parseFloat(y.accessories_module),
              accessories_area:parseFloat(y.accessories_area)
            })
          }
          
        }
      });
    if(!this.uniqueId1){
      var body={
        "purchase_order_id":this.poid,
        "prodinfo":prodinfo,
        "acinfo":acinfo,
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
        "prodinfo":prodinfo,
        "acinfo":acinfo,
        "annexure_id":this.uniqueId1
      }
      console.log(bo,"bo");
      
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
else{
   this.showToast('danger', 'Area Exceeds the total Area', 'Please Input lower amount for area as it exceeds the total quantity mentioned in Purchase Order');
}
}


closeHandle(ref:any){
  ref.close();
  this.uniqueId='';
  this.uniqueId1='';
  this.totalLength=[];
  this.areadata=[];
  this.ac_areadata=[];
  this.ac_totalLength=[];
  this.formAddEdit=this.formBuilder.group({
    'products':this.formBuilder.array([this.createProducts()]),
  })
  this.formAddEdit.reset();
}

}
