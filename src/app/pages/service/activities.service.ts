import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'activities';


@Injectable({
    providedIn:'root'
})

export class activitiesservice{

    constructor(private http:HttpClient){}

    getactivities():Observable<any[]>{
        return this.http.get<any[]>(api+`/getactivities`,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    getactivitiesbyid(id:any):Observable<any[]>{
        return this.http.get<any[]>(api+`/getactivitiesbyid/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    createactivities(body:any):Observable<any[]>{
        return this.http.post<any[]>(api+`/createactivities`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    updateactivities(body:any):Observable<any[]>{
        return this.http.patch<any[]>(api+`/updateactivities`,body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

    deleteactivities(id:any):Observable<any[]>{
        return this.http.delete<any[]>(api+`/deleteactivities/`+id,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .map(res => res);
    }

}