import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
const api = environment.BASE_URL+'project_order';


@Injectable({
  providedIn: 'root'
})
export class ProjectOrderService {

  constructor(private http:HttpClient) { }
  getprojectorder():Observable<any[]>{
    return this.http.get<any[]>(api+`/getproject_order`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getprojectorderbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproject_orderbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createprojectorder(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproject_order`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateprojectorder(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproject_order`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteprojectorder(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproject_order/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
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
  getproject_lead_name():Observable<any[]>{
    return this.http.get<any[]>(api+`/getproject_lead_name`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }
}
