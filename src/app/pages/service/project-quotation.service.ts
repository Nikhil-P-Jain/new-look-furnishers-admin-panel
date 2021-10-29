import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'project_quotation';
@Injectable({
  providedIn: 'root'
})
export class ProjectQuotationService {

  constructor(private http:HttpClient) { }
  getprojectquotation():Observable<any[]>{
    return this.http.get<any[]>(api+`/getproject_quotation`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getprojectquotationbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproject_quotationbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  getpqdetailsbyid(id:any):Observable<any[]>{
    return this.http.get<any[]>(api+`/getpqdetailsbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
}

  createprojectquotation(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproject_quotation`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateprojectquotation(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproject_quotation`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteprojectquotation(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproject_quotation/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
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
