import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'project_lost';

@Injectable({
  providedIn: 'root'
})
export class ProjectLostService {

  constructor(private http:HttpClient) { }
  getprojectlost():Observable<any[]>{
    return this.http.get<any[]>(api+`/getproject_lost`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }
  
  getprojectnameforquotation():Observable<any[]>{
    return this.http.get<any[]>(api+`/getprojectnameforquotation`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }
  getprojectlostbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproject_lostbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  getpldetailsbyid(id:any):Observable<any[]>{
    return this.http.get<any[]>(api+`/getpldetailsbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
}

  createprojectlost(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproject_lost`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateprojectlost(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproject_lost`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteprojectlost(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproject_lost/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }
  

}
