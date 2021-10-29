import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'state';
@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http:HttpClient) { }
  getstate():Observable<any[]>{
    return this.http.get<any[]>(api+`/getstate`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getstatebyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getstatebyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createstate(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createstate`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updatestate(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updatestate`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deletestate(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deletestate/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

}
