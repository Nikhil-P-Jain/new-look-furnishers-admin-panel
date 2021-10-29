import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
const api = environment.BASE_URL+'supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) { }
  getsupplier():Observable<any[]>{
    return this.http.get<any[]>(api+`/getsupplier`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getsupplierbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getsupplierbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createsupplier(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createsupplier`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updatesupplier(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updatesupplier`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deletesupplier(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deletesupplier/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }
}
