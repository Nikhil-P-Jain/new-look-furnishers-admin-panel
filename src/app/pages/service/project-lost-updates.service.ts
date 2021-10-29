import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'project_lost_updates';

@Injectable({
  providedIn: 'root'
})
export class ProjectLostUpdatesService {

  constructor(private http:HttpClient) { }
  getprojectlostupdates(id:any):Observable<any[]>{
    return this.http.get<any[]>(api+`/getproject_lost_updates/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getprojectlostupdatesbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproject_lost_updatesbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createprojectlostupdates(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproject_lost_updates`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateprojectlostupdates(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproject_lost_updates`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteprojectlostupdates(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproject_lost_updates/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

}
