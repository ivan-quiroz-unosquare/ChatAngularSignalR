import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { AuthenticationResponse } from '../models/AuthenticationResponse';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RegisterUser } from '../models/RegisterUser';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private baseUrl: string;

  constructor(private _http: HttpClient) {
    this.baseUrl = 'https://localhost:7001';
  }

  register(newUser: RegisterUser) {
    return this._http
      .post(`${this.baseUrl}/api/Account/Register`, newUser)
      .pipe(
        map((response: any) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => error.message)
        )
      );
  }

  login(authorization: string): Observable<AuthenticationResponse> {
    return this._http
      .get(`${this.baseUrl}/api/Account/Login`, {
        headers: new HttpHeaders({ Authorization: `Basic ${authorization}` }),
      })
      .pipe(
        map((response: any) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => error.message)
        )
      );
  }

  logout(username: string) {
    return this._http
      .delete(`${this.baseUrl}/api/Account/Logout`, {
        headers: new HttpHeaders({ username }),
      })
      .pipe(
        map((response: any) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => error.message)
        )
      );
  }

  refreshToken(token: string): Observable<AuthenticationResponse> {
    return this._http
      .get(`${this.baseUrl}/api/Account/RefreshToken`, {
        headers: new HttpHeaders({ Authentication: token }),
      })
      .pipe(
        map((response: any) => response),
        catchError((error: HttpErrorResponse) =>
          throwError(() => error.message)
        )
      );
  }
}
