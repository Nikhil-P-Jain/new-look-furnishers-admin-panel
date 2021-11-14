import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
const api = environment.BASE_URL+'accessories';

@Injectable({
  providedIn: 'root'
})
export class AccessoriesService {

  constructor(private http:HttpClient){}

  getaccessories(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getaccessories/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  getaccessoriesbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getaccessoriesbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createaccessories(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createaccessories`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateaccessories(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateaccessories`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }
  delete_accessories(id:any):Observable<any[]>{
    return this.http.delete<any[]>(api+`/deleteaccessories/`+id,{headers:new HttpHeaders({'Content-Typr':'application/json'})}).map(res=>res);
  }
}