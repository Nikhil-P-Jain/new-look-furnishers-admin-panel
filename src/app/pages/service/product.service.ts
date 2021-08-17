import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api = 'http://localhost:3000/api/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getproduct():Observable<any[]>{
    return this.http.get<any[]>(api+`/getproduct`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getproductbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproductbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createproduct(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproduct`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateproduct(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproduct`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteproduct(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproduct/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

}
