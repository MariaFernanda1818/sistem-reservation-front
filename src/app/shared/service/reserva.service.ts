import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { ICliente } from "@sharedModule/models/ICliente";
import { FiltrosReserva } from "@sharedModule/models/IFiltrosReserva";
import { ILoginUser } from "@sharedModule/models/ILoginClient";
import { IReserva } from "@sharedModule/models/IReserva";
import { IResponse } from "@sharedModule/models/IResponse";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ReservaService {
    
    constructor(private httpClient: HttpClient) { }

    public queryAllAfiliadosTipoAfiliados(tipoAfiliado:number): Observable<IResponse> {
        return this.httpClient.get<IResponse>(`${environment.api.getAfiliados}?idTipoAfiliado=${tipoAfiliado}`);
    }

    public loginUser(newClient: ILoginUser): Observable<IResponse> {
        return this.httpClient.post<IResponse>(environment.api.getAuthLogin, newClient);
    }

    public createReservation(dataReserva:IReserva): Observable<IResponse>{
        return this.httpClient.post<IResponse>(environment.api.createReservation, dataReserva)
    }

    public consultarReservasFiltro(filtros:FiltrosReserva): Observable<IResponse>{
        return this.httpClient.post<IResponse>(environment.api.getReservasCodigoCliente, filtros)
    }

    public cancelarReservation(codigoReserva:string):Observable<IResponse>{
        return this.httpClient.get<IResponse>(`${environment.api.cancelReservation}?codigoReserva=${codigoReserva}`)
    }

    public modificarReserva(reserva:IReserva):Observable<IResponse>{
        return this.httpClient.post<IResponse>(`${environment.api.modificarReservation}`, reserva)
    }
}