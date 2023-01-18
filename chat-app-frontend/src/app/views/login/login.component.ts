import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { login } from 'src/app/state/user/user.action';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  template: `
    <navbar [loggedIn]="false"></navbar>
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
              type="button"
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
            (click)="
              login(
                form.controls['userName'].value,
                form.controls['password'].value
              )
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  form: FormGroup;
  hidePassword: boolean;

  constructor(
    private _accountService: AccountService,
    private _router: Router,
    private _store: Store<AppState>
  ) {
    this.hidePassword = true;

    this.form = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login(username: string, password: string) {
    this._store.dispatch(login({ auth: btoa(`${username}:${password}`) }));
  }
}
