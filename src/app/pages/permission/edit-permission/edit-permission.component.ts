import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { activitiesservice } from '../../service/activities.service';
import { PermissionService } from '../../service/permission.service';
import { roleservice } from '../../service/role.service';

@Component({
  selector: 'ngx-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.scss']
})
export class EditPermissionComponent implements OnInit {
  formPermission:FormGroup;
  roleData:any;
  activitiesData:any;
  resp:any;
  resp1:any;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = 'success';
  failure_status: NbComponentStatus = 'danger';
  title='Permission';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  AddEdit:FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(protected ref: NbDialogRef<EditPermissionComponent>,
    private rs:roleservice,
    private as:activitiesservice,
    private permissionService:PermissionService,
    public http:HttpClient,
    private toastrService: NbToastrService) { 
  }
  ngOnInit(): void {

    
  }

  getpermissionbyid(event){
    console.log(event,"Event2");
    this.permissionService.getPermissionbyid(event.data.permission_id).subscribe(res=>{

    })
  }
  editPermission(event){

    console.log(event.newData,"New Data");
    var data = {
      "Role_Name" : event.newData.Role_Name,
      "activities_name":event.newData.activities_name,
      "permission_view":event.newData.permission_view,
      "permission_create":event.newData.permission_create,
      "permission_update":event.newData.permission_update,
      "permission_delete":event.newData.permission_delete,
      };
    this.permissionService.updatePermission(event.data).subscribe(res=>{
      this.resp=res;
      if(this.resp.success==1){
        this.showToast(this.success_status, this.title, this.edit_success_content);
        event.confirm.resolve(event.newData);
        this.ngOnInit();
      }
      else{
        this.showToast(this.failure_status, this.title, this.edit_failure_content);
      }
    },
    (err)=>{
      this.showToast(this.failure_status, this.title, this.edit_failure_content);
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
  }
}