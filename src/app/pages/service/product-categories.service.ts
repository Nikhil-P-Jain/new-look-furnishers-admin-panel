import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api = 'http://localhost:3000/api/product_category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {
  constructor(private http:HttpClient) { }
  getproduct_category():Observable<any[]>{
    return this.http.get<any[]>(api+`/getproduct_category`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getproduct_categorybyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproduct_categorybyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createproduct_category(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproduct_category`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateproduct_category(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproduct_category`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteproduct_category(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproduct_category/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

}
