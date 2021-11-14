import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrderServiceService } from '../../service/purchase-order-service.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { NbDialogService } from '@nebular/theme';

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
    private ds:NbDialogService,
    private poservice:PurchaseOrderServiceService

  ) { }
  open(dialog: TemplateRef<any>) {
    this.ds.open(dialog, {
    });
  }
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
      console.log("Getting res",this.poData);
    })
  }

  public convetToPDF(){
    var data = document.getElementById('content');
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)
    pdf.save('Purchase-Order.pdf'); // Generated PDF
  });
}


}
