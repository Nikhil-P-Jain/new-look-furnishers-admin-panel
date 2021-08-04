import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { activitiesservice } from '../../service/activities.service';
import { PermissionService } from '../../service/permission.service';
import { roleservice } from '../../service/role.service';
import { PermissionComponent } from '../permission.component';
@Component({
  selector: 'ngx-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {
  // @Input() ng = refresh();
  roleData:any;
  formPermission:FormGroup;
  activitiesData:any;
  resp:any;
  resp1:any;
  resp2:any;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = 'success';
  failure_status: NbComponentStatus = 'danger';
  title='Permission';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  AddEdit:FormGroup;
  // source: LocalDataSource = new LocalDataSource();
  constructor(protected ref: NbDialogRef<AddPermissionComponent>,
    // private ref1:NbDialogRef<PermissionComponent>,
    private rs:roleservice,
    private as:activitiesservice,
    private permissionService:PermissionService,
    public http:HttpClient,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private route:Router) { }
  ngOnInit(): void {
   this.rs.getrole().subscribe(res=>{
     this.resp=res;
     this.roleData=this.resp.data.results;
   })
   this.as.getactivities().subscribe(res=>{
     this.resp1=res;
     this.activitiesData=this.resp1.data.results;
     console.log(this.activitiesData,"acti data");
   })
   this.formPermission=this.formBuilder.group({
     'Role_Name':[],
     'activities_name':[],
     'permission_view':[],
     'permission_create':[],
     'permission_update':[],
     'permission_delete':[]
   })
  }
  source: LocalDataSource = new LocalDataSource();

  addPermission() {
    if(this.formPermission.value.permission_view==true){
      this.formPermission.value.permission_view=1;
    }else{
      this.formPermission.value.permission_view=0;
    }
    if(this.formPermission.value.permission_create==true){
      this.formPermission.value.permission_create=1;
    }else{
      this.formPermission.value.permission_create=0;
    }
    if(this.formPermission.value.permission_update==true){
      this.formPermission.value.permission_update=1;
    }else{
      this.formPermission.value.permission_update=0;
    }
    if(this.formPermission.value.permission_delete==true){
      this.formPermission.value.permission_delete=1;
    }else{
      this.formPermission.value.permission_delete=0;
    }
    for(var i=0;i<this.formPermission.value.activities_name.length;i++){
      this.formPermission.value.activities_name[i]=parseInt(this.formPermission.value.activities_name[i])
    }

    var data = {
      "role_id" : parseInt(this.formPermission.value.Role_Name),
      "activities_id": this.formPermission.value.activities_name,
      "permission_view":this.formPermission.value.permission_view,
      "permission_create":this.formPermission.value.permission_create,
      "permission_update":this.formPermission.value.permission_update,
      "permission_delete":this.formPermission.value.permission_delete
    };
    console.log(data,"data");
    
    this.permissionService.createPermission(data).subscribe(res=>{
      this.resp=res;
      if(this.resp.success==1){
        this.showToast(this.success_status, this.title, this.add_success_content);
        window.location.reload();
        this.dismiss();
        this.ngOnInit();
      }
      else{
        this.showToast(this.failure_status, this.title, this.add_failure_content);
      }
    },
    (err)=>{
        this.showToast(this.failure_status, this.title, this.add_failure_content);
      }
    )
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

  dismiss() {
    this.ref.close();
    this.route.navigate(['/pages/permission'])
    // this.ref.onClose.subscribe(res=>{
    //   if(res){
    //     this.permissionService.getRoleName().subscribe(res=>{
    //       this.resp2=res;
    //     });
    //   }
    // })
  }
}