import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


const api = environment.BASE_URL+'product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getproduct():Observable<any[]>{
    return this.http.get<any[]>(api+`/getproduct`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getsubproductbyproductid(id:any):Observable<any[]>
  {
    return this.http.get<any[]>(api+`/getsubproductbyproductid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

  getproductbyid(id:any):Observable<any[]>{
      return this.http.get<any[]>(api+`/getproductbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  createproduct(body:any):Observable<any[]>{
      return this.http.post<any[]>(api+`/createproduct`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  updateproduct(body:any):Observable<any[]>{
      return this.http.patch<any[]>(api+`/updateproduct`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }

  deleteproduct(id:any):Observable<any[]>{
      return this.http.delete<any[]>(api+`/deleteproduct/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
      .map(res => res);
  }
  getproduct_brand():Observable<any[]>{
    return this.http.get<any[]>(environment.BASE_URL+`product_brand/getproduct_brand`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
    .map(res => res);
  }

}
