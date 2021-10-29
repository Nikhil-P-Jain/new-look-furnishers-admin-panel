import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'project_lead_updates';

@Injectable({
  providedIn: 'root'
})
export class ProjectLeadUpdatesService {

  constructor(private http:HttpClient) { }
  getprojectleadupdates(id:any):Observable<any[]>{
    return this.http.get<any[]>(api+`/getproject_lead_updates/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getprojectleadupdatesbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproject_lead_updatesbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createprojectleadupdates(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproject_lead_updates`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateprojectleadupdates(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproject_lead_updates`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteprojectleadupdates(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproject_lead_updates/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

}
