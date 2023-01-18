import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from 'src/app/services/account.service';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { UserActions } from './action-types';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserEffect {
  constructor(
    private _actions$: Actions,
    private _accountService: AccountService,
    private _store: Store<AppState>,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  login$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(UserActions.login),
        switchMap((action) =>
          from(this._accountService.login(action.auth)).pipe(
            map((response) => {
              this._store.dispatch(
                UserActions.loggedIn({
                  auth: response,
                  user: this.getUserInfo(response.token),
                })
              );

              this._store.dispatch(
                UserActions.saveUserSession({ auth: response })
              );
            }),
            catchError((error: HttpErrorResponse) =>
              throwError(() => this._toastr.error(error.error))
            ),
            tap(() => this._router.navigateByUrl('/'))
          )
        )
      ),
    { dispatch: false }
  );

  refreshToken$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(UserActions.refreshToken),
        switchMap((action) =>
          from(this._accountService.refreshToken(action.token)).pipe(
            map((response) =>
              this._store.dispatch(
                UserActions.tokenRefreshed({ auth: response })
              )
            ),
            catchError((error: HttpErrorResponse) =>
              throwError(() => console.error(error.error))
            )
          )
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(UserActions.logout),
        switchMap((action) =>
          from(this._accountService.logout(action.token)).pipe(
            map(() => {
              this._store.dispatch(UserActions.loggedOut());
              this._store.dispatch(UserActions.deleteUserSession());
            }),
            catchError((error: HttpErrorResponse) =>
              throwError(() => console.error(error.error))
            ),
            tap(() => this._router.navigateByUrl('/login'))
          )
        )
      ),
    { dispatch: false }
  );

  private getUserInfo(jwt: string): User {
    const userInfo: any = jwt_decode(jwt);
    return { userName: userInfo.username, email: userInfo.email };
  }
}
