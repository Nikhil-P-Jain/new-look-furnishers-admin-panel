import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { roleservice } from '../service/role.service';
import { SiteService } from '../service/site.service';
import { UserService } from '../service/user.service';
const URL = 'http://localhost:3000/api/upload/file';
@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isSubmitted=false;
  formAddEdit:FormGroup;
  userData:any;
  userData1:any;
  siteData:any;
  roleData:any;
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
  title='User';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  dataActive='Active';
  dataDeactive='Deactive';
  uniqueId:any;
  imgURL:any;
  images:any;
  pic:any;
  constructor(private ds:NbDialogService,
    private siteservice:SiteService,
    public http:HttpClient,
    private roleservice: roleservice,
    private userservice:UserService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(){
    this.isSubmitted=false;
    this.imgURL='';
    this.roleservice.getrole().subscribe(res=>{
      this.resp1=res;
      this.roleData=this.resp1.data.results;
      console.log(this.roleData,"Role data");
    });
    this.siteservice.getsite().subscribe(res=>{
      this.resp1=res;
      this.siteData=this.resp1.data.results;
      console.log(this.siteData,"site data");
    });
    this.userservice.getuser().subscribe(res=>{
      this.resp1=res;
      this.userData=this.resp1.data.results;
      console.log("userdata",this.userData);
      this.userData.forEach(element => {
        console.log(element.status);  
        if(element.status == 0){
          element.status=this.dataDeactive
        }else if(element.status==1){
          element.status=this.dataActive
        }
      });
      this.formAddEdit=this.formBuilder.group({
        'first_name':['',[Validators.required]],
        'middle_name':[],
        'last_name':['',[Validators.required]],
        'address1':['',[Validators.required]],
        'address2':[],
        'phone':['',[Validators.required]],
        'email':['',[Validators.required]],
        'username':['',[Validators.required]],
        'password':['',[Validators.required]],
        'photo':[''],
        'role_id':['',[Validators.required]],
        'site_id':['',[Validators.required]],
        'status':[]
      })
      // console.log(res,"PERMISSION");
      this.source.load(this.userData);
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
      first_name: {
        title: 'First  Name',
        type: 'string',
      },
      middle_name: {
        title: 'Middle  Name',
        type: 'string',
      },
      last_name: {
        title: 'Last  Name',
        type: 'string',
      },
      address1:{
        title:'Primary Address',
        type:'string',
      },
      address2:{
        title:'Secondary Address',
        type:'string',
      },
      phone:{
        title:'Phone',
        type:'string',
      },
      email:{
        title:'Email',
        type:'string',
      },
      username:{
        title:'Username',
        type:'string',
      },
      photo:{
        title:'Photo',
        // type:'string',
        type: 'html', 
        valuePrepareFunction: (value) => { return '<img height="150px" width="150px" src= ' + value + '  />' }
      },
      
      role_name: {
        title: 'Role Name',
        type: 'string',
      },
      site_name: {
        title: 'Site Name',
        type: 'string',
      },
      status: {
        title: 'Status',
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
    this.uniqueId=event.data.user_id;
    this.userservice.getuserbyid(this.uniqueId).subscribe(res=>{
      this.resp2=res;
      this.userData1=this.resp2.data.results[0];
      console.log("Getting res",this.userData1);
      this.imgURL=this.userData1.photo;
      this.pic=this.userData1.photo;
      this.formAddEdit.reset({
        'first_name':this.userData1.first_name,
        'middle_name':this.userData1.middle_name,
        'last_name':this.userData1.last_name,
        'address1':this.userData1.address1,
        'address2':this.userData1.address2,
        'phone':this.userData1.phone,
        'email':this.userData1.email,
        'username':this.userData1.username,
        'password':this.userData1.password,
        'role_id':JSON.stringify(this.userData1.role_id),
        'site_id':JSON.stringify(this.userData1.site_id),
        'status':this.userData1.status==0?"Deactive":"Active"
      })
      console.log(this.formAddEdit,"formaddedit");
    })
    this.ds.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }
  
  open1(dialog:TemplateRef<any>){
    this.formAddEdit.reset();
    this.ds.open(dialog);
  }
  

  deleteUser(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.userservice.deleteuser(event.data.user_id).subscribe(res=>{
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

  async selectFile(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();  
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event:any) => {
        if(event != undefined){
          this.imgURL = event.target.result;
        }
      }
    }
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.images = file;
      const formData = new FormData();
      formData.append('file', this.images);
      // console.log("formdata append",formData.append('file', this.images));
      this.http.post<any>(URL, formData).subscribe(res=>{
        console.log("file path",res.file.path);
        this.pic = "http://localhost:3000/"+res.file.path;
        // this.disabled();
        console.log("Getting Image :-", this.pic);
      });
    }
  }
 

  async onSubmit(ref:any){
    console.log("Clicked on submit");
    this.isSubmitted = true;
      if (this.formAddEdit.invalid) {
        console.log("form add edit invalid",this.formAddEdit.invalid);
        return;
      }else{
        console.log("inside else");
        
        if(this.formAddEdit.value.status==this.dataActive){
                this.formAddEdit.value.status=1;
        }
        else if(this.formAddEdit.value.status==this.dataDeactive){
                this.formAddEdit.value.status=0;
        }
        if(!this.uniqueId){
          var body={
            'first_name':this.formAddEdit.value.first_name,
            'middle_name':this.formAddEdit.value.middle_name,
            'last_name':this.formAddEdit.value.last_name,
            'address1':this.formAddEdit.value.address1,
            'address2':this.formAddEdit.value.address2,
            'phone':this.formAddEdit.value.phone,
            'email':this.formAddEdit.value.email,
            'username':this.formAddEdit.value.username,
            'password':this.formAddEdit.value.password,
            'photo':this.pic,
            'role_id':this.formAddEdit.value.role_id,
            'site_id':this.formAddEdit.value.site_id,
            'status':this.formAddEdit.value.status
            }
            console.log(body,"body");
            this.userservice.createuser(body).subscribe(res=>{
              this.showToast(this.success_status, this.title, this.add_success_content);
              ref.close();
              this.imgURL="";
              this.ngOnInit();
            },err=>{
              this.showToast(this.failure_status, this.title, this.add_failure_content);
              this.ngOnInit();
            });
        }
        else{
          var bo={
            'first_name':this.formAddEdit.value.first_name,
            'middle_name':this.formAddEdit.value.middle_name,
            'last_name':this.formAddEdit.value.last_name,
            'address1':this.formAddEdit.value.address1,
            'address2':this.formAddEdit.value.address2,
            'phone':this.formAddEdit.value.phone,
            'email':this.formAddEdit.value.email,
            'username':this.formAddEdit.value.username,
            'password':this.formAddEdit.value.password,
            'photo':this.pic,
            'role_id':this.formAddEdit.value.role_id,
            'site_id':this.formAddEdit.value.site_id,
            'status':this.formAddEdit.value.status,
            'user_id':this.uniqueId 
          }
          console.log("bo",bo);
          this.userservice.updateuser(bo).subscribe(res=>{
            this.resp3 = res;
            console.log("resp3",this.resp3);
            
            // this.message = this.rep.message;
            this.showToast(this.success_status, this.title, this.edit_success_content);
            ref.close();
            this.ngOnInit();
            this.uniqueId='';
            this.imgURL='';
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
    this.imgURL='';
    this.formAddEdit.reset();
  }
}
