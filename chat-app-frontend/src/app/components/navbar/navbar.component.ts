import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';

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
  loggedIn: boolean;
  user: User;

  constructor(
    private _router: Router,
    private _accountService: AccountService
  ) {
    this.loggedIn = this.isLoggedIn();
    this.user = this.getUserInfo();
  }

  ngOnInit() {
    setInterval(() => {
      this.loggedIn = this.isLoggedIn();
    }, 300);
  }

  logout() {
    this._accountService.logout(this.user.userName).subscribe(
      (response) => {
        this.loggedIn = false;
        localStorage.removeItem('user_info');
        this._router.navigateByUrl('/login');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  isLoggedIn(): boolean {
    const hasSession = localStorage.getItem('user_info');
    if (hasSession) return true;
    return false;
  }

  getUserInfo(): User {
    if (this.isLoggedIn()) {
      const userInfo = JSON.parse(localStorage.getItem('user_info')!);
      return { email: userInfo.email, userName: userInfo.username };
    }

    return { email: '', userName: '' };
  }
}
