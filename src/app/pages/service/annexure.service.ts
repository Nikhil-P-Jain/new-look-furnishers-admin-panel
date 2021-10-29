import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'annexure';


@Injectable({
  providedIn: 'root'
})
export class AnnexureService {

  constructor(private http:HttpClient){}

  getannexure():Observable<any[]>{
      return this.http.get<any[]>(api+`/getannexure`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  getannexurebyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getannexurebyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  getannexureby_poid(id:any):Observable<any[]>{
    return this.http.get<any[]>(api+`/getannexureby_poid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
}

  createannexure(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createannexure`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateannexure(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateannexure`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteannexure(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteannexure/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }
}
