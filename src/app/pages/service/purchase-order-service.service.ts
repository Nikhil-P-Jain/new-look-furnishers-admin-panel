import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'purchase_order';


@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderServiceService {

  constructor(private http:HttpClient) { }
  getpurchaseorder():Observable<any[]>{
    return this.http.get<any[]>(api+`/getpurchase_order`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getpurchaseorderbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getpurchase_orderbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createpurchaseorder(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createpurchase_order`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updatepurchaseorder(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updatepurchase_order`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deletepurchaseorder(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deletepurchase_order/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  getproduct():Observable<any[]>{
    return this.http.get<any[]>(environment.BASE_URL+`product/getproduct`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getunit():Observable<any[]>{
    return this.http.get<any[]>(environment.BASE_URL+`unit/getunit`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getproductspecificationbyproductid(id:any):Observable<any[]>{
    return this.http.get<any[]>(environment.BASE_URL+`product_specification/getproductspecificationbyproductid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getallspecification():Observable<any[]>{
    return this.http.get<any[]>(environment.BASE_URL+`product_specification/getproductspecification`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

}
