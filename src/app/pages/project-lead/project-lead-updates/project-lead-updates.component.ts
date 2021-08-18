import { ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProjectLeadService } from '../../service/project-lead.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus, NbDateService, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { ProductBrandService } from '../../service/product-brand.service';
import { ProductService } from '../../service/product.service';
import { UserService } from '../../service/user.service';
import { ProjectLeadUpdatesService } from '../../service/project-lead-updates.service';
import { LocalDataSource } from 'ng2-smart-table';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'ngx-project-lead-updates',
  templateUrl: './project-lead-updates.component.html',
  styleUrls: ['./project-lead-updates.component.scss']
})
export class ProjectLeadUpdatesComponent implements OnInit{
  dataevent:any;
  project_lead_id:any;
  pldata:any;
  resp:any;
  resp1:any;
  resp2:any;
  udata:any;
  pdata:any;
  isSubmitted=false;
  formAddEdit:FormGroup;
  plData:any;
  plData1:any;
  pluData:any;
  productData:any;
  userData:any;
  public event1:any;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = 'success';
  failure_status: NbComponentStatus = 'danger';
  title='Project Lead Updates';
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
    private plservice:ProjectLeadService,
    private pluservice:ProjectLeadUpdatesService,
    protected dateService: NbDateService<Date>,
    private ds:NbDialogService,
    public router:Router,
    public productservice:ProductService,
    public userservice:UserService,
    public pbservice:ProductBrandService,
    public http:HttpClient,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    ) { 
  }

  ngOnInit(): void {
    this.isSubmitted=false;

    console.log(this.activatedroute,"ar");
    
    this.project_lead_id=this.activatedroute.snapshot.params.id;
    console.log(this.project_lead_id,"pid");
    this.plservice.getpldetailsbyid(this.project_lead_id).subscribe(res=>{
      this.resp=res;
      this.pldata=this.resp.data.results[0];
      console.log(this.pldata,"pldata");
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
    this.pluservice.getprojectleadupdates(this.project_lead_id).subscribe(res=>{
      this.resp1=res;
      this.pluData=this.resp1.data.results;
      console.log("pluData",this.pluData);
      // this.formAddEdit=this.formBuilder.group({
      //   'project_lead_id':this.pluData.project_lead_id,
      //   'project_lead_updates_remarks':['',[Validators.required]],
      //   'project_lead_updates_date':['',[Validators.required]],
      // })
      // console.log(this.formAddEdit,"formaddedit");
      // this.source.load(this.plData);
    });
    
  }

  get f(){
    return this.formAddEdit.controls;
  }
  
  settings = {
    mode: 'external',
    actions:false,
    columns: {
      project_lead_updates_remarks:{
        title:'Remarks',
        type:'string',
      },
      project_lead_updates_date:{
        title:'Project Lead Updates Date',
        type:'string',
      },
      project_lead_updates_created_date: {
        title: 'Created Date',
        type: 'string',
      },
      // project_lead_updates_updated_date: {
      //   title: 'Updated Date',
      //   type: 'string',
      // },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  open1(dialog:TemplateRef<any>){
    // this.ngOnInit();
    this.formAddEdit=this.formBuilder.group({
      'project_lead_id':this.project_lead_id,
      'project_lead_updates_remarks':['',[Validators.required]],
      'project_lead_updates_date':['',[Validators.required]],
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
          'project_lead_id':this.formAddEdit.value.project_lead_id,
          'project_lead_updates_remarks':this.formAddEdit.value.project_lead_updates_remarks,
          'project_lead_updates_date':this.formAddEdit.value.project_lead_updates_date,
        }
        console.log(body,"body");  
        this.pluservice.createprojectleadupdates(body).subscribe(res=>{
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
 
}
