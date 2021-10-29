import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const api = environment.BASE_URL+'registration';


@Injectable({
    providedIn:'root'
})

export class LoginService{
    user:any;
    per:any=[];

    constructor(private http:HttpClient){}

    login(body:any):Observable<any[]>{
        console.log("User Login :-", body);
        return this.http.post<any[]>(api+"/login",body,{headers:new HttpHeaders({'Content-Type':'application/json'})})
        .pipe(map(res => {
            // login successful if there's a jwt token in the response
            this.user = res;
            console.log("Geeting USer Data :-", this.user);
            if (this.user) {
                localStorage.setItem('email', this.user.email);
                localStorage.setItem('password', this.user.password);
                localStorage.setItem('token',this.user.token);
            }
            return res;
        }));
      }
    }