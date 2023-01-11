import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  template: `
    <div class="container">
      <div class="form-container">
        <form [formGroup]="form">
          <!-- USER NAME -->
          <mat-form-field appearance="fill">
            <mat-label>User Name</mat-label>
            <input matInput formControlName="userName" />
            <mat-icon matSuffix>person</mat-icon>
          </mat-form-field>

          <!-- PASSWORD -->
          <mat-form-field appearance="fill">
            <mat-label>Password</mat-label>
            <input
              matInput
              type="password"
              formControlName="password"
              [type]="hidePassword ? 'password' : 'text'"
            />
            <button
              mat-icon-button
              matSuffix
              (click)="hidePassword = !hidePassword"
              [attr.aria-label]="'Hide password'"
              [attr.aria-pressed]="hidePassword"
            >
              <mat-icon>{{
                hidePassword ? 'visibility_off' : 'visibility'
              }}</mat-icon>
            </button>
          </mat-form-field>

          <!-- SUBMIT -->
          <button
            type="submit"
            mat-raised-button
            color="primary"
            [disabled]="form.invalid"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hidePassword: boolean;

  constructor() {
    this.hidePassword = true;

    this.form = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}
}
