import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http:HttpClient) { }
  getPermission():Observable<any[]>{
    return this.http.get<any[]>(api+'/getpermission',{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res=>res);
  }
  getPermissionbyid(id:any):Observable<any[]>{
    return this.http.get<any[]>(api+'/getpermissionbyid/'+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res=>res);
  }
  createPermission(body:any):Observable<any[]>{
    return this.http.post<any[]>(api+'/createpermission',body,{headers: new HttpHeaders({'Content-Type':'application/json'})})
    .map(res=>res);
  }
  updatePermission(body:any):Observable<any[]>{
    return this.http.patch<any[]>(api+'/updatepermission',body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res=>res);
  }
  deletePermission(id:any):Observable<any[]>{
    return this.http.delete<any[]>(api+'/deletepermission/'+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res=>res);
  }
  getRoleName():Observable<any[]>{
    return this.http.get<any[]>(api+'/getrolename',{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res=>res);
  }
  getRoleNamebyid(id:any):Observable<any[]>{
    return this.http.get<any[]>(api+'/getrolenamebyid/'+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res=>res);
  }
}
