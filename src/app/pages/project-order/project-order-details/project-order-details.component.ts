import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectOrderService } from '../../service/project-order.service';

@Component({
  selector: 'ngx-project-order-details',
  templateUrl: './project-order-details.component.html',
  styleUrls: ['./project-order-details.component.scss']
})
export class ProjectOrderDetailsComponent implements OnInit {
  poid:any;
  resp:any;
  poData:any;
  prodInfo:any;
  constructor(
    private activatedroute:ActivatedRoute, 
    private poservice:ProjectOrderService,

  ) { }

  ngOnInit(): void {
    this.poid=this.activatedroute.snapshot.params.id;
    console.log(this.poid,"project ORder id");
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
     product_name: {
       title: 'Product Name',
       type: 'string',
     },
     product_specification: {
       title: 'Product Specification',
       type: 'string',
     },
     project_order_specified_product_quantity: {
       title: 'Quantity',
       type: 'string',
     },
     unit_name:{
       title:'Unit',
       type:'string',
     },
   },
 };

  getpoData(){
    this.poservice.getprojectorderbyid(this.poid).subscribe(res=>{
      this.resp=res;
      this.poData=this.resp.data.results[0];
      this.prodInfo=this.poData.productinfo;
      console.log("Getting res",this.prodInfo);
    })
  }

}
