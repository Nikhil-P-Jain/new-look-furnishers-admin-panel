import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { activitiesservice } from '../service/activities.service';
import { PermissionService } from '../service/permission.service';
import { roleservice } from '../service/role.service';
import { AddPermissionComponent } from './add-permission/add-permission.component';
import { EditPermissionComponent } from './edit-permission/edit-permission.component';

@Component({
  selector: 'ngx-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  
  permissionData=[];
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
  dataYes='Yes';
  dataNo='No';
  title='Permission';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  roleData: any;
  activitiesData: any;
  constructor(private ds:NbDialogService,
    private permissionService:PermissionService,
    public http:HttpClient,
    private toastrService: NbToastrService) { }
  open() {
    this.ds.open(AddPermissionComponent, {
    });
  }
  openEdit(event){
    console.log(event,"OPEN")
    this.ds.open(EditPermissionComponent,event)
  }
  ngOnInit(){
    this.permissionService.getRoleName().subscribe(res=>{
      this.resp1=res;
      console.log(this.resp1.data.results,"resp1");
      
      this.permissionData=this.resp1.data.results;
      this.permissionData.forEach(element => {
        // console.log(element.Role_Status);
        if(element.permission_view == 0){
          element.permission_view=this.dataNo;
        }else if(element.permission_view==1){
          element.permission_view=this.dataYes;
        }
        if(element.permission_create == 0){
          element.permission_create=this.dataNo;
        }else if(element.permission_create==1){
          element.permission_create=this.dataYes;
        }
        if(element.permission_update == 0){
          element.permission_update=this.dataNo;
        }else if(element.permission_update==1){
          element.permission_update=this.dataYes;
        }
        if(element.permission_delete == 0){
          element.permission_delete=this.dataNo;
        }else if(element.permission_delete==1){
          element.permission_delete=this.dataYes;
        }
      });
      // console.log(res,"PERMISSION");
      this.source.load(this.permissionData);
    });
  }
   settings = {
     mode: 'external',
     actions: {
       add:false,
      },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      Role_Name: {
        title: 'Role Name',
        type: 'string',
      },
      activities_name: {
        title: 'Activity Name',
        type: 'string',
      },
      permission_view:{
        title:'View Permission',
        type:'string',
      },
      permission_create:{
        title:'Create Permission',
        type:'string',
      },
      permission_update:{
        title:'Update Permission',
        type:'string',
      },
      permission_delete:{
        title:'Delete Permission',
        type:'string',
      },
      permission_created_date: {
        title: 'Created Date',
        type: 'string',
        editable:false,
        addable:false,
      },
      permission_updated_date: {
        title: 'Updated Date',
        type: 'string',
        editable:false,
        addable:false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  deletePermission(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.permissionService.deletePermission(event.data.permission_id).subscribe(res=>{
        this.resp=res;
        if(this.resp.success==1){
          this.showToast(this.success_status, this.title, this.delete_success_content);
          this.resp=res;
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
}
