import { Component, Input, Output, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'active-users',
  styleUrls: ['./active-users.component.css'],
  template: `
    <div class="users">
      <div class="active-users-title">
        <div class="status-indicator"></div>
        <h1>Active Users</h1>
      </div>

      <mat-divider></mat-divider>

      <mat-list role="list">
        <div *ngFor="let username of activeUsers; let i = index">
          <div class="user-list-item">
            <mat-icon style="color: #2af598;">account_circle</mat-icon>
            <mat-list-item role="listitem">
              {{ username }}
            </mat-list-item>
          </div>
          <mat-divider></mat-divider>
        </div>
      </mat-list>
    </div>
  `,
})
export class ActiveUsersComponent implements OnInit {
  @Input()
  activeUsers: string[];

  constructor() {
    this.activeUsers = [];
  }

  ngOnInit() {}
}
