import { Component, OnInit } from '@angular/core';

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
          <span class="navbar-item username">ivan.quiroz@unosquare.com</span>
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

  constructor() {
    this.loggedIn = true;
  }

  ngOnInit() {}

  logout() {
    this.loggedIn = false;
  }
}
