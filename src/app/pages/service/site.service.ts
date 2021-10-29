import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
const api = environment.BASE_URL+'site';


@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http:HttpClient) { }
  getsite():Observable<any[]>{
    return this.http.get<any[]>(api+`/getsite`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getsitebyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getsitebyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createsite(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createsite`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updatesite(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updatesite`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deletesite(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deletesite/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

}
