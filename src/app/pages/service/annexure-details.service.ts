import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'Annexure_details';


@Injectable({
  providedIn: 'root'
})
export class Annexure_detailsDetailsService {

  constructor(private http:HttpClient){}

  getAnnexure_details():Observable<any[]>{
      return this.http.get<any[]>(api+`/getannexure_details`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  getAnnexure_detailsbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getannexure_detailsbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  getannexure_detailsby_annexure_id(id:any):Observable<any[]>{
    return this.http.get<any[]>(api+`/getannexure_detailsby_annexure_id/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
}

  createAnnexure_details(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createannexure_details`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateAnnexure_details(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateannexure_details`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteAnnexure_details(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteannexure_details/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }
  delete_annexure_and_details(id:any):Observable<any[]>{
    return this.http.delete<any[]>(api+`/delete_annexure_and_details/`+id,{headers:new HttpHeaders({'Content-Typr':'application/json'})}).map(res=>res);
  }
  get_annexure_details_json(id:any):Observable<any[]>{
    return this.http.get<any[]>(api+`/get_annexure_details_json/`+id,{headers:new HttpHeaders({'Content_Type':'application/json'})}).map(res=>res);
  }
}
