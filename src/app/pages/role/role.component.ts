import { Component, OnInit } from '@angular/core';
import { roleservice } from '../service/role.service';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { NbToastrService,NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition ,NbComponentStatus} from '@nebular/theme';


@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  constructor(private roleservice:roleservice,public http:HttpClient,private toastrService: NbToastrService) {}
  roleData;
  resp:any;
  dataActive='Active';
  dataDeactive='Deactive';
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = 'success';
  failure_status: NbComponentStatus = 'danger';
  title='Role';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  ngOnInit(){
    this.roleservice.getrole().subscribe(res=>{
      this.roleData=res['data'];
      console.log(this.roleData);
      //To fetch the role status to covert 0 and 1 to Active and Deactive
      this.roleData.forEach(element => {
        console.log(element.Role_Status);  
        if(element.Role_Status == 0){
          element.Role_Status=this.dataDeactive
        }else if(element.Role_Status==1){
          element.Role_Status=this.dataActive
        }
      });
      this.source.load(this.roleData);
    });
  }
   settings = {
     mode: 'inline',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true,
      columns: {
        Role_Name: {
          title: 'Role Name',
          type: 'string',
        },
      },
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
      Role_Status: {
        title: 'Role Status',
        type: 'string',
        addable:false,
        editor: {
          type: 'list',
          config: {
            list: [
              { value: this.dataActive, title: this.dataActive }, 
              { value: this.dataDeactive, title: this.dataDeactive }
            ]
          }
        }
      },
      Role_Created_Date: {
        title: 'Created Date',
        type: 'string',
        editable:false,
        addable:false,
      },
      Role_Updated_Date: {
        title: 'Updated Date',
        type: 'string',
        editable:false,
        addable:false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  addRole(event) {
    var data = {"Role_Name" : event.newData.Role_Name};
    this.roleservice.createrole(data).subscribe(res=>{
      this.resp=res;
      if(this.resp.success==1){
        this.showToast(this.success_status, this.title, this.add_success_content);
        event.confirm.resolve(event.newData);
        this.ngOnInit();
      }
      else{
        this.showToast(this.failure_status, this.title, this.add_failure_content);
      }
    })
	}

  editRole(event){
    if(event.newData.Role_Status == this.dataActive){
      event.newData.Role_Status=1;
    }else if(event.newData.Role_Status == this.dataDeactive){
      event.newData.Role_Status=0;
    }
    var data = {"Role_Name" : event.newData.Role_Name,"Role_Status":event.newData.Role_Status,"Role_Id":event.newData.Role_Id};
    this.roleservice.updaterole(data).subscribe(res=>{
      this.resp=res;
      if(this.resp.success==1){
        this.showToast(this.success_status, this.title, this.edit_success_content);
        event.confirm.resolve(event.newData);
        this.ngOnInit();
      }
      else{
        this.showToast(this.failure_status, this.title, this.edit_failure_content);
      }
    })
  }

  onDeleteConfirm(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.roleservice.deleterole(event.data.Role_Id).subscribe(res=>{
        if(this.resp.success==1){
          this.showToast(this.success_status, this.title, this.delete_success_content);
          this.resp=res;
          event.confirm.resolve(event.source.data);
          this.ngOnInit();
        }
        else{
          this.showToast(this.failure_status, this.title, this.delete_failure_content);
        }
      });
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
