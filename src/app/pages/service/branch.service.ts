import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
const api = environment.BASE_URL+'branch';

@Injectable({
  providedIn: 'root'
})

export class BranchService {

  constructor(private http:HttpClient) { }
  getBranch():Observable<any[]>{
    return this.http.get<any[]>(api+`/getbranch/`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }
  getBranchById(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getbranchbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createBranch(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createbranch`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateBranch(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updatebranch`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }
  deleteBranch(id:any):Observable<any[]>{
    return this.http.delete<any[]>(api+`/deletebranch/`+id,{headers:new HttpHeaders({'Content-Typr':'application/json'})}).map(res=>res);
  }
}
