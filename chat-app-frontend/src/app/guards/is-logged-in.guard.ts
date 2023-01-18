import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectLoggedIn } from '../state/user/user.selector';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard implements CanActivate {
  constructor(private _router: Router, private _store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLoggedIn: boolean = false;
    this._store
      .select((state) => state.userState.loggedIn)
      .subscribe((response) => (isLoggedIn = response));

    if (!isLoggedIn) this._router.navigateByUrl('/login');

    return isLoggedIn;
  }
}
