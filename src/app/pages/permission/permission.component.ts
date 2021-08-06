import { HttpClient } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  
  formAddEdit:FormGroup;
  permissionData=[];
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
  dataYes='Yes';
  dataNo='No';
  title='Permission';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';

  roleData: any;
  roleid:any;
  rolenamedata:any;
  activitiesData: any;
  uniqueId:any;
  constructor(private ds:NbDialogService,
    private permissionService:PermissionService,
    private rs:roleservice,
    private as:activitiesservice,
    public http:HttpClient,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,) { }
  open() {
    this.ds.open(AddPermissionComponent, {
    });
  }
  // openEdit(event){
  //   console.log(event,"OPEN")
  //   this.ds.open(EditPermissionComponent)
  // }
  
  ngOnInit(){
    this.rs.getrole().subscribe(res=>{
      this.resp=res;
      this.roleData=this.resp.data.results;
    })
    this.as.getactivities().subscribe(res=>{
      this.resp1=res;
      this.activitiesData=this.resp1.data.results;
      console.log(this.activitiesData,"acti data");
    })
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
      this.formAddEdit=this.formBuilder.group({
        'Role_Name':[],
        'activities_name':[],
        'permission_view':[],
        'permission_create':[],
        'permission_update':[],
        'permission_delete':[]
      })
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
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
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
  // open3() {
  //   this.dialogService.open(DialogNamePromptComponent)
  //     .onClose.subscribe(name => name && this.names.push(name));
  // }

  source: LocalDataSource = new LocalDataSource();
  open2(dialog: TemplateRef<any>,event:any) {
    
    console.log("open2 function called");
    
    if(this.formAddEdit.value.permission_view==1){
      this.formAddEdit.value.permission_view=true;
    }else{
      this.formAddEdit.value.permission_view=false;
    }
    if(this.formAddEdit.value.permission_create==1){
      this.formAddEdit.value.permission_create=true;
    }else{
      this.formAddEdit.value.permission_create=false;
    }
    if(this.formAddEdit.value.permission_update==1){
      this.formAddEdit.value.permission_update=true;
    }else{
      this.formAddEdit.value.permission_update=false;
    }
    if(this.formAddEdit.value.permission_delete==1){
      this.formAddEdit.value.permission_delete=true;
    }else{
      this.formAddEdit.value.permission_delete=false;
    }
    console.log(event, "event inside dailog");
    this.uniqueId=event.data.permission_id;
    this.permissionService.getPermissionbyid(this.uniqueId).subscribe(res=>{
      this.resp2=res;
      this.rolenamedata=this.resp2.data.results[0];
      console.log("Getting res",this.rolenamedata);
      this.formAddEdit.reset({
        'Role_Name':JSON.stringify(this.rolenamedata.role_id),
        'activities_name':this.rolenamedata.activities_id,
        'permission_view':this.rolenamedata.permission_view,
        'permission_create':this.rolenamedata.permission_create,
        'permission_update':this.rolenamedata.permission_update,
        'permission_delete':this.rolenamedata.permission_delete
      })
      console.log(this.formAddEdit,"formaddedit");
    })
    this.ds.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }
  

  deletePermission(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.permissionService.deletePermission(event.data.permission_id).subscribe(res=>{
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

  editPermission(ref:any){
    for(var i=0;i<this.formAddEdit.value.activities_name.length;i++){
      this.formAddEdit.value.activities_name[i]=parseInt(this.formAddEdit.value.activities_name[i])
    }
    
    var data = {"role_id" : parseInt(this.formAddEdit.value.Role_Name),
    "activities_id":this.formAddEdit.value.activities_name,
    "permission_view":this.formAddEdit.value.permission_view,
    "permission_create":this.formAddEdit.value.permission_create,
    "permission_update":this.formAddEdit.value.permission_update,
    "permission_delete":this.formAddEdit.value.permission_delete,
    "permission_id":this.uniqueId};
    console.log("Getting Data Body:-", data);
    this.permissionService.updatePermission(data).subscribe(res=>{
      this.resp=res;
      if(this.resp.success==1){
        this.showToast(this.success_status, this.title, this.edit_success_content);
        this.ngOnInit();
        ref.close();
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
}
