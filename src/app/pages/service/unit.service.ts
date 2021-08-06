import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api = 'http://localhost:3000/api/unit';
@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http:HttpClient) { }
  getunit():Observable<any[]>{
    return this.http.get<any[]>(api+`/getunit`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getunitbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getunitbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createunit(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createunit`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateunit(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateunit`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteunit(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteunit/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

}
