import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const api = 'http://localhost:3000/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getuser():Observable<any[]>{
    return this.http.get<any[]>(api+`/getuser`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getuserbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getuserbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createuser(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createuser`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateuser(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateuser`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteuser(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteuser/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }
  getuser_name():Observable<any[]>{
    return this.http.get<any[]>(api+`/getuser_name`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }
}
