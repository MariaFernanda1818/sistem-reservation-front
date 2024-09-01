import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginUser } from '@sharedModule/models/ILoginUser';
import { IResponse } from '@sharedModule/models/IResponse';
// import { environment } from '@env/environment';
// import { ISafeAny } from '@sharedModule/models/ISafeAny';
import { IUserRegister } from '@sharedModule/models/IUserRegister';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(private httpClient: HttpClient) { }
    

    // public getAllUsers(): Observable<ISafeAny> {
    //     // return this.httpClient.get<ISafeAny>(`${environment.api.getUsers}`);
    //     return this.httpClient.get<ISafeAny>(`http://localhost:8080/users/all`);
    // }

    public registerNewUser(newUser: IUserRegister): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`http://localhost:8080/register`, newUser);
    }

    public loginUser(user: ILoginUser): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`http://localhost:8080/login`, user);
    }

}