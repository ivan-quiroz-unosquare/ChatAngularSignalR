import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from 'src/app/models/RegisterUser';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'register',
  styleUrls: ['./register.component.css'],
  template: `
    <div class="container">
      <div class="form-container">
        <form [formGroup]="form">
          <!-- USER NAME -->
          <mat-form-field hintLabel="Max 10 characters" appearance="fill">
            <mat-label>User Name</mat-label>
            <input
              matInput
              #username
              maxlength="10"
              formControlName="userName"
            />
            <mat-icon matSuffix>person</mat-icon>
            <mat-hint align="end">{{ username.value.length }}/10</mat-hint>
          </mat-form-field>

          <!-- EMAIL -->
          <mat-form-field appearance="fill">
            <mat-label>Email*</mat-label>
            <input matInput type="email" formControlName="email" />
            <mat-icon matSuffix>alternate_email</mat-icon>
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
            (click)="register()"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  form: FormGroup;
  hidePassword: boolean;

  constructor(private _accountService: AccountService) {
    this.hidePassword = true;

    this.form = new FormGroup({
      userName: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(10)])
      ),
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl('', Validators.required),
    });
  }

  register() {
    const user: RegisterUser = {
      email: this.form.controls['email'].value,
      userName: this.form.controls['userName'].value,
      password: this.form.controls['password'].value,
    };

    this._accountService.register(user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
