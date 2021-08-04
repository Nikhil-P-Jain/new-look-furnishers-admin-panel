import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { activitiesservice } from '../service/activities.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentStatus, NbGlobalPhysicalPosition ,NbGlobalPosition,NbToastrConfig,NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
  activitiesData;
  resp1;
  dataActive='Active';
  dataDeactive='Deactive';
  resp:any;
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  success_status: NbComponentStatus = 'success';
  failure_status: NbComponentStatus = 'danger';
  title='Activity';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  constructor(private actservice:activitiesservice,public http:HttpClient,private toastrService: NbToastrService) {}
  ngOnInit(){
    this.actservice.getactivities().subscribe(res=>{
      // this.activitiesData=res['data'];
      this.resp1=res;
      this.activitiesData=this.resp1.data.results;
      console.log(this.activitiesData);
      //To fetch the status to covert 0 and 1 to Active and Deactive
      this.activitiesData.forEach(element => {
        console.log(element.activities_status);  
        if(element.activities_status == 0){
          element.activities_status=this.dataDeactive
        }else if(element.activities_status==1){
          element.activities_status=this.dataActive
        }
      });
      this.source.load(this.activitiesData);
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
        activities_name: {
          title: 'Activities Name',
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
      activities_name: {
        title: 'Activities Name',
        type: 'string',
      },
      activities_status: {
        title: 'Activities Status',
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
      activities_created_date: {
        title: 'Created Date',
        type: 'string',
        editable:false,
        addable:false,
      },
      activities_updated_date: {
        title: 'Updated Date',
        type: 'string',
        editable:false,
        addable:false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  addActivities(event) {
    var data = {"activities_name" : event.newData.activities_name};
    this.actservice.createactivities(data).subscribe(res=>{
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

  editActivities(event){
    if(event.newData.activities_status == this.dataActive){
      event.newData.activities_status=1
    }else if(event.newData.activities_status == this.dataDeactive){
      event.newData.activities_status=0
    }
    var data = {"activities_name" : event.newData.activities_name,"activities_status":event.newData.activities_status,"activities_id":event.newData.activities_id};
    this.actservice.updateactivities(data).subscribe(res=>{
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
      this.actservice.deleteactivities(event.data.activities_id).subscribe(res=>{
          this.resp=res;
          if(this.resp.success==1){
            this.showToast(this.success_status, this.title, this.delete_success_content);  
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
