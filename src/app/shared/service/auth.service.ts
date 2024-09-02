import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ICliente } from '@sharedModule/models/ICliente';
import { ILoginUser } from '@sharedModule/models/ILoginClient';
import { IResponse } from '@sharedModule/models/IResponse';
// import { environment } from '@env/environment';
// import { ISafeAny } from '@sharedModule/models/ISafeAny';
import { IUserRegister } from '@sharedModule/models/IUserRegister';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(private httpClient: HttpClient) { }

    public registerNewUser(newClient: ICliente): Observable<IResponse> {
        return this.httpClient.post<IResponse>(environment.api.getLoginRegister, newClient);
    }

    public loginUser(newClient: ILoginUser): Observable<IResponse> {
        return this.httpClient.post<IResponse>(environment.api.getAuthLogin, newClient);
    }

}