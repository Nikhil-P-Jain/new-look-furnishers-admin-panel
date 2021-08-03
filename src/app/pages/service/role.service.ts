import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
// import { environment } from '../../environments/environment';

const api = 'http://localhost:3000/api/role';

@Injectable({
    providedIn:'root'
})

export class roleservice{

    constructor(private http:HttpClient){}

    getrole():Observable<any[]>{
        return this.http.get<any[]>(api+`/getrole`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getrolebyid(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/getrolebyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createrole(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/createrole`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updaterole(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/updaterole`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    deleterole(id:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/deleterole/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}