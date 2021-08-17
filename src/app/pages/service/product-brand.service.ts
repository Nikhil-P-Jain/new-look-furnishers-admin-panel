import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const api = 'http://localhost:3000/api/product_brand';

@Injectable({
  providedIn: 'root'
})
export class ProductBrandService {

  constructor(private http:HttpClient) { }
  getproduct_brand():Observable<any[]>{
    return this.http.get<any[]>(api+`/getproduct_brand`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getproduct_brandbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproduct_brandbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createproduct_brand(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproduct_brand`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateproduct_brand(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproduct_brand`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteproduct_brand(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproduct_brand/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

}
