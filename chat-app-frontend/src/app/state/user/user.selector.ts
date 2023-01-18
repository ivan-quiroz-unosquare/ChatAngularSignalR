import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { AppState } from '../app.state';

export const selectUserState = (state: AppState) => state.userState;

export const selectLoggedIn = createSelector(
  selectUserState,
  (state: UserState) => state.loggedIn
);
