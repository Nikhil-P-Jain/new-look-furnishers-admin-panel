import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
const api = environment.BASE_URL + "materialRequisitionItem";

@Injectable({
  providedIn: "root",
})
export class MaterialRequisitionItemsService {
  constructor(private http: HttpClient) {}
  getMaterialRequisitionItem(): Observable<any[]> {
    return this.http
      .get<any[]>(api, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }

  getMaterialRequisitionItemById(id: any): Observable<any[]> {
    return this.http
      .get<any[]>(api + `/` + id, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }

  createMaterialRequisitionItem(body: any): Observable<any[]> {
    return this.http
      .post<any[]>(api, body, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }

  updateMaterialRequisitionItem(body: any): Observable<any[]> {
    return this.http
      .patch<any[]>(api, body, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }

  deleteMaterialRequisitionItem(id: any): Observable<any[]> {
    return this.http
      .delete<any[]>(api + `/` + id, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }
}
