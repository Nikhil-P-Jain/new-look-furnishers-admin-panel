import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { StateService } from '../service/state.service';
import { CityService } from '../service/city.service';

@Component({
  selector: 'ngx-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  constructor(private cityservice:CityService,public http:HttpClient,private toastrService: NbToastrService,private stateservice:StateService) {}
  cityData;
  stateData;
  resp:any;
  resp1:any;
  resp2:any;
  count=0;
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
  title='City';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  ngOnInit(){
    if(this.count==0){
      this.pushData();
    }
    this.cityservice.getcity().subscribe(res=>{
      this.resp1=res;
      this.cityData=this.resp1.data.results;
      console.log(this.cityData,"citydata");
      //To fetch the role status to covert 0 and 1 to Active and Deactive
      this.cityData.forEach(element => {
        console.log(element.city_status);  
        if(element.city_status == 0){
          element.city_status=this.dataDeactive
        }else if(element.city_status==1){
          element.city_status=this.dataActive
        }
      });
      this.source.load(this.cityData);
    });
    this.count=1;
  }
   settings = {
     mode: 'inline',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true,
      columns: {
        city_name: {
          title: 'City Name',
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
      city_name: {
        title: 'City Name',
        type: 'string',
      },
      state_name: {
        title: 'State Name',
        type: 'string',
        addable:true,
        editor: {
          type: 'list',
          config: {
            list: [],
          }
        }
      },
      city_status: {
        title: 'City Status',
        type: 'string',
        addable:false,
        editor: {
          type: 'list',
          config: {
            list: [
              { value: this.dataActive, title: this.dataActive }, 
              { value: this.dataDeactive, title: this.dataDeactive },
            ]
          }
        }
      },
      city_created_date: {
        title: 'Created Date',
        type: 'string',
        editable:false,
        addable:false,
      },
      city_updated_date: {
        title: 'Updated Date',
        type: 'string',
        editable:false,
        addable:false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  pushData(){
    this.stateservice.getstate().subscribe(res=>{
      this.resp2=res;
      this.stateData=this.resp2.data.results;
      this.stateData.forEach(element => {
        //error is because of value:element.state_name, chanfe it to state_id
        this.settings.columns.state_name.editor.config.list.push({ value: element.state_id, title: element.state_name });
      });
      this.settings = Object.assign({}, this.settings);
    })
  }
  addCity(event) {
    console.log(event,"event");
    
    var data = {"city_name" : event.newData.city_name,"state_id":event.newData.state_name};
    this.cityservice.createcity(data).subscribe(res=>{
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

  editCity(event){
    console.log(event.newData,"newDataof");
    // this.stateData.forEach(element => {
    //     //error is because of value:element.state_name, chanfe it to state_id
    //     this.settings.columns.state_name.editor.config.list.push({ value: element.state_name, title: element.state_name });
    //   });  
    
    if(event.newData.city_status == this.dataActive){
      event.newData.city_status=1;
    }else if(event.newData.city_status == this.dataDeactive){
      event.newData.city_status=0;
    }
    var data = {"city_name" : event.newData.city_name,"state_id":event.newData.state_name,"city_status":event.newData.city_status,"city_id":event.newData.city_id};
    console.log(data,"data");
    this.cityservice.updatecity(data).subscribe(res=>{
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
      this.cityservice.deletecity(event.data.city_id).subscribe(res=>{
        this.resp=res;
        if(this.resp.success==1){
          this.showToast(this.success_status, this.title, this.delete_success_content);
          event.confirm.resolve(event.source.data);
          this.ngOnInit();
        }
        else{
          this.showToast(this.failure_status, this.title, this.delete_failure_content);
          this.ngOnInit();
        }
      },
      (err)=>{
        this.showToast(this.failure_status, this.title, this.add_failure_content);
        this.ngOnInit();
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
