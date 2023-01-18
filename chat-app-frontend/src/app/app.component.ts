import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { UserActions } from './state/user/action-types';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  constructor(private _store: Store<AppState>) {
    this._store.dispatch(UserActions.getUserSession());
  }
}
