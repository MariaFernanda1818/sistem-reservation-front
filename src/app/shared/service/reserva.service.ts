import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { ICliente } from "@sharedModule/models/ICliente";
import { ILoginUser } from "@sharedModule/models/ILoginClient";
import { IResponse } from "@sharedModule/models/IResponse";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ReservaService {
    
    constructor(private httpClient: HttpClient) { }

    public queryAllAfiliadosTipoAfiliados(tipoAfiliado:number): Observable<IResponse> {
        return this.httpClient.get<IResponse>(`${environment.api.getAfiliados}?idTipoAfiliado=${tipoAfiliado}` );
    }

    public loginUser(newClient: ILoginUser): Observable<IResponse> {
        return this.httpClient.post<IResponse>(environment.api.getAuthLogin, newClient);
    }

}