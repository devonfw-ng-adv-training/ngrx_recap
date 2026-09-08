import { createReducer, on } from '@ngrx/store';
import * as usersActions from './users.actions';
import { UsersState } from './users.models';

export const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null
};

export const usersReducer = createReducer(
  initialUsersState,
  on(usersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(usersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  on(usersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
