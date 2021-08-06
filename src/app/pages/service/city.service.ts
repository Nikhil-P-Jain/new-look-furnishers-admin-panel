import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api = 'http://localhost:3000/api/city';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http:HttpClient) { }
  getcity():Observable<any[]>{
    return this.http.get<any[]>(api+`/getcity`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getcitybyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getcitybyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createcity(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createcity`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updatecity(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updatecity`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deletecity(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deletecity/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

}
