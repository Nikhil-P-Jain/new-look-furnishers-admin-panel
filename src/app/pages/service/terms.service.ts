import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
const api = environment.BASE_URL + "terms";

@Injectable({
  providedIn: "root",
})
export class TermsService {
  constructor(private http: HttpClient) {}
  getTerms(): Observable<any[]> {
    return this.http
      .get<any[]>(api + `/getterm/`, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }
  getTermsById(id: any): Observable<any[]> {
    return this.http
      .get<any[]>(api + `/gettermbyid/` + id, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }

  createTerms(body: any): Observable<any[]> {
    return this.http
      .post<any[]>(api + `/createterm`, body, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }

  updateTerms(body: any): Observable<any[]> {
    return this.http
      .patch<any[]>(api + `/updateterm`, body, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }
  deleteTerms(id: any): Observable<any[]> {
    return this.http
      .delete<any[]>(api + `/deleteterm/` + id, {
        headers: new HttpHeaders({ "Content-Typr": "application/json" }),
      })
      .map((res) => res);
  }
}
