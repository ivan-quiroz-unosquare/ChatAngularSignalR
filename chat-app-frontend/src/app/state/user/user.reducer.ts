import { createReducer, on } from '@ngrx/store';
import { UserActions } from './action-types';
import { AuthenticationResponse } from 'src/app/models/AuthenticationResponse';
import { User } from 'src/app/models/User';
import jwt_decode from 'jwt-decode';

export interface UserState {
  loggedIn: boolean;
  auth?: AuthenticationResponse;
  user?: User;
}

export const inititalUserState: UserState = {
  loggedIn: false,
  auth: undefined,
  user: undefined,
};

export const userReducer = createReducer(
  inititalUserState,

  on(UserActions.login, (state) => state),

  on(UserActions.loggedIn, (state, action) => ({
    ...state,
    loggedIn: true,
    auth: action.auth,
    user: action.user,
  })),

  on(UserActions.logout, (state) => state),

  on(UserActions.loggedOut, (state) => ({
    ...state,
    loggedIn: false,
    auth: undefined,
    user: undefined,
  })),

  on(UserActions.refreshToken, (state) => state),

  on(UserActions.tokenRefreshed, (state, action) => ({
    ...state,
    auth: action.auth,
  })),

  on(UserActions.saveUserSession, (state, action) => {
    sessionStorage.setItem('auth', JSON.stringify(action.auth));
    return { ...state };
  }),

  on(UserActions.deleteUserSession, (state) => {
    sessionStorage.removeItem('auth');
    return { ...state };
  }),

  on(UserActions.getUserSession, (state) => {
    const userSession = sessionStorage.getItem('auth');

    if (userSession) {
      const auth: AuthenticationResponse = JSON.parse(userSession);
      const userInfo: any = jwt_decode(auth.token);
      const user: User = { userName: userInfo.username, email: userInfo.email };

      return {
        ...state,
        loggedIn: true,
        auth,
        user,
      };
    }

    return { ...state };
  })
);
