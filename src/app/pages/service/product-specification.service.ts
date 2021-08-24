import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api = 'http://localhost:3000/api/product_specification';
@Injectable({
  providedIn: 'root'
})
export class ProductSpecificationService {

  constructor(private http:HttpClient) { }
  getproductspecification():Observable<any[]>{
    return this.http.get<any[]>(api+`/getproductspecification`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getproductspecificationbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproductspecificationbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createproductspecification(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproductspecification`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateproductspecification(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproductspecification`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteproductspecification(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproductspecification/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  getproductspecificationbyproductid(id:any):Observable<any[]>{
    return this.http.get<any[]>(api+`/getproductspecificationbyproductid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

}
