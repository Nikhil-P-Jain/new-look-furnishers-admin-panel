import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
const api = environment.BASE_URL + "materialRequisition";

@Injectable({
  providedIn: "root",
})
export class MaterialRequisitionService {
  constructor(private http: HttpClient) {}
  getMaterialRequisition(): Observable<any[]> {
    return this.http
      .get<any[]>(api, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }

  getMaterialRequisitionById(id: any): Observable<any[]> {
    return this.http
      .get<any[]>(api + `/` + id, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }

  getMaterialRequisitionByAnnexureId(id: any): Observable<any[]> {
    return this.http
      .get<any[]>(api + `/get-material-requisition-by-annexure/` + id, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }

  createMaterialRequisition(body: any): Observable<any[]> {
    return this.http
      .post<any[]>(api, body, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }

  updateMaterialRequisition(body: any): Observable<any[]> {
    return this.http
      .patch<any[]>(api, body, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }

  deleteMaterialRequisition(id: any): Observable<any[]> {
    return this.http
      .delete<any[]>(api + `/` + id, {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
      })
      .map((res) => res);
  }
}
