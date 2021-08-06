import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { UnitService } from '../service/unit.service';

@Component({
  selector: 'ngx-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
  constructor(private unitservice:UnitService,public http:HttpClient,private toastrService: NbToastrService) {}
  unitData;
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
  title='Unit';
  edit_success_content='Edited Successfully!';
  edit_failure_content='Could not be edited!';
  delete_success_content='Deleted Successfully!';
  delete_failure_content='Could not be deleted!';
  add_success_content='Added Successfully!';
  add_failure_content='Could not be added!';
  ngOnInit(){
    this.unitservice.getunit().subscribe(res=>{
      this.resp1=res;
      this.unitData=this.resp1.data.results;
      console.log(this.unitData);
      //To fetch the role status to covert 0 and 1 to Active and Deactive
      this.unitData.forEach(element => {
        console.log(element.unit_status);  
        if(element.unit_status == 0){
          element.unit_status=this.dataDeactive
        }else if(element.unit_status==1){
          element.unit_status=this.dataActive
        }
      });
      this.source.load(this.unitData);
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
        unit_name: {
          title: 'Unit Name',
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
      unit_name: {
        title: 'Unit Name',
        type: 'string',
      },
      unit_status: {
        title: 'Unit Status',
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
      unit_created_date: {
        title: 'Created Date',
        type: 'string',
        editable:false,
        addable:false,
      },
      unit_updated_date: {
        title: 'Updated Date',
        type: 'string',
        editable:false,
        addable:false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  addUnit(event) {
    var data = {"unit_name" : event.newData.unit_name};
    this.unitservice.createunit(data).subscribe(res=>{
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

  editUnit(event){
    console.log(event.newData,"newDataof");
    
    if(event.newData.unit_status == this.dataActive){
      event.newData.unit_status=1;
    }else if(event.newData.unit_status == this.dataDeactive){
      event.newData.unit_status=0;
    }
    var data = {"unit_name" : event.newData.unit_name,"unit_status":event.newData.unit_status,"unit_id":event.newData.unit_id};
    this.unitservice.updateunit(data).subscribe(res=>{
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
      this.unitservice.deleteunit(event.data.unit_id).subscribe(res=>{
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
