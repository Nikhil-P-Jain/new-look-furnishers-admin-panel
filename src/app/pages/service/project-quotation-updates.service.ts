import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'project_quotation_updates';

@Injectable({
  providedIn: 'root'
})
export class ProjectQuotationUpdatesService {

  constructor(private http:HttpClient) { }
  getprojectquotationupdates(id:any):Observable<any[]>{
    return this.http.get<any[]>(api+`/getproject_quotation_updates/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getprojectquotationupdatesbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproject_quotation_updatesbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createprojectquotationupdates(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproject_quotation_updates`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateprojectquotationupdates(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproject_quotation_updates`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteprojectquotationupdates(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproject_quotation_updates/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

}
