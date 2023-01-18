import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Injectable({ providedIn: 'root' })
export class IsLoggedOutGuard implements CanActivate {
  constructor(private _router: Router, private _store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLoggedOut: boolean = true;
    this._store
      .select((state) => state.userState.loggedIn)
      .subscribe((response) => (isLoggedOut = !response));

    if (!isLoggedOut) this._router.navigateByUrl('/');

    return isLoggedOut;
  }
}
