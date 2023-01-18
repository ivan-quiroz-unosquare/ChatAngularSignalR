import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';
import { AppState } from 'src/app/state/app.state';
import { UserActions } from 'src/app/state/user/action-types';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'navbar',
  styleUrls: ['./navbar.component.scss'],
  template: `
    <nav class="navbar">
      <div class="logo-app">
        <img
          src="../../../assets/chat-en-vivo.png"
          alt="chat app logo"
          class="navbar-brand"
        />
      </div>

      <!-- The user is logged in -->
      <div *ngIf="loggedIn" class="navbar-actions">
        <div class="user-info">
          <mat-icon>account_circle</mat-icon>
          <span class="navbar-item username">{{ user.userName }}</span>
        </div>
        <button
          mat-raised-button
          class="navbar-item"
          [routerLink]="'/login'"
          (click)="logout()"
        >
          Logout
        </button>
      </div>

      <!-- The user is not logged in -->
      <div *ngIf="!loggedIn" class="navbar-actions">
        <a
          mat-raised-button
          class="navbar-item"
          [routerLink]="'/login'"
          routerLinkActive="router-link-active"
        >
          Login
        </a>
        <a mat-raised-button class="navbar-item" [routerLink]="'/register'"
          >Register</a
        >
      </div>
    </nav>
  `,
})
export class NavbarComponent implements OnInit {
  @Input()
  loggedIn: boolean;
  user: User;

  constructor(
    private _router: Router,
    private _accountService: AccountService,
    private _store: Store<AppState>
  ) {
    this.loggedIn = false;
    this.user = { userName: '', email: '' };
  }

  ngOnInit() {
    if (this.loggedIn) {
      this._store
        .select((state) => state.userState.user)
        .subscribe((user) => (this.user = user!));
    }
  }

  logout() {
    let token = '';
    this._store
      .select((store) => store.userState.auth)
      .subscribe((auth) => (token = auth!.token));

    this._store.dispatch(
      UserActions.logout({
        token,
      })
    );
  }
}
