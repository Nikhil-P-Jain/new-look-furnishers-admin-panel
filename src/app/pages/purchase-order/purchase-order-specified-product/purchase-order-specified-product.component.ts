import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrderServiceService } from '../../service/purchase-order-service.service';

@Component({
  selector: 'ngx-purchase-order-specified-product',
  templateUrl: './purchase-order-specified-product.component.html',
  styleUrls: ['./purchase-order-specified-product.component.scss']
})
export class PurchaseOrderSpecifiedProductComponent implements OnInit {
  poid:any;
  resp:any;
  poData:any;
  prodInfo:any;
  constructor(
    private activatedroute:ActivatedRoute, 
    private poservice:PurchaseOrderServiceService

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
     product_specification_name: {
       title: 'Product Specification Name',
       type: 'string',
     },
     purchase_order_specified_product_quantity: {
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
    this.poservice.getpurchaseorderbyid(this.poid).subscribe(res=>{
      this.resp=res;
      this.poData=this.resp.data.results[0];
      this.prodInfo=this.poData.productinfo;
      console.log("Getting res",this.prodInfo);
    })
  }

}
