import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnexureService } from '../../service/annexure.service';

@Component({
  selector: 'ngx-annexure',
  templateUrl: './annexure.component.html',
  styleUrls: ['./annexure.component.scss']
})
export class AnnexureComponent implements OnInit {

  poid:any;
  resp:any;
  anData:any;
  constructor(
    private activatedroute:ActivatedRoute, 
    private annexureservice:AnnexureService

  ) { }

  ngOnInit(): void {
    this.poid=this.activatedroute.snapshot.params.id;
    console.log(this.poid,"purchase ORder id");
    this.getpoData();
    
  }

  settings = {
    mode: 'external',
    actions:{
      add:false,
      edit:false,
      delete:false
    },
   columns: {
     po_number: {
       title: 'PO Number',
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
     status:{
       title:'Status',
       type:'string',
     },
   },
 };

  getpoData(){
    this.annexureservice.getannexureby_poid(this.poid).subscribe(res=>{
      this.resp=res;
      this.anData=this.resp.data.results[0];
    })
  }


}