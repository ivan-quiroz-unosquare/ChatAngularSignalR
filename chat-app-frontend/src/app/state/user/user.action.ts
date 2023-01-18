import { createAction, props } from '@ngrx/store';
import { RegisterUser } from '../../models/RegisterUser';
import { User } from 'src/app/models/User';
import { AuthenticationResponse } from 'src/app/models/AuthenticationResponse';

export const login = createAction(
  '[LogIn View] LogIn',
  props<{ auth: string }>()
);

export const loggedIn = createAction(
  '[LogIn Effect] LoggedIn',
  props<{ auth: AuthenticationResponse; user: User }>()
);

export const logout = createAction(
  '[Navbar] LogOut',
  props<{ token: string }>()
);

export const loggedOut = createAction('[LogOut Effect] LoggedOut');

export const refreshToken = createAction(
  '[Navbar] Refresh Token',
  props<{ token: string }>()
);

export const tokenRefreshed = createAction(
  '[Refresh Token Effect] Token Refreshed',
  props<{ auth: AuthenticationResponse }>()
);

export const saveUserSession = createAction(
  '[LogIn Effect] Save User Session',
  props<{ auth: AuthenticationResponse }>()
);

export const deleteUserSession = createAction(
  '[LogOut Effect] Delete User Session'
);

export const getUserSession = createAction('[App Component] Get User Session');
