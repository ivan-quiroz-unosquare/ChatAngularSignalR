import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class IsLoggedOutGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const hasSession = localStorage.getItem('user_info');
    if (hasSession) {
      this._router.navigateByUrl('/');
      return false;
    }

    return true;
  }
}
