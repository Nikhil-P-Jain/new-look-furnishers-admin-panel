import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api = 'http://localhost:3000/api/project_lead';
@Injectable({
  providedIn: 'root'
})
export class ProjectLeadService {

  constructor(private http:HttpClient) { }
  getprojectlead():Observable<any[]>{
    return this.http.get<any[]>(api+`/getproject_lead`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getprojectleadbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproject_leadbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createprojectlead(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproject_lead`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateprojectlead(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproject_lead`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteprojectlead(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproject_lead/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

}
