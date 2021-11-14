import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService, NbDialogService } from '@nebular/theme';
import { AnyTxtRecord } from 'dns';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { LocalDataSource } from 'ng2-smart-table';
import { AccessoriesService } from '../../../service/accessories.service';
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
  accessories:FormArray;
  plData:any;
  plData1:any;
  productData:any;
  userData:any;
  resp:any;
  date1:any;
  resp1:any;
  resp3:any;
  resp4:any;
  resp5:any;
  acData:any;
  acData1:any;
  resp9:any;
  pdfData:any;
  acData2:any;
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
  title='Accessories Details';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  dataActive='Active';
  dataDeactive='Deactive';
  uniqueId:any;
  totalLength:any=[];
  areadata:any=[];
   source: LocalDataSource = new LocalDataSource();
  source1: LocalDataSource = new LocalDataSource();
  
  
  poid:any;
  poData:any;
  prodInfo:any;
  constructor(
    private activatedroute:ActivatedRoute, 
    private adservice:Annexure_detailsDetailsService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private acservice:AccessoriesService,
    private productservice:ProductService,
    private ds:NbDialogService,
  ) { }

  ngOnInit(): void {
    this.isSubmitted=false;
    this.poid=this.activatedroute.snapshot.params.id;
    console.log(this.poid,"annexure id");
    // this.getpoData();
    this.adservice.getannexure_detailsby_annexure_id(this.poid).subscribe(res=>{
      this.resp=res;
      this.poData=this.resp.data.results;
      console.log(this.poData,"PoData");
      
    })  
    this.acservice.getaccessories(this.poid).subscribe(res=>{
      this.resp3=res;
      this.acData=this.resp3.data.results;
      console.log(this.acData,"acData");
    })
    this.formAddEdit=this.formBuilder.group({
      // 'accessories_name':['',[Validators.required]],
      // 'accessories_quantity':['',[Validators.required]],
      // 'accessories_length':['',[Validators.required]],
      // 'accessories_total_length':['',[Validators.required]],
      // 'accessories_module':['',[Validators.required]],
      // 'accessories_area':['',[Validators.required]],
      'accessories':this.formBuilder.array([this.createAccessories()]),
    })
    this.adservice.get_annexure_details_json(this.poid).subscribe(res=>{
      this.resp9=res;
      this.pdfData=this.resp9.data.results[0];
      var splitted = this.pdfData.created_date.split(" ",2); 
      this.date1=splitted[0];
      console.log(this.date1,"date");
      
      var pdfinfo=this.pdfData.prodinfo;
      console.log(pdfinfo,"pdfData");
      
    })

    this.source.load(this.poData);
    this.source1.load(this.acData);

  }
  createAccessories():FormGroup{
    return this.formBuilder.group({
      accessories_name:'',
      accessories_quantity:'',
      accessories_length:'',
      accessories_total_length:'',
      accessories_module:'',
      accessories_area:'',
    })
  }
  get accessories1():FormArray{
    return this.formAddEdit.get('accessories') as FormArray;
  }
  addAccessory(){
    this.accessories=this.formAddEdit.get('accessories') as FormArray;
    this.accessories.push(this.createAccessories());
    }
  removeAccessory()
  {
    (this.formAddEdit.get('accessories') as FormArray).removeAt(length-1);
  }
  get f(){
    return this.formAddEdit.controls;
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
 settings1 = {
  mode: 'external',
  actions:{edit:false,},
    add: {
      addButtonContent: '<i class="nb-edit"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  columns: {
  accessories_name: {
     title: 'Accessories',
     type: 'string',
   },
   accessories_quantity:{
     title:'Quantity',
     type:'string'
   },
   accessories_length:{
     title:'Length',
     type:'string'
   },
   accessories_total_length:{
    title:'Total Length',
    type:'string'
  },
  accessories_module:{
    title:'Module',
    type:'string'
  },
  accessories_area:{
    title:'Area',
    type:'string'
  },
  created_date:{
    title:'Created Date',
    type:'string'
  },
  updated_date: {
    title: 'Updated Date',
    type: 'string',
  },
 },
};

 open1(dialog:TemplateRef<any>){
  // this.formAddEdit.reset();
  this.ds.open(dialog);
}


  
  open2(dialog: TemplateRef<any>,event:any) {
    // console.log("open2 function called");
    // console.log(event, "event inside dailog");
    this.uniqueId=event.annexure_id;
    // console.log(this.uniqueId1,"uid1");
    
    this.acservice.getaccessoriesbyid(this.uniqueId).subscribe(res=>{
      this.resp5=res;
      this.acData2=this.resp5.data.results;
      var acinfo=this.acData2;
      console.log("Getting res11",acinfo);
      for(var i=1;i<acinfo.length;i++){
        this.accessories1.push(this.createAccessories());
      }
      this.totalLength=[];
      this.areadata=[];
      for(var j=0;j<this.accessories1.length;j++){
              this.accessories1.controls[j].get('accessories_name').patchValue(acinfo[j].accessories_name);
              this.accessories1.controls[j].get('accessories_length').patchValue(acinfo[j].accessories_length);
              this.accessories1.controls[j].get('accessories_quantity').patchValue(acinfo[j].accessories_quantity);
              // this.accessories1.controls[j].get('accessories_total_length').patchValue(acinfo[j].accessories_total_length);
              this.accessories1.controls[j].get('accessories_module').patchValue(acinfo[j].accessories_module);
              this.totalLength.push(acinfo[j].accessories_total_length);
              this.areadata.push(acinfo[j].accessories_area);
              // this.accessories1.controls[j].get('accessories_area').patchValue(acinfo[j].accessories_area);
              // this.accessories1.controls[j].get('total_area').patchValue(acinfo[j].total_area);
      }
      console.log(this.formAddEdit,"formaddedit");
    })
    this.ds.open(dialog);
  }

  open(dialog: TemplateRef<any>) {
    this.ds.open(dialog, {
    });
  }

  findLength(){
    this.totalLength=[];
    this.formAddEdit.get('accessories').value.forEach((element,i) => {
      if(element.accessories_length != null && element.accessories_quantity != null){
        this.totalLength.push((parseFloat(element.accessories_length) * parseFloat(element.accessories_quantity))/1000)
        // get('total_length').patchValue()
      }else{
        this.totalLength.push('')
      }
  
    });
}

findArea(){
  this.areadata=[];
  this.formAddEdit.get('accessories').value.forEach((element,i) => {
    if(element.accessories_module != null && this.totalLength.accessories_length != 0){
      var sum = ((parseFloat(element.accessories_module) * parseFloat(this.totalLength[i]))/1000);
      this.areadata.push(sum);
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
      var acinfo=[];
        this.formAddEdit.get('accessories').value.forEach(x => {
          acinfo.push({
            accessories_name:x.accessories_name,
            accessories_length:parseFloat(x.accessories_length),
            accessories_quantity:parseFloat(x.accessories_quantity),
            accessories_total_length:parseFloat(x.accessories_total_length),
            accessories_module:parseFloat(x.accessories_module),
            accessories_area:parseFloat(x.accessories_area)
          })
        });
      // for(var i=0;i<this.formAddEdit.value.product_name.length;i++){
      //   this.formAddEdit.value.product_name[i]=parseInt(this.formAddEdit.value.product_name[i])
      // }
      if(!this.uniqueId){
        var body={
          "annexure_id":this.poid,
          "acinfo":acinfo
        }
        console.log(body,"body");  
        this.acservice.createaccessories(body).subscribe(res=>{
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
          "acinfo":acinfo,
          "annexure_id":this.uniqueId
        }
        console.log(bo,"bo");
        
       
        this.acservice.updateaccessories(bo).subscribe(res=>{
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
deleteAccessories(event) {
  console.log("ID",event.data);
  if(window.confirm('Are you sure you want to delete?')) {
    this.acservice.delete_accessories(event.data.accessories_id).subscribe(res=>{
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

  closeHandle(ref:any){
    ref.close();
    this.uniqueId='';
    this.totalLength=[];
    this.areadata=[];
    this.acData1=[];
    this.formAddEdit=this.formBuilder.group({
      'accessories':this.formBuilder.array([this.createAccessories()]),
    })
    this.formAddEdit.reset();
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
    pdf.save('Annexure.pdf'); // Generated PDF
  });
}



}
