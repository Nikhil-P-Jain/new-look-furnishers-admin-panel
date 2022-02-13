import { ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProjectQuotationService } from '../../service/project-quotation.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbDateService, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { ProductBrandService } from '../../service/product-brand.service';
import { ProductService } from '../../service/product.service';
import { UserService } from '../../service/user.service';
import { ProjectQuotationUpdatesService } from '../../service/project-quotation-updates.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'ngx-project-quotation-updates',
  templateUrl: './project-quotation-updates.component.html',
  styleUrls: ['./project-quotation-updates.component.scss']
})
export class ProjectQuotationUpdatesComponent implements OnInit {
  dataevent:any;
  project_quotation_id:any;
  resp:any;
  pqdata:any;
  resp1:any;
  resp2:any;
  udata:any;
  pdata:any;
  isSubmitted=false;
  formAddEdit:FormGroup;
  pqData:any;
  pqData1:any;
  pquData:any;
  productData:any;
  userData:any;
  pqresp:any;
  pqidData:any;
  prodinfo:any;
  public event1:any;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = 'success';
  failure_status: NbComponentStatus = 'danger';
  title='Project quotation Updates';
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
    private activatedroute:ActivatedRoute, 
    private pqservice:ProjectQuotationService,
    private pquservice:ProjectQuotationUpdatesService,
    protected dateService: NbDateService<Date>,
    private ds:NbDialogService,
    public router:Router,
    public productservice:ProductService,
    public userservice:UserService,
    public http:HttpClient,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    ) { 
  }

  ngOnInit(): void {
    this.isSubmitted=false;

    console.log(this.activatedroute,"ar");
    
    this.project_quotation_id=this.activatedroute.snapshot.params.id;
    console.log(this.project_quotation_id,"pqd");
    this.pqservice.getpqdetailsbyid(this.project_quotation_id).subscribe(res=>{
      this.resp=res;
      this.pqData=this.resp.data.results[0];
      console.log(this.pqData,"pqdata");
    })
    
    this.productservice.getproduct().subscribe(res=>{
      this.resp1=res;
      this.productData=this.resp1.data.results;
      console.log(this.productData,"Product data");
    });
    this.userservice.getuser_name().subscribe(res=>{
      this.resp1=res;
      this.userData=this.resp1.data.results;
      console.log(this.userData,"User data");
    });
    
    this.pquservice.getprojectquotationupdates(this.project_quotation_id).subscribe(res=>{
      this.resp1=res;
      this.pquData=this.resp1.data.results;
      console.log("pluData",this.pquData);
      // this.formAddEdit=this.formBuilder.group({
      //   'project_quotation_id':this.pluData.project_quotation_id,
      //   'project_quotation_updates_remarks':['',[Validators.required]],
      //   'project_quotation_updates_date':['',[Validators.required]],
      // })
      // console.log(this.formAddEdit,"formaddedit");
      // this.source.load(this.plData);
    });
    this.getpqData();
    
  }

  get f(){
    return this.formAddEdit.controls;
  }
  
  settings = {
    mode: 'external',
    actions:false,
    columns: {
      project_quotation_updates_remarks:{
        title:'Remarks',
        type:'string',
      },
      project_quotation_updates_date:{
        title:'Project quotation Updates Date',
        type:'string',
      },
      project_quotation_updates_created_date: {
        title: 'Created Date',
        type: 'string',
      },
      // project_quotation_updates_updated_date: {
      //   title: 'Updated Date',
      //   type: 'string',
      // },
    },
  };

  settings1 = {
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
     pq_specified_products_quantity: {
       title: 'Quantity',
       type: 'string',
     },
     unit_name:{
       title:'Unit',
       type:'string',
     },
   },
 };


  source: LocalDataSource = new LocalDataSource();
  open1(dialog:TemplateRef<any>){
    // this.ngOnInit();
    this.formAddEdit=this.formBuilder.group({
      'project_quotation_id':this.project_quotation_id,
      'project_quotation_updates_remarks':['',[Validators.required]],
      'project_quotation_updates_date':['',[Validators.required]],
    })
    console.log(this.formAddEdit,"formaddedit");
    this.ds.open(dialog);
  }

  onSubmit(ref:any){
    console.log("Clicked on submit");
    this.isSubmitted = true;
    if (this.formAddEdit.invalid) {
      console.log("form add edit invalid",this.formAddEdit.invalid);
      return;
    }
    else{
      console.log("inside else");
        var body={
          'project_quotation_id':this.formAddEdit.value.project_quotation_id,
          'project_quotation_updates_remarks':this.formAddEdit.value.project_quotation_updates_remarks,
          'project_quotation_updates_date':this.formAddEdit.value.project_quotation_updates_date,
        }
        console.log(body,"body");  
        this.pquservice.createprojectquotationupdates(body).subscribe(res=>{
          this.showToast(this.success_status, this.title, this.add_success_content);
          ref.close();
          this.ngOnInit();
        },err=>{
          this.showToast(this.failure_status, this.title, this.add_failure_content);
          this.ngOnInit();
        });
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
  getpqData(){
    this.pqservice.getprojectquotationbyid(this.project_quotation_id).subscribe(res=>{
      this.pqresp=res;
      this.pqidData=this.pqresp.data.results[0];
      this.prodinfo=this.pqidData.productinfo;
      console.log("Getting res",this.prodinfo);
    })
  }
 
}
