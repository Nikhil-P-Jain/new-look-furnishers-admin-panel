import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { StateService } from '../service/state.service';

@Component({
  selector: 'ngx-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent {
  constructor(private stateservice:StateService,public http:HttpClient,private toastrService: NbToastrService) {}
  stateData;
  resp:any;
  resp1:any;
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
  title='State';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  ngOnInit(){
    this.stateservice.getstate().subscribe(res=>{
      this.resp1=res;
      this.stateData=this.resp1.data.results;
      console.log(this.stateData);
      //To fetch the role status to covert 0 and 1 to Active and Deactive
      this.stateData.forEach(element => {
        console.log(element.state_status);  
        if(element.state_status == 0){
          element.state_status=this.dataDeactive
        }else if(element.state_status==1){
          element.state_status=this.dataActive
        }
      });
      this.source.load(this.stateData);
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
        state_name: {
          title: 'State Name',
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
      state_name: {
        title: 'State Name',
        type: 'string',
      },
      state_status: {
        title: 'State Status',
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
      state_created_date: {
        title: 'Created Date',
        type: 'string',
        editable:false,
        addable:false,
      },
      state_updated_date: {
        title: 'Updated Date',
        type: 'string',
        editable:false,
        addable:false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  addState(event) {
    var data = {"state_name" : event.newData.state_name};
    this.stateservice.createstate(data).subscribe(res=>{
      this.resp=res;
      if(this.resp.success==1){
        this.showToast(this.success_status, this.title, this.add_success_content);
        event.confirm.resolve(event.newData);
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

  editState(event){
    console.log(event.newData,"newDataof");
    
    if(event.newData.state_status == this.dataActive){
      event.newData.state_status=1;
    }else if(event.newData.state_status == this.dataDeactive){
      event.newData.state_status=0;
    }
    var data = {"state_name" : event.newData.state_name,"state_status":event.newData.state_status,"state_id":event.newData.state_id};
    this.stateservice.updatestate(data).subscribe(res=>{
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
      this.showToast(this.failure_status, this.title, this.add_failure_content);
    }
    )
  }

  onDeleteConfirm(event) {
    console.log("ID",event.data);
    if(window.confirm('Are you sure you want to delete?')) {
      this.stateservice.deletestate(event.data.state_id).subscribe(res=>{
        if(this.resp.success==1){
          this.showToast(this.success_status, this.title, this.delete_success_content);
          event.confirm.resolve(event.source.data);
          this.ngOnInit();
        }
        else{
          this.showToast(this.failure_status, this.title, this.delete_failure_content);
        }
      },
      (err)=>{
        this.showToast(this.failure_status, this.title, this.add_failure_content);
      }
      );
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
